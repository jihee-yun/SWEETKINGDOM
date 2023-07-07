import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100px;
  display: flex;
  justify-content: space-between;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  transition: width 0.5s ease-in-out, border-radius 0.5s ease-in-out;

  &.active {
    width: 50px;
    border-radius: 15px;
    background-color: #FFCFDA;
  }
`;

const DotPageNation = ({imgList, currentIndex, setCurrentIndex}) => {

  // 페이지(점) 클릭시 인덱스 이동 
  const moveDot = (index) => {
    setCurrentIndex(index)
  };

  return(
    <>
    <Container>
      {imgList.map((img, index) => (
        <Dot
          key={img.id}
          className={index === currentIndex ? "active" : null}
          onClick={() => moveDot(index)}
        />
      ))}
    </Container>
    </>
  );
};

export default DotPageNation;