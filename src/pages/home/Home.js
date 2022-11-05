import './Home.css';
import MovieCard from '../../component/movieCard/MovieCard';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

const Home = () => {
  const [movies, setMovie] = useState();
  useEffect(() => {
    getMovie(FEATURED_API);
  }, []);
  const getMovie = async (api) => {
    try {
      const {
        data: { results },
      } = await axios.get(api);

      setMovie(results);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(movies);
  return (
    <div className="movieContainer">
      {movies?.map((item, i) => (
        <MovieCard key={i} {...item} />
      ))}
    </div>
  );
};

export default Home;
