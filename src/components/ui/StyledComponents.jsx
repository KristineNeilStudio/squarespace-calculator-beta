import React from "react";

export const Card = ({ children, className = "" }) => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      border: "1px solid #e5e7eb",
      marginBottom: "24px",
    }}
    className={className}
  >
    {children}
  </div>
);

export const SectionTitle = ({ children }) => (
  <h3
    style={{
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#111827",
    }}
  >
    {children}
  </h3>
);

export const RadioOption = ({
  id,
  value,
  checked,
  onChange,
  title,
  description,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const containerStyles = {
    display: "block",
    padding: "16px",
    marginBottom: "8px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: isHovered ? "#f9fafb" : "#ffffff",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  return (
    <label
      htmlFor={id}
      style={containerStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <input
          type="radio"
          id={id}
          name="planSet"
          value={value}
          checked={checked}
          onChange={onChange}
          style={{ marginTop: "4px" }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: "600",
              fontSize: "16px",
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#6B7280",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </label>
  );
};

export const CheckboxOption = ({
  id,
  checked,
  onChange,
  title,
  description,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const containerStyles = {
    display: "block",
    padding: "16px",
    marginBottom: "8px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: isHovered ? "#f9fafb" : "#ffffff",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  return (
    <label
      htmlFor={id}
      style={containerStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          style={{ marginTop: "4px" }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: "600",
              fontSize: "16px",
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#6B7280",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </label>
  );
};

export const Select = ({ label, value, onChange, options, className = "" }) => (
  <div className={className}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "4px",
          color: "#374151",
        }}
      >
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #e5e7eb",
        backgroundColor: "white",
        fontSize: "14px",
        color: "#374151",
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const PlanSelector = ({ planSet, setPlanSet }) => (
  <div style={{ marginBottom: "24px" }}>
    <SectionTitle>Which plan options do you see?</SectionTitle>

    <RadioOption
      id="current"
      value="current"
      checked={planSet === "current"}
      onChange={(e) => setPlanSet(e.target.value)}
      title="Current Plans"
      description="Personal, Business, Commerce Basic, Commerce Advanced"
    />

    <RadioOption
      id="new"
      value="new"
      checked={planSet === "new"}
      onChange={(e) => setPlanSet(e.target.value)}
      title="New Plans"
      description="Basic, Core, Plus, Advanced"
    />
  </div>
);
