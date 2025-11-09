import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { removeAdminToken, setAdminToken } from "../../hooks/handelAdminToken"; // Adjust path as needed

// Auth State Interface
interface User {
  id: string;
  name: string;
  phone_number: string;
  role: string;
  image_url: string | null;
}

interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

// Initial State
const initialState: AuthState = {
  token: null,
  role: null,
  isAuthenticated: false,
  user: null,
};

// Create Slice
const authStoreSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeAuthData: (
      state,
      action: PayloadAction<{
        token: string;
        role: string;
        user: User;
      }>
    ) => {
      const { token, role, user } = action.payload;
      state.token = token;
      state.role = role;
      state.user = user;
      state.isAuthenticated = true;

      // Store token if you have a function for it
      if (token && setAdminToken) {
        setAdminToken(token);
      }
    },
    storeLogout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;
      if (removeAdminToken) {
        removeAdminToken();
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// Export Actions and Reducer
export const { storeAuthData, storeLogout, updateUser } =
  authStoreSlice.actions;
export default authStoreSlice.reducer;
