import './MovieCard.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Icon } from '@iconify/react';
import ModalLogin from '../modalLogin/ModalLogin';
const IMG_API = 'https://image.tmdb.org/t/p/original';
const MovieCard = ({ title, poster_path, vote_average, id }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details:${id}`);
    // if (currentUser) {
    // } else {
    //   alert('Plesae Login');
    //   navigate(`/login`);
    // }
  };

  return (
    <div className="movie">
      <img src={`${IMG_API}${poster_path}`} alt="img" />
      <div className="overview">
        <div className="movie-info">
          <h6>{title}</h6>
          <Icon
            className="imdb-icon"
            icon="cib:imdb"
            color="#f5c518"
            width="30"
          />
          <span>{vote_average}</span>
        </div>
        {currentUser ? (
          <h4 onClick={handleClick}>More Info</h4>
        ) : (
          <ModalLogin currentUser={currentUser} id={id} />
        )}
      </div>
    </div>
  );
};

export default MovieCard;
