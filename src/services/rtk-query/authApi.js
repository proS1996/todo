import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com", // Base URL for the API
    credentials: "include", // Include cookies in requests
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: () => ({
        url: "/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          username: "mor_2314",
          password: "83r5^_",
        },
      }),
    }),
    login1: builder.query({
      query: () => ({
        url: "/users",
      }),
    }),
  }),
});

export const { useLoginMutation, useLazyLogin1Query, useLogin1Query } = authApi;
