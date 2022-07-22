import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from './Task';
import {
  createTask,
  deleteTask,
  loadTasks,
  selectError,
  selectTasks,
  updateTask,
  resetError,
} from './tasksSlice';

function TasksList() {
  const tasks = useSelector(selectTasks);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      dispatch(createTask(event.target.title.value));
    },
    [dispatch]
  );

  const handleTaskChange = React.useCallback(
    (newTask) => {
      dispatch(updateTask(newTask));
    },
    [dispatch]
  );

  const handleTaskRemove = React.useCallback(
    (id) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  return (
    <>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Добавьте задачу..."
            aria-label="Добавьте задачу..."
            name="title"
            onChange={resetError}
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
          <Task key={task.id} task={task} onChange={handleTaskChange} onRemove={handleTaskRemove} />
        ))}
      </div>
    </>
  );
}

export default TasksList;
