import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getPastAdminEvents, addEvent, updateEvent, deleteEvent } from "../services/api";

function AdminPastEvents() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
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
      const data = await getPastAdminEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setUploadedImage(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImage(previewUrl); // Also set the image URL for form submission
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addOrUpdateEvent = async () => {
    if (!title.trim() || (!image.trim() && !uploadedImage) || !date.trim() || !location.trim()) {
      alert('Please fill in all required fields and add an image');
      return;
    }

    try {
      // In a real application, you would upload the image to a server here
      // For now, we'll use the preview URL or the provided image URL
      const finalImage = uploadedImage ? imagePreview : image;

      if (editingId) {
        // Update existing event
        await updateEvent(editingId, { 
          title, 
          image: finalImage, 
          date, 
          location, 
          attendees: attendees || "N/A", 
          description: description || "No description available.",
          type: "past"
        });
        setEditingId(null);
      } else {
        // Add new event
        await addEvent({ 
          title, 
          image: finalImage, 
          date, 
          location, 
          attendees: attendees || "N/A", 
          description: description || "No description available.",
          type: "past",
          createdBy: "melodyadmin"
        });
      }

      resetForm();
      setIsFormOpen(false);
      fetchEvents(); // Refresh events list
    } catch (err) {
      alert("Failed to save event.");
    }
  };

  const editEvent = (event) => {
    setTitle(event.title);
    setImage(event.image);
    setDate(event.date);
    setLocation(event.location);
    setAttendees(event.attendees);
    setDescription(event.description);
    setEditingId(event._id);
    setImagePreview(event.image);
    setUploadedImage(null);
    setIsFormOpen(true);
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

  const resetForm = () => {
    setTitle("");
    setImage("");
    setDate("");
    setLocation("");
    setAttendees("");
    setDescription("");
    setEditingId(null);
    setUploadedImage(null);
    setImagePreview("");
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const cancelEdit = () => {
    resetForm();
    setIsFormOpen(false);
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setImagePreview("");
    setImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          Past Events Gallery
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Relive the magic of our unforgettable music festivals. Upload photos and share your memories.
        </p>
      </motion.div>

      {/* Add Event Button */}
      {isAdmin && (
        <div className="text-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
          >
            <span className="text-xl">📸</span>
            Add New Event with Photo
          </motion.button>
        </div>
      )}

      {/* Add/Edit Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  {editingId ? "Edit Past Event" : "Add New Past Event"}
                </h3>
                
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter event location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                    <input
                      type="text"
                      value={attendees}
                      onChange={(e) => setAttendees(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Number of attendees (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Event description (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Image *</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Image URL"
                      />
                      <span className="text-gray-500">OR</span>
                      <button
                        onClick={triggerFileInput}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        Upload
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    
                    {imagePreview && (
                      <div className="mt-3 relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          onClick={removeUploadedImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={cancelEdit}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addOrUpdateEvent}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    {editingId ? "Update Event" : "Add Event"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-gray-500 text-lg italic">No past events yet. ✨</p>
          {isAdmin && (
            <p className="text-gray-600 mt-2">Add your first event using the button above!</p>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gradient-to-r from-blue-200 to-purple-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-xs font-medium text-blue-700 px-2 py-1 rounded-full">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{event.location}</p>
                <p className="text-blue-600 text-sm mb-3">{event.attendees} attendees</p>
                <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>

                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => editEvent(event)}
                      className="flex-1 flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPastEvents;