import './Details.css';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const IMG_API = 'https://image.tmdb.org/t/p/original';
const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const youtubeUrl = 'https://www.youtube.com/embed/';
const Details = () => {
  const [trailer, setTrailer] = useState();
  const { id, poster_path, overview, title } = useLocation().state;
  useEffect(() => {
    getDetails(id, API_KEY);
  }, [id]);
  const getDetails = async (id, apiKey) => {
    try {
      const {
        data: { results },
      } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
      );
      setTrailer(results);
    } catch (error) {
      console.log(error);
    }
  };

  const filterTrailer = trailer?.filter((e) => e.type === 'Trailer');

  return (
    <div className="details">
      <div className="trailer-overview">
        <div className="trailer-head">
          <img
            className="backdrop"
            src={`${IMG_API}${poster_path}`}
            alt="img"
          />
        </div>
        <div className="trailer-parag-div">
          <h4 className="trailer-title">{title}</h4>
          <p className="trailer-parag">{overview}</p>
        </div>
      </div>

      <div className="trailer">
        {trailer ? (
          <iframe
            src={`${youtubeUrl}${filterTrailer[0]?.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        ) : (
          <div>Loading......</div>
        )}
      </div>
    </div>
  );
};

export default Details;
