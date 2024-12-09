interface CalculatorContainerProps {
  children: React.ReactNode;
}

const CalculatorContainer: React.FC<CalculatorContainerProps> = ({
  children,
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-ui-white rounded-xl p-8 shadow-sm border border-ui-border">
        <h2 className="text-2xl font-semibold text-text-primary text-center flex items-center justify-center gap-2 mb-8">
          SQSP Fee Calculator
          <span className="bg-accent-redLight text-accent-red px-2 py-0.5 rounded-xl text-xs font-semibold border border-accent-red tracking-wide">
            BETA
          </span>
        </h2>
        {children}
      </div>
    </main>
  );
};

export default CalculatorContainer;
