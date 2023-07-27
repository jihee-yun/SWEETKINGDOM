import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  font-size: .8rem;
  font-weight: bold;
  color: #6E6E6E;
  margin-top: 50px;
`;

const Box = styled.div`
  display: flex;
  gap: 10px;

  .category{
    text-align: center;
    width: 50px;
    height: 20px;
    cursor: pointer;
  }

  .selected {
    border-bottom: 5px solid #ffcfda;
  }
`;

const CafeReviewFilter = ({onClickCategory}) => {
  const [category, setCategory] = useState("최신순")

  const clickCategory = (e) => {
    setCategory(e);
    onClickCategory(e);
  }
  return(
    <>
    <Container>
      <Box>
      <div className={`category ${category === "최신순" ? "selected" : ""}`} onClick={() => clickCategory("최신순")}>최신순</div>
      <div className={`category ${category === "좋아요순" ? "selected" : ""}`} onClick={() => clickCategory("좋아요순")}>좋아요순</div>
      </Box>
    </Container>
    </>
  );
};


export default CafeReviewFilter;