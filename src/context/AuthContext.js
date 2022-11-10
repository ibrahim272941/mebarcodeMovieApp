import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth/firebase-config';
import axios from 'axios';

export const AuthContext = createContext();
const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`;
const AuthContexProvider = (prop) => {
  const [currentUser, setUser] = useState();
  const [movie, setMovie] = useState([]);

  const [counterC, setCounterContext] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);
  useEffect(() => {
    onStateChangedFunc();
    if (searchTerm) {
      getMovie(SEARCH_API + searchTerm);
    } else {
      getMovie(FEATURED_API + counterC);
    }
  }, [counterC, searchTerm]);
  const onStateChangedFunc = async () => {
    try {
      onAuthStateChanged(auth, (validUser) => {
        setUser(validUser);
      });
    } catch (error) {
      alert(error.meesage);
    }
  };
  const getMovie = async (api) => {
    console.log();
    try {
      const {
        data: { results },
      } = await axios.get(api);

      setMovie(results);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        movie,
        setCounterContext,
        counterC,
        setSearchTerm,
        searchTerm,
      }}
    >
      {prop.children}
    </AuthContext.Provider>
  );
};

export default AuthContexProvider;
