import React from "react";
import { colors } from "../../../../constants/colors";
import { fonts } from "../../../../constants/fonts";

const ResultCard = ({ result, index }) => {
  const cardStyles = {
    width: "100%",
    position: "relative",
    backgroundColor: index === 0 ? colors.ui.backgroundShade : colors.ui.white,
    borderRadius: "8px",
    border: `1px solid ${colors.ui.border}`,
  };

  const recommendationTagStyles = {
    position: "absolute",
    top: "0",
    right: "24px",
    backgroundColor:
      index === 0 ? colors.status.recommendedTag : colors.status.alternativeTag,
    color: colors.ui.white,
    padding: "6px 12px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.025em",
    fontFamily: fonts.families.display,
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    zIndex: 1,
  };

  const headerStyles = {
    padding: "20px 24px",
    borderBottom: `1px solid ${colors.ui.border}`,
  };

  const planNameStyles = {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "12px",
    color: colors.text.primary,
    lineHeight: "1.2",
    fontFamily: fonts.families.display,
    letterSpacing: "0.025em",
  };

  const badgeContainerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "flex-start",
  };

  const processorPillsStyles = {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    width: "100%",
  };

  const pillStyles = {
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "4px",
    backgroundColor: colors.accent.redLight,
    border: `1px solid ${colors.accent.red}`,
    color: colors.accent.red,
    fontFamily: fonts.families.body,
  };

  const dpPlanBadgeStyles = {
    ...pillStyles,
    backgroundColor: colors.accent.redLight,
    border: `1px solid ${colors.accent.red}`,
    color: colors.accent.red,
  };

  const priceWrapperStyles = {
    padding: "16px 24px",
    borderBottom: `1px solid ${colors.ui.border}`,
    backgroundColor: colors.ui.backgroundShade,
  };

  const priceStyles = {
    fontSize: "20px",
    fontWeight: "600",
    color: colors.text.primary,
    fontFamily: fonts.families.mono,
  };

  const breakdownContainerStyles = {
    padding: "20px 24px",
  };

  const sectionStyles = {
    marginBottom: "16px",
  };

  const sectionTitleStyles = {
    fontSize: "13px",
    fontWeight: "500",
    color: colors.text.secondary,
    marginBottom: "8px",
    fontFamily: fonts.families.body,
  };

  const lineItemStyles = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: colors.text.secondary,
    padding: "4px 0",
    fontFamily: fonts.families.body,
  };

  const lineItemLabelStyles = {
    color: colors.text.secondary,
    fontFamily: fonts.families.body,
  };

  const lineItemValueStyles = {
    fontFamily: fonts.families.mono,
    fontFeatureSettings: "tnum",
    fontVariantNumeric: "tabular-nums",
  };

  const totalStyles = {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 0 0",
    marginTop: "16px",
    borderTop: `1px solid ${colors.ui.border}`,
    fontSize: "14px",
    fontWeight: "600",
    color: colors.text.primary,
    fontFamily: fonts.families.body,
  };

  const savingsStyles = {
    marginTop: "1px",
    padding: "12px 24px",
    backgroundColor: colors.ui.backgroundShade,
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    border: `1px solid ${colors.ui.border}`,
    borderTop: "none",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  };

  const savingsIconStyles = {
    padding: "6px",
    backgroundColor: colors.accent.redLight,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${colors.accent.red}`,
    flexShrink: 0,
    marginTop: "2px",
  };

  const savingsContentStyles = {
    flex: 1,
  };

  const savingsTitleStyles = {
    fontSize: "13px",
    fontWeight: "600",
    color: colors.accent.red,
    marginBottom: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: fonts.families.display,
    letterSpacing: "0.025em",
  };

  const savingsTextStyles = {
    fontSize: "13px",
    color: colors.text.primary,
    lineHeight: "1.4",
    fontFamily: fonts.families.body,
  };

  // Rest of the component code remains the same
  const amounts = {
    total: result.monthlyCost,
    subscription: result.breakdown.monthlySubscription,
    dpSubscription: result.breakdown.monthlyDpPlan || 0,
    processingFees: result.breakdown.processingFees,
    physicalPlatformFee: result.breakdown.physicalPlatformFee || 0,
    digitalPlatformFee: result.breakdown.digitalPlatformFee || 0,
    annualSavings:
      result.breakdown.monthlySubscription * 12 -
      result.breakdown.annualSubscription * 12,
  };

  const formatCurrency = (value) =>
    Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const LineItem = ({ label, amount }) => (
    <div style={lineItemStyles}>
      <span style={lineItemLabelStyles}>{label}</span>
      <span style={lineItemValueStyles}>${formatCurrency(amount)}</span>
    </div>
  );

  // Return JSX remains exactly the same
  return (
    <div style={{ position: "relative" }}>
      <div style={cardStyles}>
        {(index === 0 || index === 1) && (
          <div style={recommendationTagStyles}>
            {index === 0 ? "Top Recommendation" : "Next Best Alternative"}
          </div>
        )}

        <div style={headerStyles}>
          <h3 style={planNameStyles}>{result.plan}</h3>
          <div style={badgeContainerStyles}>
            <div style={processorPillsStyles}>
              {result.isGrouped ? (
                result.processors.map((processor) => (
                  <span key={processor} style={pillStyles}>
                    {processor}
                  </span>
                ))
              ) : (
                <span style={pillStyles}>{result.processor}</span>
              )}
            </div>
            {result.dpPlan && result.dpPlan !== "No DP Plan" && (
              <span style={dpPlanBadgeStyles}>
                Digital Products {result.dpPlan} Plan
              </span>
            )}
          </div>
        </div>

        <div style={priceWrapperStyles}>
          <div>
            <span style={priceStyles}>${formatCurrency(amounts.total)}</span>
            <span
              style={{
                marginLeft: "4px",
                color: colors.text.secondary,
                fontSize: "14px",
                fontFamily: fonts.families.body,
              }}
            >
              /mo
            </span>
          </div>
        </div>

        <div style={breakdownContainerStyles}>
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Fixed Costs</div>
            <LineItem label="Base Subscription" amount={amounts.subscription} />
            {amounts.dpSubscription >= 0 && (
              <LineItem
                label="Digital Products Subscription"
                amount={amounts.dpSubscription}
              />
            )}
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Platform Fees</div>
            <LineItem
              label="Physical Product Platform Fee"
              amount={amounts.physicalPlatformFee}
            />
            <LineItem
              label="Digital Product Platform Fee"
              amount={amounts.digitalPlatformFee}
            />
          </div>

          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Processing Fees</div>
            <LineItem
              label="Payment Processing"
              amount={amounts.processingFees}
            />
          </div>

          <div style={totalStyles}>
            <span>Total</span>
            <span>${formatCurrency(amounts.total)}</span>
          </div>
        </div>
      </div>

      {index === 0 && amounts.annualSavings > 0 && (
        <div style={savingsStyles}>
          <div style={savingsIconStyles}>
            <span
              style={{
                fontSize: "14px",
                color: colors.accent.red,
                fontWeight: "600",
                fontFamily: fonts.families.mono,
              }}
            >
              $
            </span>
          </div>
          <div style={savingsContentStyles}>
            <div style={savingsTitleStyles}>Annual Billing Savings</div>
            <div style={savingsTextStyles}>
              Save ${formatCurrency(amounts.annualSavings)} per year on{" "}
              {result.plan}
              {result.dpPlan && result.dpPlan !== "No DP Plan"
                ? ` plus $${formatCurrency(
                    result.breakdown.monthlyDpPlan * 12 -
                      result.breakdown.annualDpPlan * 12
                  )} on your Digital Products ${result.dpPlan} plan`
                : ""}{" "}
              with annual billing.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
