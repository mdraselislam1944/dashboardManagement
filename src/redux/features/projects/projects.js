const { baseApi } = require("@/redux/api/baseApi");

const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => `/projects`, 
            providesTags:['projects']
        }),
        getIndividualProjects: builder.query({
            query: (id) => `/projects/${id}`, 
            providesTags:['projects']
        }),
        deleteIndividualProjects: builder.mutation({
            query: (id) => ({
                url: `/projects/${id}`, 
                method: "DELETE",
                providesTags:["auth"]
            }),
        }),
        updateIndividualProjects: builder.mutation({
            query: ( data) => ({
                url: `/projects/${data?.id}`,
                method: "PATCH",
                body: data,
                providesTags: ["projects"],
            }),
        }),
        
    }),
});

export const { useGetProjectsQuery,useGetIndividualProjectsQuery,useDeleteIndividualProjectsMutation,useUpdateIndividualProjectsMutation} = projectApi;