import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    dob: "",
    email: "",
    phone: "",
    event: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Capitalize first letter of each word
  const capitalizeWords = (str) =>
    str.replace(/\b\w/g, (char) => char.toUpperCase());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "name" ? capitalizeWords(value) : value,
    });
  };

  const validate = () => {
    let newErrors = {};


    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!form.dob) {
      newErrors.dob = "Date of Birth is required";
    } else {
      const birthDate = new Date(form.dob);
      const today = new Date();
      birthDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const fourYearsAgo = new Date(today);
      fourYearsAgo.setFullYear(today.getFullYear() - 4);

      if (birthDate > today) {
        newErrors.dob = "Birth date cannot be in the future.";
      } else if (birthDate > fourYearsAgo) {
        newErrors.dob = "You must be at least 4 years old.";
      } else {
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age > 100) {
          newErrors.dob = "Age must be less than 100 years.";
        }
      }
    }

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Valid email is required";
    }

    if (!form.phone.match(/^\d{10,15}$/)) {
      newErrors.phone = "Phone must be 10–15 digits";
    }

    if (!form.event) {
      newErrors.event = "Please select an event";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await registerUser(form);
        // If backend returns error as 'error' property
        if (response.error) {
          setErrors({ api: response.error });
        } else if (response.success === false && response.message) {
          setErrors({ api: response.message });
        } else if (response._id || response.name) {
          setSubmitted(true);
          // After successful registration, redirect to login page
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setErrors({ api: "Registration failed." });
        }
      } catch (error) {
        setErrors({ api: error.response?.data?.error || error.response?.data?.message || "Server error. Please try again." });
      }
    }
  };

  // For date picker limits
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0]; // Prevent future
  const minDateObj = new Date();
  minDateObj.setFullYear(today.getFullYear() - 100); // 100 years back
  const minDate = minDateObj.toISOString().split("T")[0];

  return (
  <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] bg-blue-100 rounded-xl shadow-lg mt-8 overflow-hidden">
      
      {/* Side Image */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="https://www.yellowbrick.co/wp-content/uploads/2023/06/music_blog_-Music-industry-careers-1024x683.webp"
          alt="Festival"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500 mb-6 drop-shadow-lg text-center">
          Register for Melody Mesh
        </h2>

        {submitted ? (
          <div className="text-xl text-blue-700 font-semibold text-center">
            🎉 Thank you for registering, {form.name}! Redirecting to login...
          </div>
        ) : (
          <>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
              noValidate
            >
              {errors.api && (
                <p className="text-red-600 text-sm text-center">{errors.api}</p>
              )}
              {/* Name */}
              <div>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Full Name"
                  className="p-2 w-full rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Username"
                  className="p-2 w-full rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
                {errors.username && (
                  <p className="text-red-600 text-sm">{errors.username}</p>
                )}
              </div>

              {/* Birth Date */}
              <div>
                <label
                  htmlFor="dob"
                  className="block mb-1 font-semibold text-blue-700"
                >
                  Birth Date
                </label>
                <input
                  id="dob"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  type="date"
                  min={minDate}
                  max={maxDate}
                  className="p-2 w-full rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                {errors.dob && (
                  <p className="text-red-600 text-sm">{errors.dob}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Your Email"
                  className="p-2 w-full rounded border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Your Phone Number"
                  className="p-2 w-full rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone}</p>
                )}
              </div>


              {/* Event */}
              <div>
                <select
                  name="event"
                  value={form.event}
                  onChange={handleChange}
                  className="p-2 w-full rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                >
                  <option value="">Select Event</option>
                  <option value="Singing">Singing</option>
                  <option value="Dancing">Dancing</option>
                  <option value="Instrumental">Instrumental</option>
                  <option value="Organizing">Organizing</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Volunteering">Volunteering</option>
                </select>
                {errors.event && (
                  <p className="text-red-600 text-sm">{errors.event}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Create Password"
                  className="p-2 w-full rounded border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded font-bold hover:scale-105 transition-transform"
              >
                Register
              </button>
            </form>
            <div className="flex gap-4 mt-6 justify-center">
              <a href="/logout" className="bg-purple-500 text-white px-6 py-2 rounded font-bold hover:bg-purple-600 transition">Logout</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;