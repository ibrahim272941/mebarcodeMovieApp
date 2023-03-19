import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { AuthContext } from '../../context/AuthContext';
import { MovieContext } from '../../context/MovieContext';
import ModalLogin from '../modalLogin/ModalLogin';
import './Swiper.css';
const IMG_API = 'https://image.tmdb.org/t/p/original';
SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);
const SwiperComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const { movie } = useContext(MovieContext);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/details:${id}`);
  };

  return (
    <div className="mainSwiper">
      <Swiper
        //ref={swiperRef}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onAutoplayStop
        grabCursor={true}
        centeredSlides={false}
        pagination={true}
        loop={true}
        className="mySwiper"
        navigation
        slidesPerView={6}
        spaceBetween={0}
      >
        {movie?.map((item, i) => (
          <SwiperSlide className="sliderItem" key={i}>
            <div className="movie movieSwipper">
              <img src={`${IMG_API}${item.poster_path}`} alt="img" />
              <div className="overview">
                <div className="movie-info">
                  <h5>{item.title}</h5>
                  <Icon
                    className="imdb-icon"
                    icon="cib:imdb"
                    color="#f5c518"
                    width="30"
                  />
                  <span>{item.vote_average}</span>
                </div>
                {currentUser ? (
                  <h4 onClick={() => handleClick(item.id)}>More Info</h4>
                ) : (
                  <ModalLogin currentUser={currentUser} id={item.id} />
                )}
              </div>
            </div>

            {/* <img src={`${IMG_API}${item.poster_path}`} alt="img" /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
