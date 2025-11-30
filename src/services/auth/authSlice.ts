import { getAdminToken } from "@/hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";
console.log("Admin token fetched:", getAdminToken());

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getProfile: builder.query({
      query: () => "auth/profile",
      providesTags: ["Auth"],
    }),

    creatOrder: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/orders",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useCreatOrderMutation,
  useGetOrdersQuery,
} = authSlice;
