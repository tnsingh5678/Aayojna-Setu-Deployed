import { useState, useEffect } from "react";
import axios from "axios";
import HomeNav from "../component/components/HomeNav";
import Footer from "../component/components/Footer";
import { Link } from "react-router-dom";
import { io } from "socket.io-client"; 
import NotificationBar from '../component/components/NotificationBar';

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true); // To track loading state
  const [notifications, setNotifications] = useState([]);

  const schemesPerPage = 5;

  useEffect(() => {
    // Fetch all schemes on component mount
    axios.get('http://localhost:5000/api/v1/schemes')
      .then(response => {
        setSchemes(response.data);
      })
      .catch(error => {
        console.error("Error fetching schemes", error);
      });

    // Fetch categories (you might need to set this based on your DB)
    //setCategories(["Education", "Health", "Welfare"]);

    // WebSocket listener for category-specific notifications
    const socket = io('http://localhost:5000', {
      withCredentials: true, // Ensure cookies are sent with the request
    });

    // Listen for category-specific notifications
    socket.on('category-notification', (data) => {
      console.log('Received category notification:', data);

      // Assuming 'data' is an object with a 'data' field that contains the actual notification
      if (data && data.data) {
        setNotifications(prevNotifications => {
          console.log('Previous notifications:', prevNotifications);
          console.log('New notification:', data.data);
          return [...prevNotifications, data];
        });
      } else {
        console.error('Unexpected notification format', data);
      }
    });

    // Cleanup socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Filter schemes based on search query and category selection
  const filteredSchemes = schemes.filter(
    (scheme) =>
      (scheme.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "" || scheme.categories.includes(selectedCategory))
  );

  // Pagination: Get the current slice of schemes to display
  const indexOfLastScheme = currentPage * schemesPerPage;
  const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
  const currentSchemes = filteredSchemes.slice(indexOfFirstScheme, indexOfLastScheme);

  // Toggle the expanded scheme to show full detail
  const toggleReadMore = (index) => {
    setExpandedScheme(expandedScheme === index ? null : index);
  };

  // Handle page change for pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredSchemes.length / schemesPerPage);

  // Loading state
  // if (loading) {
  //   return <div>Loading...</div>; // Show a loading message while fetching the data
  // }

  return (
    <>
      <NotificationBar notifications={notifications} />
      <div className="flex justify-between bg-sky-400">
        <div>
          <img src="./AS_L2.jpg" className="h-[150px] w-[150px] bg-blue-600 p-1" />
        </div>
        <div>
          <video
            src="./TECHNOLOGY.mp4"
            className="h-[150px] w-[150px] bg-blue-600 p-1 object-cover"
            autoPlay
            loop
            muted
          />
        </div>
      </div>

      <div className="flex h-auto justify-between bg-orange-400">
        <HomeNav />
      </div>

      <div>
        <h1 className="text-4xl text-center m-4">Schemes</h1>
        <a href="https://www.myscheme.gov.in/find-scheme" className="p-2 m-2 w-100px border bg-blue-600 rounded-lg">
          Know About All Schemes
        </a>
      </div>

      {/* Search Input */}
      <div className="flex justify-center p-4">
        <input
          type="text"
          placeholder="Search by scheme name or detail..."
          className="p-2 border border-gray-300 rounded-lg w-1/2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex justify-center p-4">
        <select
          className="p-2 border border-gray-300 rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {/* Add other categories here */}
          <option value="BPL">BPL</option>
          <option value="Below 10">Below 10 years</option>
          <option value="Student">Student</option>
          <option value="Working Professional">Working Professional</option>
          <option value="Vocational">Vocational</option>
          <option value="Disabled">Disabled</option>
          <option value="RTE">RTE</option>
          <option value="Minority">Minority</option>
          <option value="General">General</option>
          <option value="Schedule Caste">Schedule Caste</option>
          <option value="Schedule Tribe">Schedule Tribe</option>
          <option value="OBCs">OBCs</option>
          <option value="EWS">EWS</option>
          <option value="Women">Women</option>
          <option value="Research">Research</option>
          <option value="Ex-Servicemen">Ex-Servicemen</option>
        </select>
      </div>

      {/* Showing Filtered Results */}
      <div className="p-4 text-center">
        <p>{`${filteredSchemes.length} results found out of ${schemes.length} matches`}</p>
      </div>

      {/* Display Schemes */}
      <div className="p-4">
        {currentSchemes.map((scheme, index) => (
          <div
            key={index}
            className="mb-4 p-4 border bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg transition duration-300"
          >
            <a
              href={scheme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-semibold text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200"
            >
              {scheme.schemeName}
            </a>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{scheme.shortDescription}</p>
            {expandedScheme === index && (
              <p className="mt-2 text-gray-600 dark:text-gray-400">{scheme.fullDescription}</p>
            )}
            <button
              className="text-blue-500 mt-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition duration-200"
              onClick={() => toggleReadMore(index)}
            >
              {expandedScheme === index ? "Read Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {(() => {
          const maxButtons = 5;
          let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
          let endPage = Math.min(totalPages, startPage + maxButtons - 1);

          if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - (maxButtons - 1));
          }

          return Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              className={`mx-2 p-2 border border-gray-300 rounded-lg ${
                currentPage === startPage + index ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handlePageChange(startPage + index)}
            >
              {startPage + index}
            </button>
          ));
        })()}
      </div>

      <Footer />
    </>
  );
}
