// // // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // // export const apiSlice = createApi({
// // //   reducerPath: "api",
// // //   baseQuery: fetchBaseQuery({
// // //     // baseUrl: "http://localhost:5000/api/",
// // //     baseUrl: import.meta.env.VITE_BASE_URL,
// // //   }),

// // //   keepUnusedDataFor: 60,
// // //   tagTypes: [
// // //     "ADMIN",
// // //     "SERVICES",
// // //     "SERVICES_COUNTS",
// // //     "TEAM_MEMBERS",
// // //     "PRIVACY_POLICY",
// // //     "TERMS_AND_CONDITIONS",
// // //     "SITE_CONFIGURATION",
// // //     "ABOUT_US",
// // //     "CONTACT_INFO",
// // //     "SOCIAL_MEDIA",
// // //     "LOGO_AND_FAVICON",
// // //     "CEO",
// // //     "CORE_VALUE",
// // //     "EMAIL_CONFIGURATION",
// // //     "PORTFOLIO",
// // //     "PORTFOLIO_FEATURES",
// // //     "CONSULTATION",
// // //     "OUR_SERVICES",
// // //     "OUR_PORTFOLIO",
// // //     "OUR_TESTIMONIAL",
// // //     "HOW_TO_SUCCESS",
// // //     "OUR_TEAM_MEMBER",
// // //     "OUR_TECHNOLOGY",
// // //     "CONTACT_US",
// // //     "CONTACT",
// // //     "HOW_WE_SUCCESS",
// // //     "TECHNOLOGY",
// // //     "TESTIMONIALS",
// // //     "SLIDERS",
// // //     "Tenant",
// // //   ],
// // //   endpoints: () => ({}),
// // // });
// // import type {
// //   BaseQueryFn,
// //   FetchArgs,
// //   FetchBaseQueryError,
// // } from "@reduxjs/toolkit/query";
// // import { createApi } from "@reduxjs/toolkit/query/react";
// // import { SignJWT } from "jose";

// // // ============================================================================
// // // API KEY MANAGEMENT
// // // ============================================================================
// // let cachedApiKey = "";
// // let apiKeyGenerationPromise: Promise<string> | null = null;

// // async function generateApiKey(): Promise<string> {
// //   const secret = import.meta.env.VITE_JWT_SECRET || "your-secret-key";
// //   const payload = {
// //     app: "admin-dashboard",
// //     timestamp: Date.now(),
// //     tenant: "super-admin",
// //   };

// //   return new SignJWT(payload)
// //     .setProtectedHeader({ alg: "HS256" })
// //     .setIssuedAt()
// //     .setExpirationTime("24h")
// //     .sign(new TextEncoder().encode(secret));
// // }

// // export const getApiKey = async (): Promise<string> => {
// //   if (cachedApiKey) return cachedApiKey;
// //   if (!apiKeyGenerationPromise) {
// //     apiKeyGenerationPromise = generateApiKey();
// //   }
// //   cachedApiKey = await apiKeyGenerationPromise;
// //   apiKeyGenerationPromise = null;
// //   return cachedApiKey;
// // };

// // export const regenerateApiKey = async (): Promise<string> => {
// //   cachedApiKey = "";
// //   apiKeyGenerationPromise = generateApiKey();
// //   cachedApiKey = await apiKeyGenerationPromise;
// //   apiKeyGenerationPromise = null;
// //   return cachedApiKey;
// // };

// // // ============================================================================
// // // CUSTOM BASE QUERY WITH API KEY
// // // ============================================================================
// // const customBaseQuery: BaseQueryFn<
// //   string | FetchArgs,
// //   unknown,
// //   FetchBaseQueryError
// // > = async (args, _api, _extraOptions) => {
// //   const baseUrl = import.meta.env.VITE_BASE_URL;

