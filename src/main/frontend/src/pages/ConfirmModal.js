import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  z-index: 10000;
  width: 300px;
  height: 140px;
  font-family: 'Arial', sans-serif; /* 폰트 설정 */
  color: #333; /* 글자 색상 설정 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
  hr {
    width: 100%;
    border: none;
    height: 1px;
    background-color: #ccc;
    margin: 10px 0;
  }

  h3 {
    color : #FFCFDA;
    font-weight: bolder;
  }

  p {
    font-size: 18px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button{
    border: none;
    width: 60px;
    height: 30px;
    cursor: pointer;
  }
`;

const ConfirmButton = styled.button`
  margin-left: 10px;
  background-color: greenyellow;
  border: none;
  width: 60px;
`;

const ConfirmModal = ({ message, onClose, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Sweet Kingdom</h3>
        <hr/>
        <p>{message}</p>
        <ButtonContainer>
          <button onClick={onClose}>취소</button>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmModal;
