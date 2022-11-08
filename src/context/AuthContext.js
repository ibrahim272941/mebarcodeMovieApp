import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth/firebase-config';

export const AuthContext = createContext();

const AuthContexProvider = (prop) => {
  const [currentUser, setUser] = useState();
  useEffect(() => {
    onStateChangedFunc();
  }, []);
  const onStateChangedFunc = async () => {
    try {
      onAuthStateChanged(auth, (validUser) => {
        setUser(validUser);
      });
    } catch (error) {
      alert(error.meesage);
    }
  };
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {prop.children}
    </AuthContext.Provider>
  );
};

export default AuthContexProvider;
