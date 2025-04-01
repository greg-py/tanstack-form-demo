import { useFormBuilder, FieldConfig } from "../hooks/useFormBuilder";
import { useState, useEffect } from "react";
import { z } from "zod";

// Product data
const products = [
  { id: "p1", name: "Basic Widget", price: 19.99 },
  { id: "p2", name: "Advanced Widget", price: 39.99 },
  { id: "p3", name: "Premium Widget", price: 59.99 },
  { id: "p4", name: "Super Widget", price: 99.99 },
];

export function OrderForm() {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  // Calculate total price when product or quantity changes
  useEffect(() => {
    const product = products.find((p) => p.id === selectedProduct);
    if (product) {
      setTotal(parseFloat((product.price * quantity).toFixed(2)));
    } else {
      setTotal(0);
    }
  }, [selectedProduct, quantity]);

  const fields: FieldConfig[] = [
    {
      name: "product",
      label: "Select Product",
      type: "select",
      options: [
        { label: "Choose a product", value: "" },
        ...products.map((product) => ({
          label: `${product.name} - $${product.price}`,
          value: product.id,
        })),
      ],
      validations: [{ type: "required", message: "Please select a product" }],
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      defaultValue: 1,
      validations: [
        { type: "required", message: "Quantity is required" },
        { type: "min", value: 1, message: "Minimum quantity is 1" },
        { type: "max", value: 10, message: "Maximum quantity is 10" },
      ],
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Your first name",
      validations: [{ type: "required", message: "First name is required" }],
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Your last name",
      validations: [{ type: "required", message: "Last name is required" }],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Your email address",
      validations: [
        { type: "required", message: "Email is required" },
        { type: "email", message: "Please enter a valid email address" },
      ],
    },
    {
      name: "address",
      label: "Shipping Address",
      type: "textarea",
      placeholder: "Enter your full shipping address",
      validations: [
        { type: "required", message: "Shipping address is required" },
        { type: "min", value: 10, message: "Please enter a complete address" },
      ],
    },
  ];

  // Define schema with validation
  const schema = z.object({
    product: z.string().min(1, "Please select a product"),
    quantity: z.coerce
      .number()
      .min(1, "Minimum quantity is 1")
      .max(10, "Maximum quantity is 10"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    address: z
      .string()
      .min(1, "Shipping address is required")
      .min(10, "Please enter a complete address"),
  });

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Order submitted:", {
      ...values,
      total: total,
      productName: products.find((p) => p.id === values.product)?.name,
    });
    alert(`Order placed successfully! Total: $${total}`);
  };

  const { form, FormComponent } = useFormBuilder({
    fields,
    schema,
    onSubmit: handleSubmit,
    submitButtonText: "Place Order",
  });

  // Update our state when form values change
  useEffect(() => {
    const formValues = form.state.values;
    if (formValues.product && formValues.product !== selectedProduct) {
      setSelectedProduct(formValues.product as string);
    }

    if (formValues.quantity && Number(formValues.quantity) !== quantity) {
      setQuantity(Number(formValues.quantity));
    }
  }, [form.state.values, selectedProduct, quantity]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Form</h2>

      <FormComponent>
        {/* Display calculated total */}
        <div className="mt-6 mb-2 p-4 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total:</span>
            <span className="text-xl font-bold text-green-600">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </FormComponent>
    </div>
  );
}
