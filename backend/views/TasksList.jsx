const React = require('react');
const Layout = require('./Layout');
const NavBar = require('./NavBar');
const Task = require('./Task');

function TasksList({ tasks }) {
  return (
    <Layout>
      <h1>Список дел</h1>
      <NavBar />

      <form method="POST" action="/tasks" id="task-form">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Добавьте задачу..." aria-label="Добавьте задачу..." name="title" />
          <button type="submit" className="btn btn-primary">добавить</button>
        </div>
      </form>

      <div className="tasks list-group">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <script src="/script.js" />
    </Layout>
  );
}

module.exports = TasksList;
