import {useEffect} from 'react';
import styled from 'styled-components';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import slideImg from "../images/slideImg.jpg";
import slideImg2 from "../images/slideImg2.jpg";
import slideImg3 from "../images/slideImg3.jpg";
import slideImg4 from "../images/slideImg4.jpg";

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

const SwiperContainer = styled.div`
  height: 400px;
  width: 100%;
  padding-bottom: 85px;
`;

const SwiperWrapper = styled.div`
  width: 73.8%;
  will-change: transform;

  @media (min-width: 630px) {
    width: 100%;
  }
`;

const SwiperSlide = styled.div`
  width: 100%;
  background-color: white;
  overflow: hidden;

  &.swiper-slide-active,
  &.swiper-slide-duplicate-active {
    .slide-image {
      transform: scale3d(1, 1, 1);
    }
  }

  @media (min-width: 630px) {
    width: 50%;
  }

  @media (min-width: 768px) {
    width: 33.333333%;

    &.swiper-slide-next,
    &.swiper-slide-prev,
    &.swiper-slide-duplicate-next,
    &.swiper-slide-duplicate-prev {
      .slide-image {
        transform: scale3d(1, 1, 1);
      }
    }
  }

  @media (min-width: 1024px) {
    width: 25%;
  }
`;

// const SwiperPagination = styled.div`
//   position: relative;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 85px;
//   bottom: 0;

//   .swiper-pagination-bullet {
//      width: 12px; 
//      height: 12px; 
//      background: transparent; 
//      border: 1px solid #FFD0E4; 
//      opacity: 1; 
//     }

    
//   .swiper-pagination-bullet-active { 
//     width: 40px; 
//     transition: 
//     width .5s; 
//     border-radius: 5px; 
//     background-color: #FFD0E4; 
//     border: 1px solid transparent; 
// }

//   @media (min-width: 768px) {
//     width: 40px;
//   }
// `;


const SlideImage = styled.div`

  height: 100%;
  width: 100%;
  background-image: url(${props => props.imageurl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transform: scale3d(1.3, 1.3, 1);
  backface-visibility: hidden;
  will-change: transform;
  transition: transform 1400ms ease;
`;

const SlideContent = styled.div`
  padding: 0 2.2rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  h4 {
    font-size: 25px;
    font-weight: 400;
    margin: 0 0 1rem;
    padding-top: 2.8rem;
    flex-grow: 0;
  }

  p {
    display: flex;
    line-height: 1.8;
    margin-top: 0;
    font-size: 14px;
    flex-grow: 1;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 2.8rem;
    font-size: 14px;
    color: #c2c0e0;

    a {
    color: tomato;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 3px solid currentColor;
    padding-bottom: 3px;
  }
  }


`;

const TestSwiper = () => {

    useEffect(() => {
        SwiperCore.use([Autoplay, Pagination]);
        new SwiperCore('.swiper-container', {
          slidesPerView: 'auto',
          initialSlide: 0,
          speed: 1000,
          spaceBetween: 32,
          loop: false,
          centeredSlides: true,
          roundLengths: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
          },
          autoplay: {
            delay: 3000,
          },
        });
      }, []);




  return (
    <>
    <Container>
    <h2 className="title">추천 리스트</h2>
    <SwiperContainer className="swiper-container">
      <SwiperWrapper className="swiper-wrapper">
     
        <SwiperSlide className="swiper-slide" >
          <SlideImage
            className="slide-image"
            imageurl={slideImg}
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <SlideImage
            className="slide-image"
            imageurl={slideImg2}
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
        <SlideContent>
            <h4>로흐</h4>
            <p>
              로흐 매장은 역삼동에 위치한 구움과자 테이크아웃 전문점입니다.
              시그니처 메뉴는 휘낭시에입니다.
              로흐 구움과자에 어울리는 커피와 포트넘 앤 메인슨 차가 페어링 하실 수 있도록 준비되어 있습니다.
              오셔서 편안히 즐겨주세요.
            </p>
        </SlideContent>
        <div className='footer'>
            <div>01/02</div>
            <a href="#">READ MORE</a>
       </div>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <SlideImage
            className="slide-image"
            imageurl={slideImg3}
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <SlideImage
            className="slide-image"
            imageurl={slideImg4}
          />
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
        <SlideContent>
            <p>웅냥냥</p>
        </SlideContent>
        <div className='footer'>
            <div>01/02</div>
            <a href="#">READ MORE</a>
       </div>
        </SwiperSlide>
      
      </SwiperWrapper>
      {/* <SwiperPagination className="swiper-pagination">
        <div className="swiper-pagination-bullet" />
      </SwiperPagination> */}
    </SwiperContainer>
    </Container>
    </>
  );
};

export default TestSwiper;