// src/components/ui/CalculatorButton.jsx

import React from "react";

const CalculatorButton = ({ onClick, disabled = false }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    cursor: disabled ? "not-allowed" : "pointer",
    width: "100%",
    maxWidth: "320px",
    margin: "24px auto",
    border: "none",
    background: disabled
      ? "rgb(229, 231, 235)"
      : "linear-gradient(to right, rgb(23, 23, 23), rgb(0, 0, 0))",
    color: disabled ? "rgb(107, 114, 128)" : "white",
    boxShadow: disabled
      ? "none"
      : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  };

  const hoverStyles =
    !disabled && isHovered
      ? {
          background:
            "linear-gradient(to right, rgb(0, 0, 0), rgb(17, 17, 17))",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transform: "translateY(-1px)",
        }
      : {};

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyles, ...hoverStyles }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      aria-label="Calculate fees"
    >
      Find Plans & Calculate Fees
    </button>
  );
};

export default CalculatorButton;
