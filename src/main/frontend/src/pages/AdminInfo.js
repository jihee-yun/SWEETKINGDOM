import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.png";
import report from "../images/report.png";
import review from "../images/review.png";
import challengeImg from "../images/challengeImg.png";
import userManage from "../images/userManage.png";



const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  text-align: center;

  .logo {
    width: 150px;
    height: 150px;
    margin-top: 10px;
    cursor: pointer;
  }

  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
    margin-left: 50px;
  }

  .row > div {
    flex-basis: calc(50% - 10px);
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-right: 100px;
  }

  .row img {
    width: 200px;
    height: 150px;
    margin-right: 10px;
  }

  .row span {
    flex-grow: 1; /* 남은 공간을 차지하여 줄바꿈이 일어나지 않도록 함 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    overflow: hidden; /* 내용이 넘칠 경우 숨김 처리 */
    text-overflow: ellipsis; /* 내용이 넘칠 경우 ...으로 표시 */
    margin-left: 5px;
    font-size: 20px;
    font-weight: bolder;
  }

  .challengeImg {
    justify-content: center; /* 가로 중앙 정렬 */
    margin-top: 10px; /* 삭제 요소와 상위 요소 사이의 간격을 조정 */
  }

  .challengeImg span {
    margin-left: 10px;
  }

  .report {
    justify-content: center; /* 가로 중앙 정렬 */
    margin-top: 10px; /* 신고 내역 요소와 상위 요소 사이의 간격을 조정 */
    margin-left: 40px;
  }

  .report span {
    margin-top: 30px;
  }

`;

const AdminInfo = () => {
  const navigate = useNavigate("");

  const LogoClick = () => {
    navigate('/');
  }

  // 사용자 관리
  const handleUserManage = () => {
    navigate('/admin/userManage');
  }

  // 신고
  const handleReport = () => {
    navigate('/admin/report');
  }

  // 삭제
  const handleChallenge = () => {
    navigate('/admin/challenge');
  }

  // 리뷰 
  const handleReview = () => {
    navigate('/admin/manageReview');
  }

  return (
    <InfoBlock>
      <div className="logo">
        <img src={logo} alt="logo" className="logo" onClick={LogoClick} />
      </div>

      <div className="row">
        <div onClick={handleUserManage} className="userManage">
          <img src={userManage} alt="userManage"/>
          <span>사용자 관리</span>
        </div>

        <div onClick={handleReview} className="review">
          <img src={review} alt="review"/>
          <span>리뷰 관리</span>
        </div>
      </div>

      <div className="row">
        <div onClick={handleChallenge} className="challengeImg">
          <img src={challengeImg} alt="challengeImg"/>
          <span>챌린지</span>
        </div>

        <div onClick={handleReport} className="report">
          <img src={report} alt="report"/>
          <span>신고 내역</span>
        </div>
        </div>

    </InfoBlock>
  );
};

export default AdminInfo;







