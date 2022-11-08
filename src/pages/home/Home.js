import './Home.css';
import MovieCard from '../../component/movieCard/MovieCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

const Home = () => {
  const [movies, setMovie] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    getMovie(FEATURED_API + counter);
  }, [counter]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovie(SEARCH_API + searchTerm);
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
  const handleCounter = (e) => {
    let text = e.target.innerText;
    if (text === 'Next') {
      return setCounter(counter + 1);
    } else if (text === 'Previous') {
      return counter > 1 && setCounter(counter - 1);
    }
  };
  console.log(counter);
  return (
    <>
      <div className="search-form">
        <form onSubmit={handleSubmit} action="">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search a Film"
          />
        </form>
      </div>
      <div className="buttonGroup">
        <Button onClick={handleCounter} className="button" variant="info">
          Previous
        </Button>
        <p>Page {counter}</p>
        <Button onClick={handleCounter} className="button" variant="info">
          Next
        </Button>
      </div>
      <div className="movieContainer">
        {movies?.map((item, i) => (
          <MovieCard key={i} {...item} />
        ))}
      </div>
    </>
  );
};

export default Home;
