import React from "react";
import styled from "styled-components";
import StarIcon from '@mui/icons-material/Star';

const StarRating = styled.div`
  display: flex;
  align-items: center;
  
  .star {
  color: #aaa9a9; 
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;
}
 
.fill {
  color: #f7e600;
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: gold;
}
 
.base {
  z-index: 0;
  padding: 0;
}

.text{
  font-size: .9rem;
  font-weight: 700;
  margin-left: 10px;
}
`;

const Star = () => {

  const star = 4.5; // 백에서 리뷰 평균 점수 계산하는 로직 구현해서 값 받아오기

  const ratingToPercent = {
    width: `${(star / 5) * 100}%`
  };

  return(
    <>
      <StarRating>
    <div className="star">
      <div className="base">
        <span><StarIcon /></span>
        <span><StarIcon /></span>
        <span><StarIcon /></span>
        <span><StarIcon /></span>
        <span><StarIcon /></span>
      </div>
      <div className="fill" style={ratingToPercent}>
        <span><StarIcon /></span>
        <span><StarIcon /></span>
        <span><StarIcon /></span>
        <span><StarIcon /></span>
        <span><StarIcon /></span>
      </div>
    </div>
    {/* <div className="text">({star} / 5)</div> */}
    </StarRating>
    </>
  );
};

export default Star;