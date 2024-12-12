// types/fees.ts
export interface ProcessingFeeParams {
  monthlyPhysical: number;
  monthlyDigital: number;
  avgPhysicalOrder: number;
  avgDigitalOrder: number;
  planName: string;
  planSet: "current" | "new";
}

export interface DigitalProductsPlan {
  name: string;
  monthly: number;
  annual: number;
  platformFee: number;
}

export interface FeeCalculation {
  processorName: string;
  processingFees: number;
  digitalPlatformFees: number;
  dpPlanFee: number;
  dpPlanName: string;
}

export interface FeeBreakdown {
  monthlySubscription: number;
  annualSubscription: number;
  monthlyDpPlan?: number;
  annualDpPlan?: number;
  processingFees: number;
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
