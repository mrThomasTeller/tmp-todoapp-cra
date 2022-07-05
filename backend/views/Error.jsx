const React = require('react');
const Layout = require('./Layout');

function Error() {
  return (
    <Layout>
      <h1 className="mb-1">Произошла какая-то ошибка :(</h1>
    </Layout>
  );
}

module.exports = Error;
