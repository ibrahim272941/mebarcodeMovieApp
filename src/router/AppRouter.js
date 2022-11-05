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
import UserRouter from './UserRouter';
import Slider from '../component/slider/Slider';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const AppRouter = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Router>
      <Navbar />
      {!currentUser ? <Slider /> : null}

      <Routes>
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route element={<AuthRouter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<UserRouter />}>
          <Route path="/" element={<Home />} />

          <Route path="/details" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
