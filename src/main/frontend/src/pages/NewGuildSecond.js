import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.png";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import img from "../images/upload.png";
import { storage } from "../context/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AxiosApi from "../api/AxiosApi";
import Modal from "../utils/Modal2";
import CompleteModal from "../utils/CompleteModal";
// import Header from "../component/Header";
// import Footer from "../component/Footer";

const Container = styled.div`
  @media (max-width: 430px) {
    width: 100%;
  }

  width: 50%;
  margin: 0 auto;
  background-color: #FAFAFA;

  .upload-box{
      position: absolute;
      top: 180px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;

      img{
        width: 75px;
        height: 75px;
      }
    }

  .thumbnail{
    width: 100%;
    position: relative;

    .cancel{
      position: absolute;
      right: -30px;
      top: 77px;
    }
  }

  .content{
    width: 80%;
    margin: 0 auto;
  }

  img{
    width: 100px;
    height: 100px;
    margin: 20px 0;
    cursor: pointer;
  }

  .upload-btn{
    width: 300px;
    height: 30px;
    border: none;
    border-radius: 30px;
    background-color: #FFCFDA;
    cursor: pointer;
    font-size: .9rem;
    font-weight: bold;
    color: #585858;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      color: white;
    }
  }

  .upload-img{
    margin-top: 20px;
    width: 100%;
    height: 350px;
    border: 1px dashed lightgray;
    /* box-shadow: 1px 1px 1px lightgray; */
    object-fit: cover;
    background-image: url(${props => props.imageurl});
    background-size: cover;
    background-position: center;
  }

  #guild-thum {
    display: none;
  }

  .button-box {
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 100%;

    button{
    width: 130px;
    height: 40px;
    border: none;
    border-radius: 30px;
    background-color: #FFCFDA;
    margin-bottom: 50px;
    font-size: .9rem;
    font-weight: bold;
    color: #585858;
    &:hover{
      color: white;
    }
    }
  }
`;

const Input = styled.input`
  border: none;
  border-radius: 10px;
  outline: none;
  width: 100%;
  height: 30px;
  padding-left: 15px;
  background-color: rgba(255, 207, 218, 0.5);
  box-sizing: border-box;
`;

const NewGuildSecond = () => {
  // const context = useContext(UserContext);
  // const { grantType, accessToken, userNum } = context; 
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken")
  const userNum = localStorage.getItem("userNum");
  const navigate = useNavigate();
  const location = useLocation();
  const {region, guildName, guildIntro, guildDetailIntro, category} = location.state;
  const [isModalOpen, setModalOpen] = useState(false);

  // 인풋으로 값 입력받기
  const [meetDay, setMeetDay] = useState("");
  const [member, setMember] = useState("");

  // 이미지 미리보기
  const [imageSrc, setImageSrc] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const onUpload = async(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageURL = reader.result;
      setImageSrc(imageURL);
      setUploadedImage(file);
    };

    if(file) {
      reader.readAsDataURL(file);
    }

  }

  const clearImg = async() => {
    setImageSrc("");
  };

  const onChangeDay = (e) => {
   setMeetDay(e.target.value);
  };

  const onChangeMember = (e) => {
    setMember(e.target.value);
  };

  // 길드 생성
  const createGuild = async() => {
    const file = uploadedImage;
    const storageRef = ref(storage,`images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      setImageSrc(imageUrl);
      console.log("Url 경로 : " + imageSrc);
    } catch(error) {
      console.log(error);
    }

    const response = await AxiosApi.createNewGuild(
      grantType, accessToken,
      userNum, guildName, guildIntro, guildDetailIntro, meetDay, 
      category, member, region, imageSrc
    );
    console.log(response.data);
    if(response.data === true) {
      setModalOpen(true);
    }
  };

  const prevPage = () => {
    navigate("/createguild");
  };

  const complete = () => {
    navigate("/guild");
  }

  return(
    <>
    <Container>
      <div className="content">
      <Link to="/guild" style={{ textDecoration: "none", color: "inherit"}}><img src={logo} alt="스위트킹덤로고" /></Link>
      <br /><br /><br /><br /><br />
      <div className="thumbnail">
      <h4>길드 썸네일을 등록해볼까요?</h4>
      <br />
      <label htmlFor="guild-thum">
        {!imageSrc && <div className="upload-box">
          <img src={img} alt="업로드버튼" />
          <div className="upload-btn">클릭해서 사진을 업로드하세요</div>
        </div>
        }
      </label>
      <input type="file" id="guild-thum" accept="image/*" onChange={e => onUpload(e)} />
      <div className="upload-img" style={{ backgroundImage: `url(${imageSrc})` }} />
      {imageSrc && <DisabledByDefaultIcon className="cancel" style={{width:"30px", height:"30px", cursor:"pointer"}} onClick={clearImg}/>}
      </div>
      <br /><br /><br />
      <div className="item-date">
      <h4>만날 날짜를 입력해볼까요?</h4>
      <Input type="date" onChange={onChangeDay}></Input>
      </div>
      <br /><br /><br />
      <div className="item">
      <h4>길드 인원을 정해볼까요?</h4>
      <Input onChange={onChangeMember}></Input>
      </div>
      <br /><br /><br />
      <div className="button-box">
      <button onClick={prevPage}>이전</button>
      {meetDay && member && (
      <button onClick={createGuild}>개설</button>
      )}
      </div>
      </div>
      <Modal move={true} header="완료" open={isModalOpen} confirm={complete}>
        <CompleteModal content={"길드가 등록되었습니다"}/>
      </Modal>
    </Container>
    </>
  );
};

export default NewGuildSecond;