import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SchemeForm from '../component/components/SchemeForm';
import SchemeList from '../component/components/SchemeList';
import NotificationBar from '../component/components/NotificationBar';
import { io } from "socket.io-client";

function NewScheme() {
  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sendnoti, setSendnoti] = useState();

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
    setCategories(["Education", "Health", "Welfare"]);

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

  const handleAddScheme = (newScheme) => {
    // Add the new scheme to the list locally
    setSchemes((prevSchemes) => [...prevSchemes, newScheme]);

    // Optionally, call the backend to add the scheme
    axios.post('http://localhost:5000/api/schemes/newscheme', newScheme)
      .then(response => {
        console.log("Scheme added successfully");
      })
      .catch(error => {
        console.error("Error adding scheme", error);
      });
  };

  return (
    <div className="App">
      <NotificationBar notifications={notifications} />
      <SchemeForm categories={categories} onAddScheme={handleAddScheme} />
      <SchemeList schemes={schemes} />
    </div>
  );
}

export default NewScheme;
