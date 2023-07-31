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
  overflow-x: hidden;
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

    a {
    color: tomato;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 3px solid currentColor;
    padding-bottom: 3px;
  }

`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 2.8rem;
    font-size: 14px;
    color: #c2c0e0;
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
            <h4>프롤라</h4>
            <p>
              프롤라 매장은 역삼동에 위치한 구움과자 테이크아웃 전문점입니다.
              시그니처 메뉴는 휘낭시에입니다.
              로흐 구움과자에 어울리는 커피와 포트넘 앤 메인슨 차가 페어링 하실 수 있도록 준비되어 있습니다.
              오셔서 편안히 즐겨주세요.
            </p>
            <Footer>
              <div>01/02</div>
              <a href="http://localhost:3000/cafe/detail/4">READ MORE</a>
           </Footer>
        </SlideContent>
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
          <h4>Cafe168</h4>
            <p>단국대학교 용인캠퍼스 앞에 자리한 cafe 168입니다
              카페 내부는 깔끔한 화이트톤으로 인테리어 되어 있어 아늑한 분위기와 
              외부 테라스에 앉아 여유로움도 함께 즐기실 수 있습니다
              커피뿐만 아니라 수제청으로 만든 에이드와 티를 즐기실 수 있으시며, cafe 168만의 
              수제 쿠키도 함께 준비되어 있습니다.
            </p>
            <Footer>
              <div>02/02</div>
              <a href="http://localhost:3000/cafe/detail/5">READ MORE</a>
           </Footer>
        </SlideContent>
        </SwiperSlide>
      
      </SwiperWrapper>
    </SwiperContainer>
    </Container>
    </>
  );
};

export default TestSwiper;