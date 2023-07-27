import React from "react";
import styled from "styled-components";
import logo from "../images/logo.png";

const ModalBox = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 10px;

  img {
    width: 100px;
    height: 100px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      padding-top: 20px;
      font-size: .9rem;
      font-weight: bold;
      color: #424242;
    }
  }
`;


const GuildJoinModal = () => {

  return(
    <>
    <ModalBox> 
      <Box>
        <div className="content">
          <div className="logo"><img src={logo} alt="로고" /></div>
          <p>정말 가입하시겠습니까?</p>
        </div>
      </Box>
    </ModalBox>
    </>
  );
};

export default GuildJoinModal;