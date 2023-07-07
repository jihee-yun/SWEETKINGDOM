import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FloatingButton = styled.div`
  position: fixed;
  bottom: 50px;
  right: 5%;
  width: ${({ isHovered, isClicked }) =>
    isClicked ? "300px" : isHovered ? "150px" : "50px"};
  height: ${({ isClicked }) => (isClicked ? "500px" : "50px")};
  border-radius: 25px;
  background-color: ${({ isHovered, isClicked }) =>
    isClicked || isHovered ? "#f1d1d1" : "#f1d1d1"};
  color: ${({ isHovered, isClicked }) =>
    isClicked || isHovered ? "#7d5a5a" : "#7d5a5a"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: ${({ isHovered }) => 
    (isHovered ? "3px 3px 10px rgba(0, 0, 0, 0.5)" : "2px 2px 5px rgba(0, 0, 0, 0.7)")};
`;

const NewDiv = styled.div`
  position: fixed;
  bottom: 50px;
  right: 5%;
  width: 300px;
  height: 500px;
  border-radius: 25px;
  background-color: #ffffff;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 8px 20px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  border: none;
  background-color: transparent;
  color: #7d5a5a;
  cursor: pointer;
`;

const ChatBot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleReturnClick = () => {
    setIsClicked(false);
    setIsHovered(false);
  };

  return (
    <>
      {isClicked ? (
        <NewDiv isClicked={isClicked}>
          <CloseButton onClick={handleReturnClick}>X</CloseButton>
          챗 봇 확대
        </NewDiv>
      ) : (
        <FloatingButton
          isHovered={isHovered}
          isClicked={isClicked}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {isHovered ? "챗 봇" : "+"}
        </FloatingButton>
      )}
    </>
  );
};

export default ChatBot;
