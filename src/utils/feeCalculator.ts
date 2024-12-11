// src/utils/feeCalculator.ts

import type {
  ProcessingFeeParams,
  FeeCalculation,
  DigitalProductsPlan,
} from "../types/fees";

export const DIGITAL_PRODUCTS_PLANS: Record<string, DigitalProductsPlan> = {
  "No DP Plan": {
    name: "No DP Plan",
    monthly: 0,
    annual: 0,
    platformFee: 0,
  },
  Starter: {
    name: "Starter",
    monthly: 12,
    annual: 10,
    platformFee: 0.09,
  },
  Core: {
    name: "Core",
    monthly: 37,
    annual: 32,
    platformFee: 0.07,
  },
  Pro: {
    name: "Pro",
    monthly: 111,
    annual: 99,
    platformFee: 0.03,
  },
};

const PROCESSOR_FEES = {
  "Squarespace Payments": {
    transactionFee: 0.3,
    getRate: (planName: string, isNewPlan: boolean): number => {
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
    getRate: (): number => 0.029,
  },
  PayPal: {
    transactionFee: 0.49,
    getRate: (): number => 0.0349,
  },
};

function calculateProcessingFees(
  monthlyPhysical: number,
  monthlyDigital: number,
  avgPhysicalOrder: number,
  avgDigitalOrder: number,
  processorName: string,
  planName: string,
  planSet: "current" | "new"
): number {
  const processor = PROCESSOR_FEES[processorName];
  if (!processor) return 0;

  const processingRate = processor.getRate(planName, planSet === "new");

  // Calculate number of transactions
  const physicalTransactions =
    monthlyPhysical > 0
      ? Math.ceil(monthlyPhysical / Math.max(avgPhysicalOrder, 0.01))
      : 0;
  const digitalTransactions =
    monthlyDigital > 0
      ? Math.ceil(monthlyDigital / Math.max(avgDigitalOrder, 0.01))
      : 0;

  const totalVolume = monthlyPhysical + monthlyDigital;
  const totalTransactions = physicalTransactions + digitalTransactions;

  const ratePortion = Number((totalVolume * processingRate).toFixed(2));
  const transactionPortion = Number(
    (totalTransactions * processor.transactionFee).toFixed(2)
  );

  return Number((ratePortion + transactionPortion).toFixed(2));
}

export function getAllPossibleFeeCalculations(
  params: ProcessingFeeParams
): FeeCalculation[] {
  const processors = ["Squarespace Payments", "Stripe", "PayPal"];
  const results: FeeCalculation[] = [];

  // For old/current plans with digital revenue, calculate for each DP plan
  if (params.planSet === "current" && params.monthlyDigital > 0) {
    for (const processor of processors) {
      for (const [dpPlanName, dpPlan] of Object.entries(
        DIGITAL_PRODUCTS_PLANS
      )) {
        const processingFees = calculateProcessingFees(
          params.monthlyPhysical,
          params.monthlyDigital,
          params.avgPhysicalOrder,
          params.avgDigitalOrder,
          processor,
          params.planName,
          params.planSet
        );

        const digitalPlatformFees = Number(
          (params.monthlyDigital * dpPlan.platformFee).toFixed(2)
        );

        results.push({
          processorName: processor,
          processingFees,
          digitalPlatformFees,
          dpPlanFee: dpPlan.monthly,
          dpPlanName,
        });
      }
    }
  } else {
    // For new plans or no digital revenue, just calculate for each processor
    for (const processor of processors) {
      const processingFees = calculateProcessingFees(
        params.monthlyPhysical,
        params.monthlyDigital,
        params.avgPhysicalOrder,
        params.avgDigitalOrder,
        processor,
        params.planName,
        params.planSet
      );

      results.push({
        processorName: processor,
        processingFees,
        digitalPlatformFees: 0,
        dpPlanFee: 0,
        dpPlanName: "No DP Plan",
      });
    }
  }

  return results;
}
