import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ToRedirect = ({ nav }) => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 500);

    count === 0 && navigate(nav);
    return () => clearInterval(interval);
  }, [count, navigate, nav]);

  return (
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
  );
};

export default ToRedirect;
