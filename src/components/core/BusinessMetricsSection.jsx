import React, { useState, useEffect } from "react";
import { Card, SectionTitle } from "../ui/StyledComponents";
import { colors } from "../../constants/colors";

const validationRules = {
  monthlyPhysical: {
    min: 0,
    max: 1000000,
    required: false,
    message: "Monthly revenue must be between $0 and $1,000,000",
  },
  avgPhysicalOrder: {
    min: 0.01,
    max: 100000,
    required: true,
    message: "Average order must be between $0.01 and $100,000",
    requiredMessage:
      "Average order value is required when monthly revenue is entered",
    relationalMessage: "Average order cannot be greater than monthly revenue",
  },
  monthlyDigital: {
    min: 0,
    max: 1000000,
    required: false,
    message: "Monthly revenue must be between $0 and $1,000,000",
  },
  avgDigitalOrder: {
    min: 0.01,
    max: 100000,
    required: true,
    message: "Average order must be between $0.01 and $100,000",
    requiredMessage:
      "Average order value is required when monthly revenue is entered",
    relationalMessage: "Average order cannot be greater than monthly revenue",
  },
};

const BusinessMetricsSection = ({ metrics, setMetrics, onReset }) => {
  const [sellsPhysical, setSellsPhysical] = useState(false);
  const [sellsDigital, setSellsDigital] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (
      !metrics.monthlyPhysical &&
      !metrics.monthlyDigital &&
      !metrics.avgPhysicalOrder &&
      !metrics.avgDigitalOrder
    ) {
      setSellsPhysical(false);
      setSellsDigital(false);
      setTouched({});
      setErrors({});
    }
  }, [metrics]);

  const validateField = (field, value, dependentValue = null) => {
    if (!validationRules[field]) return "";

    const rule = validationRules[field];
    const numValue = Number(value);

    if (field.startsWith("avg") && dependentValue > 0) {
      if (!value) {
        return rule.requiredMessage;
      }
    } else if (rule.required && dependentValue > 0 && !value) {
      return rule.requiredMessage;
    }

    if (value === "") return "";

    if (isNaN(numValue)) {
      return "Please enter a valid number";
    }

    if (numValue < rule.min || numValue > rule.max) {
      return rule.message;
    }

    if (field.startsWith("avg") && numValue > dependentValue) {
      return rule.relationalMessage;
    }

    return "";
  };

  useEffect(() => {
    const newErrors = {};

    if (sellsPhysical) {
      const monthlyPhysical = Number(metrics.monthlyPhysical);
      newErrors.monthlyPhysical = validateField(
        "monthlyPhysical",
        metrics.monthlyPhysical
      );
      newErrors.avgPhysicalOrder = validateField(
        "avgPhysicalOrder",
        metrics.avgPhysicalOrder,
        monthlyPhysical
      );
    }

    if (sellsDigital) {
      const monthlyDigital = Number(metrics.monthlyDigital);
      newErrors.monthlyDigital = validateField(
        "monthlyDigital",
        metrics.monthlyDigital
      );
      newErrors.avgDigitalOrder = validateField(
        "avgDigitalOrder",
        metrics.avgDigitalOrder,
        monthlyDigital
      );
    }

    setErrors(newErrors);
  }, [metrics, sellsPhysical, sellsDigital]);

  const handleMetricsChange = (field, value) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const formattedValue =
      value === "" ? "" : Number(parseFloat(value).toFixed(2));
    setMetrics((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const handleToggleChange = (type, checked) => {
    if (type === "physical") {
      setSellsPhysical(checked);
      if (!checked) {
        handleMetricsChange("monthlyPhysical", "");
        handleMetricsChange("avgPhysicalOrder", "");
        setTouched((prev) => ({
          ...prev,
          monthlyPhysical: false,
          avgPhysicalOrder: false,
        }));
      }
    } else {
      setSellsDigital(checked);
      if (!checked) {
        handleMetricsChange("monthlyDigital", "");
        handleMetricsChange("avgDigitalOrder", "");
        setTouched((prev) => ({
          ...prev,
          monthlyDigital: false,
          avgDigitalOrder: false,
        }));
      }
    }
  };

  const renderInputGroup = (type) => {
    const isPhysical = type === "physical";
    const prefix = isPhysical ? "Physical" : "Digital";
    const sells = isPhysical ? sellsPhysical : sellsDigital;
    const monthlyField = `monthly${prefix}`;
    const avgOrderField = `avg${prefix}Order`;

    if (!sells) return null;

    return (
      <div
        style={{
          marginTop: "16px",
          paddingLeft: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: colors.text.secondary,
              marginBottom: "4px",
            }}
          >
            Monthly Revenue ($)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={metrics[monthlyField]}
            onChange={(e) => handleMetricsChange(monthlyField, e.target.value)}
            onBlur={() =>
              setTouched((prev) => ({ ...prev, [monthlyField]: true }))
            }
            style={{
              width: "100%",
              padding: "8px 12px",
              border:
                touched[monthlyField] && errors[monthlyField]
                  ? `1px solid ${colors.accent.red}`
                  : `1px solid ${colors.ui.border}`,
              borderRadius: "6px",
              fontSize: "14px",
              transition: "all 0.2s",
              outline: "none",
            }}
            placeholder={`Enter monthly revenue from ${type} products`}
          />
          {touched[monthlyField] && errors[monthlyField] && (
            <p
              style={{
                fontSize: "12px",
                color: colors.accent.red,
                marginTop: "4px",
              }}
            >
              {errors[monthlyField]}
            </p>
          )}
        </div>

        {metrics[monthlyField] > 0 && (
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: colors.text.secondary,
                marginBottom: "4px",
              }}
            >
              Average Order Value ($)
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={metrics[avgOrderField]}
              onChange={(e) =>
                handleMetricsChange(avgOrderField, e.target.value)
              }
              onBlur={() =>
                setTouched((prev) => ({ ...prev, [avgOrderField]: true }))
              }
              style={{
                width: "100%",
                padding: "8px 12px",
                border:
                  (touched[avgOrderField] || metrics[monthlyField] > 0) &&
                  errors[avgOrderField]
                    ? `1px solid ${colors.accent.red}`
                    : `1px solid ${colors.ui.border}`,
                borderRadius: "6px",
                fontSize: "14px",
                transition: "all 0.2s",
                outline: "none",
              }}
              placeholder={`Enter average order value for ${type} products`}
            />
            {(touched[avgOrderField] || metrics[monthlyField] > 0) &&
              errors[avgOrderField] && (
                <p
                  style={{
                    fontSize: "12px",
                    color: colors.accent.red,
                    marginTop: "4px",
                  }}
                >
                  {errors[avgOrderField]}
                </p>
              )}
            <p
              style={{
                fontSize: "12px",
                color: colors.text.secondary,
                marginTop: "4px",
              }}
            >
              Minimum $0.01
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <SectionTitle>What You Sell & Business Metrics</SectionTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            backgroundColor: colors.ui.backgroundShade,
            borderRadius: "8px",
            padding: "16px",
            transition: "background-color 0.2s",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={sellsPhysical}
              onChange={(e) => handleToggleChange("physical", e.target.checked)}
              style={{
                marginTop: "4px",
                width: "16px",
                height: "16px",
                cursor: "pointer",
              }}
            />
            <div>
              <div style={{ fontWeight: "500", color: colors.text.primary }}>
                Physical Products
              </div>
              <div style={{ fontSize: "14px", color: colors.text.secondary }}>
                Do you sell physical products?
              </div>
            </div>
          </label>
          {renderInputGroup("physical")}
        </div>

        <div
          style={{
            backgroundColor: colors.ui.backgroundShade,
            borderRadius: "8px",
            padding: "16px",
            transition: "background-color 0.2s",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={sellsDigital}
              onChange={(e) => handleToggleChange("digital", e.target.checked)}
              style={{
                marginTop: "4px",
                width: "16px",
                height: "16px",
                cursor: "pointer",
              }}
            />
            <div>
              <div style={{ fontWeight: "500", color: colors.text.primary }}>
                Digital Products
              </div>
              <div style={{ fontSize: "14px", color: colors.text.secondary }}>
                Do you sell digital products?
              </div>
            </div>
          </label>
          {renderInputGroup("digital")}
        </div>
      </div>
    </Card>
  );
};

export default BusinessMetricsSection;
