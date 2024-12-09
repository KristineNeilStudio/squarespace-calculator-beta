interface ProcessorFees {
  [key: string]: {
    transactionFee: number;
    getRate: (planName: string, isNewPlan: boolean) => number;
  };
}

const PROCESSOR_FEES: ProcessorFees = {
  "Squarespace Payments": {
    transactionFee: 0.3,
    getRate: (planName: string, isNewPlan: boolean) => {
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

export const calculateProcessingFees = (
  monthlyPhysical: number,
  monthlyDigital: number,
  physicalTransactions: number,
  digitalTransactions: number,
  processorName: string,
  planName: string,
  planSet: "current" | "new"
): number => {
  const processor = PROCESSOR_FEES[processorName];
  if (!processor) return 0;

  const processingRate = processor.getRate(planName, planSet === "new");
  const totalVolume = monthlyPhysical + monthlyDigital;
  const totalTransactions = physicalTransactions + digitalTransactions;

  const ratePortion = Number((totalVolume * processingRate).toFixed(2));
  const transactionPortion = Number(
    (totalTransactions * processor.transactionFee).toFixed(2)
  );

  return Number((ratePortion + transactionPortion).toFixed(2));
};
