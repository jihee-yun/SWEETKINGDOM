
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cafeimg1 from "./images/카페임시이미지.jpeg";
import { StyleSheetManager } from 'styled-components';
import DotPageNation from "./DotPageNation";
import AxiosApi from "./api/AxiosApi";

const CarouselWrapper = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
`;

const ImgSlider = styled.div`
  height: 100%;
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ currentindex }) => currentindex * -100 + "%"});
`;

const ImgContainer = styled.div`  
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

const Thumb = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  object-fit: fit;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
`;

const Arrow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #FFCFDA;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  ${props =>
    props.direction === "prev" ? "left: 10px;" : "right: 10px;"}

  z-index: 1;
`;

const Slider = ({cafeNum}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 이미지 리스트 받아오기
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    const imgList = async() => {
      const response = await AxiosApi.imgListGet(cafeNum);
      if(response.status === 200) setImgList(response.data);
    };
    imgList();
  }, [cafeNum])

  console.log(imgList);
  console.log("슬라이더 : " + cafeNum);


  // 버튼으로 직접 슬라이드 이동 구현
  const moveToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imgList.length - 1 : prev - 1));
  };

  const moveToNextSlide = () => {
    setCurrentIndex((prev) => (prev === imgList.length - 1 ? 0 : prev + 1));
  };

  // // 자동 슬라이드 구현
  // useEffect(() => {
  //   const slideInterval = setInterval(() => {
  //     moveToNextSlide();
  //   }, 5000);

  //   return () => {
  //     clearInterval(slideInterval);
  //   };
  // }, []);

  return(
    <>
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'currentindex' && prop !== 'imageurl'}>
    <CarouselWrapper>
    <Arrow direction="prev" onClick={moveToPrevSlide}>◀</Arrow>
    <ImgSlider currentindex={currentIndex}>
    {imgList && imgList.map(img => (
    <ImgContainer key={img.id}>
      <Thumb className="thumbnail" imageurl={img.url} />  
    </ImgContainer>
    ))}
    </ImgSlider>
    <Arrow direction="next" onClick={moveToNextSlide}>▶</Arrow>
    <DotPageNation  
      imgList={imgList}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}/>
    </CarouselWrapper>
    </StyleSheetManager>
    </>
  );
};

export default Slider;