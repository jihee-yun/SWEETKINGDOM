import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import adminReg from "./images/adminReg.png";
import userManage from "./images/userManage.png";
import declaration from "./images/declaration.png";
import Xbtn from "./images/Xbtn.png";
import Delete from "./images/Delete.png";
import menubar from "./images/menubar.png";
import logo from "../../images/logo.png";



const InfoBlock = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  margin-bottom: 30px;

    .left_btn {
        display: inline-block;
        cursor: pointer;
    }

    .left_btn img {
        width: 100px;
        height: 80px;
        padding: 10px;
    }

    .logo {
        width: 150px;
        height: 150px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 10px;
        cursor: pointer;
    }

    .category {
        position: fixed;
        left: 0;
        width: 25vw;
        top: 0;
        bottom: 0;
        background-color: #c1c0c0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transform: translateX(-100%);
        padding: 20px;
    }

    .category.active {
        transform: translateX(0);
    }

    .menu-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        gap: 20px;
        cursor: pointer;
    }

    .menu-x img {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .menu-item img {
        width: 90px;
        height: 80px;
        margin-right: 100px;
        margin-bottom: 40px;
    }

    .menu-item span {
        font-size: 16px;
        font-weight: bold;
        margin-top: -30px;
        margin-right: 70px;
        margin-left: -70px;
    }

    .adminReg {
        margin-left: -5px;
    }

    .declaration {
        margin-left: -10px;
    }

    .adminDelete {
        margin-left: -40px;
    }

    .adminReg {
        margin-left: 5px;
    }

    .Delete {
        margin-left: -30px;
    }

    form {
        width: 400px;
        margin-left: 240px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        margin-top: 40px;
    }    
        
    fieldset {
      margin-bottom: 20px;
      width: 350px;
      height: 200px;
      padding: 10px;
      background-color : #D9D9D9;

    }

      legend {
        color: #46AA46;
        font-weight: bolder;
        margin-bottom: 10px;
      }

      ul {
        padding: 10px;
        margin: 10px;
      }  

      li {
        margin-bottom: 10px;
      }
      
    
    .form-container {
        margin-top: 150px;
        margin-left: 120px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .form-column {
        width: 50%;
        display: flex;
        flex-direction: column;
    }

    .form-column:nth-child(2n) {
        margin-left: -200px;
    }

    fieldset {
      position: relative;
    }

    fieldset p {
      position: absolute;
      top: -20px;
      right: 0;
      margin: 0;
      padding: 10px;
      cursor: pointer;
      font-weight: bolder;
      color : #46AA46;
    }

    @media (max-width:768px) {
      .category {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
    }
      .left_btn {
        width: 100px;
      }

    .form-container {
        width: 150%;
        gap: 250px;
        display: flex;
        margin-left: -450px;
        justify-content: center;
    }

    .form-column {
      margin-top: 20px;
      
    }


    .form-column:nth-child(2n) {
      margin-left: 5px;
      margin-top: -240px;
    }
    
    .menubar {
      display: none; /* 초기에는 menubar가 숨겨져 있음 */
    }
  
    .left_btn:focus + .menubar {
      display: block; /* left_btn이 focus되면 menubar가 나타남 */
    }
  }
`;




const AdminInfo = () => {

    const navigate = useNavigate("");

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prevState) => !prevState);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleMenuItemClick = () => {
        if (menuOpen) {
        closeMenu();
        } else {
        toggleMenu();
        }
    };

    const handleMenuClose = () => {
        closeMenu();
    };

    const LogoClick = () => {
      navigate('/');
    }

    // 관리자 등록
    const handleAdminReg = () => {
        navigate('/adminReg');
    }

    // 사용자 관리
    const handleUserManage = () => {
        navigate('/userManage');
    }

    // 신고
    const handleDeclaration = () => {
        navigate('/adminReport');
    }

    // 삭제
    const handleDelete = () => {
        navigate('/adminDelete');
    }

    // 이벤트 더보기
    const handleEvent = () => {
      navigate('/manageEvent');
    }

    // 리뷰 더보기
    const handleReview = () => {
      navigate('/manageReview');
    }
    
    // 소모임 더보기
    const handleGuild = () => {
      navigate('/manageGuild');
    }


    return (
      <InfoBlock>
        <div className="left_btn">
          <img
            src={menubar}
            alt="menubar"
            className={`menubar ${menuOpen ? 'open' : ''}`}
            onClick={handleMenuItemClick}
            />
        </div>

        <div className={`category ${menuOpen ? 'active' : ''}`}>
            <div className="menu-x">
                <img src={Xbtn} alt="Xbtn" className="Xbtn" onClick={handleMenuClose}/>
            </div>

            <div className="menu-item">
                <img src={adminReg} alt="adminReg" className="adminReg" onClick={handleAdminReg}/>
                <span>관리자 등록</span>
            </div>

            <div className="menu-item">
                <img src={userManage} alt="userManage" className="userManage" onClick={handleUserManage}/>
                <span>사용자 관리</span>
            </div>

            <div className="menu-item">
                <img src={declaration} alt="declaration" className="declaration" onClick={handleDeclaration} />
                <span>신고 내역</span>
            </div>

            <div className="menu-item">
                <img src={Delete} alt="Delete" className="Delete" onClick={handleDelete}/>
                <span>삭제</span>
            </div>
        </div>

        <div className="logo">
            <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
        </div>

        <div className="form-container">
            <div className="form-column">
                <form action="#" method="text">
                  <fieldset>
                      <p onClick={handleGuild}>더보기</p>
                    <legend>소모임 관리</legend>
                    
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    </fieldset>
                </form>

          <form action="#" method="text">
            <fieldset>
              <p onClick={handleEvent}>더보기</p>
              <legend>이벤트 관리</legend>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>

            </fieldset>
          </form>
        </div>

        <div className="form-column">
          <form action="#" method="text">
            <fieldset>
              <p onClick={handleReview}>더보기</p>
              <legend>리뷰관리</legend>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>

            </fieldset>
          </form>

          <form action="#" method="text">
            <fieldset>
              <p>더보기</p>
              <legend>캘린더</legend>

            </fieldset>
          </form>
        </div>
      </div>
      </InfoBlock>
    );
  };
  
  export default AdminInfo;