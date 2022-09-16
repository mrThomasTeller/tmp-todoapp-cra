import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tasksLoaded, resetTaskValidation, taskUpdated } from './actionsCreators';
import { addTaskFailure, addTaskSuccess } from './actionsCreators';
import TaskView from './TaskView';
import * as api from './api';
import Task from './types/Task';
import { selectTasks, selectTasksError } from './selectors';

function TasksList() {
  const tasks = useSelector(selectTasks);
  const error = useSelector(selectTasksError);
  const dispatch = useDispatch();

  useEffect(() => {
    api.loadTasks().then((tasks) => dispatch(tasksLoaded(tasks)));
  }, [dispatch]);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const input = (event.target as any).title;
      const title = input.value;

      api
        .createTask(title)
        .then((task) => dispatch(addTaskSuccess(task)))
        .catch((error) => dispatch(addTaskFailure(error)));
    },
    [dispatch]
  );

  const resetValidation = React.useCallback(() => {
    if (error) dispatch(resetTaskValidation());
  }, [dispatch, error]);

  const handleTaskChange = React.useCallback(
    (newTask: Task) => {
      api.updateTask(newTask).then(() => dispatch(taskUpdated(newTask)));
    },
    [dispatch]
  );

  return (
    <>
      <h1>Список дел</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Добавьте задачу..."
            aria-label="Добавьте задачу..."
            name="title"
            onChange={resetValidation}
          />
          <button type="submit" className="btn btn-primary">
            добавить
          </button>
        </div>
        {error && (
          <div className="invalid-feedback" style={{ display: 'block' }}>
            {error}
          </div>
        )}
      </form>

      <div className="tasks list-group">
        {tasks.map((task) => (
          <TaskView key={task.id} task={task} onChange={handleTaskChange} />
        ))}
      </div>
    </>
  );
}

export default TasksList;
