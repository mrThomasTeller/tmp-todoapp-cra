const React = require('react');
const Layout = require('./Layout');
const NavBar = require('./NavBar');

function Main({ wall }) {
  return (
    <Layout>
      <h1 className="mb-1">Список дел</h1>
      <NavBar />
      <a className="btn btn-primary btn-xl" href="/tasks">Перейти к списку</a>&nbsp;&nbsp;&nbsp;
      <a className="btn btn-primary btn-xl" href="/auth/register">Регистрация</a>&nbsp;&nbsp;&nbsp;
      <a className="btn btn-primary btn-xl" href="/auth/login">Login</a>

      <form method="POST">
        <input name="wall" value={wall} />
      </form>
    </Layout>
  );
}

module.exports = Main;
