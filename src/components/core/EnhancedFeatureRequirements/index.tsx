// src/components/core/EnhancedFeatureRequirements/index.tsx
import { COMMERCE_FEATURES } from "../../../constants/featureRequirements";

// Types
interface Feature {
  id: string;
  label: string;
  description: string;
  minPlan: string;
  processorRestrictions?: string[];
}

interface Features {
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

interface EnhancedFeatureRequirementsProps {
  features: Features;
  setFeatures: (features: Features) => void;
  planSet: "current" | "new";
}

// Sub-components
const CheckboxOption: React.FC<{
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  description: string;
}> = ({ id, checked, onChange, title, description }) => (
  <label
    htmlFor={id}
    className="block p-4 mb-2 border border-ui-border rounded-lg bg-white hover:bg-ui-backgroundShade transition-colors duration-200 cursor-pointer"
  >
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 text-accent-red border-ui-border rounded focus:ring-accent-red"
      />
      <div className="flex-1">
        <div className="font-semibold text-base text-primary-darkest mb-1">
          {title}
        </div>
        <div className="text-sm text-primary-medium">{description}</div>
      </div>
    </div>
  </label>
);

// Main component
const EnhancedFeatureRequirements: React.FC<
  EnhancedFeatureRequirementsProps
> = ({ features, setFeatures, planSet }) => {
  console.log("EnhancedFeatureRequirements rendered with planSet:", planSet);

  // Only show for current plans
  if (planSet !== "current") {
    console.log("Not showing features because planSet is not current");
    return null;
  }

  const handleFeatureChange = (featureId: keyof Features, checked: boolean) => {
    console.log("Feature changed:", featureId, checked);
    setFeatures({
      ...features,
      [featureId]: checked,
    });
  };

  // Combine basic and advanced features for display
  const allFeatures = [
    ...COMMERCE_FEATURES.basic,
    ...COMMERCE_FEATURES.advanced,
  ];

  console.log("Rendering features section with features:", features);

  return (
    <div className="bg-white rounded-lg p-6 border border-ui-border mb-6">
      <h3 className="text-lg font-semibold mb-4 text-primary-darkest">
        Optional eCommerce Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {allFeatures.map((feature: Feature) => (
          <CheckboxOption
            key={feature.id}
            id={feature.id}
            checked={features[feature.id as keyof Features] || false}
            onChange={(e) =>
              handleFeatureChange(
                feature.id as keyof Features,
                e.target.checked
              )
            }
            title={feature.label}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedFeatureRequirements;
