import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../auth/firebase-config';
import { AuthContext } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';

const Navbar = ({ count }) => {
  let path = useLocation().pathname;
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const signOutFunc = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <>
      {path.includes(':') ? null : (
        <div className="navbar">
          <div className="title">
            <Link
              style={{ textDecoration: 'none' }}
              to={`${path === '/' ? '/comments' : '/'}`}
            >
              <div className="h1">
                Movie <span>DataBase</span>
                {currentUser && path === '/' && <h6>Comment Page</h6>}
                {currentUser && path === '/comments' && <h6>Home Page</h6>}
              </div>
            </Link>
          </div>
          {/* {count ? null : (
            <div className="warning">
              <p className="info">
                {path === '/login' && "Don't you have an account "}
                {path === '/register' && 'Already have an account '}
                <Link
                  className="link"
                  to={`${path === '/login' ? '/register' : '/login'}`}
                >
                  {path === '/register' && 'Login'}
                  {path === '/login' && 'Register'}
                </Link>
              </p>
            </div>
          )} */}

          {currentUser ? (
            <div className="logout">
              {currentUser && <h6>{currentUser.displayName}</h6>}
              {currentUser && (
                <button onClick={() => signOutFunc()} type="button">
                  Logout
                </button>
              )}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Navbar;
