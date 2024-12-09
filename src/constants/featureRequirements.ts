// src/constants/featureRequirements.ts

interface Feature {
  id: string;
  label: string;
  description: string;
  minPlan: string;
  processorRestrictions?: string[];
}

interface CommerceFeatures {
  basic: Feature[];
  advanced: Feature[];
}

export const COMMERCE_FEATURES: CommerceFeatures = {
  basic: [
    {
      id: "needsPOS",
      label: "Point of Sale (POS)",
      description: "Sell in-person with Square POS integration",
      minPlan: "Basic Commerce",
    },
    {
      id: "needsProductReviews",
      label: "Product Reviews",
      description: "Allow customers to leave product reviews",
      minPlan: "Basic Commerce",
    },
    {
      id: "needsAdvancedMerchandising",
      label: "Advanced Merchandising",
      description: "Enhanced product presentation tools",
      minPlan: "Basic Commerce",
    },
    {
      id: "needsLimitedAvailability",
      label: "Limited Availability Labels",
      description: "Show stock levels and urgency indicators",
      minPlan: "Basic Commerce",
    },
  ],
  advanced: [
    {
      id: "needsAbandonedCart",
      label: "Abandoned Cart Recovery",
      description: "Automatically follow up on abandoned carts",
      minPlan: "Advanced Commerce",
    },
    {
      id: "needsSubscriptions",
      label: "Subscription Products",
      description: "Sell products on a recurring basis",
      minPlan: "Advanced Commerce",
      processorRestrictions: ["PayPal"],
    },
    {
      id: "needsAdvancedShipping",
      label: "Advanced Shipping Rules",
      description: "Complex shipping rates and rules",
      minPlan: "Advanced Commerce",
    },
    {
      id: "needsAdvancedDiscounts",
      label: "Advanced Discounts",
      description: "Complex discount rules and promotions",
      minPlan: "Advanced Commerce",
    },
    {
      id: "needsCommerceAPI",
      label: "Commerce API Access",
      description: "Programmatic access to commerce functionality",
      minPlan: "Advanced Commerce",
    },
  ],
};
