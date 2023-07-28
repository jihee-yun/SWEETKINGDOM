import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import address from "../images/location.png";
import time from "../images/clock.png";
import phone from "../images/mobile-phone.png";
import menu from "../images/restaurant-menu.png";
import Slider from "./Slider";
import AxiosApi from "../api/AxiosApi";
import KaKaoMap from "../utils/KaKaoMap";
import AvgStar from "../component/AvgStar";
import CafeLike from "../component/CafeLike";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
  @media (max-width: 430px) {
    width: 100%;
  }
  width: 50%;
  margin: 0 auto;
  /* box-shadow: 0 3px 3px lightgray; */

  img{
    width: 100px;
    height: 100px;
    margin: 30px 0 0 30px;
    cursor: pointer;
  }

  .cafe-name {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .top {
    padding: 30px;
  }

  .star{
    display: flex;
    position: relative;

    p {
      position: absolute;
      font-weight: 600;
      font-size: .7rem;
      left: 200px;
      top: -8px;
      background-color: #FFCFDA;
      border: 5px solid #FFCFDA;
      border-radius: 15px;
      cursor: pointer;
    }
  }
  .navi{
    margin-top: 20px;
    height: 40px;
    border-bottom: .3px solid lightgray;
    align-items: center;
    padding-left: 35px;
    display: flex;
    
    div{
      width: 70px;
      height: 35px;
      text-align: center;
      align-items: center;
      font-size: 1.1rem;
      font-weight: bold;
      &:hover{
        border-bottom: 3px solid #FFCFDA;
      }
    }
  }

  .middle{
    position: relative;
    
    .decobox{
      width: 120px;
      height: 60px;
      border-radius: 30px;
      left: 25px;
      top: 35px;
      background-color: #FFCFDA;
      position: absolute;
      z-index: 0;
    }

    .content {
      padding: 30px;
      margin-left: 10px;

      h2{
        margin-bottom: 100px;
        position: relative;
        z-index: 1;
      }
    }
  }

  .bottom{
    background-color: #FFCFDA;
    padding: 30px;

    img{
      margin: 0;
      width: 30px;
      height: 30px;
    }

    .detailbox{
      display: flex;
      align-items: center;
      padding: 20px;
      font-weight: bold;

      &:nth-child(2){
        align-items: flex-start;
      }

      span{
        margin-left: 10px;
      }
      p{
        margin: 0 0 0 10px;
        line-height: 30px;
      }
    }
  }
`;

const CafeDetail = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { isSidebar } = context; 
  const {cafeNum} = useParams();
  const userNum = localStorage.getItem("userNum");
  // const cafeNum = localStorage.getItem("cafeNum");

  // 카페 디테일 정보 받아오기
  const [detailInfo, setDetailInfo] = useState("");

  useEffect(() => {
    const detailInfo = async() => {
      const response = await AxiosApi.detailInfoGet(cafeNum);
      if(response.status === 200) setDetailInfo(response.data);
    };
    detailInfo();
  }, [cafeNum]);

  const sendDetailInfo = () => {
    navigate("/cafe/review", {state: detailInfo});
  }

  return(
    <>
    <Header />
    {isSidebar && <Sidebar />}
    {detailInfo && detailInfo.map(cafe =>(
    <Container key={cafe.id}>
    {/* <Link to="/cafe/main" style={{ textDecoration: "none", color: "inherit"}}><img src={logo} alt="스위트킹덤로고" /></Link> */}
    <div className="top">
      <div className="cafe-name">
        <h1>{cafe.cafeName}</h1>
        <CafeLike cafeNum={cafe.id} memNum={userNum}/>
      </div>
    <div className="star">
      <AvgStar avgStar={cafe.avgScore}/>
       <p onClick={sendDetailInfo}>전체 후기</p>
    </div>
    <h3>{cafe.addr}</h3>
    </div>
    <Slider cafeNum={cafeNum}/>
    <div className="middle">
    <div className="content">
    <h2>{cafe.intro}</h2>
    <p>카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용카페 상세 설명 내용</p>
    </div>
    <div className="decobox"></div>
    <div className="map"><KaKaoMap name={cafe.cafeName} addr={cafe.addr}/></div>
    </div>
    <div className="bottom">
    <div className="detailbox"><img src={address} alt="위치" /><span>{cafe.addr}</span></div>
    
    <div className="detailbox"><img src={menu} alt="메뉴" />
    <div className="menulist">
    {cafe.menuList.map((menu) => {
      const [id, name, price] = menu.split(" - ");
      return (
        <p key={id}>{name} - {price}</p>
      );
    })}
    </div>
    </div>
    <div className="detailbox"><img src={time} alt="시간" /><span>{cafe.operatingTime}</span></div>
    <div className="detailbox"><img src={phone} alt="전화" /><span>{cafe.tel}</span></div>
    </div>
    </Container>
    ))}
    <Footer />
    </>
  );
};

export default CafeDetail;