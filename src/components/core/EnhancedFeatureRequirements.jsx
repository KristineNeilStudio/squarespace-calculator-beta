// src/components/core/EnhancedFeatureRequirements.jsx

import React from "react";
import { Card, SectionTitle, CheckboxOption } from "../ui/StyledComponents";
import { COMMERCE_FEATURES } from "../../constants/featureRequirements";

const EnhancedFeatureRequirements = ({ features, setFeatures, planSet }) => {
  // Only show for current plans
  if (planSet !== "current") {
    return null;
  }

  const handleFeatureChange = (featureId, checked) => {
    setFeatures((prev) => ({
      ...prev,
      [featureId]: checked,
    }));
  };

  // Combine basic and advanced features for display
  const allFeatures = [
    ...COMMERCE_FEATURES.basic,
    ...COMMERCE_FEATURES.advanced,
  ];

  return (
    <Card>
      <SectionTitle>Optional eCommerce Features</SectionTitle>
      <div
        style={{
          display: "grid",
          gap: "8px",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {allFeatures.map((feature) => (
          <CheckboxOption
            key={feature.id}
            id={feature.id}
            checked={features[feature.id] || false}
            onChange={(e) => handleFeatureChange(feature.id, e.target.checked)}
            title={feature.label}
            description={feature.description}
          />
        ))}
      </div>
    </Card>
  );
};

export default EnhancedFeatureRequirements;
