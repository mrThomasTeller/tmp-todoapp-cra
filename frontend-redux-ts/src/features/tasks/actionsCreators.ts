import Task from './types/Task';
import TasksAction from './types/TasksAction';

export const addTaskSuccess = (task: Task): TasksAction => ({
  type: 'TASKS_ADD_SUCCESS',
  payload: task,
});

export const addTaskFailure = (message: string): TasksAction => ({
  type: 'TASKS_ADD_FAILURE',
  error: message,
});

export const resetTaskValidation = (): TasksAction => ({ type: 'TASKS_RESET_VALIDATION' });

export const tasksLoaded = (tasks: Task[]): TasksAction => ({
  type: 'TASKS_LOADED',
  payload: tasks,
});

export const taskUpdated = (newTask: Task): TasksAction => ({
  type: 'TASKS_UPDATED',
  payload: newTask,
});

// Чистые функции

// 1. при одних и тех же параметрах один и тот же результат
//  +: (a, b) => a + b
//  -: (a, b) => a + b + Math.random()

// 2. не имеет side-эффектов
//  let result;
//  +: (a, b) => a + b
//  -: (a, b) => { result = a + b; }
//  -: (a, b) => { fetch(); }
//  -: (a, b) => { console.log; }

// 3. не изменяет своих аргументов
//  let result;
//  +: (obj) => obj.a + obj.b
//  -: (obj) => { obj.result = obj.a + obj.b; }
