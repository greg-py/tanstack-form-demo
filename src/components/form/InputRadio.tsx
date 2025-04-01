import { ChangeEvent } from "react";
import { RadioProps } from "./types";

const InputRadio = ({
  id,
  name,
  label,
  value,
  options,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = "",
}: RadioProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${id}-${option.value}`}
              name={name}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              onBlur={onBlur}
              disabled={disabled}
              required={required}
              className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 ${className} ${
                error ? "border-red-500" : ""
              }`}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <span className="text-sm text-red-600 mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default InputRadio;
