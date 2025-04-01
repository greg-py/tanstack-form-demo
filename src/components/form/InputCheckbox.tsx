import { ChangeEvent } from "react";
import { CheckboxProps } from "./types";

const InputCheckbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = "",
}: CheckboxProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className="mb-4 flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${className} ${
            error ? "border-red-500" : ""
          }`}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {error && <span className="text-sm text-red-600 block">{error}</span>}
      </div>
    </div>
  );
};

export default InputCheckbox;
