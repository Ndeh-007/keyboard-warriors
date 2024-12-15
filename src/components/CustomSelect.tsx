import { useState } from "react";
import { ChallengeOption } from "../core/interfaces/data";

const CustomSelect: React.FC<{
  label: string;
  options: ChallengeOption[];
  currentOption: number;
  onChange: (opt: ChallengeOption) => any;
}> = ({ options, currentOption, label, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ChallengeOption>(
    options[currentOption]
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (opt: ChallengeOption) => {
    setSelectedOption(opt);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <label className="custom-select-label">{label}</label>
      <div onClick={toggleDropdown} className="custom-select-dropdown">
        <div className="text dropdown-item">{selectedOption.title}</div>
        <div className="icon dropdown-item">{isOpen ? "▲" : "▼"}</div>
      </div>

      {isOpen && (
        <div className="custom-select-dropdown-display">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                handleOptionSelect(option);
                onChange(option);
              }}
              className="custom-select-dropdown-display-item"
            >
              <p className="font-semibold text-gray-800">{option.title}</p>
              {option.description ? (
                <p className="text-sm text-gray-500">{option.description}</p>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
