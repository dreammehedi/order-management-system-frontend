// src/components/AuthInitializer.tsx

import { useAppDispatch, useAppSelector } from "@/services/store";
import { useEffect } from "react";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Initialize auth state from localStorage/persisted store
    // If you have an initializeAuth action, dispatch it here
    // dispatch(initializeAuth());

    // Or check localStorage directly
    const token = localStorage.getItem("adminToken");
    if (token && !isAuthenticated) {
      // You might want to validate the token here
      console.log("Token found in storage");
    }
  }, [dispatch, isAuthenticated]);

  return <>{children}</>;
};

export default AuthInitializer;
