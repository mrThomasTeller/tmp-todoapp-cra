import {
  TASKS_ADD_FAILURE,
  TASKS_ADD_SUCCESS,
  TASKS_LOADED,
  TASKS_RESET_VALIDATION,
  TASKS_UPDATED
} from "./actionsTypes";

const initialState = {
  tasks: [],
  // error: '...',
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case TASKS_ADD_SUCCESS: {
      const task = action.payload;
      // state = { tasks: [{}, {}], error: 'abc' }
      // { error: 'abc', tasks: [task, {}, {}] }
      return { ...state, tasks: [task, ...state.tasks] };
    }

    case TASKS_ADD_FAILURE: {
      const error = action.payload;
      return { ...state, error };
    }

    case TASKS_RESET_VALIDATION: {
      return { ...state, error: undefined };
    }

    case TASKS_LOADED: {
      return { ...state, tasks: action.payload };
    }

    case TASKS_UPDATED: {
      const newTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map(
          (task) => task.id === newTask.id ? newTask : task
        )
      };
    }

    default: return state;
  }
}
