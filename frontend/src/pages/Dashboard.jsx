import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const role = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    
    if (!role) {
      navigate("/login");
    } else {
      setUserRole(role);
      setUsername(storedUsername || "User");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8 drop-shadow-lg text-center">
          Welcome, {username}!
        </h2>
        
        <p className="text-lg text-gray-700 mb-8 text-center">
          {userRole === "admin" 
            ? "You have administrative privileges. Manage events and users from your dashboard." 
            : "You're logged in as a registered user. Explore events and participate in our community."}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {userRole === "admin" ? (
            <>
              <div 
                className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
                onClick={() => navigate("/users/admin")}
              >
                <h3 className="text-2xl font-bold mb-2">Admin Dashboard</h3>
                <p>Manage events and users</p>
              </div>
              <div 
                className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
                onClick={() => navigate("/events/upcoming")}
              >
                <h3 className="text-2xl font-bold mb-2">View Events</h3>
                <p>Browse all events</p>
              </div>
            </>
          ) : (
            <>
              <div 
                className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
                onClick={() => navigate("/users/registered")}
              >
                <h3 className="text-2xl font-bold mb-2">My Dashboard</h3>
                <p>View your events and activities</p>
              </div>
              <div 
                className="bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
                onClick={() => navigate("/events/upcoming")}
              >
                <h3 className="text-2xl font-bold mb-2">Upcoming Events</h3>
                <p>See what's coming next</p>
              </div>
            </>
          )}
          <div 
            className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
            onClick={() => navigate("/events/past")}
          >
            <h3 className="text-2xl font-bold mb-2">Past Events</h3>
            <p>View previous events</p>
          </div>
          <div 
            className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform shadow-lg"
            onClick={() => navigate("/volunteers")}
          >
            <h3 className="text-2xl font-bold mb-2">Volunteer</h3>
            <p>Get involved in our community</p>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;