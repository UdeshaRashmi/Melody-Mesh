import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../services/api";

function RegisteredDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Check if logged-in user has "registered" role
  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    
    if (role !== "registered") {
      navigate("/login");
    } else {
      setUsername(storedUsername || "Registered User");
      fetchEvents();
    }
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const upcomingEvents = events.filter(event => event.type === "upcoming");
  const pastEvents = events.filter(event => event.type === "past");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 p-6 bg-white rounded-2xl shadow-lg">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Welcome, {username}!
            </h1>
            <p className="text-gray-600 mt-2">
              Explore events, connect with the community, and enjoy Melody Mesh
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center">
              <div className="rounded-full bg-white bg-opacity-20 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm opacity-80">Upcoming Events</p>
                <p className="text-2xl font-bold">{upcomingEvents.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center">
              <div className="rounded-full bg-white bg-opacity-20 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm opacity-80">Past Events</p>
                <p className="text-2xl font-bold">{pastEvents.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center">
              <div className="rounded-full bg-white bg-opacity-20 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm opacity-80">Community</p>
                <p className="text-2xl font-bold">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
                <button 
                  onClick={() => navigate("/events/upcoming")}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                  <p className="mt-4 text-gray-600">Loading events...</p>
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-gray-600">No upcoming events at the moment</p>
                  <button 
                    onClick={() => navigate("/events/upcoming")}
                    className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    View All Events
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{event.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <button 
                          onClick={() => navigate(`/events/upcoming`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <button 
                  onClick={() => navigate("/events/upcoming")}
                  className="w-full flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">View Events</h3>
                    <p className="text-sm text-gray-600">Browse upcoming events</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => navigate("/volunteers")}
                  className="w-full flex items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Volunteer</h3>
                    <p className="text-sm text-gray-600">Join our volunteer team</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => navigate("/contact")}
                  className="w-full flex items-center p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors"
                >
                  <div className="bg-pink-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Contact Us</h3>
                    <p className="text-sm text-gray-600">Get in touch with our team</p>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Past Events Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Past Events</h2>
                <button 
                  onClick={() => navigate("/events/past")}
                  className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
                >
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {pastEvents.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No past events yet</p>
              ) : (
                <div className="space-y-4">
                  {pastEvents.slice(0, 2).map((event) => (
                    <div key={event._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-gray-800">{event.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{event.description}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <button 
                          onClick={() => navigate(`/events/past`)}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisteredDashboard;