// src/components/core/ResultsSection/styles/baseStyles.js

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
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Creates flexible grid
    gap: "16px", // Space between cards
    marginBottom: "24px",
  },
  resultCard: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    border: "1px solid #e5e7eb",
    position: "relative",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  bestValue: {
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: "#059669",
    color: "white",
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
    color: "#6b7280",
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
    color: "#6b7280",
  },
  savingsIndicator: {
    fontSize: "14px",
    color: "#059669",
    marginTop: "4px",
  },
  breakdownContainer: {
    backgroundColor: "#f9fafb",
    margin: "24px -24px -24px -24px",
    padding: "16px 24px",
    borderTop: "1px solid #e5e7eb",
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
    color: "#6b7280",
    marginBottom: "8px",
  },
  savingsBox: {
    backgroundColor: "#ecfdf5",
    borderLeft: "4px solid #059669",
    padding: "16px",
    borderRadius: "0 8px 8px 0",
    marginBottom: "24px",
  },
  savingsTitle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#047857",
    fontWeight: "600",
    marginBottom: "8px",
  },
  savingsText: {
    fontSize: "14px",
    color: "#065f46",
  },
  notesContainer: {
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    padding: "16px",
    marginTop: "24px",
  },
  notesList: {
    margin: 0,
    padding: "0 0 0 20px",
    fontSize: "14px",
    color: "#6b7280",
  },
  startOver: {
    width: "100%",
    textAlign: "center",
    padding: "12px",
    color: "#6b7280",
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
    flex-direction: column; /* Stack cards vertically on mobile */
    gap: 16px; /* Space between stacked cards */
  }
  .result-card {
    width: 100%; /* Ensure full width on mobile */
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
