import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH_LOGIN } from '../store/auth/actionsTypes';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = React.useCallback((event) => {
    event.preventDefault();
    const name = event.target.name.value;
    // const password = event.target.password.value;
    // fetch('/api/auth/login', {credentials: 'inclide'})
    // .then((data) => data.json())
    // .then((data) => {
    // // проверка что мы залогинились
    dispatch({ type: AUTH_LOGIN, payload: { id: 1, name } });
    navigate('/');
    // });
  }, [dispatch, navigate]);

  return (
    <form onSubmit={handleSubmit}>
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
  );
}

export default Login;
