import React, { useState } from "react";
import styled from "styled-components";
import upload from "../images/upload.png";
import upload2 from "../images/upload.png";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

const UploadContainer = styled.div`
  .upload {
    position: relative;
    padding-top: 15px;
    font-size: 0.9rem;
    font-weight: bold;
    color: darkgray;
  }

  .upload-box {
    @media (max-width: 768px) {
      flex-direction: column;
    }
    display: flex;
  }

  #img1,
  #img2 {
    display: none;
  }

  .image1,
  .image2 {
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

  .upload-btn {
    position: absolute;
    top: 130px;
    left: 65px;
    cursor: pointer;

    img {
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

  .upload-btn2 {
    @media (max-width: 768px) {
      top: 365px;
      left: 66px;
    }
    position: absolute;
    top: 130px;
    left: 308px;
    cursor: pointer;

    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const CafeImageUploader = ({setUploadedImage1, setUploadedImage2, src1, src2, clearImage}) => {

  // 이미지 미리보기
  const [imageSrc, setImageSrc] = useState(src1 ? src1 : "");
  const [imageSrc2, setImageSrc2] = useState(src2 ? src2 : "");

  const onUpload = async(e, imageIndex) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageURL = reader.result;
      if (imageIndex === 1) {
        setImageSrc(imageURL);
        setUploadedImage1(file);
      } else if (imageIndex === 2) {
        setImageSrc2(imageURL);
        setUploadedImage2(file);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const clearImg = (index) => {
    if (index === 1) {
      setImageSrc("");
      setUploadedImage1(null);
      clearImage(1);
    } else if (index === 2) {
      setImageSrc2("");
      setUploadedImage2(null);
      clearImage(2);
    }
  };

  return(
    <>
    <UploadContainer>
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
    </UploadContainer>
    </>
  );
};

export default CafeImageUploader;