import React from 'react';

function TweetEmbed() {
  return (
    <div>
      <h2>Latest Tweet</h2>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">Just setting up my twttr</p>&mdash; jack (@jack) 
        <a href="https://x.com/narendramodi?t=CXBme09KZdahQfvG9u39hA&s=09">March 21, 2006</a>
      </blockquote>
      <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
  );
}

export default TweetEmbed;
