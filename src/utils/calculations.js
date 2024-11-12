// src/utils/calculations.js
export const calculateProcessingFees = (
  monthlyPhysical,
  monthlyDigital,
  physicalTransactions,
  digitalTransactions,
  processorName,
  planName,
  planSet
) => {
  const processors = {
    "Squarespace Payments": {
      transactionFee: 0.3,
      getRate: (planName, isNewPlan) => {
        if (isNewPlan) {
          switch (planName) {
            case "Plus":
              return 0.027;
            case "Advanced":
              return 0.025;
            default:
              return 0.029;
          }
        }
        return 0.029;
      },
    },
    Stripe: {
      transactionFee: 0.3,
      getRate: () => 0.029,
    },
    PayPal: {
      transactionFee: 0.49,
      getRate: () => 0.0349,
    },
  };

  const processor = processors[processorName];
  const processingRate = processor.getRate(planName, planSet === "new");
  const totalVolume = monthlyPhysical + monthlyDigital;
  const totalTransactions = physicalTransactions + digitalTransactions;

  const ratePortion = Number((totalVolume * processingRate).toFixed(2));
  const transactionPortion = Number(
    (totalTransactions * processor.transactionFee).toFixed(2)
  );

  return Number((ratePortion + transactionPortion).toFixed(2));
};
