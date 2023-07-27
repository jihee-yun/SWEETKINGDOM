import React from "react";
import styled from "styled-components";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { storage } from "../context/Firebase";
import { deleteObject, ref } from "firebase/storage";

const Box = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 23px;
  right: 9px;
  width: 80px;
  height: 70px;
  border: .5px solid lightgray;
  box-shadow: 0px 1px 1px lightgray;
  background-color: white;
  
  p{
    font-size: .8rem;
    font-weight: bold;
    margin-left: 10px;
    color: #585858;
  }
  
  .box{
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const CafeReviewModal = ({id, reviewInfo, cafeNum, isModalOpen}) => {
  // const context = useContext(UserContext);
  // const { grantType, accessToken } = context;
  const navigate = useNavigate();
  const selectInfo = reviewInfo.filter(review => review.id === id);
  
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken")

  const editReview = async() => {
    navigate("/cafe/review/edit", {state: {cafeNum, selectInfo}});
  }

  console.log(selectInfo[0].url1, selectInfo[0].url2);

  const deleteReview = async() => {
    const response = await AxiosApi.deleteReview(id, cafeNum, grantType, accessToken);
    console.log(response.data);
    if(response.data === true) {
      if(selectInfo[0].url1 && selectInfo[0].url2){
      deleteImage(selectInfo[0].url1, selectInfo[0].url2);
    }
      isModalOpen(true);
    }
  };

  const deleteImage = async (url1, url2) => {
    const imageRef = ref(storage, url1);
    const imageRef2 = ref(storage, url2);
    await deleteObject(imageRef);
    await deleteObject(imageRef2);
  };

  return(
    <>
    <Box>
    <div className="box" onClick={editReview}>
      <CreateIcon style={{width:"20px", height:"20px", color:"#585858"}}/><p>수정</p>
    </div>
    <div className="box" onClick={deleteReview}>
      <DeleteIcon style={{width:"20px", height:"20px", color:"#585858"}}/><p>삭제</p>
    </div>
    </Box>
    </>
  );
};

export default CafeReviewModal;