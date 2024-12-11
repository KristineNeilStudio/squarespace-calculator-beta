// src/utils/planEligibility.ts

import { STORAGE_LIMITS } from "../constants/storageRules";
// Define Features interface here to avoid circular dependencies
export interface Features {
  needsSubscriptions: boolean;
  needsAbandonedCart: boolean;
  needsAdvancedShipping: boolean;
  sellsDigitalProducts: boolean;
  needsPOS: boolean;
  needsProductReviews: boolean;
  needsAdvancedMerchandising: boolean;
  needsLimitedAvailability: boolean;
  needsAdvancedDiscounts: boolean;
  needsCommerceAPI: boolean;
}

export interface PlanEligibilityParams {
  planSet: "current" | "new";
  features: Features;
  storageValue: string;
  monthlyPhysical: number;
  monthlyDigital: number;
}

export interface EligiblePlanResult {
  eligiblePlans: string[];
  requiredFeatures: string[];
  storageRequirement: string;
}

export function determineEligiblePlans({
  planSet,
  features,
  storageValue,
  monthlyPhysical,
  monthlyDigital,
}: PlanEligibilityParams): EligiblePlanResult {
  const requiredFeatures: string[] = [];
  let minimumPlanLevel: "basic" | "advanced" | null = null;

  // Only check features for "current" (old) plans
  if (planSet === "current") {
    // Check Tier 1 Features (require Advanced Commerce)
    const tier1Features = [
      { key: "needsSubscriptions", label: "Subscription Products" },
      { key: "needsAbandonedCart", label: "Abandoned Cart Recovery" },
      { key: "needsAdvancedShipping", label: "Advanced Shipping Rules" },
      { key: "needsAdvancedDiscounts", label: "Advanced Discounts" },
      { key: "needsCommerceAPI", label: "Commerce API Access" },
    ];

    const tier2Features = [
      { key: "needsPOS", label: "Point of Sale" },
      { key: "needsProductReviews", label: "Product Reviews" },
      { key: "needsAdvancedMerchandising", label: "Advanced Merchandising" },
      { key: "needsLimitedAvailability", label: "Limited Availability Labels" },
    ];

    // Check if any Tier 1 features are enabled
    const hasAdvancedFeature = tier1Features.some(
      ({ key }) => features[key as keyof Features]
    );
    if (hasAdvancedFeature) {
      minimumPlanLevel = "advanced";
      tier1Features.forEach(({ key, label }) => {
        if (features[key as keyof Features]) {
          requiredFeatures.push(label);
        }
      });
    }

    // Check if any Tier 2 features are enabled (only if not already requiring advanced)
    if (!minimumPlanLevel) {
      const hasBasicFeature = tier2Features.some(
        ({ key }) => features[key as keyof Features]
      );
      if (hasBasicFeature) {
        minimumPlanLevel = "basic";
        tier2Features.forEach(({ key, label }) => {
          if (features[key as keyof Features]) {
            requiredFeatures.push(label);
          }
        });
      }
    }
  }

  // Determine eligible plans based on storage requirements and plan set
  let eligiblePlans: string[];
  if (planSet === "current") {
    eligiblePlans =
      minimumPlanLevel === "advanced"
        ? ["Advanced Commerce"]
        : minimumPlanLevel === "basic"
        ? ["Basic Commerce", "Advanced Commerce"]
        : ["Basic Commerce", "Advanced Commerce"];
  } else {
    // Handle new plan storage requirements
    const storageLimits = STORAGE_LIMITS.new;
    if (storageValue === "50+") {
      eligiblePlans = ["Advanced"];
    } else if (storageValue === "5-50") {
      eligiblePlans = ["Plus", "Advanced"];
    } else {
      eligiblePlans = ["Core", "Plus", "Advanced"];
    }
  }

  // Return eligible plans and the reasons why
  return {
    eligiblePlans,
    requiredFeatures,
    storageRequirement: storageValue,
  };
}
