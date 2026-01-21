import { useEffect, useState } from 'react';
import Api from '../../service/Api';
import { toast } from 'react-toastify';
import { MdEmail, MdPhone, MdAccessTime, MdLabel } from 'react-icons/md';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await Api.getContacts();
      setMessages(Array.isArray(response) ? response : []);
    } catch (error) {
      toast.error(error.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await Api.updateContactStatus(id, newStatus);
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, status: response?.status || newStatus } : msg
      ));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      case 'Read': return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
      case 'Replied': return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <MdLabel className="text-red-500" />
          User Messages
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {messages.length} total
          </span>
        </h1>
      </div>
      
      {messages.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
          <MdEmail className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500 text-lg">No messages found yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50/50 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 w-[25%]">User Details</th>
                  <th className="px-6 py-4 w-[25%]">Contact Info</th>
                  <th className="px-6 py-4 w-[35%]">Message</th>
                  <th className="px-6 py-4 w-[15%]">Status & Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr key={msg._id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* User Details */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 font-semibold text-gray-900 text-base">
                          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-bold uppercase shrink-0">
                            {msg.name.charAt(0)}
                          </div>
                          <span className="overflow-hidden whitespace-nowrap">{msg.name}</span>
                        </div>
                        {msg.userId && (
                          <div className="flex flex-col gap-1 ml-10">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 w-fit">
                              Registered
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                          <div className="bg-gray-100 p-1.5 rounded-md text-gray-500 shrink-0">
                            <MdEmail size={16} />
                          </div>
                          <span className="font-medium text-gray-700 truncate">{msg.email}</span>
                        </div>
                        <div className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100">
                          <div className="bg-gray-100 p-1.5 rounded-md text-gray-500 shrink-0">
                            <MdPhone size={16} />
                          </div>
                          <span className="font-medium text-gray-700">{msg.phone}</span>
                        </div>
                      </div>
                    </td>

             
                    <td className="px-6 py-4 align-top">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-gray-700 leading-relaxed group-hover:bg-white group-hover:border-gray-200 transition-colors whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </td>

                    {/* Status & Date */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-4">
                        <select
                          value={msg.status || 'New'}
                          onChange={(e) => handleStatusChange(msg._id, e.target.value)}
                          className={`w-full px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wide cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500/20 appearance-none text-center transition-colors ${getStatusColor(msg.status || 'New')}`}
                        >
                          <option value="New">New</option>
                          <option value="Read">Read</option>
                          <option value="Replied">Replied</option>
                        </select>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-400 pl-1">
                          <MdAccessTime size={14} />
                          <div className="flex flex-col">
                            <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                            <span>{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
