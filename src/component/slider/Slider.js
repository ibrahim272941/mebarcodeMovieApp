import './Slider.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
import Cast from '../cast/Cast';
const IMG_API = 'https://image.tmdb.org/t/p/original';
const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const Slider = () => {
  const { currentUser, movie } = useContext(AuthContext);

  let navigate = useNavigate();
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
