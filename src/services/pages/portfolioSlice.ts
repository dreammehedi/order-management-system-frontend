import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

type GetPortfolioResponse = {
  success: boolean;
  message: string;
  payload: {
    _id: string;
    name: string;
    description: string;
    image: string;
    demoLink: string;
    features: {
      title: string;
      description: string;
    }[];
  }[];
  pagination: {
    totalData: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

type AddPortfolioResponse = {
  success: boolean;
  message: string;
};

type UpdatePortfolioResponse = {
  success: boolean;
  message: string;
};
const portfolioSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all portfolio
    getAllPortfolios: builder.query<GetPortfolioResponse, void>({
      query: () => ({
        url: `/all-portfolios`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["PORTFOLIO"],
    }),

    // Get portfolio
    getPortfolio: builder.query<
      GetPortfolioResponse,
      { page: number; limit: number; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `/portfolio?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["PORTFOLIO"],
    }),

    // Add a new portfolio
    addPortfolio: builder.mutation<AddPortfolioResponse, FormData>({
      query: (data) => ({
        url: "add-portfolio",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "PORTFOLIO" }];
        }
        return [];
      },
    }),

    // update a new portfolio
    updatePortfolio: builder.mutation<UpdatePortfolioResponse, FormData>({
      query: (data) => ({
        url: "update-portfolio",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "PORTFOLIO" }];
        }
        return [];
      },
    }),

    // delete portfolio
    deletePortfolio: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-portfolio/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "PORTFOLIO" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetAllPortfoliosQuery,
  useGetPortfolioQuery,
  useAddPortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioSlice;
