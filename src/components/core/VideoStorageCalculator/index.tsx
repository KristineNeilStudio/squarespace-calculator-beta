import { STORAGE_OPTIONS } from "../../../constants/storageRules";

interface StorageOption {
  value: string;
  label: string;
}

interface VideoStorageCalculatorProps {
  planSet: "current" | "new";
  storageValue: string;
  onStorageChange: (data: { storage: string }) => void;
}

const VideoStorageCalculator: React.FC<VideoStorageCalculatorProps> = ({
  planSet,
  storageValue,
  onStorageChange,
}) => {
  // Get appropriate storage options based on plan set
  const storageOptions = STORAGE_OPTIONS[planSet];

  const handleStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStorageChange({
      storage: e.target.value,
    });
  };

  return (
    <div className="w-full bg-ui-white rounded-lg p-6 border border-ui-border mb-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Video Storage Needs
      </h3>
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          How much video content do you plan to host?
        </label>
        <select
          value={storageValue}
          onChange={handleStorageChange}
          className="w-full p-2 border border-ui-border rounded-md text-sm text-text-secondary bg-ui-white"
        >
          {storageOptions.map((option: StorageOption) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoStorageCalculator;
