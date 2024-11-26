import React, { useState, useEffect, useRef } from "react";
import { PlanSelector } from "/src/components/ui/StyledComponents";
import BusinessMetricsSection from "/src/components/core/BusinessMetricsSection";
import CalculatorButton from "/src/components/ui/CalculatorButton";
import ResultsSection from "/src/components/core/ResultsSection";
import VideoStorageCalculator from "/src/components/core/VideoStorageCalculator";
import EnhancedFeatureRequirements from "/src/components/core/EnhancedFeatureRequirements";
import { calculateProcessingFees } from "/src/utils/calculations";

import { PLAN_PRICING } from "/src/constants/planPricing";
import { COMMERCE_FEATURES } from "/src/constants/featureRequirements";
import { STORAGE_LIMITS } from "/src/constants/storageRules";
import NavigationBar from "/src/NavigationBar";

const App = () => {
  const [planSet, setPlanSet] = useState(null);
  const [features, setFeatures] = useState({
    videoStorageHours: null,
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

  const [metrics, setMetrics] = useState({
    monthlyPhysical: "",
    avgPhysicalOrder: "",
    monthlyDigital: "",
    avgDigitalOrder: "",
  });

  const [feeResults, setFeeResults] = useState(null);
  const [eligibleProcessors, setEligibleProcessors] = useState([
    "Squarespace Payments",
    "Stripe",
    "PayPal",
  ]);
  const resultsRef = useRef(null);

  useEffect(() => {
    setFeatures((prev) => ({
      ...prev,
      videoStorageHours:
        planSet === "current" ? "0-0.5" : planSet === "new" ? "0-5" : null,
    }));
  }, [planSet]);

  const filterPlansByStorage = (storage, planSet) => {
    console.log("Filtering plans for storage:", storage, "planSet:", planSet);

    if (planSet === "current") {
      switch (storage) {
        case "50+":
          return {
            plans: ["Basic Commerce", "Advanced Commerce"],
            minDpPlan: "Pro",
          };
        case "10-50":
          return {
            plans: ["Basic Commerce", "Advanced Commerce"],
            minDpPlan: "Core",
          };
        case "0.5-10":
          return {
            plans: ["Basic Commerce", "Advanced Commerce"],
            minDpPlan: "Starter",
          };
        case "0-0.5":
          return {
            plans: ["Basic Commerce", "Advanced Commerce"],
            minDpPlan: null,
          };
        default:
          console.warn("Unexpected storage value for current plans:", storage);
          return {
            plans: ["Basic Commerce", "Advanced Commerce"],
            minDpPlan: null,
          };
      }
    } else {
      switch (storage) {
        case "50+":
          return { plans: ["Advanced"], minDpPlan: null };
        case "5-50":
          return { plans: ["Plus", "Advanced"], minDpPlan: null };
        case "0-5":
          return { plans: ["Core", "Plus", "Advanced"], minDpPlan: null };
        default:
          console.warn("Unexpected storage value for new plans:", storage);
          return { plans: ["Core", "Plus", "Advanced"], minDpPlan: null };
      }
    }
  };

  const getEligiblePlans = () => {
    let plans =
      planSet === "current"
        ? ["Basic Commerce", "Advanced Commerce"]
        : ["Core", "Plus", "Advanced"];

    const storageFiltered = filterPlansByStorage(
      features.videoStorageHours,
      planSet
    );
    plans = plans.filter((plan) => storageFiltered.plans.includes(plan));

    if (planSet === "current") {
      if (
        features.needsAbandonedCart ||
        features.needsSubscriptions ||
        features.needsAdvancedShipping ||
        features.needsAdvancedDiscounts ||
        features.needsCommerceAPI
      ) {
        plans = ["Advanced Commerce"];
      } else if (
        features.needsPOS ||
        features.needsProductReviews ||
        features.needsAdvancedMerchandising ||
        features.needsLimitedAvailability
      ) {
        plans = plans.filter((p) => p !== "Business");
      }

      const needsDpPlan =
        storageFiltered.minDpPlan || Number(metrics.monthlyDigital) > 0;

      return {
        plans,
        minDpPlan: needsDpPlan ? storageFiltered.minDpPlan : null,
      };
    }

    return {
      plans,
      minDpPlan: null,
    };
  };

  const calculateFees = () => {
    const { plans, minDpPlan } = getEligiblePlans();
    let validProcessors = [...eligibleProcessors];

    if (features.needsSubscriptions) {
      validProcessors = validProcessors.filter((p) => p !== "PayPal");
    }

    const monthlyPhysical = Number(metrics.monthlyPhysical) || 0;
    const monthlyDigital = Number(metrics.monthlyDigital) || 0;

    const physicalTransactions =
      monthlyPhysical > 0
        ? Math.ceil(
            monthlyPhysical / Math.max(Number(metrics.avgPhysicalOrder), 0.01)
          )
        : 0;
    const digitalTransactions =
      monthlyDigital > 0
        ? Math.ceil(
            monthlyDigital / Math.max(Number(metrics.avgDigitalOrder), 0.01)
          )
        : 0;

    const totalTransactions = physicalTransactions + digitalTransactions;

    let results = [];

    plans.forEach((planName) => {
      if (planSet === "current") {
        const planPricing = PLAN_PRICING.current[planName];
        let dpPlansToConsider = planPricing.dpPlans;

        if (!minDpPlan && monthlyDigital === 0) {
          dpPlansToConsider = dpPlansToConsider.filter(
            (dp) => dp.name === "No DP Plan"
          );
        } else if (minDpPlan) {
          const dpRanks = {
            "No DP Plan": 0,
            Starter: 1,
            Core: 2,
            Pro: 3,
          };
          dpPlansToConsider = dpPlansToConsider.filter(
            (dp) => dpRanks[dp.name] >= dpRanks[minDpPlan]
          );
        }

        dpPlansToConsider.forEach((dpPlan) => {
          validProcessors.forEach((processorName) => {
            const monthlyProcessingFees = calculateProcessingFees(
              monthlyPhysical,
              monthlyDigital,
              physicalTransactions,
              digitalTransactions,
              processorName,
              planName,
              planSet
            );

            const monthlyDigitalPlatformFee = monthlyDigital * dpPlan.fee;

            const monthlyTotal = Number(
              (
                planPricing.monthly +
                dpPlan.monthlyCost +
                monthlyProcessingFees +
                monthlyDigitalPlatformFee
              ).toFixed(2)
            );

            const annualTotal = Number(
              (
                planPricing.annual +
                dpPlan.annualCost +
                monthlyProcessingFees * 12 +
                monthlyDigitalPlatformFee * 12
              ).toFixed(2)
            );

            results.push({
              plan: planName,
              dpPlan: dpPlan.name,
              processor: processorName,
              monthlyCost: monthlyTotal,
              annualCost: annualTotal,
              breakdown: {
                monthlySubscription: planPricing.monthly,
                annualSubscription: planPricing.annual,
                monthlyDpPlan: dpPlan.monthlyCost,
                annualDpPlan: dpPlan.annualCost,
                processingFees: monthlyProcessingFees,
                digitalPlatformFee: monthlyDigitalPlatformFee,
              },
            });
          });
        });
      } else {
        const planPricing = PLAN_PRICING.new[planName];
        validProcessors.forEach((processorName) => {
          const monthlyProcessingFees = calculateProcessingFees(
            monthlyPhysical,
            monthlyDigital,
            physicalTransactions,
            digitalTransactions,
            processorName,
            planName,
            planSet
          );

          const physicalPlatformFee = 0;
          const monthlyDigitalPlatformFee =
            monthlyDigital * planPricing.digitalFee;

          const monthlyTotal = Number(
            (
              planPricing.monthly +
              monthlyProcessingFees +
              physicalPlatformFee +
              monthlyDigitalPlatformFee
            ).toFixed(2)
          );

          const annualTotal = Number(
            (
              planPricing.annual +
              monthlyProcessingFees * 12 +
              physicalPlatformFee * 12 +
              monthlyDigitalPlatformFee * 12
            ).toFixed(2)
          );

          results.push({
            plan: planName,
            processor: processorName,
            monthlyCost: monthlyTotal,
            annualCost: annualTotal,
            breakdown: {
              monthlySubscription: planPricing.monthly,
              annualSubscription: planPricing.annual,
              physicalPlatformFee,
              digitalPlatformFee: monthlyDigitalPlatformFee,
              processingFees: monthlyProcessingFees,
            },
          });
        });
      }
    });

    results = results.sort((a, b) => a.monthlyCost - b.monthlyCost).slice(0, 3);
    setFeeResults(results);

    setTimeout(() => {
      if (resultsRef.current) {
        const yOffset = -20;
        const y =
          resultsRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const handleReset = () => {
    setPlanSet(null);
    setFeatures({
      videoStorageHours: null,
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
    setEligibleProcessors(["Squarespace Payments", "Stripe", "PayPal"]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <NavigationBar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "32px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            Squarespace Fee Calculator
            <span
              style={{
                backgroundColor: "#f0fdf4",
                color: "#065f46",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600",
                border: "1px solid #059669",
                letterSpacing: "0.025em",
              }}
            >
              BETA
            </span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <PlanSelector planSet={planSet} setPlanSet={setPlanSet} />

            <VideoStorageCalculator
              planSet={planSet}
              storageValue={features.videoStorageHours}
              onStorageChange={({ storage }) => {
                setFeatures((prev) => ({
                  ...prev,
                  videoStorageHours: storage,
                }));
                const { plans: newEligiblePlans, minDpPlan } =
                  filterPlansByStorage(storage, planSet);
                console.log(
                  "Eligible plans based on storage:",
                  newEligiblePlans
                );
                console.log("Minimum DP plan required:", minDpPlan);
              }}
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
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <CalculatorButton
                onClick={calculateFees}
                disabled={!metrics.monthlyPhysical && !metrics.monthlyDigital}
              />
            </div>

            {feeResults && (
              <div style={{ scrollMarginTop: "20px" }}>
                <ResultsSection
                  ref={resultsRef}
                  feeResults={feeResults}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
