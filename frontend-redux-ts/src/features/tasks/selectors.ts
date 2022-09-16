import { RootState } from '../../store';

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTasksError = (state: RootState) => state.tasks.error;
