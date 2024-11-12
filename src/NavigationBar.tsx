import React from "react";

const NavigationBar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#f8f9fa" }}>
      <a
        href="https://kristineneil.com"
        style={{
          marginRight: "20px",
          textDecoration: "none",
          color: "#007BFF",
        }}
      >
        Back to Main Site
      </a>
    </nav>
  );
};

export default NavigationBar;
