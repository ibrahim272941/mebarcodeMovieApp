import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CastContext = createContext();
const API_KEY = '0dfeb1e3115d788bdd6ccd6d217d93cf';
const IMG_API = 'https://image.tmdb.org/t/p/original';
const CastContextProvider = (prop) => {
  const [cast, setCast] = useState();
  const [id, setCastId] = useState();
  useEffect(() => {
    getReviews();
    //handlePerson();
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
  const handlePerson = async (personId, navigate) => {
    navigate(`/castdetails`);
    console.log(personId);
    let urls = [
      `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`,
      `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${API_KEY}`,
    ];
    const data = urls.map((url) => axios.get(url));
    axios.all(data).then((res) => console.log(res[0].data));
  };
  return (
    <CastContext.Provider value={{ setCastId, cast, handlePerson }}>
      {prop.children}
    </CastContext.Provider>
  );
};

export default CastContextProvider;
