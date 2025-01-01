import React, { useState } from 'react';

function ApplicationForm() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <>
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
    <div className="flex flex-col items-center p-6 bg-orange-400 min-h-screen">
      <div className="w-full max-w-lg bg-gray-400 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-black mb-6">Application Submission</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="type" className="block text-black font-medium">Application Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select...</option>
              <option value="birth-certificate">Birth Certificate</option>
              <option value="death-certificate">Death Certificate</option>
              <option value="passport">Passport</option>
              <option value="caste-certificate">Caste Certificate</option>
              <option value="pension">Pension</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-black font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-black font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-black font-medium">Mobile Number</label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="details" className="block text-black font-medium">Additional Details</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
            />
          </div>
          
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default ApplicationForm;
