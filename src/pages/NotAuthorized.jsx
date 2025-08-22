import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function NotAuthorized() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          You don't have permission to access this page.
          {user && ` Your role (${user.role}) does not have the required privileges.`}
        </p>

        {user && (
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="text-sm text-gray-500">
              Logged in as: <span className="font-medium">{user.email}</span>
            </p>
            <p className="text-sm text-gray-500">
              Role: <span className="font-medium">{user.role}</span>
            </p>
          </div>
        )}

        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
