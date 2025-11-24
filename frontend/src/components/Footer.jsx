
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-center md:text-left">© {new Date().getFullYear()} Melody Mesh. All rights reserved.</p>
        <div className="flex gap-4 text-2xl">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-indigo-200 transition-colors duration-200"><FaTwitter /></a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-200 transition-colors duration-200"><FaInstagram /></a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-300 transition-colors duration-200"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
