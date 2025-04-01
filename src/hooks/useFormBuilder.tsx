import { ReactNode, useMemo, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  InputText,
  InputEmail,
  InputPassword,
  InputTextarea,
  InputSelect,
  InputCheckbox,
  InputRadio,
  InputNumber,
} from "../components/form";

// Field types we support
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "number";

// Validation type
export type ValidationRule = {
  type: "required" | "min" | "max" | "email" | "matches" | "custom";
  value?: number | RegExp | string;
  message: string;
};

// Field definition
export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  options?: { label: string; value: string }[]; // For select, checkbox, radio
  validations?: ValidationRule[];
  dependencies?: string[]; // Fields that this field depends on for validation
};

// Form values
export type FormValues = Record<string, unknown>;

// Form options
export type FormBuilderOptions = {
  fields: FieldConfig[];
  schema: z.ZodTypeAny;
  onSubmit: (values: FormValues) => void | Promise<void>;
  submitButtonText?: string;
  defaultValues?: Record<string, unknown>;
  isLoading?: boolean;
};

export function useFormBuilder({
  fields,
  schema,
  onSubmit,
  submitButtonText = "Submit",
  defaultValues = {},
  isLoading = false,
}: FormBuilderOptions) {
  // Create initial values from fields
  const defaultFieldValues = useMemo(() => {
    const values: Record<string, unknown> = {};
    fields.forEach((field) => {
      if (field.type === "number") {
        values[field.name] = field.defaultValue ?? 0;
      } else if (field.type === "checkbox") {
        values[field.name] = field.defaultValue ?? false;
      } else {
        values[field.name] = field.defaultValue ?? "";
      }
    });
    return values;
  }, [fields]);

  // Merge with passed defaultValues
  const mergedInitialValues = useMemo(() => {
    return {
      ...defaultFieldValues,
      ...defaultValues,
    };
  }, [defaultFieldValues, defaultValues]);

  // Setup TanStack Form
  const form = useForm({
    defaultValues: mergedInitialValues,
    onSubmit: async ({ value }) => {
      try {
        schema.parse(value);
        await onSubmit(value);
        return { status: "success" };
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Validation failed:", error.errors);
          return { status: "error", errors: error.errors };
        }
        return { status: "error" };
      }
    },
  });

  // Update form values when defaultValues change
  useEffect(() => {
    if (Object.keys(defaultValues).length > 0) {
      const newValues = {
        ...defaultFieldValues,
        ...defaultValues,
      };
      form.reset(newValues);
    }
  }, [defaultValues, defaultFieldValues, form]);

  // Render a field based on its config
  const renderField = (field: FieldConfig) => {
    return (
      <div key={field.name}>
        <form.Field
          name={field.name}
          children={(fieldApi) => {
            const error = fieldApi.state.meta.errors
              ? String(fieldApi.state.meta.errors)
              : undefined;

            if (field.type === "text") {
              return (
                <InputText
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={String(fieldApi.state.value ?? "")}
                  onChange={fieldApi.handleChange}
                  onBlur={fieldApi.handleBlur}
                  placeholder={field.placeholder}
                  error={error}
                />
              );
            } else if (field.type === "email") {
              return (
                <InputEmail
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={String(fieldApi.state.value ?? "")}
                  onChange={fieldApi.handleChange}
                  onBlur={fieldApi.handleBlur}
                  placeholder={field.placeholder}
                  error={error}
                />
              );
            } else if (field.type === "password") {
              return (
                <InputPassword
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={String(fieldApi.state.value ?? "")}
                  onChange={fieldApi.handleChange}
                  onBlur={fieldApi.handleBlur}
                  placeholder={field.placeholder}
                  error={error}
                />
              );
            } else if (field.type === "textarea") {
              return (
                <InputTextarea
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={String(fieldApi.state.value ?? "")}
                  onChange={fieldApi.handleChange}
                  onBlur={fieldApi.handleBlur}
                  placeholder={field.placeholder}
                  error={error}
                />
              );
            } else if (field.type === "select" && field.options) {
              return (
                <InputSelect
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={String(fieldApi.state.value ?? "")}
                  onChange={fieldApi.handleChange}
                  onBlur={fieldApi.handleBlur}
                  options={field.options}
                  placeholder={field.placeholder}
                  error={error}
                />
              );
            } else if (field.type === "checkbox") {
              return (
                <InputCheckbox
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  checked={Boolean(fieldApi.state.value)}
                  onChange={fieldApi.handleChange}
                  onBlur={fieldApi.handleBlur}
                  error={error}
                />
              );
            } else if (field.type === "radio" && field.options) {
              return (
                <InputRadio
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={String(fieldApi.state.value ?? "")}
                  onChange={fieldApi.handleChange}
                  onBlur={fieldApi.handleBlur}
                  options={field.options}
                  error={error}
                />
              );
            } else if (field.type === "number") {
              return (
                <InputNumber
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={String(fieldApi.state.value ?? "")}
                  onChange={fieldApi.handleChange}
                  onBlur={fieldApi.handleBlur}
                  placeholder={field.placeholder}
                  error={error}
                />
              );
            }

            return null;
          }}
        />
      </div>
    );
  };

  // Render the whole form
  const FormComponent = ({ children }: { children?: ReactNode }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-4"
    >
      {fields.map(renderField)}

      {children}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : submitButtonText}
      </button>
    </form>
  );

  return {
    form,
    FormComponent,
    renderField,
    values: form.state.values,
    formState: form.state,
    handleSubmit: form.handleSubmit,
    reset: form.reset,
  };
}
