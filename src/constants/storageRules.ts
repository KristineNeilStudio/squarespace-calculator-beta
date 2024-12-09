interface StorageOption {
  value: string;
  label: string;
}

interface StorageLimits {
  current: {
    base: string;
    plans: {
      [key: string]: string;
    };
  };
  new: {
    [key: string]: string;
  };
}

interface StorageOptions {
  current: StorageOption[];
  new: StorageOption[];
}

export const STORAGE_LIMITS: StorageLimits = {
  current: {
    base: "none", // 30 minutes
    plans: {
      "No DP Plan": "none", // 30 minutes
      Starter: "0.5-10", // 10 hours
      Core: "10-50", // 50 hours
      Pro: "50+", // Unlimited
    },
  },
  new: {
    Core: "none", // 5 hours
    Plus: "5-50", // 50 hours
    Advanced: "50+", // Unlimited
  },
};

export const STORAGE_OPTIONS: StorageOptions = {
  current: [
    { value: "none", label: "None (Up to 30 minutes included)" },
    { value: "0.5-10", label: "Up to 10 hours" },
    { value: "10-50", label: "Up to 50 hours" },
    { value: "50+", label: "Unlimited" },
  ],
  new: [
    { value: "none", label: "None (Up to 5 hours included)" },
    { value: "5-50", label: "5-50 hours" },
    { value: "50+", label: "Unlimited" },
  ],
};
