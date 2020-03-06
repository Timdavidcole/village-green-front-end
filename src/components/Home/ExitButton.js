import React from "react";

const ExitButton = props => {
  return (
    <button
      style={{
        outline: "none",
        backgroundColor: "none",
        border: "none",
        padding: "0"
      }}
      onClick={props.onClick}
    >
      <i className="exit-green-x"></i>
    </button>
  );
};

export default ExitButton;
