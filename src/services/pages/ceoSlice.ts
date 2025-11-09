import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

// ceo type
type Ceo = {
  _id: string;
  name: string;
  designation: string;
  image: string;
  say: string;
};

type GetCeoResponse = {
  success: boolean;
  message: string;
  payload: Ceo[];
};

type UpdateCeoResponse = {
  success: boolean;
  message: string;
};

const ceoSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get ceo
    getCeo: builder.query<Ceo | null, void>({
      query: () => ({
        url: `/ceo`,
        method: "GET",
      }),
      providesTags: ["CEO"],
      transformResponse: (response: GetCeoResponse) =>
        response.payload[0] || null,
    }),

    // update a new ceo
    updateCeo: builder.mutation<UpdateCeoResponse, FormData>({
      query: (data) => ({
        url: "update-ceo",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "CEO" }];
        }
        return [];
      },
    }),
  }),
});

export const { useGetCeoQuery, useUpdateCeoMutation } = ceoSlice;
