import React from "react";
import { colors } from "../../constants/colors";

const NavigationBar = () => {
  const navStyles = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "10px 24px",
    backgroundColor: colors.ui.white,
    borderBottom: `0px solid ${colors.ui.border}`,
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
    color: colors.text.secondary,
    backgroundColor: colors.ui.backgroundShade,
    border: `1px solid ${colors.ui.border}`,
    transition: "all 0.2s ease",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const hoverEffect = (e) => {
    e.target.style.backgroundColor = colors.primary.light;
    e.target.style.borderColor = colors.ui.border;
  };

  const resetStyle = (e) => {
    e.target.style.backgroundColor = colors.ui.backgroundShade;
    e.target.style.borderColor = colors.ui.border;
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
