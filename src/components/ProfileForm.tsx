import { useFormBuilder, FieldConfig } from "../hooks/useFormBuilder";
import { useUserProfile } from "../hooks/useQueryHooks";
import { z } from "zod";

export function ProfileForm() {
  const {
    data: userData,
    isLoading,
    isError,
    updateProfile,
    isUpdating,
  } = useUserProfile();

  const fields: FieldConfig[] = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      validations: [{ type: "required", message: "First name is required" }],
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      validations: [{ type: "required", message: "Last name is required" }],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      validations: [
        { type: "required", message: "Email is required" },
        { type: "email", message: "Please enter a valid email address" },
      ],
    },
    {
      name: "occupation",
      label: "Occupation",
      type: "text",
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: [
        { label: "Select country", value: "" },
        { label: "United States", value: "USA" },
        { label: "Canada", value: "Canada" },
        { label: "United Kingdom", value: "UK" },
        { label: "Australia", value: "Australia" },
        { label: "Germany", value: "Germany" },
        { label: "France", value: "France" },
        { label: "Japan", value: "Japan" },
      ],
    },
    {
      name: "bio",
      label: "Bio",
      type: "textarea",
      placeholder: "Tell us about yourself",
    },
  ];

  // Define the schema
  const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    occupation: z.string().optional(),
    country: z.string().optional(),
    bio: z.string().optional(),
  });

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      await updateProfile(values);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const { FormComponent } = useFormBuilder({
    fields,
    schema,
    onSubmit: handleSubmit,
    submitButtonText: isUpdating ? "Saving..." : "Save Profile",
    defaultValues: userData || {},
    isLoading: isLoading || isUpdating,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3 mt-4"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
        <p className="text-red-500">
          Failed to load user data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
      <FormComponent />
    </div>
  );
}
