import React from 'react';

function Task({ task, onChange, onRemove }) {
  const handleChange = React.useCallback(
    (event) => {
      const done = event.target.checked;
      const newTask = { ...task, done };
      onChange(newTask);
    },
    [task, onChange]
  );

  const handleRemove = React.useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      onRemove(task.id);
    },
    [task, onRemove]
  );

  return (
    <label className="list-group-item d-flex justify-content-between align-items-center task">
      {/* Чекбокс для редактирования задачи (выполнено, не выполнено) */}
      <input
        type="checkbox"
        className="form-check-input me-1 done-checkbox"
        checked={task.done}
        onChange={handleChange}
      />

      {task.title}

      <span
        className="badge bg-danger rounded-pill remove-task"
        role="button"
        onClick={handleRemove}
        tabIndex={0}
      >
        <i className="fa-solid fa-xmark" />
      </span>
    </label>
  );
}

export default Task;
