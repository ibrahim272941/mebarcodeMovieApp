import './ModalLogin.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { signInUser, signInWithGoogle } from '../../auth/firebase-config';
import { Icon } from '@iconify/react';

const ModalLogin = ({ currentUser, id }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = () => {
    if (!currentUser) {
      signInUser(email, password, navigate);
      navigate(`/details:${id}`);
    } else if (currentUser) {
      navigate(`/details:${id}`);
    }
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleGoogle = () => {
    signInWithGoogle();
  };

  return (
    <>
      <Button className="modalButton" variant="danger" onClick={handleShow}>
        More Info
      </Button>

      <Modal className="modalContainer" show={show} onHide={handleSubmit}>
        <Modal.Header className="modalLogin" closeButton>
          <p
            style={{
              fontSize: '1.1rem',
              color: ' rgb(202, 99, 9)',
              marginRight: '2rem',
            }}
          >
            Please Log in{' '}
          </p>
          <p className="info">
            Don't you have an account{' '}
            <Link style={{ fontSize: '1rem' }} className="link" to="/register">
              Register Page
            </Link>{' '}
          </p>
        </Modal.Header>
        <Modal.Body className="modalLogin">
          <Form className="formGroup">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your E-mail"
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modalLogin buttonGroupModal">
          {/* <Button
            className="buttonLogin"
            variant="danger"
            onClick={handleSubmit}
          >
            Close
          </Button> */}
          <Button
            onClick={handleGoogle}
            className="w-25 buttonGoogle"
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
          <Button
            className="modalButtonLogin w-25"
            variant="danger"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalLogin;
