import { ChangeEvent } from "react";
import { SelectProps } from "./types";

const InputSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select an option",
  error,
  required = false,
  disabled = false,
  className = "",
}: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`mt-1 block w-full px-3 py-2 bg-white text-gray-900 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className} ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-red-600 mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default InputSelect;
