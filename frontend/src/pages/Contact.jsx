import { useState } from "react";
import api from "../services/api";

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  // Capitalize first letter of each word
  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setForm({ ...form, [name]: capitalizeWords(value) });
    } else if (name === "message") {
      setForm({ ...form, [name]: capitalizeWords(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Rough validations
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim() || form.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Ensure name and message are capitalized before saving
    const formattedForm = {
      ...form,
      name: capitalizeWords(form.name),
      message: capitalizeWords(form.message),
    };

    try {
      const response = await api.post("/contact", formattedForm);
      if (response.data.success) {
        setContacts([...contacts, formattedForm]);
        setForm({ name: "", email: "", message: "" });
      } else {
        setErrors({ api: response.data.message || "Failed to send message." });
      }
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "Server error. Please try again." });
    }
  };

  const handleEdit = (idx) => {
    setForm(contacts[idx]);
    setEditIndex(idx);
  };

  const handleDelete = (idx) => {
    setContacts(contacts.filter((_, i) => i !== idx));
    if (editIndex === idx) {
      setForm({ name: "", email: "", message: "" });
      setEditIndex(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Side Image */}
        <div className="md:w-1/2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/051/166/491/non_2x/communication-concept-with-email-message-box-and-contacts-icons-e-mail-marketing-customer-support-counseling-and-support-hotline-connection-with-modern-network-technology-contact-us-free-photo.jpg"
            alt="Contact Melody Mesh"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-4 drop-shadow-lg">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Have questions or feedback? Fill out the form below and our team will get back to you.
          </p>

          <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
            {errors.api && (
              <p className="text-red-600 text-sm text-center">{errors.api}</p>
            )}
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                rows={4}
                required
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform"
            >
              {editIndex !== null ? "Update Message" : "Send Message"}
            </button>
          </form>

          {/* Display Messages */}
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
              Contact Messages
            </h3>
            {contacts.length === 0 ? (
              <p className="text-gray-500">No messages yet.</p>
            ) : (
              <ul className="space-y-4">
                {contacts.map((c, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-lg text-purple-600">
                        {c.name}
                      </div>
                      <div className="text-gray-500">{c.email}</div>
                      <div className="mt-2 text-gray-700">{c.message}</div>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="px-3 py-1 rounded bg-indigo-500 text-white font-semibold hover:bg-indigo-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
