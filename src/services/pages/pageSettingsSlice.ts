import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

// terms and condition & privacy policy type
type PrivacyPolicy = {
  _id: string;
  description: string;
};

type GetPrivacyPolicyResponse = {
  success: boolean;
  message: string;
  payload: PrivacyPolicy[];
};

type UpdatePrivacyPolicyResponse = {
  success: boolean;
  message: string;
};

// about us type
type AboutUs = {
  _id: string;
  shortTitle: string;
  description: string;
  ourMission: string;
  ourVision: string;
};

type GetAboutUsResponse = {
  success: boolean;
  message: string;
  payload: AboutUs[];
};

type UpdateAboutUsResponse = {
  success: boolean;
  message: string;
};

const pageSettingsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get privacy policy
    getPrivacyPolicy: builder.query<PrivacyPolicy | null, void>({
      query: () => ({
        url: `/privacy-policy`,
        method: "GET",
      }),
      providesTags: ["PRIVACY_POLICY"],
      transformResponse: (response: GetPrivacyPolicyResponse) =>
        response.payload[0] || null,
    }),

    // update a new privacy policy
    updatePrivacyPolicy: builder.mutation<
      UpdatePrivacyPolicyResponse,
      FormData
    >({
      query: (data) => ({
        url: "update-privacy-policy",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "PRIVACY_POLICY" }];
        }
        return [];
      },
    }),

    // Get terms and conditions
    getTermsAndConditions: builder.query<PrivacyPolicy | null, void>({
      query: () => ({
        url: `/terms-and-conditions`,
        method: "GET",
      }),
      providesTags: ["TERMS_AND_CONDITIONS"],
      transformResponse: (response: GetPrivacyPolicyResponse) =>
        response.payload[0] || null,
    }),

    // update a new terms and conditions
    updateTermsAndConditions: builder.mutation<
      UpdatePrivacyPolicyResponse,
      FormData
    >({
      query: (data) => ({
        url: "update-terms-and-conditions",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TERMS_AND_CONDITIONS" }];
        }
        return [];
      },
    }),

    // Get about us
    getAboutUs: builder.query<AboutUs | null, void>({
      query: () => ({
        url: `/about-us`,
        method: "GET",
      }),
      providesTags: ["ABOUT_US"],
      transformResponse: (response: GetAboutUsResponse) =>
        response.payload[0] || null,
    }),

    // update a new about us
    updateAboutUs: builder.mutation<UpdateAboutUsResponse, FormData>({
      query: (data) => ({
        url: "update-about-us",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "ABOUT_US" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} = pageSettingsSlice;
