import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear all user data from localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    
    // Redirect to login page after a short delay
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1500);
    
    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
          Logging out...
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for visiting Melody Mesh. You are being redirected to the login page.
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    </div>
  );
}

export default Logout;