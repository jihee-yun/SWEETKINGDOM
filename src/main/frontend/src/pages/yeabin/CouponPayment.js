import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Box = styled.div`
  margin-top: 100px;
`;

const Container = styled.div`
  border: 1px solid lightgray;
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

  console.log(info);

  return(
    <Box>
      <Container>
        <h2>쿠폰 결제</h2>
        <CouponBox>
          {info && info.map(coupon => (
            <CouponList key={coupon.id} >
              <Name>{coupon.couponName}</Name>
              <MyPoint>보유 포인트 : </MyPoint>
              <Price>차감 포인트 : {coupon.price}</Price>
              <button className="payBtn">결제 하기</button>
            </CouponList>
          ))}
        </CouponBox>
      </Container>
    </Box>
  );
};

export default CouponPayment;