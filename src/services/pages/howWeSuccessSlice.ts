import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

type GetHowWeSuccessResponse = {
  success: boolean;
  message: string;
  payload: {
    title: string;
    description: string;
  }[];
  pagination: {
    totalData: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

type AddHowWeSuccessResponse = {
  success: boolean;
  message: string;
};

type UpdateHowWeSuccessResponse = {
  success: boolean;
  message: string;
};
const howWeSuccessSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all how we success
    getHowWeSuccess: builder.query<
      GetHowWeSuccessResponse,
      { page: number; limit: number; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `/how-we-success?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["HOW_WE_SUCCESS"],
    }),

    // Add a new how we success
    addHowWeSuccess: builder.mutation<AddHowWeSuccessResponse, FormData>({
      query: (data) => ({
        url: "add-how-we-success",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "HOW_WE_SUCCESS" }];
        }
        return [];
      },
    }),

    // update a new how we success
    updateHowWeSuccess: builder.mutation<UpdateHowWeSuccessResponse, FormData>({
      query: (data) => ({
        url: "update-how-we-success",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "HOW_WE_SUCCESS" }];
        }
        return [];
      },
    }),

    // delete how we success
    deleteHowWeSuccess: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-how-we-success/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "HOW_WE_SUCCESS" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useAddHowWeSuccessMutation,
  useUpdateHowWeSuccessMutation,
  useDeleteHowWeSuccessMutation,
  useGetHowWeSuccessQuery,
} = howWeSuccessSlice;
