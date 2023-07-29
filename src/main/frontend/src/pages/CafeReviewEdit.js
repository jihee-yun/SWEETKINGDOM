import React, { useContext, useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RatingStar from "../component/RatingStar";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { storage } from "../context/Firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import CafeImageUploader from "../component/CafeImageUploader";
import Modal from "../utils/Modal2";
import CompleteModal from "../utils/CompleteModal";
import { UserContext } from "../context/UserStore";

const Container = styled.div`
  @media (max-width: 768px) { 
    width: 70%;
    margin: 0 auto;
  }
  @media (max-width: 430px) {
    width: 100%;
  }
  max-width: 1440px;
  width: 50%;
  margin: 0 auto;

  .box{
    width: 90%;
    margin: 0 auto;
  }

  .back{
    margin: 30px 0;
    color: darkgray;
    cursor: pointer;
  }

  .star{
    padding-top: 30px;
    width: 100%;
    text-align: center;
  }

  .write{
    display: flex;
    justify-content: center;
  }

  .send{
    display: flex;
    justify-content: center;
    margin-top: 50px;

   button { 
    @media (max-width: 768px) {
      width: 100%;
    }
    width: 90%;
    height: 50px;
    border: none;
    background-color: #FFCFDA;
    border-radius: 5px;
    font-size: .9rem;
    font-weight: bold;
    color: #585858;
    &:hover{
      color: white;
    }
  }
  }
`;

const Detail = styled.textarea`
  border: none;
  border-radius: 10px;
  outline: none;
  resize: none;
  width: 100%;
  height: 300px;
  background-color: rgba(255, 207, 218, 0.5);
  margin-top: 30px;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
`;

const CafeReviewEdit = () => {
  // const context = useContext(UserContext);
  // const { grantType, accessToken } = context;
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken")

  const navigate = useNavigate();
  const location = useLocation();
  const selectInfo = location.state && location.state.selectInfo;
  const cafeNum = location.state && location.state.cafeNum;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState("");
  const [content, setContent] = useState(selectInfo?.[0]?.content);

  // 이미지 업로드 경로
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);

  const [clearSrc, setClearSrc] = useState("");

  console.log("넘어온 값 : " + score);

  // 이전 페이지로 이동
  const prevPage = () => {
    navigate(-1);
  };

  // 후기 내용
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  // 수정 시 필요한 값 할당
  const reviewNum = selectInfo[0].id;
  const editScore = score ? score : selectInfo[0].score;

  // 후기 수정
  const updateReview = async() => {  
    try{
      let imageUrl1 = selectInfo[0].url1;
      let imageUrl2 = selectInfo[0].url2;

      if (uploadedImage1) {
        if (selectInfo[0].url1) {
          await deleteImage(selectInfo[0].url1);
        }
        const storageRef1 = ref(storage, `reviewImg/${uploadedImage1.name}`);
        const uploadTask1 = uploadBytes(storageRef1, uploadedImage1);
        const snapshot1 = await uploadTask1;
        imageUrl1 = await getDownloadURL(snapshot1.ref);
      } else if(clearSrc === 1) {
        imageUrl1 = null;
        await deleteImage(selectInfo[0].url1)
      }

      if (uploadedImage2) {
        if (selectInfo[0].url2) {
          await deleteImage(selectInfo[0].url2);
        }
        const storageRef2 = ref(storage, `reviewImg/${uploadedImage2.name}`);
        const uploadTask2 = uploadBytes(storageRef2, uploadedImage2);
        const snapshot2 = await uploadTask2;
        imageUrl2 = await getDownloadURL(snapshot2.ref);
        await deleteImage(selectInfo[0].url2);
      } else if(clearSrc === 2) {
        imageUrl1 = null;
        await deleteImage(selectInfo[0].url2)
      }

      console.log("url 경로 1: " + imageUrl1);
      console.log("url 경로 2: " + imageUrl2);

      const response = await AxiosApi.editReview(
        cafeNum, reviewNum, content, editScore, imageUrl1, imageUrl2, grantType, accessToken
      );

      console.log(response.data);
      if(response.data === true) {
        setIsModalOpen(true);
      }
    } catch(error) {
      console.log(error);
    }
  };

  const clearImage = (index) => {
    if (index === 1) {
      setClearSrc(index);
    } else if (index === 2) {
      setClearSrc(index);
    }
  };


  const deleteImage = async (url) => {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  };

  const complete = () => {
    navigate(-1);
  }

  return(
    <>
    {selectInfo && selectInfo.map(review =>(
    <Container key={review.id}>
      <div className="box">
        <div className="back" onClick={prevPage}><ArrowBackIosIcon style={{width: "18px", height: "18px"}}/></div>
        <div className="star">
          <h3>별점을 선택해주세요</h3>
          <RatingStar getScore={review.score} setScore={setScore}/>
        </div>
        <div className="write">
        <Detail placeholder={review.content} onChange={changeContent}></Detail>
        </div>
        <CafeImageUploader setUploadedImage1={setUploadedImage1} 
        setUploadedImage2={setUploadedImage2} 
        src1={selectInfo[0].url1} src2={selectInfo[0].url2} 
        clearImage={clearImage}/>
      </div>
      {(score || content !== selectInfo?.[0]?.content || uploadedImage1 || uploadedImage2 || clearSrc) && (<div className="send" onClick={updateReview}><button>수정하기</button></div>)}
      <Modal move={true} header="완료" open={isModalOpen} confirm={complete}>
        <CompleteModal content={"리뷰가 수정되었습니다"}/>
      </Modal>
    </Container>
    ))}
    </>
  );
};

export default CafeReviewEdit;