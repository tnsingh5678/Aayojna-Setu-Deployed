import React from 'react';

function VideoLink() {
  return (
    <div>
      <h2>My Favorite Video</h2>
      <a 
        href="https://youtu.be/3Q2UNjFsmio?si=a_4-_Jovq9vq-UQN" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Watch this video on YouTube
      </a>
    </div>
  );
}

export default VideoLink;
