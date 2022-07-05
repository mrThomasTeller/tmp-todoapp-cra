const React = require('react');

function Task({ task }) {
  return (
    <label className="list-group-item d-flex justify-content-between align-items-center task">
      {/* Форма для редактирования задачи (выполнено, не выполнено) */}
      <input
        type="checkbox"
        className="form-check-input me-1 done-checkbox"
        defaultChecked={task.done}
        // кастомный дата-аттрибут
        data-id={task.id}
      />

      {task.title}

      <span className="badge bg-danger rounded-pill remove-task" data-id={task.id}>x</span>
    </label>
  );
}

module.exports = Task;
