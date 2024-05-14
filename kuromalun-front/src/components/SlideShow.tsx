'use client'
import React from 'react';
import { Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const testList = [
  { src: '/haikei.png', alt: 'slide-1' },
  { src: '/tennisCircle.JPG', alt: 'slide-2' },
  { src: '/watnow.JPG', alt: 'slide-3' }
];

export default function App() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-52"
      >
        {testList.map((item) => (
          <SwiperSlide key={item.alt}>
            <div className="relative h-full w-full">
              <Image
                src={item.src}
                alt={item.alt}
                className="swiper-slide-image w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
