import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

type GetTechnologyResponse = {
  success: boolean;
  message: string;
  payload: {
    title: string;
    category: string;
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

type AddTechnologyResponse = {
  success: boolean;
  message: string;
};

type UpdateTechnologyResponse = {
  success: boolean;
  message: string;
};
const technologySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all Technology
    getTechnology: builder.query<
      GetTechnologyResponse,
      { page: number; limit: number; search: string; category: string }
    >({
      query: ({ page, limit, search, category }) => ({
        url: `/technology?page=${page}&limit=${limit}&search=${search}&category=${category}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["TECHNOLOGY"],
    }),

    // Add a new Technology
    addTechnology: builder.mutation<AddTechnologyResponse, FormData>({
      query: (data) => ({
        url: "add-technology",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TECHNOLOGY" }];
        }
        return [];
      },
    }),

    // update a new Technology
    updateTechnology: builder.mutation<UpdateTechnologyResponse, FormData>({
      query: (data) => ({
        url: "update-technology",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TECHNOLOGY" }];
        }
        return [];
      },
    }),

    // delete Technology
    deleteTechnology: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-technology/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TECHNOLOGY" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetTechnologyQuery,
  useAddTechnologyMutation,
  useUpdateTechnologyMutation,
  useDeleteTechnologyMutation,
} = technologySlice;
