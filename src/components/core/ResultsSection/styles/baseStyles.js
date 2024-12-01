// src/components/core/ResultsSection/styles/baseStyles.js
import { colors } from "../../../../constants/colors";

export const baseStyles = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  toggleContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "24px",
  },
  resultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  resultCard: {
    backgroundColor: colors.ui.white,
    borderRadius: "12px",
    padding: "24px",
    border: `1px solid ${colors.ui.border}`,
    position: "relative",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  bestValue: {
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: colors.accent.red,
    color: colors.ui.white,
    padding: "4px 12px",
    borderBottomLeftRadius: "8px",
    fontSize: "14px",
  },
  planTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  processor: {
    fontSize: "14px",
    color: colors.text.secondary,
    marginBottom: "16px",
  },
  priceContainer: {
    marginBottom: "16px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "600",
  },
  pricePeriod: {
    fontSize: "14px",
    color: colors.text.secondary,
  },
  savingsIndicator: {
    fontSize: "14px",
    color: colors.accent.red,
    marginTop: "4px",
  },
  breakdownContainer: {
    backgroundColor: colors.primary.lightest,
    margin: "24px -24px -24px -24px",
    padding: "16px 24px",
    borderTop: `1px solid ${colors.ui.border}`,
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  breakdownTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  breakdownItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: colors.text.secondary,
    marginBottom: "8px",
  },
  savingsBox: {
    backgroundColor: colors.accent.redLight,
    borderLeft: `4px solid ${colors.accent.red}`,
    padding: "16px",
    borderRadius: "0 8px 8px 0",
    marginBottom: "24px",
  },
  savingsTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: colors.accent.red,
    fontWeight: "600",
    marginBottom: "8px",
  },
  savingsText: {
    fontSize: "14px",
    color: colors.accent.red,
  },
  notesContainer: {
    backgroundColor: colors.primary.lightest,
    borderRadius: "8px",
    padding: "16px",
    marginTop: "24px",
  },
  notesList: {
    margin: 0,
    padding: "0 0 0 20px",
    fontSize: "14px",
    color: colors.text.secondary,
  },
  startOver: {
    width: "100%",
    textAlign: "center",
    padding: "12px",
    color: colors.text.secondary,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "24px",
  },
};

// Add responsive media query styles for mobile
const mobileStyles = `
@media (max-width: 768px) {
  .results-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .result-card {
    width: 100%;
  }
}

/* Prevent overflow and scrolling on mobile */
body {
  overflow-x: hidden;
}
`;

// Inject the responsive styles into the document head
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = mobileStyles;
  document.head.appendChild(styleTag);
}
