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
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 10px;

  .logo img {
    margin: 0;
    width: 100px;
    height: 100px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    p {
      padding-top: 20px;
      padding-bottom: 20px;
      font-size: .9rem;
      font-weight: bold;
      color: #424242;
    }
  }
`;

const CompleteModal = ({content, maxCharacters}) => {

  const splitContent = (content) => {
    if (content.length > maxCharacters) {
      const firstLine = content.substring(0, maxCharacters);
      const remainingContent = content.substring(maxCharacters);
      return (
        <p>
          {firstLine}
          <br />
          {remainingContent}
        </p>
      );
    }
    return <p>{content}</p>;
  };

  return(
    <>
    <ModalBox> 
      <Box>
      <div className="content">
        <div className="logo"><img src={logo} alt="로고" /></div>
        {splitContent(content)}
      </div>
      </Box>
    </ModalBox>
    </>
  );
};

export default CompleteModal;