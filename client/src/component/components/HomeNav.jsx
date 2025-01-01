import React from 'react';
import { Link } from 'react-router-dom';

function HomeNav() {
  const titles = [
    { value: "HOME" },
    { value: "ABOUT" },
    { value: "SCHEMES" },
    { value: "CONTACTS" },
    { value: "APPLICATION" }
  ];

  return (
    <nav className="bg-gradient-to-r p-4">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-6">
          {titles.map((title, index) => (
            <li key={index}>
              <Link 
                to={`/${title.value.toLowerCase()}`} 
                className="inline-block bg-blue-600 text-white text-lg font-semibold px-5 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {title.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default HomeNav;
