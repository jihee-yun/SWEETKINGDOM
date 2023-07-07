import React from "react";
import styled from "styled-components";

const Box = styled.div`
  margin-top: 100px;
`;

const Container = styled.div`
  border: 1px solid black;
  width: 40%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  

  .cName {
    margin-top: 80px;
  }

  .myPoint {
    margin-top: 80px;
    font-size: 1.1rem;
  }  

  .minus {
    margin-top: 50px;
    font-size: 1.1rem;
  }

  .payBtn {
    width: 350px;
    height: 40px;
    border: none;
    background-color: #FFCFDA;
    font-size: 1.1rem;
    font-weight: bolder;
    margin: 80px 0  80px 0;
    cursor: pointer;
  }
`;

const CouponPayment = () => {
  return(
    <Box>
      <Container>
        <div>
          <p className="cName">쿠폰 이름 들어갈 자리~</p>
          <p className="myPoint">보유 포인트 : </p>
          <p className="minus">차감 포인트 : </p>
          <button className="payBtn">결제 하기</button>
        </div>
      </Container>
    </Box>
  );
};

export default CouponPayment;