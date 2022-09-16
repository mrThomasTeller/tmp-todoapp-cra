import Task from './Task';

type TasksAction =
  | { type: 'TASKS_ADD_SUCCESS'; payload: Task }
  | { type: 'TASKS_ADD_FAILURE'; error: string }
  | { type: 'TASKS_RESET_VALIDATION' }
  | { type: 'TASKS_LOADED'; payload: Task[] }
  | { type: 'TASKS_UPDATED'; payload: Task };

export default TasksAction;
