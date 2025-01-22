import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const RtkBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  { maxRetries: 2}
);

export const customBackOff = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

