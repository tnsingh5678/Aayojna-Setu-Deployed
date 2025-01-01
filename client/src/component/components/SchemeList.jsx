import React from 'react';

const SchemeList = ({ schemes }) => {
  return (
    <div>
      <h2>All Schemes</h2>
      <ul>
        {schemes.map((scheme) => (
          <li key={scheme._id}>
            <h3>{scheme.schemeName}</h3>
            <p>{scheme.shortDescription}</p>
            <a href={scheme.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemeList;
