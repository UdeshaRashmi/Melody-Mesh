import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [usersOpen, setUsersOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check user role from localStorage
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUsersOpen(false);
      setEventsOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDropdownClick = (e, dropdownSetter) => {
    e.stopPropagation();
    dropdownSetter(prev => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl sticky top-0 z-50 rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
            <span className="inline-block bg-white rounded-full p-2 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l-2 2m0 0l-2-2m2 2v11m6-11v11m0 0l2-2m0 0l2 2m-2-2V6" />
              </svg>
            </span>
            Melody Mesh
          </Link>
          {/* Mobile menu button */}
          <button className="lg:hidden text-white p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Desktop menu */}
          <div className="hidden lg:flex space-x-4 items-center">
            <Link to="/" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Home</Link>
            <Link to="/about" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/about' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>About</Link>
            <Link to="/contact" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/contact' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Contact</Link>
            
            {userRole ? (
              // Authenticated user menu
              <>
                <Link to="/dashboard" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/dashboard' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Dashboard</Link>
                {userRole === "admin" && (
                  <>
                    <Link to="/users/admin" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/users/admin' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Admin Panel</Link>
                    <div className="relative">
                      <button onClick={(e) => handleDropdownClick(e, setEventsOpen)} className="text-lg px-4 py-2 rounded-xl font-semibold text-white hover:bg-white hover:text-indigo-600 transition-colors duration-200 shadow-md">Admin Events ▼</button>
                      {eventsOpen && (
                        <div className="absolute top-full left-0 bg-white rounded-xl shadow-xl mt-2 min-w-[160px] z-10">
                          <Link to="/admin/events/upcoming" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded-xl" onClick={() => setEventsOpen(false)}>Upcoming</Link>
                          <Link to="/admin/events/past" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded-xl" onClick={() => setEventsOpen(false)}>Past Events</Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <Link to="/events/upcoming" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/events/upcoming' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Events</Link>
                <Link to="/volunteers" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/volunteers' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Volunteers</Link>
                <Link to="/logout" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/logout' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Logout</Link>
              </>
            ) : (
              // Unauthenticated user menu
              <>
                <div className="relative">
                  <button onClick={(e) => handleDropdownClick(e, setUsersOpen)} className="text-lg px-4 py-2 rounded-xl font-semibold text-white hover:bg-white hover:text-indigo-600 transition-colors duration-200 shadow-md">Users ▼</button>
                  {usersOpen && (
                    <div className="absolute top-full left-0 bg-white rounded-xl shadow-xl mt-2 min-w-[160px] z-10">
                      <Link to="/users/admin" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded-xl" onClick={() => setUsersOpen(false)}>Admin</Link>
                      <Link to="/users/registered" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded-xl" onClick={() => setUsersOpen(false)}>Registered</Link>
                      <Link to="/users/unregistered" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded-xl" onClick={() => setUsersOpen(false)}>Unregistered</Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button onClick={(e) => handleDropdownClick(e, setEventsOpen)} className="text-lg px-4 py-2 rounded-xl font-semibold text-white hover:bg-white hover:text-indigo-600 transition-colors duration-200 shadow-md">Events ▼</button>
                  {eventsOpen && (
                    <div className="absolute top-full left-0 bg-white rounded-xl shadow-xl mt-2 min-w-[160px] z-10">
                      <Link to="/events/past" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded-xl" onClick={() => setEventsOpen(false)}>Past Events</Link>
                      <Link to="/events/upcoming" className="block px-4 py-2 text-indigo-600 hover:bg-indigo-100 rounded-xl" onClick={() => setEventsOpen(false)}>Upcoming</Link>
                    </div>
                  )}
                </div>
                <Link to="/volunteers" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/volunteers' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Volunteers</Link>
                <Link to="/register" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/register' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Register</Link>
                <Link to="/login" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/login' ? 'bg-white text-indigo-600 shadow-lg' : 'text-white hover:bg-white hover:text-indigo-600'}`}>Login</Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col space-y-2 mt-2 bg-white rounded-2xl shadow-2xl p-4 animate-slide-down">
            <Link to="/" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/about' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/contact' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Contact</Link>
            
            {userRole ? (
              // Authenticated user mobile menu
              <>
                <Link to="/dashboard" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/dashboard' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                {userRole === "admin" && (
                  <>
                    <Link to="/users/admin" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/users/admin' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                    <Link to="/admin/events/upcoming" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/admin/events/upcoming' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Admin Upcoming</Link>
                    <Link to="/admin/events/past" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/admin/events/past' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Admin Past Events</Link>
                  </>
                )}
                <Link to="/events/upcoming" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/events/upcoming' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Events</Link>
                <Link to="/volunteers" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/volunteers' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Volunteers</Link>
                <Link to="/logout" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/logout' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Logout</Link>
              </>
            ) : (
              // Unauthenticated user mobile menu
              <>
                <Link to="/users/admin" className="text-lg px-4 py-2 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-100" onClick={() => setMenuOpen(false)}>Admin</Link>
                <Link to="/users/registered" className="text-lg px-4 py-2 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-100" onClick={() => setMenuOpen(false)}>Registered</Link>
                <Link to="/users/unregistered" className="text-lg px-4 py-2 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-100" onClick={() => setMenuOpen(false)}>Unregistered</Link>
                <Link to="/events/past" className="text-lg px-4 py-2 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-100" onClick={() => setMenuOpen(false)}>Past Events</Link>
                <Link to="/events/upcoming" className="text-lg px-4 py-2 rounded-xl font-semibold text-indigo-600 hover:bg-indigo-100" onClick={() => setMenuOpen(false)}>Upcoming</Link>
                <Link to="/volunteers" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/volunteers' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Volunteers</Link>
                <Link to="/register" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/register' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Register</Link>
                <Link to="/login" className={`text-lg px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${location.pathname === '/login' ? 'bg-indigo-100 text-indigo-700 shadow' : 'text-indigo-600 hover:bg-indigo-100'}`} onClick={() => setMenuOpen(false)}>Login</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;