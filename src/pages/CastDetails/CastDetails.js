import './CastDetails.css';
import { useContext } from 'react';
import { CastContext } from '../../context/CastContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/navbar/Navbar';
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
            <div className="personInfo">
              <p className="personName">{personBio.name}</p>
              <p className="personBio">{personBio.biography}</p>
            </div>
          </div>

          <div className="filmography">
            {personMovie?.map((item, i) => (
              <div key={i} className="castingContainer">
                <img
                  onClick={() => handleSubmit(item.id)}
                  className="personCastingImg"
                  src={
                    item.poster_path
                      ? `${IMG_API}${item.poster_path}`
                      : 'https://sp-ao.shortpixel.ai/client/q_lossless,ret_img,w_900/https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg'
                  }
                  alt=""
                />

                <div className="castinFilmInfo">
                  <p className="castingFilmName">
                    {item.original_title} / {item.release_date.slice(0, 4)}
                  </p>
                  <p className="castingName">{item.character}</p>
                </div>
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
