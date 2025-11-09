import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import slices
import authStoreReducer from "../services/feature/authStoreSlice";
import { apiSlice } from "./api/apiSlice";

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: authStoreReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: import.meta.env.MODE === "development",
});

// Persistor
export const persistor = persistStore(store);

// Typings for RootState and AppDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Typed Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
