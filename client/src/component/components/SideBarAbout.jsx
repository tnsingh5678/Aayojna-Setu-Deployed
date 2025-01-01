import { useState } from "react";
import About from "../../Pages/About";
import { Link } from "react-router-dom";

export default function SideBarAbout({ menuItems }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative min-h-screen flex">
    
      {toggle && (
        <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-700 to-indigo-900 text-white p-5 shadow-lg z-50 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Menu</h2>
            
            <button
              className="text-white hover:bg-blue-800 p-1 rounded-full"
              onClick={() => setToggle(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id} className="rounded-lg overflow-hidden hover:bg-blue-800">
                <Link
                  to={{
                    pathname: item.path,
                    state: { rawData: `Navigating to ${item.name}` },
                  }}
                  className="block px-4 py-2 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* {!toggle && (
        <div className="fixed top-4 left-4 z-50">
          <button
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => setToggle(true)}
          >
            <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={2}
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M4 6h16M4 12h16m-7 6h7"
  />
</svg>

          </button>
        </div>
      )} */}

      <div className={`flex-1 transition-all duration-300 ${toggle ? 'ml-64' : ''}`}>
        <About />
      </div>
    </div>
  );
}
