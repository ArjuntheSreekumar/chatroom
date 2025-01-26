// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <>
      <div className="font-extrabold text-3xl text-red-500 border-2 border-black">
        Test
      </div>
      <nav>
        <ul className="flex space-x-4 text-lg font-bold">
          <li>
            <Link to="/" className="hover:text-blue-500">Home</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-blue-500">About Us</Link>
          </li>
          <li>
            <Link to="/team" className="hover:text-blue-500">Team</Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-blue-500">Events</Link> {/* Add the Events Link */}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
