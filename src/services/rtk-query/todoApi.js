import { createApi } from "@reduxjs/toolkit/query/react";
import { RtkBaseQuery } from "../request";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: RtkBaseQuery,
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo
      }),
      invalidatesTags: ['Todo']
    }),
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: (res) => res?.data,
      providesTags: ['Todo']
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: data
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.find(todo => todo.id === id);
            if (todo) {
              Object.assign(todo, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE"
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const index = draft.findIndex(todo => todo.id === id);
            if (index !== -1) draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      }
    })
  })
});

export const {
  useCreateTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;
