import './Home.css';
import MovieCard from '../../component/movieCard/MovieCard';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Slider from '../../component/slider/Slider';
import SwiperComponent from '../../component/swiper/Swiper';
import { MovieContext } from '../../context/MovieContext';

const Home = () => {
  const { movie, setCounterContext, counterC, searchTerm, setSearchTerm } =
    useContext(MovieContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(e.target[0].value);
  };
  const handleBack = () => {
    window.location.reload();
  };
  const handleCounter = (e) => {
    let text = e.target.innerText;
    if (text === 'Next') {
      return setCounterContext(counterC + 1);
    } else if (text === 'Previous') {
      return counterC > 1 && setCounterContext(counterC - 1);
    }
  };

  return (
    <>
      {searchTerm ? (
        <Button onClick={handleBack} className="backToHome">
          Back to home Page
        </Button>
      ) : (
        <div className="buttonGroup">
          <Button onClick={handleCounter} className="button" variant="info">
            Previous
          </Button>
          <p>Page {counterC}</p>
          <Button onClick={handleCounter} className="button" variant="info">
            Next
          </Button>
        </div>
      )}
      <div className="search-form">
        <form onSubmit={handleSubmit} action="">
          <input type="text" placeholder="Search a Film" />
        </form>
      </div>

      {searchTerm ? (
        <div className="movieContainer">
          {movie?.map((item, i) => (
            <MovieCard key={i} {...item} />
          ))}
        </div>
      ) : (
        <div className="sliderGroup">
          <Slider />
          <SwiperComponent />
        </div>
      )}
    </>
  );
};

export default Home;