// //   if (!baseUrl) {
// //     return {
// //       error: {
// //         status: "CUSTOM_ERROR",
// //         error: "Base URL not configured",
// //         data: { message: "Base URL missing" },
// //       },
// //     };
// //   }

// //   // Prepare request parameters
// //   let url: string;
// //   let request: RequestInit = {};
// //   let params: Record<string, any> | undefined;

// //   if (typeof args === "string") {
// //     url = args;
// //   } else {
// //     url = args.url;
// //     request = {
// //       method: args.method || "GET",
// //       body: args.body,
// //       headers: (args.headers as Record<string, string>) || {},
// //     };
// //     params = (args as any).params;
// //   }

// //   // Build full URL
// //   let fullUrl = `${baseUrl}${url}`;
// //   if (params) {
// //     fullUrl += `?${new URLSearchParams(params).toString()}`;
// //   }

// //   // Prepare headers
// //   const headers = new Headers();

// //   // Add API key to headers (x-api-key)
// //   try {
// //     const apiKey = await getApiKey();
// //     if (apiKey) {
// //       headers.set("x-api-key", apiKey);
// //     }
// //   } catch (err) {
// //     console.error("API key generation failed:", err);
// //     return {
// //       error: {
// //         status: "CUSTOM_ERROR",
// //         error: "API key generation failed",
// //         data: { message: "Failed to generate API key" },
// //       },
// //     };
// //   }

// //   // Add Authorization header if token exists
// //   const token = localStorage.getItem("adminToken");
// //   if (token) {
// //     headers.set("Authorization", `Bearer ${token}`);
// //   }

// //   // Add custom headers from request
// //   if (request.headers) {
// //     Object.entries(request.headers).forEach(([key, value]) => {
// //       headers.set(key, value);
// //     });
// //   }

// //   // Set default Content-Type if not provided
// //   if (
// //     !headers.has("Content-Type") &&
// //     request.body &&
// //     typeof request.body !== "string"
// //   ) {
// //     headers.set("Content-Type", "application/json");
// //   }

// //   // Handle request body
// //   if (request.body) {
// //     if (request.body instanceof FormData) {
// //       // For FormData, let browser set Content-Type
// //       request.body = request.body;
// //     } else if (typeof request.body === "string") {
// //       request.body = request.body;
// //     } else {
// //       // JSON data
// //       request.body = JSON.stringify(request.body);
// //     }
// //   }

// //   // Final fetch options
// //   const fetchOptions: RequestInit = {
// //     method: request.method,
// //     headers,
// //     body: request.body,
// //   };

// //   try {
// //     const response = await fetch(fullUrl, fetchOptions);

// //     let data: any;
// //     const contentType = response.headers.get("content-type");

// //     if (contentType && contentType.includes("application/json")) {
// //       data = await response.json();
// //     } else {
// //       data = await response.text();
// //     }

// //     if (!response.ok) {
// //       return {
// //         error: {
// //           status: response.status,
// //           data,
// //         },
// //       };
// //     }

// //     return { data };
// //   } catch (error: any) {
// //     return {
// //       error: {
// //         status: "FETCH_ERROR",
// //         error: error.message || String(error),
// //       },
// //     };
// //   }
// // };

// // // ============================================================================
// // // BASE QUERY WITH REAUTH
// // // ============================================================================
// // const baseQueryWithReauth: BaseQueryFn<
// //   string | FetchArgs,
// //   unknown,
// //   FetchBaseQueryError
// // > = async (args, api, extraOptions) => {
// //   let result = await customBaseQuery(args, api, extraOptions);

// //   // Retry logic for API key issues (code 103)
// //   let retryCount = 0;
// //   const maxRetries = 2;

// //   while ((result?.data as any)?.code === 103 && retryCount < maxRetries) {
// //     await regenerateApiKey();
// //     retryCount++;
// //     result = await customBaseQuery(args, api, extraOptions);
// //   }

