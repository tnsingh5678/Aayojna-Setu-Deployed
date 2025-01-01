import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function TwitterTimelineEmbedExample() {
  return (
    <div>
      <h2>My Twitter Timeline</h2>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="narendramodi"  // Your Twitter handle
        options={{ height: 400 }}
      />
    </div>
  );
}

export default TwitterTimelineEmbedExample;
