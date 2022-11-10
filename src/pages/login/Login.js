import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {
  resetPassword,
  signInUser,
  signInWithGoogle,
} from '../../auth/firebase-config';
import { useNavigate } from 'react-router-dom';
import Slider from '../../component/slider/Slider';
import { Icon } from '@iconify/react';
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  console.log(email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    signInUser(email, password, navigate);
  };

  const handleGoogle = () => {
    signInWithGoogle();
  };
  const passwordReset = () => {
    resetPassword(email);
  };
  return (
    <>
      <Slider />
      <div className="login">
        <Form autoComplete="off" className="formLogin" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              autoComplete="false"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <div className="buttonLogin">
            <Button className="w-50 button" type="submit">
              Submit
            </Button>
            <Button
              onClick={handleGoogle}
              className=" w-50 buttonGoogle"
              type="submit"
            >
              Sign In{' '}
              <Icon
                className="google-icon"
                icon="logos:google-icon"
                color="#f5c518"
                width="20"
              />
            </Button>
          </div>
        </Form>
      </div>
      <p className="text-center mt-3">
        If you forgot your password{' '}
        <span onClick={passwordReset} className="password">
          Click Here
        </span>
      </p>
    </>
  );
};

export default Login;