// //   // Handle authentication errors
// //   if (result.error) {
// //     const status = result.error.status;
// //     if (status === 401) {
// //       // You can dispatch logout action here if needed
// //       // api.dispatch(logout());
// //       console.error("Authentication failed");
// //     }
// //   }

// //   return result;
// // };

// // // ============================================================================
// // // API SLICE
// // // ============================================================================
// // export const apiSlice = createApi({
// //   reducerPath: "api",
// //   baseQuery: baseQueryWithReauth,
// //   keepUnusedDataFor: 60,
// //   tagTypes: [
// //     "ADMIN",
// //     "SERVICES",
// //     "SERVICES_COUNTS",
// //     "TEAM_MEMBERS",
// //     "PRIVACY_POLICY",
// //     "TERMS_AND_CONDITIONS",
// //     "SITE_CONFIGURATION",
// //     "ABOUT_US",
// //     "CONTACT_INFO",
// //     "SOCIAL_MEDIA",
// //     "LOGO_AND_FAVICON",
// //     "CEO",
// //     "CORE_VALUE",
// //     "EMAIL_CONFIGURATION",
// //     "PORTFOLIO",
// //     "PORTFOLIO_FEATURES",
// //     "CONSULTATION",
// //     "OUR_SERVICES",
// //     "OUR_PORTFOLIO",
// //     "OUR_TESTIMONIAL",
// //     "HOW_TO_SUCCESS",
// //     "OUR_TEAM_MEMBER",
// //     "OUR_TECHNOLOGY",
// //     "CONTACT_US",
// //     "CONTACT",
// //     "HOW_WE_SUCCESS",
// //     "TECHNOLOGY",
// //     "TESTIMONIALS",
// //     "SLIDERS",
// //     "Tenant",
// //     "Auth", // Added Auth tag type
// //   ],
// //   endpoints: () => ({}),
// // });

// // export default apiSlice;
// import type {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query";
// import { createApi } from "@reduxjs/toolkit/query/react";
// import { SignJWT } from "jose";

// // ============================================================================
// // API KEY MANAGEMENT
// // ============================================================================
// let cachedApiKey = "";
// let apiKeyGenerationPromise: Promise<string> | null = null;

// async function generateApiKey(): Promise<string> {
//   const secret = import.meta.env.VITE_JWT_SECRET;

//   // Get super admin info from localStorage or auth state
//   const adminToken = localStorage.getItem("adminToken");
//   let phone_number = "super-admin";
//   let role = "SUPER_ADMIN";

//   // Try to get user info from localStorage or token
//   try {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const user = JSON.parse(userData);
//       phone_number = user.phone_number || user.phone;
//       role = user.role;
//     }
//   } catch (error) {
//     console.warn("Could not parse user data from localStorage");
//   }

//   const payload = {
//     timestamp: Date.now(),

//     phone_number: phone_number,
//     role: role,
//   };

//   console.log("Generating API key with payload:", payload);

//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("24h")
//     .sign(new TextEncoder().encode(secret));
// }

// export const getApiKey = async (): Promise<string> => {
//   if (cachedApiKey) return cachedApiKey;
//   if (!apiKeyGenerationPromise) {
//     apiKeyGenerationPromise = generateApiKey();
//   }
//   cachedApiKey = await apiKeyGenerationPromise;
//   apiKeyGenerationPromise = null;
//   return cachedApiKey;
// };

// export const regenerateApiKey = async (): Promise<string> => {
//   cachedApiKey = "";
//   apiKeyGenerationPromise = generateApiKey();
//   cachedApiKey = await apiKeyGenerationPromise;
//   apiKeyGenerationPromise = null;
//   return cachedApiKey;
// };

// // ============================================================================
// // CUSTOM BASE QUERY WITH API KEY
// // ============================================================================
// const customBaseQuery: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, _api, _extraOptions) => {
//   const baseUrl = import.meta.env.VITE_BASE_URL;

