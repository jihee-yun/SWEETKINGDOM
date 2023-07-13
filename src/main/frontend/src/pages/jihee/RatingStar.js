import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StarIcon from '@mui/icons-material/Star';

const RatingBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #C4C4C4;
    cursor: pointer;
  }

  .yellow {
    color: #f7e600;
  }

  .score{
    height: 50px;
    padding-top: 5px;
    font-size: .9rem;
    font-weight: bold;
    color: gray;
  }
`;

const Star = ({getScore, setScore}) => {

  // 별 선택 상태값 관리
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  // 별 5개 배열 생성
  const starArray = [0, 1, 2, 3, 4];

  const starClick = (index) => {
    const clickStates = [...clicked];
    for(let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    setScore(clickStates.filter(Boolean).length);
  }

  // 기존 스코어 값 가져오기
  useEffect(() => {
    if (getScore) {
      const defaultScore = getScore;
      const clickStates = [...clicked];
      for (let i = 0; i < defaultScore; i++) {
        clickStates[i] = true;
      }
      setClicked(clickStates);
    }
  }, [getScore]);


  // 별점에 따라 문구 출력
  let scoreText = "";
  switch(clicked.filter(Boolean).length) {
    case 1 : scoreText = "1점 (별로예요)"; break;
    case 2 : scoreText = "2점 (그냥그래요)"; break;
    case 3 : scoreText = "3점 (괜찮아요)"; break;
    case 4 : scoreText = "4점 (좋아요)"; break;
    case 5 : scoreText = "5점 (최고예요)"; break;
    default : scoreText = "";
  }

  return(
    <>
    <RatingBox>
    {starArray.map(el => (
      <StarIcon key={el} 
      onClick={() => starClick(el)}
      className={clicked[el] ? 'yellow' : ''}
      size="10"/>
    ))}
    <div className="score">{scoreText}</div>
    </RatingBox>
    </>
  );
};

export default Star;
