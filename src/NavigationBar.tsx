import React from "react";

const NavigationBar = () => {
  const buttonStyles = {
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    padding: "8px 16px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  };

  const mainSiteButtonStyles = {
    ...buttonStyles,
    color: "black",
    backgroundColor: "#ffffff",
    marginLeft: "12px",
  };

  const feedbackButtonStyles = {
    ...buttonStyles,
    color: "#059669",
    backgroundColor: "#f0fdf4",
    border: "1px solid #059669",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 20px",
        backgroundColor: "white",
        borderBottom: "0px solid #e5e7eb",
      }}
    >
      
        href="https://sqsfeecalculator-feedback.paperform.co/"
        target="_blank"
        rel="noopener noreferrer"
        style={feedbackButtonStyles}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#ecfdf5";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#f0fdf4";
          e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
        }}
      >
        Provide Feedback
      </a>
      
        href="https://resources.kristineneil.com/squarespace-fee-calculator"
        style={mainSiteButtonStyles}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#f9fafb";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
        }}
      >
        Return to Main Site
      </a>
    </nav>
  );
};

export default NavigationBar;