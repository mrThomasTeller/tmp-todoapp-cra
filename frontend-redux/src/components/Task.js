import React from 'react';

function Task({ task, onChange }) {
  const handleChange = React.useCallback((event) => {
    const done = event.target.checked;
    const newTask = { ...task, done };
    onChange(newTask);
  }, [task, onChange]);
  
  return (
    <label className="list-group-item d-flex justify-content-between align-items-center task">
      {/* Форма для редактирования задачи (выполнено, не выполнено) */}
      <input
        type="checkbox"
        className="form-check-input me-1 done-checkbox"
        checked={task.done}
        onChange={handleChange}
        // кастомный дата-аттрибут
        data-id={task.id}
      />

      {task.title}

      <span className="badge bg-danger rounded-pill remove-task" data-id={task.id}>x</span>
    </label>
  );
}

export default Task;
