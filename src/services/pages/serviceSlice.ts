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
const serviceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all services
    getServices: builder.query<
      GetServiceResponse,
      { page: number; limit: number; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `/services?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["SERVICES"],
    }),

    // Add a new service
    addService: builder.mutation<AddServiceResponse, FormData>({
      query: (data) => ({
        url: "add-service",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SERVICES" }];
        }
        return [];
      },
    }),

    // update a new service
    updateService: builder.mutation<UpdateServiceResponse, FormData>({
      query: (data) => ({
        url: "update-service",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SERVICES" }];
        }
        return [];
      },
    }),

    // delete service
    deleteService: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-service/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SERVICES" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetServicesQuery,
  useAddServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceSlice;
