
import { useRouteError, Link } from 'react-router-dom';

const Error = ({ title, message }) => {
  const error = useRouteError(); 

  const displayTitle = title || (error?.status === 404 ? '404 Not Found' : 'Oops!');
  const displayMessage = message || error?.statusText || error?.message || 'Something went wrong.';

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4">{error?.status || 'Error'}</h1>
      <h2 className="text-2xl font-medium mb-2">{displayTitle}</h2>
      <p className="text-gray-600 mb-8 max-w-md">{displayMessage}</p>
      <Link 
        to="/home" 
        className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors"
      >
        Back to Home page
      </Link>
    </div>
  );
};

export default Error;
