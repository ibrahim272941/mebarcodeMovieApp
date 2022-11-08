import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { Spinner } from 'react-bootstrap';

const PrivateRouter = ({ count }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {count ? (
        <div className="text-center">
          <Spinner
            style={{
              width: '10rem',
              height: '10rem',
              marginTop: '10rem',
              alignItems: 'center',
            }}
            animation="border"
            variant="warning"
            size="lg"
          />
        </div>
      ) : currentUser ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRouter;
