import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = () => {
      const userRole = localStorage.getItem("role");
      
      if (!userRole) {
        // No role found, redirect to login
        navigate("/login");
        return;
      }
      
      if (requiredRole && userRole !== requiredRole) {
        // User doesn't have the required role
        navigate("/login");
        return;
      }
      
      // User is authorized
      setIsAuthorized(true);
    };

    checkAuthorization();
  }, [navigate, requiredRole]);

  if (isAuthorized === null) {
    // Show loading state while checking authorization
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? children : null;
}

export default ProtectedRoute;