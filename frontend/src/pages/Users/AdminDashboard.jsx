import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../services/api";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "upcoming",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "Admin");
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Fetch events created by melodyadmin
      const data = await getAdminEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.type) {
      setError("Title, date, and type are required.");
      return;
    }
    try {
      if (editingId) {
        await updateEvent(editingId, form);
        setEditingId(null);
      } else {
        // When creating new events, assign them to melodyadmin
        await addEvent({ ...form, createdBy: "melodyadmin" });
        
        // Redirect to appropriate events page based on event type
        if (form.type === "upcoming") {
          navigate("/events/upcoming");
          return;
        } else if (form.type === "past") {
          navigate("/events/past");
          return;
        }
      }
      setForm({ title: "", description: "", date: "", type: "upcoming" });
      setError("");
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save event.");
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.slice(0, 10) : "",
      type: event.type,
    });
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (err) {
      setError("Failed to delete event.");
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 p-6 bg-white rounded-2xl shadow-lg">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
              Welcome, {username}!
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your events and oversee the Melody Mesh platform
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
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
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
                <p className="text-sm opacity-80">Platform Status</p>
                <p className="text-2xl font-bold">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Management Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingId ? "Edit Event" : "Create New Event"}
              </h2>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter event title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter event description"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                    <input
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                </div>
                
                {error && <div className="text-red-500 font-semibold">{error}</div>}
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {editingId ? "Update Event" : "Create Event"}
                  </button>
                  
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setForm({ title: "", description: "", date: "", type: "upcoming" });
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            {/* Events List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Events</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  <p className="mt-4 text-gray-600">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-gray-600">No events found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                          event.type === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {event.type}
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
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
                  onClick={() => navigate("/users/registered")}
                  className="w-full flex items-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Manage Users</h3>
                    <p className="text-sm text-gray-600">View registered users</p>
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
                    <h3 className="font-semibold text-gray-800">Volunteers</h3>
                    <p className="text-sm text-gray-600">Manage volunteer programs</p>
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
                    <h3 className="font-semibold text-gray-800">Messages</h3>
                    <p className="text-sm text-gray-600">View contact messages</p>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Event Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Statistics</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-indigo-700">Upcoming Events</span>
                    <span className="text-sm font-medium text-indigo-700">{upcomingEvents.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${upcomingEvents.length > 0 ? (upcomingEvents.length / events.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-purple-700">Past Events</span>
                    <span className="text-sm font-medium text-purple-700">{pastEvents.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-purple-600 h-2.5 rounded-full" 
                      style={{ width: `${pastEvents.length > 0 ? (pastEvents.length / events.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;