// src/components/core/VideoStorageCalculator.jsx
import React from "react";
import { Card, SectionTitle, Select } from "../ui/StyledComponents";
import { STORAGE_OPTIONS } from "../../constants/storageRules";

const VideoStorageCalculator = ({ planSet, storageValue, onStorageChange }) => {
  // Get appropriate storage options based on plan set
  const storageOptions = STORAGE_OPTIONS[planSet];

  const handleStorageChange = (e) => {
    // Pass the selected storage value to parent
    onStorageChange({
      storage: e.target.value,
    });
  };

  return (
    <Card>
      <SectionTitle>Video Storage Needs</SectionTitle>
      <Select
        value={storageValue}
        onChange={handleStorageChange}
        options={storageOptions}
        label="How much video content do you plan to host?"
      />
    </Card>
  );
};

export default VideoStorageCalculator;
