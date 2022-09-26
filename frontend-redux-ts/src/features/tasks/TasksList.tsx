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
import styles from './styles.module.css';

function TasksList(): JSX.Element {
  const tasks = useSelector(selectTasks);
  const error = useSelector(selectTasksError);
  const dispatch = useDispatch();
  const [newTaskText, setNewTaskText] = React.useState('');

  useEffect(() => {
    api.getTasks().then((loadedTasks) => {
      dispatch(tasksLoaded(loadedTasks));
    });
  }, [dispatch]);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      api
        .createTask(newTaskText)
        .then((task) => {
          dispatch(addTaskSuccess(task));
          setNewTaskText('');
        })
        .catch((createTaskError) => {
          dispatch(addTaskFailure(createTaskError));
        });
    },
    [dispatch, newTaskText]
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

  const handleNewTaskTextChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTaskText(event.target.value);
      dispatch(resetTaskValidation());
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

      <div className={`${styles.tasks} list-group`}>
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
