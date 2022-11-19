import axios from 'axios';
import { useEffect, useState } from 'react';
import './Cast.css';

const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const IMG_API = 'https://image.tmdb.org/t/p/original';
const Cast = ({ id }) => {
  const [cast, setCast] = useState();
  useEffect(() => {
    getReviews();
  }, [id]);

  const getReviews = async () => {
    const {
      data: { cast },
    } = await axios(
      `https://api.themoviedb.org/3/movie/${id.substring(
        1
      )}/credits?api_key=${API_KEY}&language=en-US`
    );

    setCast(cast.slice(0, 7));
  };

  return (
    <>
      {/* <p className="castinTitle">Casting</p> */}
      <div className="castingDiv">
        {cast?.map((item, i) => (
          <div key={i} className="cast">
            <img src={`${IMG_API}${item.profile_path}`} alt="" />
            <div className="castInfo">
              <p className="name">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cast;
