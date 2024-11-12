// src/constants/storageRules.js

export const STORAGE_LIMITS = {
  current: {
    base: "0-0.5", // 30 minutes
    plans: {
      "No DP Plan": "0-0.5", // 30 minutes
      Starter: "0.5-10", // 10 hours
      Core: "10-50", // 50 hours
      Pro: "50+", // Unlimited
    },
  },
  new: {
    Core: "0-5", // 5 hours
    Plus: "5-50", // 50 hours
    Advanced: "50+", // Unlimited
  },
};

export const STORAGE_OPTIONS = {
  current: [
    { value: "0-0.5", label: "Up to 30 minutes" },
    { value: "0.5-10", label: "Up to 10 hours" },
    { value: "10-50", label: "Up to 50 hours" },
    { value: "50+", label: "Unlimited" },
  ],
  new: [
    { value: "0-5", label: "Up to 5 hours" },
    { value: "5-50", label: "5-50 hours" },
    { value: "50+", label: "Unlimited" },
  ],
};
