import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MemberApi from "./api/MemberApi";
import { UserStore } from "../../context/UserStore";
import { storage } from "../../utils/Firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
`;
const GoToSignUp = styled.button`
  margin-top: 10px;
  background-color: white;
  border: 0px;
  font-weight: bold;
  cursor: pointer;
`;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  border: 1px solid blue;
  width: 400px;
`;
const TextBox = styled.p`
  font-size: 1rem;
`;
const InputLabel = styled.label`
  margin-bottom: 5px;
`;
const Input = styled.input`
  margin-left: 10px;
  margin-bottom: 10px;
`;
const RadioSelect = styled.div`
  display: felx;
  margin-top: 5px;
`;
const RadioLabel = styled.label`
  margin-right: 10px;
`;
const RadioButton = styled.input`
  margin-right: 5px;
`;
const SignupButton = styled.button`
  margin-top: 10px;
  margin-bottom: 10px;
  color: brown;
  background: #f1d1d1;
  border: 1px solid #7d5a5a;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    background-color: #F3E1E1;
    color: white;
    border-color: #F1D1D1;
  }
`;


const MemberSignUpPage = () => {
  const navigate = useNavigate();
  // 파이어베이스 이미지 로드용
  const [imageUrls, setImageUrls] = useState([]);
  // 성별 저장
  const [gender, setGender] = useState("MALE");
  // 일반 회원, 사업자 회원 구분
  const [authority, setAuthority] = useState("ROLE_MEMBER");

  // 파이어베이스 스토리지 이미지 로딩
  useEffect(() => {
    const storageIconRef = ref(storage, "essential");

    Promise.all([
      getDownloadURL(ref(storageIconRef, "logo.png")),
    ])
      .then((urls) => {
        setImageUrls(urls);
      })
      .catch((error) => {
        console.error("아이콘 이미지 로딩 실패!!", error);
      });
  }, []);

  // 성별 라디오 버튼
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };  
  // 회원 종류 라디오 버튼
  const handleAuthTypeChange = (event) => {
    setAuthority(event.target.value);
  };

  const handleSignup = async () => {
    const memberId = document.getElementById("memberId").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const birth = document.getElementById("birth").value;
    const genderGet = gender;
    const authorityGet = authority;

    try {
      let rsp;
      if (authorityGet === "ROLE_USER") {
        rsp = await MemberApi.userSignup(memberId, password, name, phone, email, birth, genderGet, authorityGet);
      } else if (authorityGet === "ROLE_MEMBER") {
        rsp = await MemberApi.memberSignup(memberId, password, name, phone, email, birth, genderGet, authorityGet);
      }
      if(rsp.status){
        //const { memberId } = rsp.data;
        console.log("회원가입 성공:", rsp.data);
        navigate("/memberlogin");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }


  }



  return(
    <Container>
      <Logo src={imageUrls[0]} alt="반전 로고 이미지" onClick={()=>navigate("/")}></Logo>
      <GoToSignUp onClick={()=>navigate("/memberlogin")}>로그인 테스트로 이동</GoToSignUp>
      <SignupBox>
        <TextBox>회원가입 테스트</TextBox>
        <div>
          <InputLabel htmlFor="memberId">아이디</InputLabel>
          <Input id="memberId" type="text" />
        </div>
        <div>
          <InputLabel htmlFor="password">비밀번호</InputLabel>
          <Input id="password" type="password" />    
        </div>
        <div>
          <InputLabel htmlFor="name">이름</InputLabel>
          <Input id="name" type="text"></Input>
        </div>
        <div>
          <InputLabel htmlFor="phone">핸드폰</InputLabel>
          <Input id="phone" type="text"></Input>
        </div>
        <div>
          <InputLabel htmlFor="email">이메일</InputLabel>
          <Input id="email" type="text"></Input>
        </div>
        <div>
          <InputLabel htmlFor="birth">생년월일</InputLabel>
          <Input id="birth" type="text" placeholder="ex)2000-01-01"></Input>
        </div>
        <RadioSelect>
          성별
          <RadioLabel>
            <RadioButton
              type="radio"
              name="gender"
              value="MALE"
              checked={gender === "MALE"}
              onChange={handleGenderChange}
            />
            남성
          </RadioLabel>
          <RadioLabel>
            <RadioButton
              type="radio"
              name="gender"
              value="FEMALE"
              checked={gender === "FEMALE"}
              onChange={handleGenderChange}
            />
            여성
          </RadioLabel>
        </RadioSelect>
        <RadioSelect>
          회원 종류
          <RadioLabel>
            <RadioButton
              type="radio"
              name="authority"
              value="ROLE_USER"
              checked={authority === "ROLE_USER"}
              onChange={handleAuthTypeChange}
            />
            일반 회원
          </RadioLabel>
          <RadioLabel>
            <RadioButton
              type="radio"
              name="authority"
              value="ROLE_MEMBER"
              checked={authority === "ROLE_MEMBER"}
              onChange={handleAuthTypeChange}
            />
            사업자 회원
          </RadioLabel>
        </RadioSelect>
        <SignupButton onClick={handleSignup}>회원가입</SignupButton>
      </SignupBox>
      <p>cf&#41; 회원 종류 "사업자 회원" 선택하는 것을 추천</p>
    </Container>
  );
};
export default MemberSignUpPage;