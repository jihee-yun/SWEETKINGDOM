import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";

const Box = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 100px;
  width: 100%;

`;

const Container = styled.div`
  width: 40%;
  margin: 0 auto;

  h2 {
    margin-top: 50px;
    text-align: center;
  }

  .payBtn {
    width: 350px;
    height: 50px;
    border: none;
    background-color: #FFCFDA;
    font-size: 1.1rem;
    font-weight: bolder;
    margin: 80px 0  80px 0;
    cursor: pointer;

    @media (max-width: 430px) {
      width: 290px;
    }
  }
`;

const CouponBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CouponList = styled.div`
`;

const Name = styled.div`
  margin-top: 50px;
  font-size: 1.2rem;
  font-weight: bolder;
`;

const MyPoint = styled.div`
  margin-top: 50px;
  font-size: 1.1rem;
`;

const Price = styled.div`
  margin-top: 50px;
  font-size: 1.1rem;
`;

const CouponPayment = () => {
  const location = useLocation();
  const info = location.state && location.state.filterCoupon;
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { isSidebar } = context;
  const [pointInfo, setPointInfo] = useState([]);

  const userNum = localStorage.getItem("userNum");
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken");
  const isLogin = localStorage.getItem("isLogin");

  useEffect(() => {
    const getPointInfo = async () => {
      if (isLogin && userNum) {
        const rsp = await AxiosApi.myInfoGet(userNum, grantType, accessToken);
        if(rsp.status === 200) setPointInfo(rsp.data);
      }
    };
    getPointInfo();
  }, [userNum, isLogin, grantType, accessToken]);

  if (!isLogin) {
    navigate('/memberlogin');
    return null;
  };

  const coupon = info[0];
  const couponPrice = coupon.price;
  const couponId = coupon.id;

  console.log(couponPrice);

  const handlePayClick = async () => {
    const response = await AxiosApi.couponPayment(userNum, coupon.id, grantType, accessToken);
    console.log(response.data);
    if(response.data === true) {
      navigate('/payComplete');
    } else {
      alert('보유하신 포인트가 부족합니다.');
    }
  };

  console.log(userNum);
  console.log(couponId);

  return(
    <>
    <Header />
    {isSidebar && <Sidebar />}
    <Box>
    <Container>
      <h2>쿠폰 결제</h2>
      <CouponBox>
        {info && info.map(coupon => (
          <CouponList key={coupon.id} >
            <Name>{coupon.couponName}</Name>
            <MyPoint>보유 포인트 : {pointInfo[0]?.totalPoint || 0} </MyPoint>
            <Price>차감 포인트 : {coupon.price}</Price>
            <button className="payBtn" onClick={handlePayClick}>결제하기</button>
          </CouponList>
        ))}
      </CouponBox>
    </Container>
    </Box>
    <Footer />
    </>
  );
};

export default CouponPayment;