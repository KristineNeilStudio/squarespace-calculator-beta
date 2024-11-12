// src/components/core/ResultsSection/components/PricingToggle.jsx
import React from "react";
import { baseStyles } from "../styles/baseStyles";

const PricingToggle = ({ viewMode, setViewMode }) => {
  const buttonStyles = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: isActive ? "#000" : "#fff",
    color: isActive ? "#fff" : "#000",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  });

  return (
    <div style={baseStyles.toggleContainer}>
      <button
        onClick={() => setViewMode("monthly")}
        style={buttonStyles(viewMode === "monthly")}
        aria-pressed={viewMode === "monthly"}
      >
        Monthly Pricing
      </button>
      <button
        onClick={() => setViewMode("annual")}
        style={buttonStyles(viewMode === "annual")}
        aria-pressed={viewMode === "annual"}
      >
        Annual Pricing
      </button>
    </div>
  );
};

export default PricingToggle;
