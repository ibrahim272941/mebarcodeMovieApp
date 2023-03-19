import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CastContext } from '../../context/CastContext';
import './Cast.css';

const IMG_API = 'https://image.tmdb.org/t/p/original';
const Cast = ({ id }) => {
  const { setCastId, cast, handlePerson } = useContext(CastContext);
  const navigate = useNavigate();
  useEffect(() => {
    setCastId(id);
  }, [id, setCastId]);
  const handelPersonId = (id) => {
    handlePerson(id, navigate);
  };
  return (
    <>
      <div className="castingDiv">
        {cast?.map((item, i) =>
          item.profile_path ? (
            <div key={item.id} className="cast">
              <img src={`${IMG_API}${item.profile_path}`} alt="" />
              <div onClick={() => handelPersonId(item.id)} className="castInfo">
                <p className="name">{item.name}</p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default Cast;