//   if (!baseUrl) {
//     return {
//       error: {
//         status: "CUSTOM_ERROR",
//         error: "Base URL not configured",
//         data: { message: "Base URL missing" },
//       },
//     };
//   }

//   // Prepare request parameters
//   let url: string;
//   let request: RequestInit = {};
//   let params: Record<string, any> | undefined;

//   if (typeof args === "string") {
//     url = args;
//   } else {
//     url = args.url;
//     request = {
//       method: args.method || "GET",
//       body: args.body,
//       headers: (args.headers as Record<string, string>) || {},
//     };
//     params = (args as any).params;
//   }

//   // Build full URL
//   let fullUrl = `${baseUrl}${url}`;
//   if (params) {
//     fullUrl += `?${new URLSearchParams(params).toString()}`;
//   }

//   // Prepare headers
//   const headers = new Headers();

//   // Add API key to headers (x-api-key)
//   try {
//     const apiKey = await getApiKey();
//     if (apiKey) {
//       headers.set("x-api-key", apiKey);
//       console.log("x-api-key header added to request");
//     }
//   } catch (err) {
//     console.error("API key generation failed:", err);
//     return {
//       error: {
//         status: "CUSTOM_ERROR",
//         error: "API key generation failed",
//         data: { message: "Failed to generate API key" },
//       },
//     };
//   }

//   // Add Authorization header if token exists
//   const token = localStorage.getItem("adminToken");
//   if (token) {
//     headers.set("Authorization", `Bearer ${token}`);
//   }

//   // Add custom headers from request
//   if (request.headers) {
//     Object.entries(request.headers).forEach(([key, value]) => {
//       headers.set(key, value);
//     });
//   }

//   // Set default Content-Type if not provided
//   if (
//     !headers.has("Content-Type") &&
//     request.body &&
//     typeof request.body !== "string"
//   ) {
//     headers.set("Content-Type", "application/json");
//   }

//   // Handle request body
//   if (request.body) {
//     if (request.body instanceof FormData) {
//       // For FormData, let browser set Content-Type
//       request.body = request.body;
//     } else if (typeof request.body === "string") {
//       request.body = request.body;
//     } else {
//       // JSON data
//       request.body = JSON.stringify(request.body);
//     }
//   }

//   // Final fetch options
//   const fetchOptions: RequestInit = {
//     method: request.method,
//     headers,
//     body: request.body,
//   };

//   // Log request details for debugging
//   console.log("API Request:", {
//     url: fullUrl,
//     method: request.method,
//     headers: Object.fromEntries(headers.entries()),
//     hasBody: !!request.body,
//   });

//   try {
//     const response = await fetch(fullUrl, fetchOptions);

//     let data: any;
//     const contentType = response.headers.get("content-type");

//     if (contentType && contentType.includes("application/json")) {
//       data = await response.json();
//     } else {
//       data = await response.text();
//     }

//     if (!response.ok) {
//       return {
//         error: {
//           status: response.status,
//           data,
//         },
//       };
//     }

//     return { data };
//   } catch (error: any) {
//     return {
//       error: {
//         status: "FETCH_ERROR",
//         error: error.message || String(error),
//       },
//     };
//   }
// };

// // ============================================================================
// // BASE QUERY WITH REAUTH
// // ============================================================================
// const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await customBaseQuery(args, api, extraOptions);

//   // Retry logic for API key issues (code 103)
//   let retryCount = 0;
//   const maxRetries = 2;

//   while ((result?.data as any)?.code === 103 && retryCount < maxRetries) {
//     console.log("API key invalid, regenerating...");
//     await regenerateApiKey();
//     retryCount++;
//     result = await customBaseQuery(args, api, extraOptions);
//   }

//   // Handle authentication errors
//   if (result.error) {
//     const status = result.error.status;
//     if (status === 401) {
//       console.error("Authentication failed - 401 error");
//       // You can dispatch logout action here if needed
//       // api.dispatch(logout());
//     }
//   }

