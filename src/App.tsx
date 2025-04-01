import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RegistrationForm } from "./components/RegistrationForm";
import { ContactForm } from "./components/ContactForm";
import { ProfileForm } from "./components/ProfileForm";
import { OrderForm } from "./components/OrderForm";
import { SurveyForm } from "./components/SurveyForm";

// Create a client
const queryClient = new QueryClient();

// Form types for the tabs
type FormType = "simple" | "contact" | "profile" | "order" | "survey";

function AppContent() {
  const [activeTab, setActiveTab] = useState<FormType>("simple");

  // Tabs data
  const tabs: { id: FormType; label: string; description: string }[] = [
    {
      id: "simple",
      label: "Simple Registration",
      description: "A simplified registration form built with our custom hook.",
    },
    {
      id: "contact",
      label: "Contact Form",
      description: "A simple contact form for user inquiries.",
    },
    {
      id: "profile",
      label: "User Profile",
      description: "An asynchronous form that loads and updates user data.",
    },
    {
      id: "order",
      label: "Order Form",
      description: "A product order form with dynamic calculations.",
    },
    {
      id: "survey",
      label: "Survey",
      description: "A customer feedback survey with various input types.",
    },
  ];

  // Render the active form component
  const renderActiveForm = () => {
    switch (activeTab) {
      case "simple":
        return <RegistrationForm />;
      case "contact":
        return <ContactForm />;
      case "profile":
        return <ProfileForm />;
      case "order":
        return <OrderForm />;
      case "survey":
        return <SurveyForm />;
      default:
        return <RegistrationForm />;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-indigo-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-800 mb-4">
            TanStack Form Builder Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of our extensible form abstraction built with TanStack
            Form. Select from the examples below to see different form types in
            action.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-indigo-100 shadow"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active tab description */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <p className="text-gray-600 text-lg">
            {tabs.find((tab) => tab.id === activeTab)?.description}
          </p>
        </div>

        {/* Form display area */}
        <div className="max-w-3xl mx-auto">{renderActiveForm()}</div>

        {/* Footer info */}
        <footer className="mt-16 text-center text-gray-500 text-sm pb-8">
          <p>
            Built with TanStack Form, React, and our custom useFormBuilder hook
            for simplified form creation.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
