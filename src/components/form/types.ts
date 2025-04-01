import { FocusEvent } from "react";

export interface BaseInputProps {
  id: string;
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface TextInputProps extends BaseInputProps {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export interface TextareaProps extends BaseInputProps {
  placeholder?: string;
  value: string;
  rows?: number;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends BaseInputProps {
  placeholder?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
}

export interface CheckboxProps extends BaseInputProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export interface RadioProps extends BaseInputProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}
