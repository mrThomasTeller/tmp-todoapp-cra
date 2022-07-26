import api from '../../api';

export const tasksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query({
      query: () => 'tasks',
      providesTags: ['Task'],
    }),

    createTask: build.mutation({
      query: (title) => ({
        url: 'tasks',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: build.mutation({
      query: (newTask) => ({
        url: `tasks/${newTask.id}`,
        method: 'PUT',
        body: newTask,
      }),
      invalidatesTags: ['Task'],
    }),

    deleteTask: build.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
