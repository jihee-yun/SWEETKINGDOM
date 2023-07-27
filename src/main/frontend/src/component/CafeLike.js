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

const CafeLike = ({cafeNum}) => {
  // const context = useContext(UserContext);
  // const { grantType, accessToken } = context;
  const navigate = useNavigate("");
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken");
  const memNum = localStorage.getItem("userNum");

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentState, setCurrentState] = useState("false")

  const changeLike = async(cafeNum, memNum) => {
    if(memNum){
      const response = await AxiosApi.cafeLike(cafeNum, memNum, grantType, accessToken);
      console.log(response.data);
      if(response.data === true) {
        setCurrentState("true");
      } else if(response.data === false) {
        setCurrentState("false");
      }
    } else setModalOpen(true);
  }

  useEffect(() => {
    const likeState = async() => {
      if(memNum) {
        const response = await AxiosApi.getLikeState(cafeNum, memNum, grantType, accessToken)
        if(response.data === true) {
          setCurrentState("true");
        }
      }
    }
    likeState();
  }, [cafeNum, memNum, grantType, accessToken])

  const complete = () => {
    navigate('/memberlogin');
  }

  const closeModal = () => {
    setModalOpen(false);
  }
  
  return(
    <>
    <LikeBox onClick={() => changeLike(cafeNum, memNum)}>
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