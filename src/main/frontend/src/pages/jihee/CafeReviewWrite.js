import React, { useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RatingStar from "../jihee/RatingStar";
import { useLocation, useNavigate } from "react-router-dom";
import upload from "./images/upload.png";
import upload2 from "./images/upload.png";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import AxiosApi from "./api/AxiosApi";
import { async } from "@firebase/util";


const Container = styled.div`
  @media (max-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
  @media (max-width: 430px) {
    width: 100%;
  }

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

  .upload{
    position: relative;
    padding-top: 15px;
    font-size: .9rem;
    font-weight: bold;
    color: darkgray;
  }

  .upload-box{
    @media (max-width: 768px) {
      flex-direction: column;
    }
    display: flex;
  }

  #img1, #img2{
    display: none;
  }

  .image1, .image2{
    margin-right: 60px;
    width: 180px;
    height: 180px;
    border: 1px dashed lightgray;
    margin-bottom: 50px;
    object-fit: cover;
    background-image: url(${props => props.imageurl});
    background-size: cover;
    background-position: center;
  }

  .upload-btn{
    position: absolute;
    top: 130px;
    left: 65px;
    cursor: pointer;

    img{
      width: 50px;
      height: 50px;
    }
  }

  .cancel {
    position: absolute;
    left: 183px;
    top: 58px;
  }

  .cancel2 {
    @media (max-width: 768px) {
      top: 290px;
      left: 183px;
    }
    position: absolute;
    left: 425px;
    top: 58px;
  }

  .upload-btn2{
    @media (max-width: 768px) {
      top: 365px;
      left: 66px;
    }
    position: absolute;
    top: 130px;
    left: 308px;
    cursor: pointer;

    img{
      width: 50px;
      height: 50px;
    }
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
  const navigate = useNavigate();
  const location = useLocation();
  const cafeNum = location?.state?.cafeNum;


  console.log("CafeReviewWrite - cafeNum:", cafeNum);

  // 이미지 미리보기
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSrc2, setImageSrc2] = useState(null);
  const [score, setScore] = useState("");
  const [content, setContent] = useState("");

  console.log("넘어온 값 : " + score);

  const onUpload = async(e, imageIndex) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageURL = reader.result;
      if (imageIndex === 1) {
        setImageSrc(imageURL);
      } else if (imageIndex === 2) {
        setImageSrc2(imageURL);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 이전 페이지로 이동
  const prevPage = () => {
    navigate(-1);
  };

  const clearImg = (index) => {
    if (index === 1) {
      setImageSrc("");
    } else if (index === 2) {
      setImageSrc2("");
    }
  };

  // 후기 내용
  const changeContent = (e) => {
    setContent(e.target.value);
  };

  // 후기 작성
  const writeReview = async() => {
    const response = await AxiosApi.createNewReview(
      1, cafeNum, content, score, imageSrc, imageSrc2
    );
    console.log(response.data);
  };

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
        <div className="upload">
          <p>이미지 첨부(최대 2장)</p>
          <div className="upload-box">
            <label htmlFor="img1">
              {!imageSrc && (
              <div className="upload-btn"><img src={upload} alt="업로드버튼" /></div>)}
            </label>
            <input type="file" id="img1" accept="image/*" onChange={e=> onUpload(e, 1)}/>
            <div className="image1" style={{ backgroundImage: `url(${imageSrc})` }}></div>
            {imageSrc && <DisabledByDefaultIcon className="cancel" style={{width:"30px", height:"30px", cursor:"pointer"}} onClick={() => clearImg(1)}/>}
            <label htmlFor="img2">
              {!imageSrc2 && (
              <div className="upload-btn2"><img src={upload2} alt="업로드버튼" /></div>)}
            </label>
            <input type="file" id="img2" accept="image/*" onChange={e=> onUpload(e, 2)}/>
            <div className="image2" style={{ backgroundImage: `url(${imageSrc2})` }}></div>
            {imageSrc2 && <DisabledByDefaultIcon className="cancel2" style={{width:"30px", height:"30px", cursor:"pointer"}} onClick={() => clearImg(2)}/>}
          </div>
        </div>
      </div>
      {score && content && (<div className="send" onClick={writeReview}><button>작성하기</button></div>)}
    </Container>
    </>
  );
};

export default CafeReviewWrite;