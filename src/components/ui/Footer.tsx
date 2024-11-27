import React from "react";

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

  const sectionStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    alignItems: "center",
    textAlign: "center",
  };

  const buttonStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 24px",
    backgroundColor: "#111827",
    color: "white",
    borderRadius: "8px",
    border: "none",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
  };

  const disclaimerStyles: React.CSSProperties = {
    fontSize: "14px",
    color: "#6B7280",
    maxWidth: "800px",
    lineHeight: "1.5",
  };

  const linkStyles: React.CSSProperties = {
    color: "#111827",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s ease",
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
        <div style={sectionStyles}>
          <div>
            <a
              href="https://kristineneil.link/squarespace"
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyles}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "#000000";
                target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "#111827";
                target.style.transform = "translateY(0)";
              }}
            >
              Try Squarespace — Get 10% Off with Code KRISTINE10
            </a>
          </div>

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
            information on this website is subject to change.
          </p>

          <div style={copyrightStyles}>
            © 2024 Kristine Neil, LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
