import React from "react";

const AnnouncementBar = ({ message }) => {
  return (
    <div
      style={{
        backgroundColor: "#fef3c7", // Soft yellow background
        color: "#92400e", // Deep orange text
        padding: "12px 16px",
        textAlign: "center",
        position: "relative", // Bar stays static at the top
        zIndex: 1000, // Ensure it stays above other elements
        fontSize: "14px",
        fontWeight: "500",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', // Match app fonts
        display: "flex",
        justifyContent: "center", // Center-align the content
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px", // Add space below the bar
      }}
    >
      <span>{message}</span>
    </div>
  );
};

export default AnnouncementBar;
