import { apiSlice } from "../api/apiSlice";

type GetContactUserResponse = {
  success: boolean;
  message: string;
  payload: {
    name: string;
    phoneNumber: number;
    email: string;
    subject: string;
    message: string;
  }[];
  pagination: {
    totalData: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

const contactSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all contact user
    getContactUser: builder.query<
      GetContactUserResponse,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/contact?page=${page}&limit=${limit}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["CONTACT"],
    }),
  }),
});

export const { useGetContactUserQuery } = contactSlice;
