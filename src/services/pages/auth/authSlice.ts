import { getAdminToken } from "../../../hooks/handelAdminToken";
import { apiSlice } from "../../api/apiSlice";
type LoginResponse = {
  payload: {
    role: string;
    token: string;
  };
  message: string;
};

type LogoutResponse = {
  success: boolean;
  message: string;
};

type GetAdminResponse = {
  success: boolean;
  payload: {
    _id: string;
    name: string;
    email: string;
    role: string;
    image: string;
  }[];
};
const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, void>({
      query: (data) => ({
        url: `login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    getAdmin: builder.query<GetAdminResponse["payload"][0], void>({
      query: () => ({
        url: "admin",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response: GetAdminResponse) => response.payload[0],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetAdminQuery } =
  authSlice;
