import React from "react";

const NavigationBar = (): JSX.Element => (
  <nav
    style={{
      display: "flex",
      justifyContent: "flex-end",
      padding: "10px 20px",
      backgroundColor: "white",
      borderBottom: "0px solid #e5e7eb",
    }}
  >
    <a href="https://sqsfeecalculator-feedback.paperform.co/">
      Provide Feedback
    </a>
    <a href="https://resources.kristineneil.com/squarespace-fee-calculator">
      Return to Main Site
    </a>
  </nav>
);

export default NavigationBar;
