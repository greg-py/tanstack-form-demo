import { useFormBuilder, FieldConfig } from "../hooks/useFormBuilder";
import { z } from "zod";

export function ContactForm() {
  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      validations: [
        { type: "required", message: "Name is required" },
        {
          type: "min",
          value: 2,
          message: "Name must be at least 2 characters",
        },
      ],
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email address",
      validations: [
        { type: "required", message: "Email is required" },
        { type: "email", message: "Please enter a valid email address" },
      ],
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "What is your message about?",
      validations: [{ type: "required", message: "Subject is required" }],
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Type your message here...",
      validations: [
        { type: "required", message: "Message is required" },
        {
          type: "min",
          value: 10,
          message: "Message must be at least 10 characters",
        },
      ],
    },
  ];

  // Define the schema
  const schema = z.object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z
      .string()
      .min(1, "Message is required")
      .min(10, "Message must be at least 10 characters"),
  });

  const { FormComponent } = useFormBuilder({
    fields,
    schema,
    onSubmit: (values) => {
      console.log("Contact form submitted:", values);
      alert("Thank you for your message! We'll get back to you soon.");
    },
    submitButtonText: "Send Message",
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
      <FormComponent />
    </div>
  );
}
