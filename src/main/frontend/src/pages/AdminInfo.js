import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.png";
import report from "../images/report.png";
import review from "../images/review.png";
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

  .userManage,
  .review,
  .report {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .userManage img,
  .review img,
  .report img {
    width: 200px;
    height: 150px;
    margin-right: 10px;
    margin-top: 25px;
    margin-left: -80px;
  }

  .userManage span,
  .review span,
  .report span {
    font-size: 20px;
    font-weight: bolder;
    margin-left: 80px;
    margin-top: 40px;
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
        {/* Wrap "사용자 관리" and "리뷰 관리" in a new div with the class "manageRow" */}
        <div className="manageRow">
          <div onClick={handleUserManage} className="userManage">
            <img src={userManage} alt="userManage" />
            <span>사용자 관리</span>
          </div>

          <div onClick={handleReview} className="review">
            <img src={review} alt="review" />
            <span>리뷰 관리</span>
          </div>
        </div>

        {/* "신고 내역" element */}
        <div onClick={handleReport} className="report">
          <img src={report} alt="report" />
          <span>신고 내역</span>
        </div>
      </div>

    </InfoBlock>
  );
};

export default AdminInfo;







