import React from 'react';
import { TwitterFollowButton } from 'react-twitter-embed';

function TwitterFollowButton() {
  return (
    <div>
      <h2>Follow Me on Twitter</h2>
      <TwitterFollowButton
        screenName="narendramodi"  // Your Twitter handle
      />
    </div>
  );
}

export default TwitterFollowButton;
