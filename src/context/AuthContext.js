import { createContext, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth/firebase-config';

export const AuthContext = createContext();

const AuthContexProvider = (prop) => {
  const [currentUser, setUser] = useState();

  onAuthStateChanged(auth, (validUser) => {
    setUser(validUser);
  });

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {prop.children}
    </AuthContext.Provider>
  );
};

export default AuthContexProvider;
