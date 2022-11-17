import './Home.css';
import MovieCard from '../../component/movieCard/MovieCard';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import Slider from '../../component/slider/Slider';
import SwiperComponent from '../../component/swiper/Swiper';

const Home = () => {
  const { movie, setCounterContext, counterC, searchTerm, setSearchTerm } =
    useContext(AuthContext);

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
      <Slider />
      <div className="search-form">
        <form onSubmit={handleSubmit} action="">
          <input type="text" placeholder="Search a Film" />
        </form>
      </div>
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
      <SwiperComponent />

      {/* <div className="movieContainer">
        {movie?.map((item, i) => (
          // <MovieCard key={i} {...item} />
          //<SwiperComponent key={i} {...item} />
        ))}
      </div> */}
    </>
  );
};

export default Home;
