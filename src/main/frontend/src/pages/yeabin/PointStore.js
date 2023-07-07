import React from "react";
import styled from "styled-components";

// 현금으로 포인트 충전하는 상점

const ContainerBox = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
  border: 1px solid black;
  height: 500px;
  text-align: center;

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 40px 0px 40px 0px;
  }

  th, td {
    padding: 25px;
    font-weight: bolder;
  }

  .payBtn {
    border: none;
    width: 120px;
    height: 33px;
    background-color: #FFCFDA;
    border-radius: 30px;
    font-weight: bolder;
    font-size: 1rem;
  }
`;

const Titlebox = styled.div`
  text-align: center;
`;




const PointStore = () => {
  return(
    <>
    <ContainerBox>
      <Titlebox>
        <h3>포인트 충전하기</h3>
      </Titlebox>
      <Container>
        <table>
          <tbody>
            <tr>
              <th>충전 포인트</th>
              <th>결제 금액</th>
            </tr>
            <tr>
              <td>50,000 포인트</td>
              <td><button className="payBtn">50,000원</button></td>
            </tr>
            <tr>
              <td>30,000 포인트</td>
              <td><button className="payBtn">30,000원</button></td>
            </tr>
            <tr>
              <td>10,000 포인트</td>
              <td><button className="payBtn">10,000원</button></td>
            </tr>
            <tr>
              <td>5,000 포인트</td>
              <td><button className="payBtn">5,000원</button></td>
            </tr>
          </tbody>
        </table>
      </Container>
    </ContainerBox>
    </>
  );
};

export default PointStore;