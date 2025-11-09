// // src/services/api/tenantSlice.ts
// import { apiSlice } from "../api/apiSlice";

// export const tenantSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get all tenants
//     getTenants: builder.query({
//       query: () => "admin/tenants",
//       providesTags: ["Tenant"],
//     }),

//     // Get single tenant by ID
//     getTenant: builder.query({
//       query: (id) => `super-user/tenant/${id}`,
//       providesTags: (result, error, id) => [{ type: "Tenant", id }],
//     }),

//     // Create new tenant
//     createTenant: builder.mutation({
//       query: (tenantData) => ({
//         url: "super-user/tenant",
//         method: "POST",
//         body: tenantData,
//       }),
//       invalidatesTags: ["Tenant"],
//     }),

//     // Update tenant
//     updateTenant: builder.mutation({
//       query: ({ id, ...updates }) => ({
//         url: `super-user/tenant/${id}`,
//         method: "PUT",
//         body: updates,
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         "Tenant",
//         { type: "Tenant", id },
//       ],
//     }),

//     // Delete tenant
//     // In your tenantSlice.ts, update the deleteTenant mutation
//     deleteTenant: builder.mutation({
//       query: (deletePayload: { id: string; user_id: string }) => ({
//         url: `super-user/tenant/${deletePayload.id}`,
//         method: "DELETE",
//         body: { user_id: deletePayload.user_id }, // Send user_id in the body
//       }),
//       invalidatesTags: ["Tenant"],
//     }),

//     // Bulk delete tenants
//     bulkDeleteTenants: builder.mutation({
//       query: (ids) => ({
//         url: "super-user/tenant/bulk-delete",
//         method: "POST",
//         body: { ids },
//       }),
//       invalidatesTags: ["Tenant"],
//     }),
//   }),
// });

// export const {
//   useGetTenantsQuery,
//   useGetTenantQuery,
//   useCreateTenantMutation,
//   useUpdateTenantMutation,
//   useDeleteTenantMutation,
//   useBulkDeleteTenantsMutation,
// } = tenantSlice;
// src/services/api/tenantSlice.ts
import { apiSlice } from "../api/apiSlice";

export const tenantSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tenants
    getTenants: builder.query({
      query: () => "super-user/tenants",
      providesTags: ["Tenant"],
    }),

    // Get single tenant by ID
    getTenant: builder.query({
      query: (id) => `super-user/tenant/${id}`,
      providesTags: (result, error, id) => [{ type: "Tenant", id }],
    }),

    // Create new tenant
    createTenant: builder.mutation({
      query: (tenantData) => ({
        url: "super-user/tenant",
        method: "POST",
        body: tenantData,
      }),
      invalidatesTags: ["Tenant"],
    }),

    // Update tenant
    updateTenant: builder.mutation({
      query: (updateData) => ({
        url: "super-user/tenant",
        method: "PATCH",
        body: updateData, // Send id and all updates in the body
      }),
      invalidatesTags: ["Tenant"],
    }),

    // Delete tenant
    // In your tenantSlice.ts, update the deleteTenant mutation
    deleteTenant: builder.mutation({
      query: (deletePayload: { id: string; user_id: string }) => ({
        url: `super-user/tenant/${deletePayload.id}`,
        method: "DELETE",
        body: { user_id: deletePayload.user_id }, // Send user_id in the body
      }),
      invalidatesTags: ["Tenant"],
    }),

    // Bulk delete tenants
    bulkDeleteTenants: builder.mutation({
      query: (ids) => ({
        url: "super-user/tenant/bulk-delete",
        method: "POST",
        body: { ids },
      }),
      invalidatesTags: ["Tenant"],
    }),
  }),
});

export const {
  useGetTenantsQuery,
  useGetTenantQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useBulkDeleteTenantsMutation,
} = tenantSlice;
