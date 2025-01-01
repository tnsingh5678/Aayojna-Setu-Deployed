import { useState } from "react";
import HomeNav from "../component/components/HomeNav";
import Footer from "../component/components/Footer";


export default function Contacts() {

  const contacts = [
    { name: "Amit Sharma", image: "https://randomuser.me/api/portraits/men/1.jpg", phone: "+91 98765 43210", location: "Shimla, Himachal Pradesh" },
    { name: "Rajesh Kumar", image: "https://randomuser.me/api/portraits/men/2.jpg", phone: "+91 87654 32109", location: "Kangra, Himachal Pradesh" },
    { name: "Vikram Singh", image: "https://randomuser.me/api/portraits/men/3.jpg", phone: "+91 76543 21098", location: "Mandi, Himachal Pradesh" },
    { name: "Suresh Thakur", image: "https://randomuser.me/api/portraits/men/4.jpg", phone: "+91 65432 10987", location: "Kullu, Himachal Pradesh" },
    { name: "Deepak Verma", image: "https://randomuser.me/api/portraits/men/5.jpg", phone: "+91 54321 09876", location: "Solan, Himachal Pradesh" },
    { name: "Manoj Rana", image: "https://randomuser.me/api/portraits/men/6.jpg", phone: "+91 43210 98765", location: "Chamba, Himachal Pradesh" },
    { name: "Sanjeev Mehta", image: "https://randomuser.me/api/portraits/men/7.jpg", phone: "+91 32109 87654", location: "Bilaspur, Himachal Pradesh" },
    { name: "Ravi Chauhan", image: "https://randomuser.me/api/portraits/men/8.jpg", phone: "+91 21098 76543", location: "Hamirpur, Himachal Pradesh" },
    { name: "Karan Negi", image: "https://randomuser.me/api/portraits/men/9.jpg", phone: "+91 10987 65432", location: "Una, Himachal Pradesh" }
    // Add more contact objects as needed
  ];

  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  // Calculate which contacts to show based on the current page
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  return (
    <>
      {/* <div className="flex justify-between w-[150px] h-[150px] items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-600">
        <img src="./AS_L2.jpg"></img>
      </div> */}
      <div className="flex justify-between bg-sky-400">
      <div>
      <img src="./AS_L2.jpg" className="h-[150px] w-[150px] bg-blue-600 p-1"></img>
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
        <div className="justify">
      {/* <img src="./AS_L2.jpg" className="h-[100px] w-[100px] bg-blue-600 p-1"></img> */}
      </div>
        <HomeNav />
      </div>

      <div>
        <h1 className="text-5xl text-center m-6 text-gray-800 font-bold">Contacts</h1>
      </div>

      <div className="flex justify-center">
        <table className="table-auto border-collapse border border-gray-200 w-[90%] shadow-xl">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-200 p-4 text-lg">Name</th>
              <th className="border border-gray-200 p-4 text-lg">Image</th>
              <th className="border border-gray-200 p-4 text-lg">Phone Number</th>
              <th className="border border-gray-200 p-4 text-lg">Office Location</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100 transition-all duration-200">
                <td className="border border-gray-200 p-4 text-center text-gray-700">{contact.name}</td>
                <td className="border border-gray-200 p-4 text-center">
                  <img
                    src={contact.image}
                    alt={contact.name}
                    className="w-[100px] h-[100px] rounded-full object-cover mx-auto shadow-md"
                  />
                </td>
                <td className="border border-gray-200 p-4 text-center text-gray-700">{contact.phone}</td>
                <td className="border border-gray-200 p-4 text-center text-gray-700">{contact.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-l-lg disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number + 1)}
            className={`px-4 py-2 ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} border border-blue-600 mx-1 rounded-lg`}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="mt-8">
        <Footer />
      </div>
    </>
  );
}
