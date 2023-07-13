import React from "react";
import styled from "styled-components";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AxiosApi from "./api/AxiosApi";
import { useNavigate } from "react-router-dom";

const Modal = styled.div`
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

const CafeReviewEdit = ({id, reviewInfo, cafeNum}) => {
  const navigate = useNavigate();
  const selectInfo = reviewInfo.filter(review => review.id === id);
  
  const editReview = async() => {
    navigate("/cafe/review/edit", {state: {cafeNum, selectInfo}});
  }

  const deleteReview = async() => {
    const response = await AxiosApi.deleteReview(id, cafeNum);
    console.log(response.data);
    if(response.data === true) {
      alert("리뷰가 삭제되었습니다.");
      navigate(-1);
    }
  }

  return(
    <>
    <Modal>
    <div className="box" onClick={editReview}>
      <CreateIcon style={{width:"20px", height:"20px", color:"#585858"}}/><p>수정</p>
    </div>
    <div className="box" onClick={deleteReview}>
      <DeleteIcon style={{width:"20px", height:"20px", color:"#585858"}}/><p>삭제</p>
    </div>
    </Modal>
    </>
  );
};

export default CafeReviewEdit;