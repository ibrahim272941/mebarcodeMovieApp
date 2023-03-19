import './Slider.css';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

import { MovieContext } from '../../context/MovieContext';
const IMG_API = 'https://image.tmdb.org/t/p/original';

const Slider = () => {
  const { currentUser } = useContext(AuthContext);
  const { movie } = useContext(MovieContext);

  let navigate = useNavigate();

  const handleClick = (img) => {
    const { id, poster_path, title, overview } = img;
    currentUser
      ? navigate(`details:${id}`, {
          state: { id, poster_path, title, overview },
        })
      : alert('Please Login');
  };
  return (
    <Carousel
      className="carousel mt-4 corusselContainer"
      fade
      autoPlay={true}
      interval={5000}
    >
      {movie?.map((img, i) => (
        <Carousel.Item className="d-flex justify-content-center slider" key={i}>
          {/* <img
            onClick={() => handleClick(img)}
            style={{}}
            src={IMG_API + img.backdrop_path}
            alt="First slide"
          /> */}
          <div
            onClick={() => handleClick(img)}
            style={{
              backgroundImage: `url(${IMG_API + img.backdrop_path})`,
              backgroundSize: 'cover',
            }}
            className="divImage"
          >
            <p className="filmTitle">{img.title}</p>
            <p className="filmOverview">{img.overview}</p>
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
