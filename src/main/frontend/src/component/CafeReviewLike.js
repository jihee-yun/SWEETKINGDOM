import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import like from "../images/like1.png";
import AxiosApi from "../api/AxiosApi";
import Modal from "../utils/Modal2";
import CompleteModal from "../utils/CompleteModal";

const Like = styled.div`
  margin-top: 20px;
  width: 10%;

  button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 60px;
    height: 25px;
    background-color: white;
    border: .5px solid lightgray;
    border-radius: 15px;
    box-shadow: 0px 1px 1px lightgray;
    cursor: pointer;
  }

  img {
    width: 12px;
    height: 12px;
  }
`;

const CafeReviewLike = ({reviewId, likeCount}) => {
  // const context = useContext(UserContext);
  // const { grantType, accessToken } = context;
  const navigate = useNavigate("");

  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken")
  const memNum = localStorage.getItem("userNum");
  const userAuthority = localStorage.getItem("userAuthority");
  
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [isModalOpen, setModalOpen] = useState(false);

  const changeLikeCount = async(memNum, id) => {
    if(memNum && userAuthority === 'ROLE_USER') {
      const response = await AxiosApi.reviewLike(memNum, id, grantType, accessToken );
      console.log(response.data);
      if(response.data === true) {
        setCurrentLikeCount(prevCount => prevCount + 1);
      } else if(response.data === false) {
        setCurrentLikeCount(prevCount => prevCount - 1);
      }
    } else {
      setModalOpen(true);
    }
  }

  const complete = () => {
    navigate("/memberlogin");
  }

  const closeModal = () => {
    setModalOpen(false);
  }
  
  return(
    <>
    <Like onClick={() => changeLikeCount(memNum, reviewId)}>
      <button><img src={like} alt="좋아요" /><p>{currentLikeCount}</p></button>
    </Like>
    <Modal move={true} header="완료" open={isModalOpen} confirm={complete} close={closeModal}>
        <CompleteModal content={"로그인이 필요합니다. 로그인 페이지로 이동할까요?"} maxCharacters={11}/>
    </Modal>
    </>
  );
};

export default CafeReviewLike;