# TanStack Form Components Demo

This repository demonstrates how to create reusable form components using TanStack Form and React. It features a set of standardized form input components with consistent styling and functionality.

## Features

- Modular form components that can be used independently or together
- Built with TanStack Form for powerful form state management
- TypeScript support for better type safety
- Tailwind CSS for consistent styling
- Zod integration for form validation
- Support for various input types:
  - Text inputs
  - Email inputs
  - Password inputs
  - Textareas
  - Select dropdowns
  - Checkboxes
  - Radio buttons
  - Number inputs

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Usage

### Individual Form Components

You can use the form components directly in your React components:

```tsx
import { useState } from "react";
import InputText from "./components/form/InputText";
import InputSelect from "./components/form/InputSelect";

function ExampleForm() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputText
        id="name"
        name="name"
        label="Full Name"
        value={name}
        onChange={setName}
        required
      />

      <InputSelect
        id="country"
        name="country"
        label="Country"
        value={country}
        onChange={setCountry}
        options={[
          { label: "United States", value: "us" },
          { label: "Canada", value: "ca" },
          { label: "United Kingdom", value: "uk" },
        ]}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Using the Form Builder Hook

The repository includes a `useFormBuilder` hook that makes it easy to create dynamic forms:

```tsx
import { z } from "zod";
import { useFormBuilder } from "./hooks/useFormBuilder";

// Define Zod schema for validation
const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Please select a country"),
});

function MyForm() {
  // Define form configuration
  const { FormComponent } = useFormBuilder({
    fields: [
      {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your name",
        validations: [{ type: "required", message: "Name is required" }],
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter your email",
        validations: [
          { type: "required", message: "Email is required" },
          { type: "email", message: "Must be a valid email" },
        ],
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: [
          { label: "United States", value: "us" },
          { label: "Canada", value: "ca" },
          { label: "United Kingdom", value: "uk" },
        ],
        validations: [{ type: "required", message: "Country is required" }],
      },
    ],
    schema: schema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
    submitButtonText: "Submit Form",
  });

  return <FormComponent />;
}
```

## Form Components

The repository includes the following components:

- `InputText`: Basic text input
- `InputEmail`: Email input (extends InputText)
- `InputPassword`: Password input (extends InputText)
- `InputTextarea`: Multiline text input
- `InputSelect`: Dropdown select input
- `InputCheckbox`: Checkbox input
- `InputRadio`: Radio button input group
- `InputNumber`: Numeric input (extends InputText)

## License

MIT
