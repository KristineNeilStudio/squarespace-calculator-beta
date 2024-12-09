interface PlanPricing {
  monthly: number;
  annual: number;
  digitalFee?: number;
}

interface PlanPricingStructure {
  current: {
    [key: string]: PlanPricing;
  };
  new: {
    [key: string]: PlanPricing;
  };
}

export const PLAN_PRICING: PlanPricingStructure = {
  current: {
    "Basic Commerce": {
      monthly: 40,
      annual: 28,
      digitalFee: 0,
    },
    "Advanced Commerce": {
      monthly: 72,
      annual: 52,
      digitalFee: 0,
    },
  },
  new: {
    Core: {
      monthly: 36,
      annual: 23,
      digitalFee: 0.05,
    },
    Plus: {
      monthly: 56,
      annual: 39,
      digitalFee: 0.01,
    },
    Advanced: {
      monthly: 139,
      annual: 99,
      digitalFee: 0,
    },
  },
};
