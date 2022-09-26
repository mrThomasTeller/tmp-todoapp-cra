import { RootState } from '../../store';
import Task from './types/Task';

export const selectTasks = (state: RootState): Task[] => state.tasks.tasks;
export const selectTasksError = (state: RootState): string | undefined => state.tasks.error;
