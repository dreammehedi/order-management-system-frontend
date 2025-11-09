// import { apiSlice } from "../api/apiSlice";

// export const tenantAdminSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Create tenant admin (register)
//     createTenantAdmin: builder.mutation({
//       query: (adminData: FormData) => ({
//         url: "/super-user/auth/admin-register",
//         method: "POST",
//         body: adminData, // FormData with username, phone_number, password, image_url, tenant_id
//       }),
//       invalidatesTags: ["TenantAdmin"],
//     }),
//   }),
// });

// export const { useCreateTenantAdminMutation } = tenantAdminSlice;
// super-user/tenant/:id
// get single tenant admins
// super-user/tenants
import { apiSlice } from "../api/apiSlice";

export const tenantAdminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create tenant admin (register)
    createTenantAdmin: builder.mutation({
      query: (adminData: FormData) => ({
        url: "/super-user/auth/admin-register",
        method: "POST",
        body: adminData, // FormData with username, phone_number, password, image_url, tenant_id
      }),
      invalidatesTags: ["TenantAdmin"],
    }),

    // Get tenant with admins
    getTenantWithAdmins: builder.query({
      query: (id: string) => `super-user/tenant/${id}`,
      providesTags: ["TenantAdmin"],
    }),
  }),
});

export const { useCreateTenantAdminMutation, useGetTenantWithAdminsQuery } =
  tenantAdminSlice;
