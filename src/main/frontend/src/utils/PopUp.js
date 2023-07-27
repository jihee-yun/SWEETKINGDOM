import React, { useEffect, useState } from "react";
import styled, { StyleSheetManager } from "styled-components";
import img from "../images/popup.png";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
   @media (max-width: 768px) {
    width: 220px;
    height: 300px;
    left: 50%;
  }
  width: 280px;
  height: 400px;
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 90%;
  border-radius: 10px;
  object-fit: cover;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const NoShowButton = styled.div`
  position: absolute;
  right: 10px;
  bottom: 5px;
  font-size: .9rem;
  font-weight: bold;
`;

const GeneralClose = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;
`;


const PopUp = () => {
  const navigate = useNavigate("");
  const [isPopUp, setIsPopUp] = useState(true);

  // 마우스로 위치 옮기기(넣을까 말까...)
  // const [position, setPosition] = useState({ top: 400, left: 400 });
  // const [dragging, setDragging] = useState(false);
  // const [offset, setOffset] = useState({ x: 0, y: 0 });

  const closePopUp = (expireDays) => {
    let expire = new Date();
    expire.setTime(expire.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    localStorage.setItem("popupNoShow", expire.getTime());
  }

  const closeToday = () => {
    closePopUp(1);
    setIsPopUp(false);
  }

  const checkPopupClose = () => {
    const expireDay = localStorage.getItem("popupNoShow");
    let today = new Date();
  
    if(today.getTime() > expireDay) { 
      return false;
    } else {
      return true;
    }
  }
  
  // 로컬 스토리지 바로 삭제하기 위해서 임의로 넣어둠(주석 해제하고 실행)
  // localStorage.removeItem("popupNoShow");

  useEffect(() => {
    checkPopupClose() ? setIsPopUp(false) : setIsPopUp(true);
  }, []);

  const moveToEventPage = () => {
    navigate("/event");
  }

  // 마우스로 위치 옮기기
  // const handleMouseDown = (event) => {
  //   setDragging(true);
  //   setOffset({
  //     x: event.clientX - position.left,
  //     y: event.clientY - position.top
  //   });
  // };

  // const handleMouseUp = () => {
  //   setDragging(false);
  // };

  // const handleMouseMove = (event) => {
  //   if (dragging) {
  //     const newLeft = event.clientX - offset.x;
  //     const newTop = event.clientY - offset.y;
  //     setPosition({ left: newLeft, top: newTop });
  //   }
  // };

  return(
    <>
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'imageurl'}>
    {isPopUp && (
    <Container>
      <ImgContainer onClick={moveToEventPage} imageurl={img}/>
      <NoShowButton onClick={closeToday}>
        <input type="checkbox" id="check" />
        <label htmlFor="check">오늘 하루 안 보기</label>
      </NoShowButton>
      <GeneralClose onClick={() => setIsPopUp(false)}>
        <DisabledByDefaultIcon style={{width:"28px", height:"28px"}}/>
      </GeneralClose>
    </Container>
    )}
    </StyleSheetManager>
    </>
  );
};

export default PopUp;