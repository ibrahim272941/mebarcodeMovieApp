import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCNOQi4_phL31mpKVtfnFazKiBcPBuJGlk',
  authDomain: 'mebarcode-91813.firebaseapp.com',
  projectId: 'mebarcode-91813',
  storageBucket: 'mebarcode-91813.appspot.com',
  messagingSenderId: '616559882428',
  appId: '1:616559882428:web:3d2a4b75fa380656fa20b9',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInUser = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/');
  } catch (error) {
    alert(error.message);
  }
};

export const createUser = async (navigate, email, password, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: displayName });
    console.log(auth.currentUser);
    navigate('/');
  } catch (error) {
    alert(error.message);
  }
};

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert(error.message);
  }
};

export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email);
};
