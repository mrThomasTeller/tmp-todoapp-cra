/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-constructed-context-values */
const ReactDOMServer = require('react-dom/server');
const React = require('react');

const Context = React.createContext();

function renderComponent(ReactComponent, props, options = { doctype: true }) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <Context.Provider value={{ ...this.app.locals, ...this.locals }}>
      <ReactComponent {...props} />
    </Context.Provider>,
  );

  if (options.doctype) this.write('<!DOCTYPE html>');
  this.end(html);
}

function reactSsrMiddleware(req, res, next) {
  res.renderComponent = renderComponent;
  next();
}

module.exports = reactSsrMiddleware;
module.exports.Context = Context;
