import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AxiosApi from "../api/AxiosApi";
import Modal from "../utils/Modal2";
import CompleteModal from "../utils/CompleteModal";
import { useNavigate } from "react-router-dom";


const LikeBox = styled.div`
  padding-top: 3px;
`;

const CafeLike = ({cafeNum, memNum}) => {
  // const context = useContext(UserContext);
  // const { grantType, accessToken } = context;
  const navigate = useNavigate("");
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken");
  const userAuthority = localStorage.getItem("userAuthority");

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentState, setCurrentState] = useState("false")

  const changeLike = async(cafeNum) => {
    if(memNum && userAuthority === 'ROLE_USER') {
      const response = await AxiosApi.cafeLike(cafeNum, memNum, grantType, accessToken);
      console.log(response.data);
      if(response.data === true) {
        setCurrentState("true");
      } else if(response.data === false) {
        setCurrentState("false");
      }
    } else if(memNum && userAuthority === 'ROLE_MEMBER') {
        alert('사업자 회원은 좋아요를 누를 수 없습니다')
    } else setModalOpen(true);
  }

  useEffect(() => {
    if(memNum && userAuthority === 'ROLE_USER') {
    const likeState = async() => {
        const response = await AxiosApi.getLikeState(cafeNum, memNum, grantType, accessToken)
        if(response.data === true) {
          setCurrentState("true");
      }
    }
    likeState();
  }
  }, [cafeNum, memNum, grantType, accessToken, userAuthority])

  const complete = () => {
    navigate('/memberlogin');
  }

  const closeModal = () => {
    setModalOpen(false);
  }
  
  return(
    <>
    <LikeBox onClick={() => changeLike(cafeNum)}>
      {currentState === "true" ? 
      <FavoriteIcon style={{color:"#FA5858", width:"28px", height:"28px", cursor:"pointer"}}/>
      : <FavoriteBorderIcon style={{color:"#BDBDBD", width:"28px", height:"28px", cursor:"pointer"}}/>
      }
      </LikeBox>
      <Modal move={true} header="완료" open={isModalOpen} confirm={complete} close={closeModal}>
        <CompleteModal content={"로그인이 필요합니다. 로그인 페이지로 이동할까요?"} maxCharacters={11}/>
      </Modal>
    </>
  );
};

export default CafeLike;