import React, { forwardRef } from "react";
import ResultCard from "./components/ResultCard";
import { RotateCcw } from "lucide-react";
import _ from "lodash";

const ResultsSection = forwardRef(({ feeResults, onReset }, ref) => {
  if (!feeResults) return null;

  const containerStyles = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const resultsLayoutStyles = {
    display: "grid",
    gridTemplateColumns: "1fr", // Default to a single column
    gap: "24px",
    marginBottom: "24px",
  };

  const mainCardStyles = {
    gridColumn: "1",
    minWidth: 0,
  };

  const alternativeCardsStyles = {
    gridColumn: "1", // Stack alternative cards below the main card
    minWidth: 0,
  };

  const startOverStyles = {
    width: "100%",
    textAlign: "center",
    padding: "12px",
    color: "#6b7280",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "color 0.2s ease",
  };

  // Group and consolidate fee results
  const groupedResults = _.groupBy(
    feeResults,
    (result) =>
      `${result.plan}-${result.dpPlan || "noDp"}-${result.monthlyCost}`
  );

  const consolidatedResults = Object.values(groupedResults)
    .map((group) => ({
      ...group[0],
      processors: group.map((r) => r.processor),
      isGrouped: group.length > 1,
    }))
    .slice(0, 2);

  const mainResult = consolidatedResults[0];
  const alternativeResult = consolidatedResults[1];

  // Add responsive behavior with a media query
  const responsiveStyles = `
    @media (min-width: 768px) {
      .results-layout {
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); /* Two-column layout on larger screens */
      }
      .alternative-cards {
        grid-column: 2; /* Place alternative cards in the second column */
      }
    }
  `;

  // Inject responsive styles into the document
  if (typeof document !== "undefined") {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = responsiveStyles;
    document.head.appendChild(styleTag);
  }

  return (
    <div ref={ref} style={containerStyles}>
      <div style={resultsLayoutStyles} className="results-layout">
        <div style={mainCardStyles}>
          <ResultCard result={mainResult} index={0} />
        </div>

        {alternativeResult && (
          <div style={alternativeCardsStyles} className="alternative-cards">
            <ResultCard result={alternativeResult} index={1} />
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        style={startOverStyles}
        onMouseEnter={(e) => {
          e.target.style.color = "#000";
          const icon = e.target.querySelector("svg");
          if (icon) icon.style.stroke = "#000";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#6b7280";
          const icon = e.target.querySelector("svg");
          if (icon) icon.style.stroke = "#6b7280";
        }}
      >
        Start Over
        <RotateCcw
          size={16}
          style={{ stroke: "#6b7280", transition: "stroke 0.2s ease" }}
        />
      </button>
    </div>
  );
});

export default ResultsSection;
