import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';
import Task, { TaskId } from './types/Task';
import TasksState from './types/TasksState';

const initialState: TasksState = {
  tasks: [],
  error: undefined,
};

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (title: string) => {
    if (!title.trim()) {
      throw new Error('Заголовок задачи не должен быть пустым');
    }

    const data = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (data.status >= 400) {
      const { error } = await data.json();
      throw error;
    } else {
      return data.json();
    }
  }
);

export const loadTasks = createAsyncThunk('tasks/loadTasks', () =>
  fetch('/api/tasks').then((result) => result.json())
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (newTask: Task) => {
    await fetch(`/api/tasks/${newTask.id}`, {
      method: 'PUT',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return newTask;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: TaskId) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })

      .addCase(logout.fulfilled, (state) => {
        state.tasks = [];
      });
  },
});

export const { resetError } = tasksSlice.actions;

export default tasksSlice.reducer;
