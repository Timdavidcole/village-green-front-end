import React from "react";

const ExitButton = props => {
  return (
    <button
      style={{
        outline: "none",
        backgroundColor: "none",
        border: "none",
        padding: "0",
        position: "absolute",
        top: "5px",
        right: "5px"
      }}
      onClick={props.onClick}
    >
      <i className="exit-green-x"></i>
    </button>
  );
};

export default ExitButton;
