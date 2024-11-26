import React from "react";

export const PlanSelector = ({ planSet, setPlanSet }) => {
  const containerStyles = {
    marginBottom: "24px",
  };

  const sectionTitleStyles = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "16px",
  };

  const radioOptionStyles = {
    display: "block",
    padding: "16px",
    marginBottom: "8px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    cursor: "pointer",
  };

  const flexContainerStyles = {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  };

  const contentStyles = {
    flex: 1,
  };

  const titleStyles = {
    fontWeight: "600",
    fontSize: "16px",
    color: "#111827",
    marginBottom: "4px",
  };

  const descriptionStyles = {
    fontSize: "14px",
    color: "#6B7280",
  };

  return (
    <div style={containerStyles}>
      <h3 style={sectionTitleStyles}>Which plan options do you see?</h3>

      <label
        htmlFor="current"
        style={radioOptionStyles}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f9fafb")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#ffffff")
        }
      >
        <div style={flexContainerStyles}>
          <input
            type="radio"
            id="current"
            name="planSet"
            value="current"
            checked={planSet === "current"}
            onChange={(e) => setPlanSet(e.target.value)}
            style={{ marginTop: "4px" }}
          />
          <div style={contentStyles}>
            <div style={titleStyles}>Old Plans</div>
            <div style={descriptionStyles}>
              Basic Commerce, Advanced Commerce with Digital Products Plans
            </div>
          </div>
        </div>
      </label>

      <label
        htmlFor="new"
        style={radioOptionStyles}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#f9fafb")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#ffffff")
        }
      >
        <div style={flexContainerStyles}>
          <input
            type="radio"
            id="new"
            name="planSet"
            value="new"
            checked={planSet === "new"}
            onChange={(e) => setPlanSet(e.target.value)}
            style={{ marginTop: "4px" }}
          />
          <div style={contentStyles}>
            <div style={titleStyles}>Current Plans</div>
            <div style={descriptionStyles}>Core, Plus, Advanced</div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default PlanSelector;
