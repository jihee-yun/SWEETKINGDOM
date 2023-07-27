import React, { useState } from "react";
import styled from "styled-components";
import social from "../images/small-talk.png";
import quest from "../images/target.png";

const CategoryBar = styled.div`
   @media (max-width: 768px) {
    gap: 30px;
  }

  width: 100%;
  color: #585858;
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-top: 80px;
  margin-bottom: 30px;
  box-sizing: border-box;

  .category {
    @media (max-width: 768px) {
    height: 30px;
    font-size: .9rem;
    }

    height: 55px;
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    img{
      @media (max-width: 768px) {
      width: 20px;
      height: 20px;
      }
      padding-right: 10px;
      width: 35px;
      height: 35px;
    }
  }

  .selected {
    /* margin-top: 5px; */
    border-bottom: 5px solid #ffcfda;
  }
`;

const GuildFilterCategory = ({onClickCategory}) => {
  const [category, setCategory] = useState("All");

  const clickCategory = (e) => {
    setCategory(e);
    onClickCategory(e);
  }

  return(
    <>
    <CategoryBar>
        <div className={`category ${category === "All" ? "selected" : ""}`} onClick={() => clickCategory("All")}>전체</div>
        <div className={`category ${category === "퀘스트" ? "selected" : ""}`} onClick={() => clickCategory("퀘스트")}><img src={quest} alt="" />퀘스트</div>
        <div className={`category ${category === "친목" ? "selected" : ""}`} onClick={() => clickCategory("친목")}><img src={social} alt="" />친목</div>
    </CategoryBar>
    </>
  );
};

export default GuildFilterCategory;