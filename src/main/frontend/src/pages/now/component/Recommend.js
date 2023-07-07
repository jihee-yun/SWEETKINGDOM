import { useRef, useState } from "react";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const Container = styled.div`
width: 90%;
height: 500px;
margin-top: 20px;
display: flex;
align-items: center;
flex-direction: column;
`;


const CustomSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  justify-content: center;
  box-shadow: 0px 1px 3px black;


.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

.swiper-pagination-bullet {
     width: 12px; 
     height: 12px; 
     background: transparent; 
     border: 1px solid #FFD0E4; 
     opacity: 1; 
    }
.swiper-pagination-bullet-active { 
    width: 40px; 
    transition: 
    width .5s; 
    border-radius: 5px; 
    background-color: #FFD0E4; 
    border: 1px solid transparent; 
}
`;

const Recommend = () => {

    

 
    return(
        <>
        <Container>
            <h2 className="title">추천 리스트</h2>
            <CustomSwiper
             pagination={{
                dynamicBullets: true,
              }}
            modules={[Autoplay, Pagination]}
			autoplay={{
				delay: 5000,
			}}>
            <SwiperSlide>임시 슬라이드1</SwiperSlide> 
            <SwiperSlide>임시 슬라이드2</SwiperSlide> 
            <SwiperSlide>임시 슬라이드3</SwiperSlide> 
            <SwiperSlide>임시 슬라이드4</SwiperSlide> 
            <SwiperSlide>임시 슬라이드5</SwiperSlide> 
            </CustomSwiper>
        </Container>
        </>

    );
}

export default Recommend;