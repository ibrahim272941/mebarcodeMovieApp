import './Details.css';

import { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../../component/comment/Comment';
import { AuthContext } from '../../context/AuthContext';
import TrailerComment from '../../component/trailerComment/TrailerComment';
import Cast from '../../component/cast/Cast';
const IMG_API = 'https://image.tmdb.org/t/p/original';
const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const youtubeUrl = 'https://www.youtube.com/embed/';
const URL = `https://mebarcode-91813-default-rtdb.europe-west1.firebasedatabase.app`;
const Details = () => {
  const [trailer, setTrailer] = useState();
  const [comment, setComment] = useState();

  const { movie } = useContext(AuthContext);
  const { state } = useLocation();
  const { id } = useParams();
  const filterTrailer = trailer?.filter((e) => e.type === 'Trailer');
  const filterMovie = movie?.filter((e) => e.id == id.substring(1));
  const { poster_path, title, overview, backdrop_path } = filterMovie[0];

  const filmInfo = {
    id,
    poster_path,
    title,
  };

  useEffect(() => {
    getDetails(id, API_KEY);
    getComment();
  }, [id]);

  const getDetails = async (id, apiKey) => {
    try {
      const {
        data: { results },
      } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id.substring(
          1
        )}/videos?api_key=${apiKey}&language=en-US`
      );
      setTrailer(results);
    } catch (error) {
      console.log(error);
    }
  };
  const getComment = async () => {
    const { data } = await axios.get(`${URL}/comment.json`);
    setComment(data);
  };
  const filteredComment = comment
    ? Object.keys(comment)
        .map((e) => (comment[e].filmId === id.substring(1) ? comment[e] : null))
        .filter((e) => e !== null)
    : null;

  return (
    <div
      style={{
        backgroundImage: `url(${IMG_API}${backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="trailer">
        <p className="trailerTitle">Official Trailer</p>
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
      <div className="trailer-overview">
        <div className="trailer-parag-div">
          <div className="overviewDiv">
            <h3 className="trailer-title">{title}</h3>
            <p className="trailer-parag">{overview}</p>
          </div>
          <Cast id={id} />
        </div>
      </div>
      <div className="trailer-head">
        {/* <img
            className="backdrop"
            src={`${IMG_API}${poster_path}`}
            alt="img"
          /> */}
      </div>

      {/* <TrailerComment comment={filteredComment} /> */}
      <Comment state={state} filmInfo={filmInfo} />
    </div>
  );
};

export default Details;
