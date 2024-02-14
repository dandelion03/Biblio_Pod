import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BookDisplay } from '../../components/BookDisplay';
import '../../components/style/collections.css'; // Import your CSS file
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper/modules';

export const Collection = () => {
 
  return (
    <>
    <Swiper
      scrollbar={{
        hide: true,
      }}
      modules={[Scrollbar]}
      className="mySwiper"
    >
      <SwiperSlide> <BookDisplay
                title={'test'}
                author={'test'}
                img={'doodle.png'}
                identifier={'5' || 'No identifier available'}
                description={
                  'llllllllllllllllllllllllllllllllllllllllllllllllllllllllllll'
                }
              /></SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </Swiper>
  </>
  );
};

