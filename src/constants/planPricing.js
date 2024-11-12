// src/constants/planPricing.js

export const PLAN_PRICING = {
  current: {
    "Basic Commerce": {
      monthly: 40,
      annual: 28,
      dpPlans: [
        { name: "No DP Plan", fee: 0.09, monthlyCost: 0, annualCost: 0 },
        { name: "Starter", fee: 0.07, monthlyCost: 12, annualCost: 9 },
        { name: "Core", fee: 0.03, monthlyCost: 37, annualCost: 29 },
        { name: "Pro", fee: 0, monthlyCost: 111, annualCost: 89 },
      ],
    },
    "Advanced Commerce": {
      monthly: 72,
      annual: 52,
      dpPlans: [
        { name: "No DP Plan", fee: 0.09, monthlyCost: 0, annualCost: 0 },
        { name: "Starter", fee: 0.07, monthlyCost: 12, annualCost: 9 },
        { name: "Core", fee: 0.03, monthlyCost: 37, annualCost: 29 },
        { name: "Pro", fee: 0, monthlyCost: 111, annualCost: 89 },
      ],
    },
  },
  new: {
    Core: {
      monthly: 36,
      annual: 23,
      processingRates: { squarespace: 0.029, stripe: 0.029, paypal: 0.0349 },
      digitalFee: 0.05,
    },
    Plus: {
      monthly: 56,
      annual: 39,
      processingRates: { squarespace: 0.027, stripe: 0.029, paypal: 0.0349 },
      digitalFee: 0.01,
    },
    Advanced: {
      monthly: 139,
      annual: 99,
      processingRates: { squarespace: 0.025, stripe: 0.029, paypal: 0.0349 },
      digitalFee: 0,
    },
  },
};

export const PROCESSOR_FEES = {
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

export const DP_PLAN_RANKS = {
  "No DP Plan": 0,
  Starter: 1,
  Core: 2,
  Pro: 3,
};

export const DEFAULT_PROCESSORS = ["Squarespace Payments", "Stripe", "PayPal"];
