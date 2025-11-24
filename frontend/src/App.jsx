import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LearnMore from "./pages/LearnMore";

import Logout from "./pages/Logout";
import Admin from "./pages/Users/Admin";
import AdminDashboard from "./pages/Users/AdminDashboard";
import RegisteredUser from "./pages/Users/RegisteredUser";
import RegisteredDashboard from "./pages/Users/RegisteredDashboard";
import UnregisteredUser from "./pages/Users/UnregisteredUser";
import PastEvents from "./pages/PastEvents";
import UpcomingEvents from "./pages/UpcomingEvents";
import AdminPastEvents from "./pages/AdminPastEvents";
import AdminUpcomingEvents from "./pages/AdminUpcomingEvents";
import Volunteers from "./pages/Volunteers";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/logout" element={<Logout />} />

            {/* Users */}
            <Route 
              path="/users/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/users/admin/dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/users/registered" element={<RegisteredUser />} />
            <Route path="/users/registered/dashboard" element={<RegisteredDashboard />} />
            <Route path="/users/unregistered" element={<UnregisteredUser />} />

            {/* Events */}
            <Route path="/events/past" element={<PastEvents />} />
            <Route path="/events/upcoming" element={<UpcomingEvents />} />
            <Route 
              path="/admin/events/past" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPastEvents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/events/upcoming" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUpcomingEvents />
                </ProtectedRoute>
              } 
            />

            {/* Volunteers */}
            <Route path="/volunteers" element={<Volunteers />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;