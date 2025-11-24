import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../services/api";

function RegisteredUser() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if logged-in user has "registered" role
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "registered") {
      navigate("/login");
    } else {
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

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-8 drop-shadow-lg text-center">
          Welcome, Registered User!
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Browse upcoming and past events below.
        </p>
        
        {error && <div className="text-red-500 font-semibold text-center mb-4">{error}</div>}
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">Upcoming Events</h3>
              <ul className="space-y-4">
                {events.filter((e) => e.type === "upcoming").length === 0 ? (
                  <li className="text-center text-gray-400 text-lg">No upcoming events.</li>
                ) : (
                  events
                    .filter((e) => e.type === "upcoming")
                    .map((event) => (
                      <li
                        key={event._id}
                        className="flex flex-col bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-2 border-blue-200 rounded-2xl shadow-md p-4"
                      >
                        <div className="text-xl font-semibold text-blue-700">{event.title}</div>
                        <div className="text-gray-600 mt-2">{event.description}</div>
                        <div className="text-sm text-gray-400 mt-2">{new Date(event.date).toLocaleDateString()}</div>
                      </li>
                    ))
                )}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4 text-center">Past Events</h3>
              <ul className="space-y-4">
                {events.filter((e) => e.type === "past").length === 0 ? (
                  <li className="text-center text-gray-400 text-lg">No past events.</li>
                ) : (
                  events
                    .filter((e) => e.type === "past")
                    .map((event) => (
                      <li
                        key={event._id}
                        className="flex flex-col bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border-2 border-purple-200 rounded-2xl shadow-md p-4"
                      >
                        <div className="text-xl font-semibold text-purple-700">{event.title}</div>
                        <div className="text-gray-600 mt-2">{event.description}</div>
                        <div className="text-sm text-gray-400 mt-2">{new Date(event.date).toLocaleDateString()}</div>
                      </li>
                    ))
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RegisteredUser;