import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import { storage } from "../utils/Firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Header from "../component/Header";
import Footer from "../component/Footer";
import user from "../images/user1.png"
import password from "../images/padlock.png"

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 30px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
`;

const TextBox = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
`;

const LoginBox = styled.div`
  display: flex;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 300px;

  .memberId{
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  height: 20px;
  border: none;
  border-bottom: 1.5px solid darkgray;
  margin-bottom: 20px;
  background-image: url(${props => props.image});
  background-size: 20px 20px; 
  background-repeat: no-repeat;
  padding-left: 30px; 
  outline: none;
`;

const PasswordInput = styled.input`
  height: 20px;
  border: none;
  border-bottom: 1.5px solid darkgray;
  margin-bottom: 10px;
  background-image: url(${props => props.image});
  background-size: 20px 20px; 
  background-repeat: no-repeat;
  padding-left: 30px; 
  outline: none;
`;

const LoginButton = styled.button`
  width: 300px;
  height: 30px;
  margin-bottom: 30px;
  background-color: #FFCFDA;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  
  cursor: pointer;

  &:hover{
    color: white;
  }
`;

const BottomButton = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  height: 20px;
  background-color: white;
  border: 0px;
  font-weight: bold;
  color: darkgray;
  cursor: pointer;

  &:hover{
    color: #FFCFDA;
  }
`;



const MemberLoginPage = () => {
  const navigate = useNavigate();
  // 파이어베이스 이미지 로드용
  const [imageUrls, setImageUrls] = useState([]);
  // 일반 회원, 사업자 회원 구분
  const [authority, setAuthority] = useState("ROLE_MEMBER");
  // useContext 토큰 저장
  const {setGrantType, setAccessToken, setRefreshToken, setUserNum, setUserName, setUserAuthoruty, setIsLogin } = useContext(UserContext);

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



  // 엔터키로 로그인 버튼 동작
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 엔터 동작(페이지 새로고침) 방지
      handleLogin(); // 로그인 버튼 클릭 함수 호출
    }
  };

  // 로그인 함수
  const handleLogin = async () => {
    const memberId = document.getElementById("memberId").value;
    const password = document.getElementById("password").value;
    const authorityGet = authority;

    try {
      let rsp;
      if (authorityGet === "ROLE_USER") {
        rsp = await AxiosApi.memberLogin(memberId, password);
      } else if (authorityGet === "ROLE_MEMBER") {
        rsp = await AxiosApi.memberLogin(memberId, password);
      }

      if(rsp.status){
        const { grantType, accessToken, refreshToken } = rsp.data;
        console.log("로그인 성공:");
        console.log(grantType);
        console.log(accessToken);
        console.log(refreshToken);

        // 토큰 디코딩하여 클레임 값을 추출
        const [headerBase64, payloadBase64] = accessToken.split('.');
        const payload = JSON.parse(decodeURIComponent(escape(atob(payloadBase64))));
        const userNum = payload.userNum;
        const userName = payload.userName;
        const userAuthority = payload.userAuthority;
        console.log('userNum:', userNum);
        console.log('userName:', userName);
        console.log('userAuthority:', userAuthority);
        
        // 방식과 토큰 저장
        setGrantType(grantType);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUserNum(userNum);
        setUserName(userName);
        setUserAuthoruty(userAuthority);
        setIsLogin(true);

        // 로컬 스토리지 저장
        localStorage.setItem("grantType", grantType);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userNum", userNum);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userAuthority", userAuthority);
        // 로컬 스토리지는 '문자열'만 저장이 가능하므로 나중에 필요시 타입 변환하여 사용해야함
        localStorage.setItem("isLogin", "true");


        navigate("/");
        // handleGetNum();
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return(
    <>
    <Header />
    <Container>
      {/* <Logo src={imageUrls[0]} alt="반전 로고 이미지" onClick={()=>navigate("/")}></Logo> */}
      <TextBox>SWEETKINGDOM</TextBox>
      <LoginBox>
        <InputBox>
          {/* <InputLabel htmlFor="memberId">아이디</InputLabel> */}
          <Input id="memberId" type="text" placeholder="아이디" onKeyDown={handleKeyDown} image={user}/>
          {/* <InputLabel htmlFor="password">비밀번호</InputLabel> */}
          <PasswordInput id="password" type="password" placeholder="비밀번호" onKeyDown={handleKeyDown} image={password}/>          
        </InputBox>
      </LoginBox>
      <LoginButton onClick={handleLogin}>로그인</LoginButton>
      <BottomButton>
      <Button className="find-id" onClick={() => navigate("/findId")}>아이디 찾기</Button>
      <Button className="find-pw" onClick={() => navigate("/findpw") }>패스워드 찾기</Button>
      <Button className="signup" onClick={()=>navigate("/membersignup")}>회원가입</Button>
      </BottomButton>
    </Container>
    <Footer />
    </>
  );
};
export default MemberLoginPage;