import React from "react";

interface PlanSelectorProps {
  planSet: "current" | "new";
  setPlanSet: (plan: "current" | "new") => void;
}

interface RadioOptionProps {
  id: string;
  value: "current" | "new";
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: React.ReactNode;
  description: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  id,
  value,
  checked,
  onChange,
  title,
  description,
}) => {
  return (
    <label
      htmlFor={id}
      className={`block p-4 mb-2 border rounded-lg cursor-pointer transition-colors
        ${
          checked
            ? "bg-gray-50 border-gray-300"
            : "bg-white border-gray-200 hover:bg-gray-50"
        }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="radio"
          id={id}
          name="planSet"
          value={value}
          checked={checked}
          onChange={onChange}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="text-base font-semibold text-gray-900 mb-1">
            {title}
          </div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
      </div>
    </label>
  );
};

const PlanSelector: React.FC<PlanSelectorProps> = ({ planSet, setPlanSet }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Which plan options do you see?
      </h3>

      <RadioOption
        id="new"
        value="new"
        checked={planSet === "new"}
        onChange={(e) => setPlanSet(e.target.value as "current" | "new")}
        title={
          <div className="relative pr-24">
            Current Plans
            <span className="absolute -top-6 right-0 bg-primary-lightest text-primary-dark text-xs font-semibold px-2 py-1 rounded border border-primary-dark">
              Recommended
            </span>
          </div>
        }
        description="Basic, Core, Plus, Advanced"
      />

      <RadioOption
        id="current"
        value="current"
        checked={planSet === "current"}
        onChange={(e) => setPlanSet(e.target.value as "current" | "new")}
        title="Old Plans (Prior to Nov 2024)"
        description="Personal, Business, Basic Commerce, Advanced Commerce"
      />
    </div>
  );
};

export default PlanSelector;
