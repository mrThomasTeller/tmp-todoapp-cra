import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, loadTasks, resetTaskValidation, updateTask } from '../store/tasks/actionsCreators';
import NavBar from './NavBar';
import Task from './Task';

function TasksList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const error = useSelector((state) => state.tasks.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const handleSubmit = React.useCallback(async (event) => {
    event.preventDefault();
    const input = event.target.title;
    const title = input.value;

    dispatch(createTask(title));
  }, [dispatch]);

  const resetValidation = React.useCallback(() => {
    if (error) dispatch(resetTaskValidation());
  }, [dispatch, error]);

  const handleTaskChange = React.useCallback((newTask) => {
    dispatch(updateTask(newTask));
  }, [dispatch]);

  return <>
    <h1>Список дел</h1>

    <NavBar />

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
        <button type="submit" className="btn btn-primary">добавить</button>
      </div>
      {error && <div className="invalid-feedback" style={{ display: 'block' }}>
        {error}
      </div>}
    </form>

    <div className="tasks list-group">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onChange={handleTaskChange} />
      ))}
    </div>
  </>;
}

export default TasksList;
