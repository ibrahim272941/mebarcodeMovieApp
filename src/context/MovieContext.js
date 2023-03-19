import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const MovieContext = createContext();
const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`;
const MovieContextProvider = (prop) => {
  const [movie, setMovie] = useState([]);
  const [counterC, setCounterContext] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemId, setItemId] = useState();

  useEffect(() => {
    if (searchTerm) {
      getMovie(SEARCH_API + searchTerm);
    } else {
      getMovie(FEATURED_API + counterC);
    }
  }, [counterC, searchTerm, itemId]);

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
    <MovieContext.Provider
      value={{
        movie,
        setCounterContext,
        counterC,
        setSearchTerm,
        searchTerm,
        setItemId,
      }}
    >
      {prop.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
