import React from "react";

const NavigationBar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end", // Align items to the right
        padding: "10px 20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #e5e7eb", // Optional: subtle border to match app styling
      }}
    >
      <a
        href="https://kristineneil.com"
        style={{
          textDecoration: "none",
          color: "#007BFF",
          fontSize: "16px",
          fontWeight: "500",
          padding: "8px 16px",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0", // Add a border to match your app buttons
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
      >
        Back to Main Site
      </a>
    </nav>
  );
};

export default NavigationBar;
