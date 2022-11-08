import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from '../component/navbar/Navbar';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Details from '../pages/details/Details';
import AuthRouter from './AuthRouter';
import { useEffect, useState } from 'react';
import PrivateRouter from './PrivateRouter';

const AppRouter = () => {
  const [count, setCount] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCount(false);
    }, 1000);
  }, []);
  return (
    <Router>
      <Navbar count={count} />

      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route element={<PrivateRouter count={count} />}>
          <Route path="/" element={<Home />} />

          <Route path="/details" element={<Details />} />
        </Route>
        <Route element={<AuthRouter count={count} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
