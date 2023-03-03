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

  const handlePerson = async (personId) => {
    console.log(personId);
    let urls = [
      `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`,
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${API_KEY}`,
    ];
    const data = urls.map((url) => axios.get(url));
    axios.all(data).then((res) => console.log(res[0].data));
  };
  return (
    <>
      {/* <p className="castinTitle">Casting</p> */}
      <div className="castingDiv">
        {cast?.map((item, i) => (
          <div key={item.id} className="cast">
            <img src={`${IMG_API}${item.profile_path}`} alt="" />
            <div className="castInfo">
              <p onClick={() => handlePerson(item.id)} className="name">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cast;
