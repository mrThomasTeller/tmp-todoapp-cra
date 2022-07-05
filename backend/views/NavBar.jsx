const React = require('react');

const { Context } = require('../middlewares/reactSsr');

function NavBar() {
  const { user } = React.useContext(Context);

  if (user) {
    return (
      <div>
        Здаров, {user.name}. <a href="/auth/logout">Выйти</a>
      </div>
    );
  }

  return <div />;
}

module.exports = NavBar;
