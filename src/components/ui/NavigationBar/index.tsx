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
  return (
    <a
      href={href}
      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 
                 border border-gray-200 hover:bg-gray-200 transition-colors"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
};

export const NavigationBar: React.FC = () => {
  return (
    <nav className="flex justify-end gap-3 px-6 py-2.5 bg-white max-w-7xl mx-auto">
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
