import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MemberApi from "./api/MemberApi";
import { UserContext } from "../../context/UserStore";
import { storage } from "../../utils/Firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
`;
const TextBox = styled.p`
`;

const LoginBox = styled.div`
  display: flex;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const IdInputLabel = styled.label`

`;
const IdInput = styled.input`

`;
const PasswordInputLabel = styled.label`

`;
const PasswordInput = styled.input`

`;
const AuthSelect = styled.div`
  display: felx;
`;
const RadioLabel = styled.label`
  margin-right: 10px;
`;
const RadioButton = styled.input`
  margin-right: 5px;
`;
const LoginButton = styled.button`

`;

const MemberLoginPage = () => {
  const navigate = useNavigate();
  // 파이어베이스 이미지 로드용
  const [imageUrls, setImageUrls] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // 일반 회원, 사업자 회원 구분
  const [authority, setAuthority] = useState("user");
  // 토큰 저장
  const [grantType, setGrantType] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");


  // 파이어베이스 스토리지 이미지 로딩
  useEffect(() => {
    const storageIconRef = ref(storage, "essential");

    Promise.all([
      getDownloadURL(ref(storageIconRef, "logo.png")),
    ])
      .then((urls) => {
        setImageUrls(urls);
        // console.log(imageUrls);
      })
      .catch((error) => {
        console.error("아이콘 이미지 로딩 실패!!", error);
      });
  }, []);

  const handleAuthTypeChange = (event) => {
    setAuthority(event.target.value);
  };

  // 로그인 함수
  const handleLogin = async () => {
    const memberId = document.getElementById("memberId").value;
    const password = document.getElementById("password").value;

    try {
      const response = await MemberApi.memberLogIn(memberId, password, authority);
      const { grantType, accessToken, refreshToken } = response.data;
      console.log("로그인 성공:", response.data);
      
      // 상태 값을 업데이트합니다.
      setGrantType(grantType);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return(
    <Container>
      <Logo src={imageUrls[0]} alt="프로필 이미지" onClick={()=>navigate("/")}></Logo>
      <TextBox>로그인</TextBox>
      <LoginBox>
        <InputBox>
          <IdInputLabel htmlFor="memberIdt">아이디</IdInputLabel>
          <IdInput id="memberId" type="text" />
          <PasswordInputLabel htmlFor="passwor">비밀번호</PasswordInputLabel>
          <PasswordInput id="password" type="password" />          
          <AuthSelect>
            <RadioLabel>
              <RadioButton
                type="radio"
                name="authority"
                value="user"
                checked={authority === "user"}
                onChange={handleAuthTypeChange}
              />
              일반 회원
            </RadioLabel>
            <RadioLabel>
              <RadioButton
                type="radio"
                name="authority"
                value="business"
                checked={authority === "business"}
                onChange={handleAuthTypeChange}
              />
              사업자 회원
            </RadioLabel>
          </AuthSelect>
        </InputBox>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </LoginBox>
      


    </Container>
  );
};
export default MemberLoginPage;