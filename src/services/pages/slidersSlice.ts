import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

type GetSliderResponse = {
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

type AddSliderResponse = {
  success: boolean;
  message: string;
};

type UpdateSliderResponse = {
  success: boolean;
  message: string;
};
const slidersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all Slider
    getSliders: builder.query<
      GetSliderResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/pages-slider?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["SLIDERS"],
    }),

    // Add a new Slider
    addSlider: builder.mutation<AddSliderResponse, FormData>({
      query: (data) => ({
        url: "add-pages-slider",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SLIDERS" }];
        }
        return [];
      },
    }),

    // update a new Slider
    updateSlider: builder.mutation<UpdateSliderResponse, FormData>({
      query: (data) => ({
        url: "update-pages-slider",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SLIDERS" }];
        }
        return [];
      },
    }),

    // delete Slider
    deleteSlider: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-pages-slider/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SLIDERS" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetSlidersQuery,
  useAddSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = slidersSlice;
