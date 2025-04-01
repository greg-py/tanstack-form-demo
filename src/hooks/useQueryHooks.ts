import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock API functions
const fetchUserProfile = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "I'm a software developer with over 5 years of experience.",
    occupation: "Software Developer",
    country: "USA",
  };
};

const updateUserProfile = async (userData: Record<string, unknown>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("API call: Update user profile", userData);
  return { success: true };
};

const fetchOrderDetails = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    product: "Premium Widget",
    quantity: 2,
    shippingMethod: "express",
    notes: "Please handle with care",
  };
};

const updateOrder = async (orderData: Record<string, unknown>) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("API call: Update order", orderData);
  return { success: true };
};

// Query hooks
export function useUserProfile() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    updateProfile: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}

export function useOrderDetails() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["orderDetails"],
    queryFn: fetchOrderDetails,
  });

  const mutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderDetails"] });
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    updateOrder: mutation.mutate,
    isUpdating: mutation.isPending,
  };
}
