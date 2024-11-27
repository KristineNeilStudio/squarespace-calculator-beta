import React from "react";
import { ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const footerStyles: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #e5e7eb",
  };

  const promotionStyles: React.CSSProperties = {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "32px",
    border: "1px solid #e5e7eb",
    textAlign: "center",
  };

  const buttonStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 24px",
    backgroundColor: "#c83e2d",
    color: "white",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
    gap: "8px",
    marginTop: "16px",
  };

  const linkStyles: React.CSSProperties = {
    color: "#111827",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s ease",
  };

  const disclaimerStyles: React.CSSProperties = {
    fontSize: "14px",
    color: "#6B7280",
    maxWidth: "800px",
    lineHeight: "1.5",
    textAlign: "center",
    margin: "0 auto",
    marginBottom: "16px",
  };

  const copyrightStyles: React.CSSProperties = {
    fontSize: "14px",
    color: "#6B7280",
    textAlign: "center",
    borderTop: "1px solid #e5e7eb",
    marginTop: "24px",
    paddingTop: "24px",
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        {/* Course Promotion Section */}
        <div style={promotionStyles}>
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            Ready to Master the Strategy Behind the Calculator?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#4B5563",
              marginBottom: "24px",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Transform your Squarespace web design services with The Complete
            Guide to Squarespace Payments. Learn exactly <strong>why</strong>{" "}
            certain payment setups work better than others, and use these
            insights to provide even more value to your clients.
          </p>
          <a
            href="https://resources.kristineneil.com/web-designers-guide-squarespace-payments"
            target="_blank"
            rel="noopener noreferrer"
            style={buttonStyles}
          >
            Get The Course Details
            <ArrowRight width={20} height={20} />
          </a>
        </div>

        {/* Main Footer Content */}
        <p style={disclaimerStyles}>
          The SQSP Fee Calculator is built and maintained by{" "}
          <a
            href="https://kristineneil.com"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyles}
            onMouseEnter={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.color = "#4B5563";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.color = "#111827";
            }}
          >
            Kristine Neil
          </a>
          . The term "Squarespace" is a trademark of Squarespace, Inc. This
          website is not affiliated with Squarespace, Inc. The accuracy of
          information on this website is subject to change.{" "}
          <a
            href="https://kristineneil.link/squarespace"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyles}
            onMouseEnter={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.color = "#4B5563";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.color = "#111827";
            }}
          >
            Try Squarespace and get 10% off with code KRISTINE10
          </a>
          .
        </p>

        <div style={copyrightStyles}>
          © 2024 Kristine Neil, LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
