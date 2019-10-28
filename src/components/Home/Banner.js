import React from 'react';

const Banner = ({ appName }) => {
  return (
    <div className="banner" style={{padding:"0px"}}>
      <div className="container">
        <h1 className="logo-font">
          {appName.toLowerCase()}
        </h1>
        <p>the local noticeboard for anywhere, anything, and anyone</p>
      </div>
    </div>
  );
};

export default Banner;