//   return result;
// };

// // ============================================================================
// // API SLICE
// // ============================================================================
// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   keepUnusedDataFor: 60,
//   tagTypes: [
//     "ADMIN",
//     "SERVICES",
//     "SERVICES_COUNTS",
//     "TEAM_MEMBERS",
//     "PRIVACY_POLICY",
//     "TERMS_AND_CONDITIONS",
//     "SITE_CONFIGURATION",
//     "ABOUT_US",
//     "CONTACT_INFO",
//     "SOCIAL_MEDIA",
//     "LOGO_AND_FAVICON",
//     "CEO",
//     "CORE_VALUE",
//     "EMAIL_CONFIGURATION",
//     "PORTFOLIO",
//     "PORTFOLIO_FEATURES",
//     "CONSULTATION",
//     "OUR_SERVICES",
//     "OUR_PORTFOLIO",
//     "OUR_TESTIMONIAL",
//     "HOW_TO_SUCCESS",
//     "OUR_TEAM_MEMBER",
//     "OUR_TECHNOLOGY",
//     "CONTACT_US",
//     "CONTACT",
//     "HOW_WE_SUCCESS",
//     "TECHNOLOGY",
//     "TESTIMONIALS",
//     "SLIDERS",
//     "Tenant",
//     "Auth",
//   ],
//   endpoints: () => ({}),
// });

// export default apiSlice;
import { store } from "@/services/store"; // Import your store
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { SignJWT } from "jose";

// ============================================================================
// CONFIGURATION
// ============================================================================
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/",
  jwtSecret: import.meta.env.VITE_JWT_SECRET || "fallback-secret-key",
};

// ============================================================================
// API KEY MANAGEMENT
// ============================================================================
let cachedApiKey = "";
let apiKeyGenerationPromise: Promise<string> | null = null;

// Function to get auth state from Redux store
const getAuthState = () => {
  try {
    const state = store.getState();
    return state.auth;
  } catch (error) {
    console.warn("Could not get auth state from Redux store:", error);
    return null;
  }
};

async function generateApiKey(): Promise<string> {
  const secret = API_CONFIG.jwtSecret;

  // Get super admin info from Redux auth state
  const authState = getAuthState();
  console.log(authState);
  let phone_number = "super-admin";
  let role = "SUPER_ADMIN";

  if (authState && authState.user) {
    phone_number = authState.user.phone_number;
    role = authState.user.role;
    console.log("Got user data from Redux auth state:", { phone_number, role });
  } else {
    console.warn("No user data found in Redux auth state, using defaults");
  }

  const payload = {
    timestamp: Date.now(),
    phone_number: phone_number,
    role: role,
  };

  console.log("Generating API key with payload:", payload);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(secret));
}

export const getApiKey = async (): Promise<string> => {
  if (cachedApiKey) return cachedApiKey;
  if (!apiKeyGenerationPromise) {
    apiKeyGenerationPromise = generateApiKey();
  }
  cachedApiKey = await apiKeyGenerationPromise;
  apiKeyGenerationPromise = null;
  return cachedApiKey;
};

export const regenerateApiKey = async (): Promise<string> => {
  cachedApiKey = "";
  apiKeyGenerationPromise = generateApiKey();
  cachedApiKey = await apiKeyGenerationPromise;
  apiKeyGenerationPromise = null;
  return cachedApiKey;
};

