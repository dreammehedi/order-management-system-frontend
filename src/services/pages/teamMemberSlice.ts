import { getAdminToken } from "../../hooks/handelAdminToken";
import { apiSlice } from "../api/apiSlice";

type GetTeamMemberResponse = {
  success: boolean;
  message: string;
  payload: {
    name: string;
    designation: string;
    image: string;
    // facebookLink: string;
    // linkedinLink: string;
    // whatsappNumber: number;
  }[];
  pagination: {
    totalData: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

type AddTeamMemberResponse = {
  success: boolean;
  message: string;
};

type UpdateTeamMemberResponse = {
  success: boolean;
  message: string;
};
const teamMemberSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all team members
    getTeamMembers: builder.query<
      GetTeamMemberResponse,
      { page: number; limit: number; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `/team-members?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        headers: {
          "X-Source": "admin",
        },
      }),
      providesTags: ["TEAM_MEMBERS"],
    }),

    // Add a new member
    addTeamMember: builder.mutation<AddTeamMemberResponse, FormData>({
      query: (data) => ({
        url: "add-team-member",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TEAM_MEMBERS" }];
        }
        return [];
      },
    }),

    // update  member
    updateTeamMember: builder.mutation<UpdateTeamMemberResponse, FormData>({
      query: (data) => ({
        url: "update-team-member",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TEAM_MEMBERS" }];
        }
        return [];
      },
    }),

    // delete member
    deleteTeamMember: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `delete-team-member/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAdminToken()}`,
        },
      }),
      invalidatesTags: (result, error) => {
        if (result && !error) {
          return [{ type: "TEAM_MEMBERS" }];
        }
        return [];
      },
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamMemberSlice;
