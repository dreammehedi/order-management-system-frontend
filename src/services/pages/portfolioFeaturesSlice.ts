import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

type GetPortfolioFeaturesResponse = {
  success: boolean;
  message: string;
  payload: {
    title: string;
    description: string;
    portfolioId: string;
  }[];
  pagination: {
    totalData: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};
type ViewPortfolioFeaturesResponse = {
  success: boolean;
  message: string;
  payload: {
    title: string;
    description: string;
    _id: string;
  }[];
};

type AddPortfolioFeaturesResponse = {
  success: boolean;
  message: string;
};

type UpdatePortfolioFeaturesResponse = {
  success: boolean;
  message: string;
};

const portfolioFeaturesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all portfolio features
    getPortfolioFeatures: builder.query<
      GetPortfolioFeaturesResponse,
      { page: number; limit: number; search: string; portfolioId: string }
    >({
      query: ({ page, limit, search, portfolioId }) => ({
        url: `/portfolio-features?page=${page}&limit=${limit}&search=${search}&portfolioId=${portfolioId}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["PORTFOLIO_FEATURES"],
    }),

    // Add a new portfolio feature
    addPortfolioFeature: builder.mutation<
      AddPortfolioFeaturesResponse,
      FormData
    >({
      query: (data) => ({
        url: "add-portfolio-feature",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: ["PORTFOLIO_FEATURES"],
    }),

    // Update a portfolio feature
    updatePortfolioFeature: builder.mutation<
      UpdatePortfolioFeaturesResponse,
      FormData
    >({
      query: (data) => ({
        url: "update-portfolio-feature",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: ["PORTFOLIO_FEATURES"],
    }),

    // Delete a portfolio feature
    deletePortfolioFeature: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-portfolio-feature/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: ["PORTFOLIO_FEATURES"],
    }),

    // View portfolio feature
    viewPortfolioFeatures: builder.query<
      ViewPortfolioFeaturesResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/view-portfolio-feature/${id}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      providesTags: ["PORTFOLIO_FEATURES"],
    }),
  }),
});

export const {
  useGetPortfolioFeaturesQuery,
  useAddPortfolioFeatureMutation,
  useUpdatePortfolioFeatureMutation,
  useDeletePortfolioFeatureMutation,
  useViewPortfolioFeaturesQuery,
} = portfolioFeaturesSlice;
