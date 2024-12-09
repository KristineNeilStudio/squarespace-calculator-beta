import { useState, useRef } from "react";
import NavigationBar from "./components/ui/NavigationBar";
import AnnouncementBar from "./components/ui/AnnouncementBar";
import CalculatorContainer from "./components/ui/CalculatorContainer";
import VideoStorageCalculator from "./components/core/VideoStorageCalculator";
import PlanSelector from "./components/ui/PlanSelector";
import EnhancedFeatureRequirements from "./components/core/EnhancedFeatureRequirements";
import BusinessMetricsSection from "./components/core/BusinessMetricsSection";
import ResultsSection from "./components/core/ResultsSection";
import { calculateProcessingFees } from "./utils/calculations";
import { PLAN_PRICING } from "./constants/planPricing";
import type { Metrics } from "./components/core/BusinessMetricsSection";
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

interface FeeBreakdown {
  monthlySubscription: number;
  annualSubscription: number;
  monthlyDpPlan?: number;
  annualDpPlan?: number;
  processingFees: number;
  physicalPlatformFee?: number;
  digitalPlatformFee: number;
}

interface FeeResult {
  plan: string;
  dpPlan?: string;
  processor: string;
  monthlyCost: number;
  annualCost: number;
  breakdown: FeeBreakdown;
}

function App() {
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

  const calculateFees = () => {
    const validProcessors = ["Squarespace Payments", "Stripe", "PayPal"];
    const filteredProcessors = features.needsSubscriptions
      ? validProcessors.filter((p) => p !== "PayPal")
      : validProcessors;

    const monthlyPhysical = Number(metrics.monthlyPhysical) || 0;
    const monthlyDigital = Number(metrics.monthlyDigital) || 0;
    const avgPhysicalOrder = Number(metrics.avgPhysicalOrder) || 0.01;
    const avgDigitalOrder = Number(metrics.avgDigitalOrder) || 0.01;

    const physicalTransactions =
      monthlyPhysical > 0
        ? Math.ceil(monthlyPhysical / Math.max(avgPhysicalOrder, 0.01))
        : 0;
    const digitalTransactions =
      monthlyDigital > 0
        ? Math.ceil(monthlyDigital / Math.max(avgDigitalOrder, 0.01))
        : 0;

    const results: FeeResult[] = [];
    const eligiblePlans =
      planSet === "current"
        ? ["Basic Commerce", "Advanced Commerce"]
        : ["Core", "Plus", "Advanced"];

    eligiblePlans.forEach((planName) => {
      filteredProcessors.forEach((processorName) => {
        const fees = calculateProcessingFees(
          monthlyPhysical,
          monthlyDigital,
          physicalTransactions,
          digitalTransactions,
          processorName,
          planName,
          planSet
        );

        const pricing =
          planSet === "current"
            ? PLAN_PRICING.current[planName]
            : PLAN_PRICING.new[planName];

        const monthlyTotal = Number(
          (
            pricing.monthly +
            fees +
            monthlyDigital * (pricing.digitalFee || 0)
          ).toFixed(2)
        );

        const annualTotal = Number(
          (
            pricing.annual * 12 +
            fees * 12 +
            monthlyDigital * (pricing.digitalFee || 0) * 12
          ).toFixed(2)
        );

        results.push({
          plan: planName,
          processor: processorName,
          monthlyCost: monthlyTotal,
          annualCost: annualTotal,
          breakdown: {
            monthlySubscription: pricing.monthly,
            annualSubscription: pricing.annual,
            processingFees: fees,
            digitalPlatformFee: monthlyDigital * (pricing.digitalFee || 0),
          },
        });
      });
    });

    setFeeResults(
      results.sort((a, b) => a.monthlyCost - b.monthlyCost).slice(0, 3)
    );
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

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
