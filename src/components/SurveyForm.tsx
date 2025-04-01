import { useFormBuilder, FieldConfig } from "../hooks/useFormBuilder";
import { z } from "zod";

export function SurveyForm() {
  const fields: FieldConfig[] = [
    {
      name: "satisfaction",
      label: "How satisfied are you with our service?",
      type: "select",
      options: [
        { label: "Select an option", value: "" },
        { label: "Very Satisfied", value: "very_satisfied" },
        { label: "Satisfied", value: "satisfied" },
        { label: "Neutral", value: "neutral" },
        { label: "Dissatisfied", value: "dissatisfied" },
        { label: "Very Dissatisfied", value: "very_dissatisfied" },
      ],
      validations: [{ type: "required", message: "Please select an option" }],
    },
    {
      name: "usageFrequency",
      label: "How often do you use our product?",
      type: "select",
      options: [
        { label: "Select an option", value: "" },
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" },
        { label: "Rarely", value: "rarely" },
        { label: "Never", value: "never" },
      ],
      validations: [{ type: "required", message: "Please select an option" }],
    },
    {
      name: "features",
      label: "Which feature do you find most valuable?",
      type: "select",
      options: [
        { label: "Select a feature", value: "" },
        { label: "User Interface", value: "ui" },
        { label: "Performance", value: "performance" },
        { label: "Reliability", value: "reliability" },
        { label: "Customer Support", value: "support" },
        { label: "Documentation", value: "docs" },
      ],
      validations: [{ type: "required", message: "Please select a feature" }],
    },
    {
      name: "improvements",
      label: "What would you like us to improve?",
      type: "textarea",
      placeholder: "Please share your suggestions for improvement...",
      validations: [
        {
          type: "min",
          value: 10,
          message: "Please provide at least 10 characters",
        },
      ],
    },
    {
      name: "recommendation",
      label: "How likely are you to recommend our product to others?",
      type: "select",
      options: [
        { label: "Select a rating", value: "" },
        { label: "5 - Highly Likely", value: "5" },
        { label: "4 - Likely", value: "4" },
        { label: "3 - Neutral", value: "3" },
        { label: "2 - Unlikely", value: "2" },
        { label: "1 - Highly Unlikely", value: "1" },
      ],
      validations: [{ type: "required", message: "Please select a rating" }],
    },
    {
      name: "email",
      label: "Email (optional)",
      type: "email",
      placeholder: "Enter your email if you'd like a response",
      validations: [
        { type: "email", message: "Please enter a valid email address" },
      ],
    },
  ];

  // Define schema with validation
  const schema = z.object({
    satisfaction: z.string().min(1, "Please select an option"),
    usageFrequency: z.string().min(1, "Please select an option"),
    features: z.string().min(1, "Please select a feature"),
    improvements: z
      .string()
      .min(10, "Please provide at least 10 characters")
      .optional(),
    recommendation: z.string().min(1, "Please select a rating"),
    email: z.string().email("Please enter a valid email address").optional(),
  });

  const { FormComponent } = useFormBuilder({
    fields,
    schema,
    onSubmit: (values) => {
      console.log("Survey submitted:", values);
      alert(
        "Thank you for completing our survey! Your feedback is valuable to us."
      );
    },
    submitButtonText: "Submit Survey",
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Customer Feedback
      </h2>
      <p className="mb-6 text-gray-600">
        We value your feedback. Please take a moment to complete this survey and
        help us improve our services.
      </p>
      <FormComponent />
    </div>
  );
}
