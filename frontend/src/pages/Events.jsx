import { useEffect, useState } from "react";
import { getEvents } from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [activeTab, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to fetch events.");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    if (activeTab === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter(event => event.type === activeTab));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6">
        <h3 className="text-2xl font-bold text-white">{event.title}</h3>
        <p className="text-white/90 mt-2">{formatDate(event.date)}</p>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">{event.description || "No description available for this event."}</p>
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            event.type === "upcoming" 
              ? "bg-green-100 text-green-800" 
              : "bg-purple-100 text-purple-800"
          }`}>
            {event.type === "upcoming" ? "Upcoming" : "Past"}
          </span>
          {event.createdBy && (
            <span className="text-gray-500 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {event.createdBy}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mb-4">
              Melody Mesh Events
            </h1>
            <p className="text-xl text-gray-700">Discover amazing music events and festivals</p>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <button className="px-6 py-3 rounded-full font-semibold bg-blue-500 text-white">All Events</button>
              <button className="px-6 py-3 rounded-full font-semibold text-gray-600">Upcoming</button>
              <button className="px-6 py-3 rounded-full font-semibold text-gray-600">Past Events</button>
            </div>
          </div>
          
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 mb-4">
            Melody Mesh Events
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover amazing music events and festivals. Join us for unforgettable experiences!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              All Events
              <span className="ml-2 bg-white/20 rounded-full px-2 py-1 text-xs">
                {events.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "upcoming"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              Upcoming Events
              <span className="ml-2 bg-white/20 rounded-full px-2 py-1 text-xs">
                {events.filter(e => e.type === "upcoming").length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "past"
                  ? "bg-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:text-purple-500"
              }`}
            >
              Past Events
              <span className="ml-2 bg-white/20 rounded-full px-2 py-1 text-xs">
                {events.filter(e => e.type === "past").length}
              </span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-2xl mx-auto mb-8 text-center">
            {error}
            <button 
              onClick={fetchEvents}
              className="ml-4 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🎸</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {activeTab === "all" ? "No Events Found" : 
               activeTab === "upcoming" ? "No Upcoming Events" : "No Past Events"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {activeTab === "all" ? "There are no events to display at the moment." : 
               activeTab === "upcoming" ? "We don't have any upcoming events scheduled at the moment. Check back soon for exciting announcements!" : 
               "We haven't hosted any events yet. Check back after our first event for memories and highlights!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Event Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{events.length}</div>
              <div className="text-lg font-semibold text-gray-700">Total Events</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{events.filter(e => e.type === "upcoming").length}</div>
              <div className="text-lg font-semibold text-gray-700">Upcoming Events</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{events.filter(e => e.type === "past").length}</div>
              <div className="text-lg font-semibold text-gray-700">Past Events</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;