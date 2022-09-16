import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, selectTasksError } from './selectors';
import TaskView from './TaskView';
import * as api from './api';
import {
  addTaskSuccess,
  tasksLoaded,
  addTaskFailure,
  taskUpdated,
  taskDeleted,
  resetTaskValidation,
} from './actionsCreators';
import Task, { TaskId } from './types/Task';

function TasksList() {
  const tasks = useSelector(selectTasks);
  const error = useSelector(selectTasksError);
  const dispatch = useDispatch();

  useEffect(() => {
    api.getTasks().then((tasks) => {
      dispatch(tasksLoaded(tasks));
    });
  }, [dispatch]);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      api
        .createTask(form.taskTitle.value)
        .then((task) => {
          dispatch(addTaskSuccess(task));
          form.reset();
        })
        .catch((error) => {
          dispatch(addTaskFailure(error));
        });
    },
    [dispatch]
  );

  const handleTaskChange = React.useCallback(
    (newTask: Task) => {
      api.updateTask(newTask).then(() => {
        dispatch(taskUpdated(newTask));
      });
    },
    [dispatch]
  );

  const handleTaskRemove = React.useCallback(
    (id: TaskId) => {
      api.deleteTask(id).then(() => {
        dispatch(taskDeleted(id));
      });
    },
    [dispatch]
  );

  const resetErrorOnChange = React.useCallback(() => {
    dispatch(resetTaskValidation());
  }, [dispatch]);

  return (
    <>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Добавьте задачу..."
            aria-label="Добавьте задачу..."
            name="taskTitle"
            onChange={resetErrorOnChange}
          />
          <button type="submit" className="btn btn-primary">
            добавить
          </button>
        </div>
        {error && (
          <div className="invalid-feedback text-end" style={{ display: 'block' }}>
            {error}
          </div>
        )}
      </form>

      <div className="tasks list-group">
        {tasks.map((task) => (
          <TaskView
            key={task.id}
            task={task}
            onChange={handleTaskChange}
            onRemove={handleTaskRemove}
          />
        ))}
      </div>
    </>
  );
}

export default TasksList;
