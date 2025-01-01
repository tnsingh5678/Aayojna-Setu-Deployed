import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function TwitterEmbedExample() {
  return (
    <div style={{ width: '100%', maxWidth: '300px', overflow: 'hidden' }}>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="narendramodi"  // Your Twitter handle
        options={{ height: 400 }}
      />
    </div>
  );
}

export default TwitterEmbedExample;
