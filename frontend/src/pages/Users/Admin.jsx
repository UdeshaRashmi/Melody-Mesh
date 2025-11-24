import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../services/api";

function Admin() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    type: "upcoming",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events.");
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
        await addEvent({ ...form, createdBy: "admin" });
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

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-purple-100 py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-8 drop-shadow-lg text-center">
          Welcome, Admin!
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Manage upcoming and past events below.
        </p>
        <form className="flex flex-col gap-4 mb-8" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="Event Title"
            className="border-2 border-indigo-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="border-2 border-pink-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
            rows={2}
          />
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="border-2 border-purple-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border-2 border-blue-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
          >
            {editingId ? "Update Event" : "Add Event"}
          </button>
          {error && <div className="text-red-500 font-semibold text-center mt-2">{error}</div>}
        </form>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Upcoming Events</h3>
          <ul className="space-y-4">
            {events.filter((e) => e.type === "upcoming").length === 0 ? (
              <li className="text-center text-gray-400 text-lg">No upcoming events.</li>
            ) : (
              events
                .filter((e) => e.type === "upcoming")
                .map((event) => (
                  <li
                    key={event._id}
                    className="flex justify-between items-center bg-gradient-to-r from-indigo-100 via-pink-100 to-purple-100 border-2 border-indigo-200 rounded-2xl shadow-md p-4"
                  >
                    <div>
                      <div className="text-xl font-semibold text-indigo-700">{event.title}</div>
                      <div className="text-gray-600">{event.description}</div>
                      <div className="text-sm text-gray-400">{event.date?.slice(0, 10)}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="bg-yellow-400 text-white px-4 py-2 rounded-xl font-bold shadow hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-pink-700 mb-4 text-center">Past Events</h3>
          <ul className="space-y-4">
            {events.filter((e) => e.type === "past").length === 0 ? (
              <li className="text-center text-gray-400 text-lg">No past events.</li>
            ) : (
              events
                .filter((e) => e.type === "past")
                .map((event) => (
                  <li
                    key={event._id}
                    className="flex justify-between items-center bg-gradient-to-r from-pink-100 via-indigo-100 to-purple-100 border-2 border-pink-200 rounded-2xl shadow-md p-4"
                  >
                    <div>
                      <div className="text-xl font-semibold text-pink-700">{event.title}</div>
                      <div className="text-gray-600">{event.description}</div>
                      <div className="text-sm text-gray-400">{event.date?.slice(0, 10)}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="bg-yellow-400 text-white px-4 py-2 rounded-xl font-bold shadow hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;