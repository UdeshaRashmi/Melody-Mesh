import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEvents } from "../services/api"; // Import the API service

function PastEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch past events from the backend
    fetchPastEvents();
  }, []);

  const fetchPastEvents = async () => {
    try {
      setLoading(true);
      const allEvents = await getEvents();
      // Filter for past events
      const pastEvents = allEvents.filter(event => event.type === "past");
      setEvents(pastEvents);
    } catch (error) {
      console.error("Failed to fetch past events:", error);
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

  const addOrUpdateEvent = () => {
    if (!title.trim() || (!image.trim() && !uploadedImage) || !date.trim() || !location.trim()) {
      alert('Please fill in all required fields and add an image');
      return;
    }

    // In a real application, you would upload the image to a server here
    // For now, we'll use the preview URL or the provided image URL
    const finalImage = uploadedImage ? imagePreview : image;

    if (editingId) {
      setEvents((prev) =>
        prev.map((e) =>
          e._id === editingId ? { 
            ...e, 
            title, 
            image: finalImage, 
            date, 
            location, 
            attendees: attendees || e.attendees, 
            description: description || e.description 
          } : e
        )
      );
      setEditingId(null);
    } else {
      setEvents((prev) => [
        ...prev,
        { 
          _id: Date.now(), 
          title, 
          image: finalImage, 
          date, 
          location, 
          attendees: attendees || "N/A", 
          description: description || "No description available." 
        },
      ]);
    }

    resetForm();
    setIsFormOpen(false);
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

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e._id !== id));
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-purple-700 font-medium">Loading past events...</p>
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

      {/* Add/Edit Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl shadow-2xl p-8 mb-12 max-w-4xl mx-auto border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {editingId ? "Edit Event" : "Create New Event"}
            </h3>
            
            {/* Image Upload Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Event Photo {!editingId && "*"}
              </label>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Image Preview */}
                {(imagePreview || image) && (
                  <div className="relative">
                    <img
                      src={imagePreview || image}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-2xl shadow-md border"
                    />
                    <button
                      type="button"
                      onClick={removeUploadedImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {/* Upload Area */}
                <div 
                  onClick={triggerFileInput}
                  className="flex-1 border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-gray-600 font-medium mb-2">
                    {imagePreview ? "Change Photo" : "Upload Event Photo"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Click to browse or drag and drop
                    <br />
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
              
              {/* Or use URL */}
              <div className="mt-4">
                <p className="text-gray-500 text-sm mb-2">Or enter image URL:</p>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-3 rounded-xl w-full shadow-sm outline-none transition-all"
                />
              </div>
            </div>
            
            {/* Event Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-4 rounded-xl w-full shadow-sm outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="text"
                  placeholder="e.g., June 15, 2024"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-4 rounded-xl w-full shadow-sm outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Miami Beach, FL"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-4 rounded-xl w-full shadow-sm outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Attendees
                </label>
                <input
                  type="text"
                  placeholder="e.g., 25,000+"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-4 rounded-xl w-full shadow-sm outline-none transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Description
              </label>
              <textarea
                placeholder="Describe the event, highlights, performances, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent p-4 rounded-xl w-full shadow-sm outline-none transition-all mb-6"
              />
            </div>
            
            <div className="flex gap-4 justify-end">
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addOrUpdateEvent}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                {editingId ? "Update Event" : "Create Event"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Cards */}
      <AnimatePresence>
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-gray-500 text-xl">
              No past events yet. Create your first event above! 🎉
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {events.map((event) => (
              <motion.div
                key={event._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-4xl">📸</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Past Event
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📅</span>
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">📍</span>
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="mr-2">👥</span>
                      <span className="text-sm">{event.attendees} attendees</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex justify-between gap-3">
                    <button
                      onClick={() => editEvent(event)}
                      className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>✏️</span>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="flex-1 bg-red-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>🗑️</span>
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto shadow-lg">
          <h4 className="text-2xl font-bold text-gray-800 mb-6">Event Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600">{events.length}</div>
              <div className="text-gray-600">Total Events</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">48K+</div>
              <div className="text-gray-600">Total Attendees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">15+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">2020</div>
              <div className="text-gray-600">Since</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PastEvents;