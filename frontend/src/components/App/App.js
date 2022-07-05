import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Main from '../Main';
import TasksList from '../TasksList';
import store from '../../store';
import Login from '../Login';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/tasks' element={<TasksList />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Provider>
  );
}

export default App;
