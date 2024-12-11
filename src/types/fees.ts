// src/types/fees.ts

export interface FeeCalculation {
  processorName: string; // Adding this to match what we're using
  processingFees: number;
  digitalPlatformFees: number;
  dpPlanFee: number;
}

export interface FeeBreakdown {
  monthlySubscription: number;
  annualSubscription: number;
  monthlyDpPlan?: number;
  annualDpPlan?: number;
  processingFees: number;
  physicalPlatformFee?: number;
  digitalPlatformFee: number;
}

export interface FeeResult {
  plan: string;
  dpPlan?: string;
  processor: string;
  processors?: string[];
  isGrouped?: boolean;
  monthlyCost: number;
  annualCost: number;
  breakdown: FeeBreakdown;
}
