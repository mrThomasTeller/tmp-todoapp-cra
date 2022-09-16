import {
  TASKS_ADD_FAILURE,
  TASKS_ADD_SUCCESS,
  TASKS_LOADED,
  TASKS_RESET_VALIDATION,
  TASKS_UPDATED
} from "./actionsTypes";

export function createTask(title) {
  return async (dispatch) => {
    const data = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (data.status >= 400) {
      const { error } = await data.json();
      dispatch(addTaskFailure(error))
    }
    else {
      const task = await data.json();
      dispatch(addTaskSuccess(task));
    }
  }
}

export function addTaskSuccess(task) {
  return { type: TASKS_ADD_SUCCESS, payload: task };
}

export function addTaskFailure(message) {
  return { type: TASKS_ADD_FAILURE, payload: message };
}

export function resetTaskValidation() {
  return { type: TASKS_RESET_VALIDATION };
}

export function loadTasks() {
  return (dispatch) => {
    fetch('/api/tasks')
      .then((result) => result.json())
      .then((tasks) => {
        dispatch(tasksLoaded(tasks));
      });
  }
}

export function tasksLoaded(tasks) {
  return { type: TASKS_LOADED, payload: tasks };
}

export function updateTask(newTask) {
  return async (dispatch) => {
    await fetch(`/api/tasks/${newTask.id}`, {
      method: 'PUT',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    dispatch(taskUpdated(newTask));
  };
}

export function taskUpdated(newTask) {
  return { type: TASKS_UPDATED, payload: newTask };
}

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
