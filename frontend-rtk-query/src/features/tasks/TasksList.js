import React from 'react';
import Task from './Task';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from './tasksApi';

function TasksList() {
  const { data: tasks = [] } = useGetTasksQuery();
  const [createTask, { error, reset: resetError }] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const result = await createTask(event.target.title.value);
      if (!result.error) {
        event.target.title.value = '';
      }
    },
    [createTask]
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
            {error.data.error}
          </div>
        )}
      </form>

      <div className="tasks list-group">
        {tasks.map((task) => (
          <Task key={task.id} task={task} onChange={updateTask} onRemove={deleteTask} />
        ))}
      </div>
    </>
  );
}

export default TasksList;
