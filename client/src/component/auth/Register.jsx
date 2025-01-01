import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { Context } from "../../main";
import { Navigate, Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); 
  const navigate = useNavigate(); 

  const { setIsAuthorized, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        { name, phone, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setIsAuthorized(true);
      setUser(data.user);  
      setIsRegistered(true); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        navigate("/login"); 
      }, 500);

      return () => clearTimeout(timer); 
    }
  }, [isRegistered, navigate]);

  if (isRegistered) {
    return null; 
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex flex-col w-full md:w-1/2 text-white p-8 items-center justify-center bg-orange-400">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Aayojna Setu</h1>
        <p className="text-2xl text-center">
          Streamline and enhance the efficiency of our Aayojna Setu operations. Register now to get started!
        </p>
        <br />
        <Link to="/Login">
          <button className="bg-white text-orange-400 px-6 py-3 rounded-md mt-4 md:mt-0">
            Login
          </button>
        </Link>
      </div>

      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <h1 className="font-bold text-3xl mb-4">Register</h1>

        <form className="w-full max-w-md" onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="text"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
 