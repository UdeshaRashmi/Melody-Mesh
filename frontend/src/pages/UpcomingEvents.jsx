import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Image as ImageIcon, Edit3, Trash2, PlusCircle } from "lucide-react";
import { getEvents } from "../services/api"; // Import the API service

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", image: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
    
    // Fetch upcoming events from the backend
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      const allEvents = await getEvents();
      // Filter for upcoming events
      const upcomingEvents = allEvents.filter(event => event.type === "upcoming");
      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Failed to fetch upcoming events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addOrUpdateEvent = async () => {
    if (!form.title || !form.date || !form.image) {
      alert("Please fill in all required fields (Title, Date, Image)");
      return;
    }

    if (editingId) {
      // Update existing event
      try {
        const updatedEvents = events.map((e) => (e._id === editingId ? { ...form, _id: editingId } : e));
        setEvents(updatedEvents);
        setEditingId(null);
      } catch (error) {
        console.error("Failed to update event:", error);
        alert("Failed to update event");
      }
    } else {
      // Add new event (this would typically be done through the admin dashboard)
      setEvents([...events, { ...form, _id: Date.now() }]);
    }

    setForm({ title: "", date: "", image: "", description: "" });
  };

  const editEvent = (event) => {
    setForm(event);
    setEditingId(event._id);
  };

  const deleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        // In a real implementation, you would call the API to delete the event
        setEvents(events.filter((e) => e._id !== id));
      } catch (error) {
        console.error("Failed to delete event:", error);
        alert("Failed to delete event");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-purple-700 font-medium">Loading upcoming events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6">
      <h2 className="text-5xl font-extrabold text-center text-purple-700 mb-12 drop-shadow-sm">
        ✨ Upcoming Events ✨
      </h2>

      {/* Admin Panel */}
      {isAdmin ? (
        <div className="bg-white/70 backdrop-blur-sm border border-purple-200 shadow-md rounded-2xl p-6 mb-12 max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-purple-600" />
            {editingId ? "Edit Event" : "Add New Event"}
          </h3>

          <div className="flex flex-col md:flex-row flex-wrap gap-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              className="border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none p-3 rounded-lg w-full md:flex-1"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none p-3 rounded-lg w-full md:flex-1"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none p-3 rounded-lg w-full md:flex-1"
            />
            <input
              type="text"
              name="description"
              placeholder="Short Description"
              value={form.description}
              onChange={handleChange}
              className="border border-purple-200 focus:ring-2 focus:ring-purple-400 focus:outline-none p-3 rounded-lg w-full md:flex-1"
            />
            <button
              onClick={addOrUpdateEvent}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform shadow-md"
            >
              {editingId ? "Update Event" : "Add Event"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mb-10 italic">
          (Only admins can add, edit, or delete events.)
        </p>
      )}

      {/* Events Grid */}
      {events.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">No upcoming events yet. ✨</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {events.map((e) => (
            <div
              key={e._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <div className="relative">
                {e.image ? (
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-56 bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-white opacity-70" />
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-sm font-medium text-purple-700 px-3 py-1 rounded-full shadow">
                  <CalendarDays className="w-4 h-4 inline-block mr-1 text-purple-500" />
                  {new Date(e.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-purple-700 mb-2">{e.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{e.description || "No description provided."}</p>

                {isAdmin && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => editEvent(e)}
                      className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium shadow-sm"
                    >
                      <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(e._id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UpcomingEvents;