import { useFormBuilder, FieldConfig } from "../hooks/useFormBuilder";
import { z } from "zod";

export function RegistrationForm() {
  // Define the form fields
  const fields: FieldConfig[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      validations: [
        { type: "required", message: "Username is required" },
        {
          type: "min",
          value: 3,
          message: "Username must be at least 3 characters",
        },
        {
          type: "max",
          value: 20,
          message: "Username must be at most 20 characters",
        },
      ],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      validations: [
        { type: "required", message: "Email is required" },
        { type: "email", message: "Please enter a valid email address" },
      ],
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      validations: [
        { type: "required", message: "Password is required" },
        {
          type: "min",
          value: 8,
          message: "Password must be at least 8 characters",
        },
        {
          type: "matches",
          value: /[A-Z]/,
          message: "Password must contain at least one uppercase letter",
        },
        {
          type: "matches",
          value: /[a-z]/,
          message: "Password must contain at least one lowercase letter",
        },
        {
          type: "matches",
          value: /[0-9]/,
          message: "Password must contain at least one number",
        },
      ],
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      dependencies: ["password"],
      validations: [
        { type: "required", message: "Please confirm your password" },
      ],
    },
  ];

  // Define schema with validation
  const schema = z
    .object({
      username: z
        .string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  // Use our custom hook
  const { FormComponent } = useFormBuilder({
    fields,
    schema,
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      alert("Registration successful! Check console for form data.");
    },
    submitButtonText: "Register",
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
      <FormComponent />
    </div>
  );
}
