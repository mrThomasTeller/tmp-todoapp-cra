import TasksState from './types/TasksState';
import { Reducer } from 'redux';
import TasksAction from './types/TasksAction';

const initialState: TasksState = {
  tasks: [],
};

const tasksReducer: Reducer<TasksState, TasksAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'TASKS_ADD_SUCCESS': {
      const task = action.payload;
      return { ...state, tasks: [task, ...state.tasks] };
    }

    case 'TASKS_ADD_FAILURE': {
      const { error } = action;
      return { ...state, error };
    }

    case 'TASKS_RESET_VALIDATION': {
      return { ...state, error: undefined };
    }

    case 'TASKS_LOADED': {
      return { ...state, tasks: action.payload };
    }

    case 'TASKS_UPDATED': {
      const newTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === newTask.id ? newTask : task)),
      };
    }

    case 'TASKS_DELETED': {
      const taskId = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== taskId),
      };
    }
  }

  return state;
};

export default tasksReducer;
