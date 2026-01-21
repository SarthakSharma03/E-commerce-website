import { useEffect, useState } from 'react';
import Api from '../../service/Api';
import { toast } from 'react-toastify';
import { FaSearch, FaMapMarkerAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { MdLocationOn, MdFilterList } from 'react-icons/md';

const AdminPincodes = () => {
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterDeliverable, setFilterDeliverable] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [states, setStates] = useState([]);
  const [updating, setUpdating] = useState(null);

  const limit = 50;

  useEffect(() => {
    fetchStats();
    fetchPincodes();
  }, [currentPage, searchTerm, filterState, filterDeliverable]);

  const fetchStats = async () => {
    try {
      const response = await Api.getPincodeStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchPincodes = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit,
        search: searchTerm,
        state: filterState,
        isDeliverable: filterDeliverable
      };
      
      const response = await Api.getAllPincodes(params);
      if (response.success) {
        setPincodes(response.data);
        setPagination(response.pagination);
        
        const uniqueStates = [...new Set(response.data.map(p => p.details?.state).filter(Boolean))].sort();
        setStates(uniqueStates);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch pincodes');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDeliverable = async (id, currentStatus) => {
    try {
      setUpdating(id);
      const newStatus = !currentStatus;
      await Api.updatePincodeDeliverable(id, newStatus);
      
      setPincodes(pincodes.map(p => 
        p._id === id ? { ...p, isDeliverable: newStatus } : p
      ));
      
      if (stats) {
        setStats({
          ...stats,
          deliverable: newStatus ? stats.deliverable + 1 : stats.deliverable - 1,
          nonDeliverable: newStatus ? stats.nonDeliverable - 1 : stats.nonDeliverable + 1
        });
      }
      
      toast.success(`Delivery ${newStatus ? 'enabled' : 'disabled'} for this pincode`);
    } catch (error) {
      toast.error(error.message || 'Failed to update pincode');
    } finally {
      setUpdating(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPincodes();
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
    fetchPincodes();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            Pincode Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage delivery availability for all pincodes</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Pincodes</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.total.toLocaleString()}</h3>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-100">
            <p className="text-sm text-green-600 font-medium">Deliverable</p>
            <h3 className="text-2xl font-bold text-green-700">{stats.deliverable.toLocaleString()}</h3>
          </div>
          <div className="bg-red-50 p-4 rounded-lg shadow-sm border border-red-100">
            <p className="text-sm text-red-600 font-medium">Non-Deliverable</p>
            <h3 className="text-2xl font-bold text-red-700">{stats.nonDeliverable.toLocaleString()}</h3>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">States</p>
            <h3 className="text-2xl font-bold text-blue-700">{stats.statesCount}</h3>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by pincode, location, district, or state..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={filterState}
              onChange={(e) => {
                setFilterState(e.target.value);
                handleFilterChange();
              }}
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={filterDeliverable}
              onChange={(e) => {
                setFilterDeliverable(e.target.value);
                handleFilterChange();
              }}
            >
              <option value="">All Status</option>
              <option value="true">Deliverable</option>
              <option value="false">Non-Deliverable</option>
            </select>
            
            <button
              type="submit"
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Pincodes Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Pincode</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Location</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">District</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm">State</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-center">Delivery Status</th>
                    <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pincodes.length > 0 ? (
                    pincodes.map((pincode) => (
                      <tr key={pincode._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {pincode.pincode}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MdLocationOn className="text-red-500" />
                            <span>{pincode.details?.name || '—'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {pincode.details?.district || '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {pincode.details?.state || '—'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              pincode.isDeliverable
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {pincode.isDeliverable ? 'Deliverable' : 'Not Deliverable'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleToggleDeliverable(pincode._id, pincode.isDeliverable)}
                            disabled={updating === pincode._id}
                            className={`text-2xl transition-opacity ${
                              pincode.isDeliverable ? 'text-green-500' : 'text-gray-400'
                            } ${updating === pincode._id ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
                            title={pincode.isDeliverable ? 'Disable delivery' : 'Enable delivery'}
                          >
                            {pincode.isDeliverable ? (
                              <FaToggleOn />
                            ) : (
                              <FaToggleOff />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        No pincodes found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, pagination.total)} of {pagination.total} pincodes
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-600">
                    Page {currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                    disabled={currentPage === pagination.totalPages}
                    className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Pincodes are automatically synced from data.gov.in every week (Sunday at 2 AM). 
          You can manually toggle delivery availability for any pincode using the toggle button.
        </p>
      </div>
    </div>
  );
};

export default AdminPincodes;
