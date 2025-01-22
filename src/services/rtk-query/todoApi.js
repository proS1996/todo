import { createApi } from "@reduxjs/toolkit/query/react";
import { RtkBaseQuery } from "../request";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: RtkBaseQuery,
  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo
      })
    }),
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: (res) => res?.data
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: data
      })
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE"
      })
    })
  })
});

export const {
  useCreateTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;
