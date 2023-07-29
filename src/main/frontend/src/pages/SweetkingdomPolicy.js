import React, { useContext } from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Policy from "../component/Policy";
import PrivacyPolicy from "../component/PrivacyPolicy";


const Container  = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 90%;
  text-align: center;
  /* padding-top: 50px;
  padding-bottom: 50px; */
  padding: 70px 0;
`;

const SweetkingdomPolicy = () => {
  const {isSidebar} = useContext(UserContext);

  return(
    <>
    {isSidebar && <Sidebar />}
    <Header />
    <Container>
      <div className="Box">
        <h2>개인정보처리방침 </h2>
        <PrivacyPolicy />
      </div>
    </Container>
    <Footer />
    </>
  );
};

export default SweetkingdomPolicy;