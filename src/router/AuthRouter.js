import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthRouter = () => {
  const { currentUser } = useContext(AuthContext);
  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRouter;
