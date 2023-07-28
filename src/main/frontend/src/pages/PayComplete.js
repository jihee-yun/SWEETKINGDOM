import React, { useContext } from 'react';
import styled from "styled-components";
import credit from "../images/credit.png";
import Header from '../component/Header';
import Footer from '../component/Footer';
import Sidebar from '../component/Sidebar';
import { UserContext } from '../context/UserStore';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  img {
    width: 150px;
    height: 150px;
  }

  p {
    margin-top: 30px;
    font-size: 1.5rem;
    font-weight: bolder;
  }
`;

const PayComplete = () => {
  const context = useContext(UserContext);
  const { isSidebar } = context;

  return(
    <>
    <Header />
    {isSidebar && <Sidebar />}
    <Container>
      <div className='pay'>
        <img src={credit} alt="결제" />
        <p>결제가 완료되었습니다.</p>
      </div>
    </Container>
    <Footer />
    </>
  );
};

export default PayComplete;