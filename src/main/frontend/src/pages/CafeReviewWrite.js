import React, { useContext, useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RatingStar from "../component/RatingStar";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { storage } from "../context/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Modal from "../utils/Modal2";
import CompleteModal from "../utils/CompleteModal";
import CafeImageUploader from "../component/CafeImageUploader";
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

const CafeReviewWrite = () => {
  // const context = useContext(UserContext);
  // const { userNum, grantType, accessToken } = context;
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken")
  const userNum = localStorage.getItem("userNum");
  
  const navigate = useNavigate();
  const location = useLocation();
  const cafeNum = location.state && location.state.cafeNum;

  const [isModalOpen, setModalOpen] = useState(false);
  const [score, setScore] = useState("");
  const [content, setContent] = useState("");

  // 이미지 업로드 경로
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);

  console.log("넘어온 값 : " + score);
  console.log("CafeReviewWrite - cafeNum:", cafeNum);

  // 이전 페이지로 이동
  const prevPage = () => {
    navigate(-1);
  };

  // 후기 내용
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const receive1 = (receive) => {
    setUploadedImage1(receive);
  }

  const receive2 = (receive) => {
    setUploadedImage2(receive);
  }

  // 후기 작성
  const writeReview = async() => {  
    if(userNum){
      try{
        let imageUrl1 = null;
        let imageUrl2 = null;

        if (uploadedImage1) {
          const storageRef1 = ref(storage, `reviewImg/${uploadedImage1.name}`);
          const uploadTask1 = uploadBytes(storageRef1, uploadedImage1);
          const snapshot1 = await uploadTask1;
          imageUrl1 = await getDownloadURL(snapshot1.ref);
        }

        if (uploadedImage2) {
          const storageRef2 = ref(storage, `reviewImg/${uploadedImage2.name}`);
          const uploadTask2 = uploadBytes(storageRef2, uploadedImage2);
          const snapshot2 = await uploadTask2;
          imageUrl2 = await getDownloadURL(snapshot2.ref);
        }

        console.log("url 경로 1: " + imageUrl1);
        console.log("url 경로 2: " + imageUrl2);
    
        const response = await AxiosApi.createNewReview(
          userNum, cafeNum, content, score, imageUrl1, imageUrl2, grantType, accessToken
        );
        console.log(response.data);
        if(response.data === true) {
          setModalOpen(true);
        }
      } catch(error) {
        console.log(error);
      }
    } else {
      setModalOpen(true);
    }
  };
  
  const complete = () => {
    navigate(-1);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return(
    <>
    <Container>
      <div className="box">
        <div className="back" onClick={prevPage}><ArrowBackIosIcon style={{width: "18px", height: "18px"}}/></div>
        <div className="star">
          <h3>별점을 선택해주세요</h3>
          <RatingStar setScore={setScore}/>
        </div>
        <div className="write">
        <Detail placeholder="후기 내용을 작성해주세요" onChange={changeContent}></Detail>
        </div>
        <CafeImageUploader setUploadedImage1={receive1} setUploadedImage2={receive2} />
      </div>
      {score && content && (<div className="send" onClick={writeReview}><button>작성하기</button></div>)}
    </Container>
    <Modal move={true} header="완료" open={isModalOpen} confirm={complete} close={closeModal}>
      <CompleteModal content={"리뷰가 등록되었습니다"}/>
    </Modal>
    </>
  );
};

export default CafeReviewWrite;