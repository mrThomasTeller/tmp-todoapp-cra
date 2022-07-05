const React = require('react');
const Layout = require('./Layout');

function Register() {
  return (
    <Layout>
      <form method="POST" action="/auth/register">
        <div className="mb-3">
          <label htmlFor="name-input" className="form-label">Name</label>
          <input type="text" className="form-control" id="name-input" name="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </Layout>
  );
}

module.exports = Register;
