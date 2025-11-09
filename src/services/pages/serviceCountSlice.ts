import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

type GetServiceResponse = {
  success: boolean;
  message: string;
  payload: {
    name: string;
    description: string;
    image: string;
  }[];
  pagination: {
    totalData: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

type AddServiceResponse = {
  success: boolean;
  message: string;
};

type UpdateServiceResponse = {
  success: boolean;
  message: string;
};
const serviceCountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all services counts
    getServicesCounts: builder.query<
      GetServiceResponse,
      { page: number; limit: number; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `/services-counts?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["SERVICES_COUNTS"],
    }),

    // Add a new service count
    addServiceCount: builder.mutation<AddServiceResponse, FormData>({
      query: (data) => ({
        url: "add-service-count",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SERVICES_COUNTS" }];
        }
        return [];
      },
    }),

    // update a new service count
    updateServiceCount: builder.mutation<UpdateServiceResponse, FormData>({
      query: (data) => ({
        url: "update-service-count",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SERVICES_COUNTS" }];
        }
        return [];
      },
    }),

    // delete service count
    deleteServiceCount: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-service-count/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SERVICES_COUNTS" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetServicesCountsQuery,
  useAddServiceCountMutation,
  useUpdateServiceCountMutation,
  useDeleteServiceCountMutation,
} = serviceCountSlice;
