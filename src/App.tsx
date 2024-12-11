import { useState, useRef } from "react";
import { groupBy } from "lodash";
import NavigationBar from "./components/ui/NavigationBar";
import AnnouncementBar from "./components/ui/AnnouncementBar";
import CalculatorContainer from "./components/ui/CalculatorContainer";
import VideoStorageCalculator from "./components/core/VideoStorageCalculator";
import PlanSelector from "./components/ui/PlanSelector";
import EnhancedFeatureRequirements from "./components/core/EnhancedFeatureRequirements";
import BusinessMetricsSection from "./components/core/BusinessMetricsSection";
import ResultsSection from "./components/core/ResultsSection";
import { determineEligiblePlans } from "./utils/planEligibility";
import { getAllPossibleFeeCalculations } from "./utils/feeCalculator";
import { PLAN_PRICING } from "./constants/planPricing";
import type { Metrics } from "./components/core/BusinessMetricsSection";
import type { FeeResult, FeeCalculation } from "./types/fees";
import Footer from "./components/ui/Footer";

// Types
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

function App() {
  // State management
  const [planSet, setPlanSet] = useState<"current" | "new">("new");
  const [storageValue, setStorageValue] = useState("none");
  const [features, setFeatures] = useState<Features>({
    needsSubscriptions: false,
    needsAbandonedCart: false,
    needsAdvancedShipping: false,
    sellsDigitalProducts: false,
    needsPOS: false,
    needsProductReviews: false,
    needsAdvancedMerchandising: false,
    needsLimitedAvailability: false,
    needsAdvancedDiscounts: false,
    needsCommerceAPI: false,
  });

  const [metrics, setMetrics] = useState<Metrics>({
    monthlyPhysical: "",
    avgPhysicalOrder: "",
    monthlyDigital: "",
    avgDigitalOrder: "",
  });

  const [feeResults, setFeeResults] = useState<FeeResult[] | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Input validation helper
  const validateMetrics = (): { isValid: boolean; message?: string } => {
    const monthlyPhysical = Number(metrics.monthlyPhysical);
    const monthlyDigital = Number(metrics.monthlyDigital);
    const avgPhysicalOrder = Number(metrics.avgPhysicalOrder);
    const avgDigitalOrder = Number(metrics.avgDigitalOrder);

    if (!monthlyPhysical && !monthlyDigital) {
      return {
        isValid: false,
        message: "Please enter either physical or digital revenue",
      };
    }

    if (monthlyPhysical > 0 && (!avgPhysicalOrder || avgPhysicalOrder <= 0)) {
      return {
        isValid: false,
        message: "Please enter a valid average physical order value",
      };
    }

    if (monthlyDigital > 0 && (!avgDigitalOrder || avgDigitalOrder <= 0)) {
      return {
        isValid: false,
        message: "Please enter a valid average digital order value",
      };
    }

    if (monthlyPhysical > 1000000 || monthlyDigital > 1000000) {
      return {
        isValid: false,
        message: "Monthly revenue cannot exceed $1,000,000",
      };
    }

    return { isValid: true };
  };

  // Reset handler
  const handleReset = () => {
    setPlanSet("new");
    setStorageValue("none");
    setFeatures({
      needsSubscriptions: false,
      needsAbandonedCart: false,
      needsAdvancedShipping: false,
      sellsDigitalProducts: false,
      needsPOS: false,
      needsProductReviews: false,
      needsAdvancedMerchandising: false,
      needsLimitedAvailability: false,
      needsAdvancedDiscounts: false,
      needsCommerceAPI: false,
    });
    setMetrics({
      monthlyPhysical: "",
      avgPhysicalOrder: "",
      monthlyDigital: "",
      avgDigitalOrder: "",
    });
    setFeeResults(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Main calculation handler
  const calculateFees = () => {
    const validation = validateMetrics();
    if (!validation.isValid) {
      console.error(validation.message);
      return;
    }

    try {
      // 1. Determine eligible plans based on features and storage
      const eligibilityResult = determineEligiblePlans({
        planSet,
        features,
        storageValue,
        monthlyPhysical: Number(metrics.monthlyPhysical) || 0,
        monthlyDigital: Number(metrics.monthlyDigital) || 0,
      });

      // Early exit if no eligible plans
      if (eligibilityResult.eligiblePlans.length === 0) {
        console.error("No eligible plans found for the given requirements");
        return;
      }

      const monthlyPhysical = Number(metrics.monthlyPhysical) || 0;
      const monthlyDigital = Number(metrics.monthlyDigital) || 0;
      const avgPhysicalOrder = Number(metrics.avgPhysicalOrder) || 0.01;
      const avgDigitalOrder = Number(metrics.avgDigitalOrder) || 0.01;

      // 2. Calculate all possible combinations for eligible plans
      const results: FeeResult[] = [];

      for (const planName of eligibilityResult.eligiblePlans) {
        const pricing =
          planSet === "current"
            ? PLAN_PRICING.current[planName]
            : PLAN_PRICING.new[planName];

        if (!pricing) {
          console.error(`No pricing found for plan: ${planName}`);
          continue;
        }

        // Get all possible fee calculations for this plan
        const feeCalculations = getAllPossibleFeeCalculations({
          monthlyPhysical,
          monthlyDigital,
          avgPhysicalOrder,
          avgDigitalOrder,
          planName,
          planSet,
        });

        // Convert fee calculations to results
        for (const calc of feeCalculations) {
          const monthlyTotal = Number(
            (
              pricing.monthly +
              calc.dpPlanFee +
              calc.processingFees +
              calc.digitalPlatformFees
            ).toFixed(2)
          );

          const annualTotal = Number(
            (
              pricing.annual * 12 +
              calc.dpPlanFee * 12 +
              calc.processingFees * 12 +
              calc.digitalPlatformFees * 12
            ).toFixed(2)
          );

          results.push({
            plan: planName,
            processor: calc.processorName,
            dpPlan: calc.dpPlanName,
            monthlyCost: monthlyTotal,
            annualCost: annualTotal,
            breakdown: {
              monthlySubscription: pricing.monthly,
              annualSubscription: pricing.annual,
              monthlyDpPlan: calc.dpPlanFee,
              annualDpPlan: calc.dpPlanFee,
              processingFees: calc.processingFees,
              digitalPlatformFee: calc.digitalPlatformFees,
            },
          });
        }
      }

      // 3. Sort results by monthly cost
      const sortedResults = results.sort(
        (a, b) => a.monthlyCost - b.monthlyCost
      );

      // 4. Group identical costs
      const groupedResults = Object.values(
        groupBy(
          sortedResults,
          (result) => `${result.plan}-${result.monthlyCost}`
        )
      ).map((group) => ({
        ...group[0],
        processors: group.map((r) => r.processor),
        isGrouped: group.length > 1,
      }));

      // 5. Take top 2 recommendations
      setFeeResults(groupedResults.slice(0, 2));

      // 6. Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error calculating fees:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnnouncementBar />
      <NavigationBar />
      <main className="flex-grow">
        <CalculatorContainer>
          <PlanSelector planSet={planSet} setPlanSet={setPlanSet} />
          <VideoStorageCalculator
            planSet={planSet}
            storageValue={storageValue}
            onStorageChange={({ storage }) => setStorageValue(storage)}
          />
          <EnhancedFeatureRequirements
            features={features}
            setFeatures={setFeatures}
            planSet={planSet}
          />
          <BusinessMetricsSection
            metrics={metrics}
            setMetrics={setMetrics}
            onReset={handleReset}
            onCalculate={calculateFees}
            calculateDisabled={
              (!metrics.monthlyPhysical && !metrics.monthlyDigital) || // No revenue entered
              (Number(metrics.monthlyPhysical) > 0 &&
                !metrics.avgPhysicalOrder) || // Physical revenue but no AOV
              (Number(metrics.monthlyDigital) > 0 && !metrics.avgDigitalOrder) // Digital revenue but no AOV
            }
          />
          {feeResults && (
            <ResultsSection
              ref={resultsRef}
              feeResults={feeResults}
              onReset={handleReset}
            />
          )}
        </CalculatorContainer>
      </main>
      <Footer />
    </div>
  );
}

export default App;
