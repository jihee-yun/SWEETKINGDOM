import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";

// 포인트로 카페 쿠폰 결제하는 상점

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const MyPoint = styled.div`

 .goEvent {
    color: gray;
    font-size : 0.8rem;
    margin: 10px 0 100px 0;

    .link_style {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const Name = styled.div`
  margin-right: 25px;
  font-size: 1.1rem;
  font-weight: bolder;
`;

const CouponBox = styled.div`
  margin-bottom: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;

const CouponList = styled.div`
  border: 4px solid #FFCFDA;
  width: 400px;
  height: 130px;
  border-radius: 40px;
  margin: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  

  @media (max-width: 430px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    width: 80%;
    height: 180px; 
  }
`;

const CouponName = styled.div`
  margin-right: 25px;
  font-size: 1.1rem;
  font-weight: bolder;
  @media (max-width: 430px) {
    margin: 20px;
  }
`;

const Price = styled.div`
  font-weight: bolder;
  background-color: #FFCFDA;
  padding: 10px;
  border-radius: 40px;
  cursor: pointer;

  @media (max-width: 430px) {
    width: 60%;
    margin: 20px 0 10px 0;
  }
`;

const CafeContainer = styled.div`
  @media (max-width: 768px) {
    justify-content: center;
  }
  position: relative;
  width: 100%;
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 25px;
  align-items: center;
  padding-top: 20px;
`;

const CafeBox = styled.div`
  height: 300px;
  margin: 30px 15px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  border-radius: 10px;
  box-shadow: 0 3px 3px #A4A4A4;
  cursor: pointer;

  &:hover{
    transform: scale(1.02);
  }

  .background {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,.7) 50%, rgba(0,0,0,0) 100%);
  }

  .content {
    position: absolute;
    padding: 20px;
    bottom: -20px;
    color: white;

    .intro{
      height: 45px;
    }
    
    p {
      font-weight: bold;
      &:nth-child(1) {
        font-size: .7rem;
        text-decoration: underline #FFCFDA 3px;
        text-underline-offset: 5px;
      }
      &:nth-child(2) {
        color: #FFCFDA;
        font-size: .9rem;
      }
      &:nth-child(3) {
        font-size: 1.1rem;
      }
    }
  }
`;

const Thumb = styled.div`
  width: 100%;
  height: 100%;
  object-fit: fit;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
`;

const Notice = styled.div`
  color: grey;
  font-size: 0.8rem;
  line-height: .5rem;
  margin: 100px 0 60px 0;
`;


const InfoList = styled.div`
  margin-top: 60px;
`;

const CouponStore = () => {
  const [couponInfo, setCouponInfo] = useState("");
  const [pointInfo, setPointInfo] = useState("");
  const [cafeInfo, setCafeInfo] = useState("");
  const context = useContext(UserContext);
  const { userNum, isLogin, grantType, accessToken, isSidebar } = context
  const navigate = useNavigate();

  console.log(couponInfo);

  useEffect(() => {
    const couponInfo = async() => {
      const rsp = await AxiosApi.getCoupon("ALL");
      if(rsp.status === 200) setCouponInfo(rsp.data);
    };
    couponInfo();
  }, []);

  useEffect(() => {
    const pointInfo = async() => {
      if(isLogin && userNum) {
        const rsp = await AxiosApi.myInfoGet(userNum, grantType, accessToken);
        if(rsp.status === 200) setPointInfo(rsp.data);
      }
    };
    pointInfo();
  }, [isLogin, userNum, grantType, accessToken]);

  useEffect(() => {
    const cafeInfo = async() => {
      const rsp = await AxiosApi.fourCafeGet("ALL");
      if(rsp.status === 200) setCafeInfo(rsp.data);
    };
    cafeInfo();
  }, [])

  const navigatePay = (id) => {
    const filterCoupon = couponInfo.filter(coupon => coupon.id === id);
    navigate('/couponPayment', {state : {filterCoupon}});
  };

  if (!isLogin) {
    navigate('/memberlogin');
    return null;
  }

  return(
    <>
    <Header/>
    {isSidebar && <Sidebar />}
    <Container>
      <MyPoint>
          {pointInfo && pointInfo.map(item => (
            <InfoList key={item.memberNum}>
              <Name>{item.name}님 포인트 : {item.totalPoint} 포인트</Name> 
            </InfoList>
          ))}
        <div className="goEvent">
          <Link to='/event' className="link_style">받을 수 있는 포인트 확인하기</Link>
        </div>
      </MyPoint>
      <h3>포인트로 카페 할인 받기</h3>
      <CouponBox>
          {couponInfo && couponInfo.map(item => (
            <CouponList key={item.couponNum}>
              <CouponName>{item.couponName}</CouponName>
              <Price onClick={() => navigatePay(item.id)}>{item.price} 포인트</Price>
            </CouponList>
          ))}
      </CouponBox>
      <h3>포인트 사용 가능 매장 확인하기</h3>
      <CafeContainer>
        {cafeInfo && cafeInfo.map(cafe => (
        <CafeBox key={cafe.id}>
          <Thumb className="img" imageurl={cafe.thumbnail}/>
          <div className="background"></div>
          <div className="content">
            <p>{cafe.region}</p>
            <p>{cafe.cafeName}</p>
            <p className="intro">{cafe.intro}</p> 
          </div>
        </CafeBox>
        ))}
        </CafeContainer>
      <Notice>
        <div>
          <p><b>포인트 유의사항</b></p>
          <p>포인트는 타인에게 양도하거나 판매할 수 없습니다.</p>
        </div>
      </Notice>
    </Container>
    <Footer />
    </>
  );
};

export default CouponStore;