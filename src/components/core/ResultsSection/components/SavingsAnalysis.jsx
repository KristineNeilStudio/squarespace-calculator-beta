// src/components/core/ResultsSection/components/SavingsAnalysis.jsx
import React from "react";
import { TrendingUp } from "lucide-react";
import { baseStyles } from "../styles/baseStyles";

const SavingsAnalysis = ({
  planSavings,
  annualBillingSavings,
  totalSavings,
}) => {
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div style={baseStyles.savingsBox}>
      <div style={baseStyles.savingsTitle}>
        <TrendingUp size={20} />
        Savings Analysis
      </div>
      {/* ... rest of your component */}
    </div>
  );
};

export default SavingsAnalysis;
