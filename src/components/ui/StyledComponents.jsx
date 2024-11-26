import React from "react";

const containerStyles = {
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

const sectionTitleStyles = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "16px",
};

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
  <h3 style={sectionTitleStyles}>{children}</h3>
);

export const RadioOption = ({
  id,
  value,
  checked,
  onChange,
  title,
  description,
}) => (
  <label
    htmlFor={id}
    style={containerStyles}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
  >
    <div style={flexContainerStyles}>
      <input
        type="radio"
        id={id}
        name="planSet"
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ marginTop: "4px" }}
      />
      <div style={contentStyles}>
        <div style={titleStyles}>{title}</div>
        <div style={descriptionStyles}>{description}</div>
      </div>
    </div>
  </label>
);

export const CheckboxOption = ({
  id,
  checked,
  onChange,
  title,
  description,
}) => (
  <label
    htmlFor={id}
    style={containerStyles}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
  >
    <div style={flexContainerStyles}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        style={{ marginTop: "4px" }}
      />
      <div style={contentStyles}>
        <div style={titleStyles}>{title}</div>
        <div style={descriptionStyles}>{description}</div>
      </div>
    </div>
  </label>
);

export const Select = ({ label, value, onChange, options, className = "" }) => (
  <div className={className}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "500",
          marginBottom: "4px",
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

export { containerStyles, titleStyles, descriptionStyles, sectionTitleStyles };
