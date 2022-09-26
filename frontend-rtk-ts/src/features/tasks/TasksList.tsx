import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTasks, selectError } from './selectors';
import TaskView from './TaskView';
import {
  createTask,
  deleteTask,
  loadTasks,
  updateTask,
  resetError,
} from './tasksSlice';
import Task, { TaskId } from './types/Task';
import { useAppDispatch } from '../../store';

function TasksList(): JSX.Element {
  const tasks = useSelector(selectTasks);
  const error = useSelector(selectError);
  const dispatch = useAppDispatch();
  const [newTaskText, setNewTaskText] = React.useState('');

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const dispatchResult = await dispatch(createTask(newTaskText));
      if (createTask.fulfilled.match(dispatchResult)) {
        setNewTaskText('');
      }
    },
    [dispatch, newTaskText]
  );

  const handleTaskChange = React.useCallback(
    (newTask: Task) => {
      dispatch(updateTask(newTask));
    },
    [dispatch]
  );

  const handleTaskRemove = React.useCallback(
    (id: TaskId) => {
      dispatch(deleteTask(id));
    },
    [dispatch]
  );

  const handleNewTaskTextChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskText(event.target.value);
      dispatch(resetError());
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
            name="taskTitle"
            value={newTaskText}
            onChange={handleNewTaskTextChange}
          />
          <button type="submit" className="btn btn-primary">
            добавить
          </button>
        </div>
        {error && (
          <div
            className="invalid-feedback text-end"
            style={{ display: 'block' }}
          >
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
