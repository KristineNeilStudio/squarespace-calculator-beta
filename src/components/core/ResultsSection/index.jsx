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
    gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
    gap: "24px",
    marginBottom: "24px",
  };

  const mainCardStyles = {
    gridColumn: "1",
    minWidth: 0,
  };

  const alternativeCardsStyles = {
    gridColumn: "2",
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

  return (
    <div ref={ref} style={containerStyles}>
      <div style={resultsLayoutStyles}>
        <div style={mainCardStyles}>
          <ResultCard result={mainResult} index={0} />
        </div>

        {alternativeResult && (
          <div style={alternativeCardsStyles}>
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
