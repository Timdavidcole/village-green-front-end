import React from 'react';

const Banner = ({ appName }) => {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          {appName.toLowerCase()}
        </h1>
        <p>The local noticeboard for anywhere, anyone, and anything.</p>
      </div>
    </div>
  );
};

export default Banner;