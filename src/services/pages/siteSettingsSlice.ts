import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

// site configuration type
type SiteConfiguration = {
  _id: string;
  title: string;
  description: string;
  copyRights: string;
};

type GetSiteConfigurationResponse = {
  success: boolean;
  message: string;
  payload: SiteConfiguration[];
};

type UpdateSiteConfigurationResponse = {
  success: boolean;
  message: string;
};

// contact info type
type ContactInfo = {
  _id: string;
  phoneNumberFirst: string;
  phoneNumberSecond: string;
  emailAddressFirst: string;
  emailAddressSecond: string;
  contactAddress: string;
};

type GetContactInfoResponse = {
  success: boolean;
  message: string;
  payload: ContactInfo[];
};

type UpdateContactInfoResponse = {
  success: boolean;
  message: string;
};

// social media type
type SocialMedia = {
  _id: string;
  facebookLink: string;
  twitterLink: string;
  linkedinLink: string;
  instagramLink: string;
  youtubeLink: string;
  whatsappNumber: string;
};

type GetSocialMediaResponse = {
  success: boolean;
  message: string;
  payload: SocialMedia[];
};

type UpdateSocialMediaResponse = {
  success: boolean;
  message: string;
};

// social media type
type LogoAndFavicon = {
  _id: string;
  logoLink: string;
  faviconLink: string;
  logoPublicId: string;
  faviconPublicId: string;
};

type GetLogoAndFaviconResponse = {
  success: boolean;
  message: string;
  payload: LogoAndFavicon[];
};

type UpdateLogoAndFaviconResponse = {
  success: boolean;
  message: string;
};

// email configuration type
type EmailConfiguration = {
  _id: string;
  emailMailer: string;
  emailHost: string;
  emailPort: number;
  emailPassword: string;
  emailEncryption: string;
  emailFromName: string;
  emailAddress: string;
  emailUserName: string;
};

type GetEmailConfigurationResponse = {
  success: boolean;
  message: string;
  payload: EmailConfiguration[];
};

type UpdateEmailConfigurationResponse = {
  success: boolean;
  message: string;
};

const siteSettingsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get site configuration
    getSiteConfiguration: builder.query<SiteConfiguration | null, void>({
      query: () => ({
        url: `/site-configuration`,
        method: "GET",
      }),
      providesTags: ["SITE_CONFIGURATION"],
      transformResponse: (response: GetSiteConfigurationResponse) =>
        response.payload[0] || null,
    }),

    // update a new  site configuration
    updateSiteConfiguration: builder.mutation<
      UpdateSiteConfigurationResponse,
      FormData
    >({
      query: (data) => ({
        url: "update-site-configuration",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SITE_CONFIGURATION" }];
        }
        return [];
      },
    }),

    // Get contact info
    getContactInfo: builder.query<ContactInfo | null, void>({
      query: () => ({
        url: `/contact-info`,
        method: "GET",
      }),
      providesTags: ["CONTACT_INFO"],
      transformResponse: (response: GetContactInfoResponse) =>
        response.payload[0] || null,
    }),

    // update a new  contact info
    updateContactInfo: builder.mutation<UpdateContactInfoResponse, FormData>({
      query: (data) => ({
        url: "update-contact-info",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "CONTACT_INFO" }];
        }
        return [];
      },
    }),

    // Get social media
    getSocialMedia: builder.query<SocialMedia | null, void>({
      query: () => ({
        url: `/social-media`,
        method: "GET",
      }),
      providesTags: ["SOCIAL_MEDIA"],
      transformResponse: (response: GetSocialMediaResponse) =>
        response.payload[0] || null,
    }),

    // update a new  social media
    updateSocialMedia: builder.mutation<UpdateSocialMediaResponse, FormData>({
      query: (data) => ({
        url: "update-social-media",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "SOCIAL_MEDIA" }];
        }
        return [];
      },
    }),

    // Get logo and favicon
    getLogoAndFavicon: builder.query<LogoAndFavicon | null, void>({
      query: () => ({
        url: `/logo-and-favicon`,
        method: "GET",
      }),
      providesTags: ["LOGO_AND_FAVICON"],
      transformResponse: (response: GetLogoAndFaviconResponse) =>
        response.payload[0] || null,
    }),

    // update a new logo and favicon
    updateLogoAndFavicon: builder.mutation<
      UpdateLogoAndFaviconResponse,
      FormData
    >({
      query: (data) => ({
        url: "update-logo-and-favicon",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "LOGO_AND_FAVICON" }];
        }
        return [];
      },
    }),

    // Get email configaration
    getEmailConfiguration: builder.query<EmailConfiguration | null, void>({
      query: () => ({
        url: `/email-configuration`,
        method: "GET",
      }),
      providesTags: ["EMAIL_CONFIGURATION"],
      transformResponse: (response: GetEmailConfigurationResponse) =>
        response.payload[0] || null,
    }),

    // update a new email configuration
    updateEmailConfiguration: builder.mutation<
      UpdateEmailConfigurationResponse,
      FormData
    >({
      query: (data) => ({
        url: "update-email-configuration",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "EMAIL_CONFIGURATION" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetSiteConfigurationQuery,
  useUpdateSiteConfigurationMutation,
  useGetContactInfoQuery,
  useUpdateContactInfoMutation,
  useGetSocialMediaQuery,
  useUpdateSocialMediaMutation,
  useGetLogoAndFaviconQuery,
  useUpdateLogoAndFaviconMutation,
  useGetEmailConfigurationQuery,
  useUpdateEmailConfigurationMutation,
} = siteSettingsSlice;