// ============================================================================
// CUSTOM BASE QUERY WITH API KEY
// ============================================================================
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, _api, _extraOptions) => {
  const baseUrl = API_CONFIG.baseUrl;

  if (!baseUrl) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        error: "Base URL not configured",
        data: { message: "Base URL missing" },
      },
    };
  }

  // Prepare request parameters
  let url: string;
  let request: RequestInit = {};
  let params: Record<string, any> | undefined;

  if (typeof args === "string") {
    url = args;
  } else {
    url = args.url;
    request = {
      method: args.method || "GET",
      body: args.body,
      headers: (args.headers as Record<string, string>) || {},
    };
    params = (args as any).params;
  }

  // Build full URL - ensure proper URL formatting
  let fullUrl: string;
  if (url.startsWith("http")) {
    // If URL is already absolute, use it as-is
    fullUrl = url;
  } else {
    // Ensure baseUrl ends with slash and url doesn't start with slash
    const formattedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const formattedUrl = url.startsWith("/") ? url.slice(1) : url;
    fullUrl = `${formattedBaseUrl}${formattedUrl}`;
  }

  // Add query parameters if they exist
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    fullUrl += `?${searchParams.toString()}`;
  }

  // Prepare headers
  const headers = new Headers();

  // Add API key to headers (x-api-key)
  try {
    const apiKey = await getApiKey();
    if (apiKey) {
      headers.set("x-api-key", apiKey);
      console.log("x-api-key header added to request");
    }
  } catch (err) {
    console.error("API key generation failed:", err);
    return {
      error: {
        status: "CUSTOM_ERROR",
        error: "API key generation failed",
        data: { message: "Failed to generate API key" },
      },
    };
  }

  // Add Authorization header from Redux auth state
  const authState = getAuthState();
  if (authState && authState.token) {
    headers.set("Authorization", `Bearer ${authState.token}`);
    console.log("Authorization header added from Redux state");
  } else {
    // Fallback to localStorage if Redux state not available
    const token = localStorage.getItem("adminToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      console.log("Authorization header added from localStorage");
    }
  }

  // Add custom headers from request
  if (request.headers) {
    Object.entries(request.headers).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  // Set default Content-Type if not provided
  if (
    !headers.has("Content-Type") &&
    request.body &&
    typeof request.body !== "string" &&
    !(request.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Handle request body
  if (request.body) {
    if (request.body instanceof FormData) {
      // For FormData, let browser set Content-Type
      request.body = request.body;
    } else if (typeof request.body === "string") {
      request.body = request.body;
    } else {
      // JSON data
      request.body = JSON.stringify(request.body);
    }
  }

  // Final fetch options
  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
    body: request.body,
  };

  // Log request details for debugging
  console.log("API Request Details:", {
    url: fullUrl,
    method: request.method,
    headers: Object.fromEntries(headers.entries()),
    hasBody: !!request.body,
    authState: authState
      ? {
          isAuthenticated: authState.isAuthenticated,
          hasUser: !!authState.user,
          userPhone: authState.user?.phone_number,
          userRole: authState.user?.role,
        }
      : "No auth state",
  });

  try {
    const response = await fetch(fullUrl, fetchOptions);

    let data: any;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      return {
        error: {
          status: response.status,
          data,
        },
      };
    }

    return { data };
  } catch (error: any) {
    return {
      error: {
        status: "FETCH_ERROR",
        error: error.message || String(error),
      },
    };
  }
};

// ============================================================================
// BASE QUERY WITH REAUTH
// ============================================================================
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await customBaseQuery(args, api, extraOptions);

  // Retry logic for API key issues (code 103)
  let retryCount = 0;
  const maxRetries = 2;

  while ((result?.data as any)?.code === 103 && retryCount < maxRetries) {
    console.log("API key invalid, regenerating...");
    await regenerateApiKey();
    retryCount++;
    result = await customBaseQuery(args, api, extraOptions);
  }

  // Handle authentication errors
  if (result.error) {
    const status = result.error.status;
    if (status === 401) {
      console.error("Authentication failed - 401 error");
      // You can dispatch logout action here if needed
      // api.dispatch(storeLogout());
    }
  }

  return result;
};

// ============================================================================
// API SLICE
// ============================================================================
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 60,
  tagTypes: ["Tenant", "Auth", "TenantAdmin"],
  endpoints: () => ({}),
});

export default apiSlice;
