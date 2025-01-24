import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const RtkBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
   credentials:"include"
  }),
  { maxRetries: 2}
);

export const customBackOff = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

