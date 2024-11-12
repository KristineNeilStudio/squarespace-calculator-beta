import React from "react";

const NavigationBar = () => {
  return (
    <nav
      style={{
        padding: "10px",
        backgroundColor: "#F9FAFB",
      }}
    >
      <a
        href="https://kristineneil.com"
        style={{
          marginRight: "20px",
          textDecoration: "none",
          color: "black",
        }}
      >
        Back to Main Site
      </a>
    </nav>
  );
};

export default NavigationBar;
