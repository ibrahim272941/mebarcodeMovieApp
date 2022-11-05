import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
