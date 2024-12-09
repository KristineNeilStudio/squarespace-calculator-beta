import React from "react";
import { ArrowRight } from "lucide-react";

interface FooterProps {
  courseUrl?: string;
  mainSiteUrl?: string;
  year?: number;
}

const Footer: React.FC<FooterProps> = ({
  courseUrl = "https://resources.kristineneil.com/web-designers-guide-squarespace-payments",
  mainSiteUrl = "https://kristineneil.com",
  year = new Date().getFullYear(),
}) => {
  return (
    <footer className="w-full bg-gray-50">
      {/* Course Promotion Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-lightest rounded-xl p-8 lg:p-12 my-12 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-primary-dark transform -skew-y-12"></div>
          </div>

          <div className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary-darkest mb-6">
                Ready to Master the Strategy Behind the Calculator?
              </h2>
              <p className="text-base md:text-lg text-primary-medium mb-8 leading-relaxed">
                Transform your Squarespace web design services with The Complete
                Guide to Squarespace Payments. Learn exactly{" "}
                <strong>why</strong> certain payment setups work better than
                others, and use these insights to provide even more value to
                your clients.
              </p>
              <a
                href={courseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-dark 
                         hover:bg-ui-button text-white rounded-lg transition-all duration-200 
                         group gap-3 text-base font-medium hover:shadow-lg hover:-translate-y-0.5"
              >
                Get The Course Details
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="border-t border-ui-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left column */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary-darkest">
                About This Calculator
              </h3>
              <p className="text-sm text-primary-medium leading-relaxed">
                The SQSP Fee Calculator is built and maintained by{" "}
                <a
                  href={mainSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-darkest hover:text-primary-medium 
                           transition-colors duration-200 font-medium"
                >
                  Kristine Neil
                </a>
                . The term "Squarespace" is a trademark of Squarespace, Inc.
                This website is not affiliated with Squarespace, Inc.
              </p>
              <p className="text-sm text-primary-medium">
                The accuracy of information on this website is subject to
                change.
              </p>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-primary-darkest">
                Try Squarespace
              </h3>
              <p className="text-sm text-primary-medium leading-relaxed">
                Ready to get started with Squarespace? Use code{" "}
                <span className="font-mono text-primary-darkest font-medium">
                  KRISTINE10
                </span>{" "}
                at checkout to save 10% on your subscription.
              </p>
              <a
                href="https://kristineneil.link/squarespace"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary-darkest 
                         hover:text-primary-medium transition-colors duration-200 
                         font-medium group gap-2"
              >
                Get Started with Squarespace
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-ui-border text-sm text-center text-primary-medium">
            © {year} Kristine Neil, LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
