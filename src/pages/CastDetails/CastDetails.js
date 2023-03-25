import './CastDetails.css';
import { useContext } from 'react';
import { CastContext } from '../../context/CastContext';
import { useNavigate } from 'react-router-dom';
const IMG_API = 'https://image.tmdb.org/t/p/original';
export const CastDetails = () => {
  const { personBio, personMovie } = useContext(CastContext);
  const navigate = useNavigate();
  const handleSubmit = (id) => {
    navigate(`/details:${id}`);
  };
  return (
    <>
      {personBio && personMovie ? (
        <div className="castDetails">
          <div className="personTop">
            <img
              className="personImg"
              src={`${IMG_API}${personBio.profile_path}`}
              alt=""
            />
            <p className="personName">{personBio.name}</p>
            <p className="personBio">{personBio.biography}</p>
          </div>

          <div className="filmography">
            {personMovie?.map((item, i) => (
              <div key={i} className="castingContainer">
                {item.poster_path ? (
                  <>
                    <img
                      onClick={() => handleSubmit(item.id)}
                      className="personCastingImg"
                      src={`${IMG_API}${item.poster_path}`}
                      alt=""
                    />

                    <div className="castinFilmInfo">
                      <p className="castingFilmName">{item.original_title}</p>
                      <p className="castingName">{item.character}</p>
                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Please Wait</p>
      )}
    </>
  );
};
