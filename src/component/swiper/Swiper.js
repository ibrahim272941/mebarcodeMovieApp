import { Icon } from '@iconify/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { EffectCoverflow, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { AuthContext } from '../../context/AuthContext';
import ModalLogin from '../modalLogin/ModalLogin';
import './Swiper.css';
const IMG_API = 'https://image.tmdb.org/t/p/original';
SwiperCore.use([EffectCoverflow, Autoplay, Pagination]);
const SwiperComponent = () => {
  const { currentUser, movie } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/details:${id}`);
    // if (currentUser) {
    // } else {
    //   alert('Plesae Login');
    //   navigate(`/login`);
    // }
  };

  return (
    <div className="mainSwiper">
      <Swiper
        effect={'flip'}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        className="mySwiper"
        navigation
        slidesPerView={2}
        spaceBetween={0}
      >
        {movie?.map((item, i) => (
          <SwiperSlide className="sliderItem" key={i}>
            <div className="sliderBox">
              <div className="movie">
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
            </div>
            {/* <img src={`${IMG_API}${item.poster_path}`} alt="img" /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
