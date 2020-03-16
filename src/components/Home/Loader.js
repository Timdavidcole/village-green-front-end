import React from "react";
import "../../styles/loader.css";

const Loader = props => {
  return (
    <div>
      <div className="loader"></div>
      <div className="loader-text">
        <span style={{position: "relative", top: "40%"}}>loading...</span>
      </div>
    </div>
  );
};

export default Loader;
