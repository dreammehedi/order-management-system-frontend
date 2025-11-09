import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

// core value type
type CoreValue = {
  _id: string;
  title: string;
  description: string;
};

type GetCoreValueResponse = {
  success: boolean;
  message: string;
  payload: CoreValue[];
};

type AddCoreValueResponse = {
  success: boolean;
  message: string;
};

type UpdateCoreValueResponse = {
  success: boolean;
  message: string;
};

const coreValueSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get core values
    getCoreValue: builder.query<GetCoreValueResponse | null, void>({
      query: () => ({
        url: `/core-values`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["CORE_VALUE"],
    }),

    // add new core value
    addCoreValue: builder.mutation<AddCoreValueResponse, FormData>({
      query: (data) => ({
        url: "add-core-value",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "CORE_VALUE" }];
        }
        return [];
      },
    }),

    // update a new core value
    updateCoreValue: builder.mutation<UpdateCoreValueResponse, FormData>({
      query: (data) => ({
        url: "update-core-value",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "CORE_VALUE" }];
        }
        return [];
      },
    }),

    // delete core valud
    deleteCoreValue: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-core-value/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "CORE_VALUE" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetCoreValueQuery,
  useUpdateCoreValueMutation,
  useAddCoreValueMutation,
  useDeleteCoreValueMutation,
} = coreValueSlice;
