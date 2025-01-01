import { useState } from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-100 border-t border-gray-700">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 w-full gap-8">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-white uppercase">About Us</h2>
                        <ul className="text-gray-400 font-medium flex flex-wrap space-x-20">
                            <li className="hover:bg-gray-700 rounded transition duration-300">
                                <a href="#" className="block py-2 px-4 hover:text-blue-400">Our Mission</a>
                            </li>
                            <li className="hover:bg-gray-700 rounded transition duration-300">
                                <a href="#" className="block py-2 px-4 hover:text-blue-400">History</a>
                            </li>
                            <li className="hover:bg-gray-700 rounded transition duration-300">
                                <a href="#" className="block py-2 px-4 hover:text-blue-400">Team</a>
                            </li>
                            <li className="hover:bg-gray-700 rounded transition duration-300">
                                <a href="" className="block py-2 px-4 hover:text-blue-400">Contact Us</a>
                            </li>
                            <li className="hover:bg-gray-700 rounded transition duration-300">
                                <a href="https://www.youtube.com/@MyGovIndia" className="block py-2 px-4 hover:text-blue-400">Social Media</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mt-8">
                    <div className="text-center md:text-left">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Aayojna Setu. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
