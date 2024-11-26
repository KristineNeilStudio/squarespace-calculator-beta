import React from "react";

const NavigationBar = () => {
  const navStyles = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "10px 24px",
    backgroundColor: "white",
    borderBottom: "0px solid #e5e7eb",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const linkStyles = {
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    color: "#374151",
    backgroundColor: "#f3f4f6",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const hoverEffect = (e) => {
    e.target.style.backgroundColor = "#e5e7eb";
    e.target.style.borderColor = "#d1d5db";
  };

  const resetStyle = (e) => {
    e.target.style.backgroundColor = "#f3f4f6";
    e.target.style.borderColor = "#e5e7eb";
  };

  return (
    <nav style={navStyles}>
      <a
        href="https://sqsfeecalculator-feedback.paperform.co/"
        style={linkStyles}
        onMouseEnter={hoverEffect}
        onMouseLeave={resetStyle}
        target="_blank"
        rel="noopener noreferrer"
      >
        Provide Feedback
      </a>
      <a
        href="https://resources.kristineneil.com/squarespace-fee-calculator"
        style={linkStyles}
        onMouseEnter={hoverEffect}
        onMouseLeave={resetStyle}
      >
        Return to Main Site
      </a>
    </nav>
  );
};

export default NavigationBar;
