import { ChangeEvent } from "react";
import { TextareaProps } from "./types";

const InputTextarea = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  error,
  required = false,
  disabled = false,
  className = "",
}: TextareaProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`mt-1 block w-full px-3 py-2 bg-white text-gray-900 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className} ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && (
        <span className="text-sm text-red-600 mt-1 block">{error}</span>
      )}
    </div>
  );
};

export default InputTextarea;
