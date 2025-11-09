import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

// consultation
type Data = {
  _id: string;
  title: string;
  description: string;
};

type GetDataResponse = {
  success: boolean;
  message: string;
  payload: Data[];
};

type UpdateDataResponse = {
  success: boolean;
  message: string;
};

// our testimonial type
type OurTestimonialData = {
  _id: string;
  title: string;
  description: string;
  totalClientCount: number;
  totalProjectCount: number;
  totalReviewCount: number;
};

type GetOurPortfolioResponse = {
  success: boolean;
  message: string;
  payload: OurTestimonialData[];
};

const sectionSettingsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get consultation
    getConsultation: builder.query<Data | null, void>({
      query: () => ({
        url: `/consultation`,
        method: "GET",
      }),
      providesTags: ["CONSULTATION"],
      transformResponse: (response: GetDataResponse) =>
        response.payload[0] || null,
    }),

    // update a new consultation
    updateConsultation: builder.mutation<UpdateDataResponse, FormData>({
      query: (data) => ({
        url: "update-consultation",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "CONSULTATION" }];
        }
        return [];
      },
    }),

    // Get our services
    getOurServices: builder.query<Data | null, void>({
      query: () => ({
        url: `/our-services`,
        method: "GET",
      }),
      providesTags: ["OUR_SERVICES"],
      transformResponse: (response: GetDataResponse) =>
        response.payload[0] || null,
    }),

    // update a our services
    updateOurServices: builder.mutation<UpdateDataResponse, FormData>({
      query: (data) => ({
        url: "update-our-services",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "OUR_SERVICES" }];
        }
        return [];
      },
    }),

    // Get our portfolio
    getOurPortfolio: builder.query<Data | null, void>({
      query: () => ({
        url: `/our-portfolio`,
        method: "GET",
      }),
      providesTags: ["OUR_PORTFOLIO"],
      transformResponse: (response: GetDataResponse) =>
        response.payload[0] || null,
    }),

    // update a our portfolio
    updateOurPortfolio: builder.mutation<UpdateDataResponse, FormData>({
      query: (data) => ({
        url: "update-our-portfolio",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "OUR_PORTFOLIO" }];
        }
        return [];
      },
    }),

    // Get our testimonial
    getOurTestimonial: builder.query<OurTestimonialData | null, void>({
      query: () => ({
        url: `/our-testimonial`,
        method: "GET",
      }),
      providesTags: ["OUR_TESTIMONIAL"],
      transformResponse: (response: GetOurPortfolioResponse) =>
        response.payload[0] || null,
    }),

    // update a our testimonial
    updateOurTestimonial: builder.mutation<UpdateDataResponse, FormData>({
      query: (data) => ({
        url: "update-our-testimonial",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "OUR_TESTIMONIAL" }];
        }
        return [];
      },
    }),

    // Get how to success
    getHowToSuccess: builder.query<Data | null, void>({
      query: () => ({
        url: `/how-to-success`,
        method: "GET",
      }),
      providesTags: ["HOW_TO_SUCCESS"],
      transformResponse: (response: GetDataResponse) =>
        response.payload[0] || null,
    }),

    // update a how to success
    updateHowToSuccess: builder.mutation<UpdateDataResponse, FormData>({
      query: (data) => ({
        url: "update-how-to-success",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "HOW_TO_SUCCESS" }];
        }
        return [];
      },
    }),

    // Get team member
    getOurTeamMember: builder.query<Data | null, void>({
      query: () => ({
        url: `/our-team-member`,
        method: "GET",
      }),
      providesTags: ["OUR_TEAM_MEMBER"],
      transformResponse: (response: GetDataResponse) =>
        response.payload[0] || null,
    }),

    // update a new team member
    updateOurTeamMember: builder.mutation<UpdateDataResponse, FormData>({
      query: (data) => ({
        url: "update-our-team-member",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "OUR_TEAM_MEMBER" }];
        }
        return [];
      },
    }),

    // Get our technology
    getOurTechnology: builder.query<Data | null, void>({
      query: () => ({
        url: `/our-technology`,
        method: "GET",
      }),
      providesTags: ["OUR_TECHNOLOGY"],
      transformResponse: (response: GetDataResponse) =>
        response.payload[0] || null,
    }),

    // update a technology
    updateOurTechnology: builder.mutation<UpdateDataResponse, FormData>({
      query: (data) => ({
        url: "update-our-technology",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "OUR_TECHNOLOGY" }];
        }
        return [];
      },
    }),

    // Get contact us
    getContactUs: builder.query<Data | null, void>({
      query: () => ({
        url: `/contact-us`,
        method: "GET",
      }),
      providesTags: ["CONTACT_US"],
      transformResponse: (response: GetDataResponse) =>
        response.payload[0] || null,
    }),

    // update a contact us
    updateContactUs: builder.mutation<UpdateDataResponse, FormData>({
      query: (data) => ({
        url: "update-contact-us",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "CONTACT_US" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetConsultationQuery,
  useUpdateConsultationMutation,
  useGetOurServicesQuery,
  useUpdateOurServicesMutation,
  useGetOurPortfolioQuery,
  useUpdateOurPortfolioMutation,
  useGetOurTestimonialQuery,
  useUpdateOurTestimonialMutation,
  useGetHowToSuccessQuery,
  useUpdateHowToSuccessMutation,
  useGetOurTeamMemberQuery,
  useUpdateOurTeamMemberMutation,
  useGetOurTechnologyQuery,
  useUpdateOurTechnologyMutation,
  useGetContactUsQuery,
  useUpdateContactUsMutation,
} = sectionSettingsSlice;
