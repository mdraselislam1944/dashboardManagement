const { baseApi } = require("@/redux/api/baseApi");

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        logIn: builder.query({
            query: () => `/auth`, 
            providesTags:['auth']
        }),
    }),
});

export const { useLogInQuery } = authApi;