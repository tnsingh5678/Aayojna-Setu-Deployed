import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa'; // For the bell icon

const NotificationBar = ({ notifications = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Count unread notifications (assuming notifications have a 'read' field)
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Toggle the expanded/collapsed state
  const toggleExpand = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-4">
      {/* Notification Bell Icon */}
      <div 
        onClick={toggleExpand} 
        className="cursor-pointer flex items-center justify-center bg-yellow-500 text-white rounded-full p-4 hover:bg-yellow-600 transition-colors relative"
      >
        <FaBell size={24} />
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </div>
        )}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-4 bg-white shadow-lg p-4 rounded-lg border-t-4 border-yellow-500">
          <h4 className="text-xl font-semibold mb-2">All Notifications</h4>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications available.</p>
          ) : (
            <ul>
              {notifications.map((notification, index) => (
                <li 
                  key={index} 
                  className={`p-3 mb-3 rounded-lg border ${notification.read ? 'bg-gray-200' : 'bg-white'} transition-colors`}
                >
                  <strong className="text-sm font-medium">{notification.type}</strong>
                  <p className="text-sm text-gray-600">{notification.data}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
