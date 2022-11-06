import './MovieCard.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Icon } from '@iconify/react';
const IMG_API = 'https://image.tmdb.org/t/p/original';
const MovieCard = ({ title, poster_path, overview, vote_average, id }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    currentUser
      ? navigate('/details', { state: { id, poster_path, title, overview } })
      : alert('Plesae Login');
  };

  return (
    <div className="movie">
      <img src={`${IMG_API}${poster_path}`} alt="img" />
      <div className="overview">
        <div className="movie-info">
          <h5>{title}</h5>
          <Icon
            className="imdb-icon"
            icon="cib:imdb"
            color="#f5c518"
            width="30"
          />
          <span>{vote_average}</span>
        </div>
        <h4 onClick={handleClick}>More Info</h4>
      </div>
    </div>
  );
};

export default MovieCard;
