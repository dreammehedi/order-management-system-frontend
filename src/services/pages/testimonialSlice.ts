import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

type GetTestimonialResponse = {
  success: boolean;
  message: string;
  payload: {
    name: string;
    address: string;
    rating: number;
    review: string;
    image: string;
  }[];
  pagination: {
    totalData: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

type AddTestimonialResponse = {
  success: boolean;
  message: string;
};

type UpdateTestimonialResponse = {
  success: boolean;
  message: string;
};
const testimonialSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all testimonial
    getTestimonials: builder.query<
      GetTestimonialResponse,
      { page: number; limit: number; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `/testimonial?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["TESTIMONIALS"],
    }),

    // Add a new testimonial
    addTestimonial: builder.mutation<AddTestimonialResponse, FormData>({
      query: (data) => ({
        url: "add-testimonial",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TESTIMONIALS" }];
        }
        return [];
      },
    }),

    // update a new testimonial
    updateTestimonial: builder.mutation<UpdateTestimonialResponse, FormData>({
      query: (data) => ({
        url: "update-testimonial",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TESTIMONIALS" }];
        }
        return [];
      },
    }),

    // delete testimonial
    deleteTestimonial: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-testimonial/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TESTIMONIALS" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useAddTestimonialMutation,
  useGetTestimonialsQuery,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialSlice;
