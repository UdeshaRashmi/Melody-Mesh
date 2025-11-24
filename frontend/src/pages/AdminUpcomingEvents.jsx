import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Image as ImageIcon, Edit3, Trash2, PlusCircle } from "lucide-react";
import { getUpcomingAdminEvents, addEvent, updateEvent, deleteEvent } from "../services/api";

function AdminUpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", image: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    
    // Check if user is admin (including special melodyadmin)
    if (role === "admin") {
      setIsAdmin(true);
      fetchEvents();
    } else {
      setIsAdmin(false);
      // Redirect non-admin users
      navigate("/login");
    }
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getUpcomingAdminEvents();
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

  const addOrUpdateEvent = async () => {
    if (!form.title || !form.date || !form.image) {
      alert("Please fill in all required fields (Title, Date, Image)");
      return;
    }

    try {
      if (editingId) {
        await updateEvent(editingId, { ...form, type: "upcoming" });
        setEditingId(null);
      } else {
        await addEvent({ ...form, type: "upcoming", createdBy: "melodyadmin" });
      }
      
      setForm({ title: "", date: "", image: "", description: "" });
      fetchEvents(); // Refresh events list
    } catch (err) {
      alert("Failed to save event.");
    }
  };

  const editEvent = (event) => {
    setForm({
      title: event.title,
      date: event.date?.slice(0, 10) || "",
      image: event.image || "",
      description: event.description || ""
    });
    setEditingId(event._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        fetchEvents(); // Refresh events list
      } catch (err) {
        alert("Failed to delete event.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
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

          {error && <div className="text-red-500 mb-4">{error}</div>}

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
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({ title: "", date: "", image: "", description: "" });
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 mb-10 italic">
          (Only admins can add, edit, or delete events.)
        </p>
      )}

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-gray-500 text-lg italic">No upcoming events yet. ✨</p>
          {isAdmin && (
            <p className="text-gray-600 mt-2">Add your first event using the form above!</p>
          )}
        </div>
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
                  <div className="w-full h-56 bg-gradient-to-r from-purple-200 to-indigo-200 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-purple-400" />
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-sm font-medium text-purple-700 px-3 py-1 rounded-full shadow">
                  <CalendarDays className="w-4 h-4 inline-block mr-1 text-purple-500" />
                  {new Date(e.date).toLocaleDateString()}
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
                      onClick={() => handleDelete(e._id)}
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

export default AdminUpcomingEvents;