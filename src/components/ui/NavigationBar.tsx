import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  external = false,
}) => {
  const linkStyles: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    color: "#374151",
    backgroundColor: "#f3f4f6",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = "#e5e7eb";
    target.style.borderColor = "#d1d5db";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = "#f3f4f6";
    target.style.borderColor = "#e5e7eb";
  };

  return (
    <a
      href={href}
      style={linkStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
};

const NavigationBar: React.FC = () => {
  const navStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    padding: "10px 24px",
    backgroundColor: "white",
    borderBottom: "0px solid #e5e7eb",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: "1200px",
    margin: "0 auto",
  };

  return (
    <nav style={navStyles}>
      <NavLink href="https://sqsfeecalculator-feedback.paperform.co/" external>
        Provide Feedback
      </NavLink>
      <NavLink href="https://resources.kristineneil.com/squarespace-fee-calculator">
        Return to Main Site
      </NavLink>
    </nav>
  );
};

export default NavigationBar;
