
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="text-2xl mt-4 mb-4">Page Not Found</p>
      <p className="text-lg text-center">
        The page you're looking for doesn't exist or an other error occurred.
      </p>
      <Link to="/" className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-md text-lg hover:bg-indigo-700 transition duration-300">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
