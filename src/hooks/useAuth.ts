// src/hooks/useAuth.ts
import { useAppDispatch, useAppSelector } from "@/services/store";
import { useState } from "react";

import {
  useCreatOrderMutation,
  useLoginMutation,
  useLogoutMutation,
} from "@/services/auth/authSlice";
import { storeAuthData, storeLogout } from "../services/feature/authStoreSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token, role, user } = useAppSelector(
    (state) => state.auth
  );
  const [loginApi, { isLoading: loginLoading }] = useLoginMutation();

  const [logoutApi] = useLogoutMutation();
  const [error, setError] = useState<string | null>(null);

  const [createOrderApi] = useCreatOrderMutation();

  // const login = async (
  //   phone_number: string,
  //   password: string
  // ): Promise<boolean> => {
  //   setError(null);
  //   try {
  //     const response = await loginApi({ phone_number, password }).unwrap();

  //     if (response.success) {
  //       // Use the actual response data from API
  //       const authData = {
  //         token: response.data.token,
  //         role: response.data.role,
  //         user: {
  //           id: response.data.id, // This is the user ID from response
  //           name: response.data.username,
  //           phone_number: response.data.phone_number,
  //           role: response.data.role,
  //           image_url: response.data.image_url,
  //         },
  //       };

  //       dispatch(storeAuthData(authData));
  //       return true;
  //     } else {
  //       setError(response.message || "Login failed");
  //       return false;
  //     }
  //   } catch (err: any) {
  //     const errorMessage =
  //       err?.data?.message || err?.error || "Login failed. Please try again.";
  //     setError(errorMessage);
  //     return false;
  //   }
  // };
  const login = async (formData): Promise<boolean> => {
    setError(null);
    try {
      // Create FormData for the request

      const response = await loginApi(formData).unwrap();

      if (response.success) {
        // Use the actual response data from API
        const authData = {
          token: response.data.token,
          role: response.data.user.role,
          user: {
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            is_active: response.data.user.is_active,
          },
        };

        dispatch(storeAuthData(authData as any));
        return true;
      } else {
        setError(response.message || "Login failed");
        return false;
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.error || "Login failed. Please try again.";
      setError(errorMessage);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Create FormData for the request

      const response = await logoutApi().unwrap();

      if (response.success) {
        dispatch(storeLogout());
        setError(null);

        return true;
      } else {
        setError(response.message || "Logout failed");
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.error || "Logout failed. Please try again.";
      setError(errorMessage);
      return false;
    }
  };

  const createOrder = async (data): Promise<boolean> => {
    setError(null);
    try {
      // Create data for the request

      const response = await createOrderApi(data).unwrap();

      if (response.success) {
        // Use the actual response data from API

        return true;
      } else {
        setError(response.message || "order failed");
        return false;
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err?.error || "order failed. Please try again.";
      setError(errorMessage);
      return false;
    }
  };
  const clearError = () => {
    setError(null);
  };

  return {
    isAuthenticated,
    user,
    token,
    role,
    login,
    logout,
    loginLoading,
    error,
    clearError,
    createOrder,
  };
};
