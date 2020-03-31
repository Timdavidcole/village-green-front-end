import React from "react";

const ExitButton = props => {
  return (
    <button
      className="exit-button"
      style={{
        outline: "none",
        border: "none",
        padding: "0",
        position: "absolute",
        top: "3px",
        right: "3px",
        pointerEvents: "all",
        zIndex: "019387490238745",
        cursor: "pointer"
      }}
      onClick={props.onClick}
    >
      <i className="exit-green-x"></i>
    </button>
  );
};

export default ExitButton;
