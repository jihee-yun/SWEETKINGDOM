import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SideMenu from "../component/SideMenu";
import ChatBot from "../component/ChatBot";
import Sidebar from "../component/Sidebar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDHiymTV-avTvGv5Oxj3Bghiqw327h8Ac8",
  authDomain: "sweetkingdom-703fb.firebaseapp.com",
  projectId: "sweetkingdom-703fb",
  storageBucket: "sweetkingdom-703fb.appspot.com",
  messagingSenderId: "40592815779",
  appId: "1:40592815779:web:24a07fee4b751465687116"
};

initializeApp(firebaseConfig);
const storage = getStorage();

const OutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 95%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;
const Detail = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* border: 2px solid yellow; */
`;
// 상세 페이지 상단 선택 박스(회원 정보 수정, 알림 설정)
const SelectBox = styled.div`
  width: 90%;
  min-width: 350px;
  height: 50px;
  margin-top: 3%;
  border: 1px solid #F3E1E1;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentBox = styled.div`
  width: 90%;
  min-width: 350px;
  margin-top: 3%;
  border: 1px solid #F3E1E1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const SpecificBox = styled.div`
  margin: 20px;
  border: 1px solid #F3E1E1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;
const TitleBox = styled.div`
  margin-top: 5px;
  /* border: 1px solid blue; */
`;

// 각 박스별 정보 표시 p태크
const InfoType = styled.p`
  width: 80%;
  min-width: 100px;
  text-align: center;
`;
// 변경 불가능한 회원정보 표시하는 텍스트 박스
const TextBox = styled.p`
  width: 80%;
  min-width: 200px;
  height: 30px;
  line-height: 30px;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: center;
  border: 0;
  background-color: #eee;
`;
// 비밀번호 입력문구
const ValidationMessage = styled.p`
  color: ${props => props.isValid ? 'blue' : 'red'};
`;


// 한 줄 소개 수정 입력창
const Introinput = styled.input`
  width: 90%;
  min-width: 200px;
  height: 150px;
  &:focus {
    outline: none;
  }
  margin-bottom: 10px;
  padding-left: 5px;
`;
// 회원 정보 수정 버튼
const InfoChangeButton = styled.button`
  width: 150px;
  height: 40px;
  margin: 10px;
  color: white;
  background-color: #F1D1D1;
  border: 0;
  cursor: pointer;
`;
// 회색 바탕의 수정 input
const GrayInput = styled.input`
  width: 80%;
  min-width: 200px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 5px;
  text-align: center;
  border: 0;
  background-color: #eee;
  &:focus {
    outline: none;
  }
`;
// 회원 탈퇴 문구
const SmallInfo = styled.p`
  margin-top: -5px;
  margin-bottom: 5px;
  font-size: .8rem;
  width: 80%;
  min-width: 100px;
  text-align: center;
  `;



const MyInformation = () => {
  const navigate = useNavigate();
  // useContext 저장값 불러오기
  const {grantType, isLogin, setIsLogin, userNum, accessToken, refreshToken, setUserNum, userName, setUserName, 
    setGrantType, setAccessToken,setRefreshToken, userAuthority, setUserAuthoruty, isSidebar, setIsSidebar} = useContext(UserContext);

  // 유저 정보 상태 관리
  const [memberInfo, setMemberInfo] = useState(null);
  // 기존 비밀번호 상태 추가
  const [oldPassword, setOldPassword] = useState("");
  // 비밀 번호 변경시 비교용
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  // 비밀번호 유효성 검사, 메세지
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
  const [newPasswordCheckMessage, setNewPasswordCheckMessage] = useState("");

  const [withdrawAgreement, setSignoutAgreement] = useState("");

  // 이미지 업로드용 상태
  const [file, setFile] = useState(null);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const rsp = await AxiosApi.getMemberInfo(userNum, grantType, accessToken);
        if (rsp.status) {
          setMemberInfo(rsp.data[0]);
          console.log("유저 정보 가져오기 성공: ", rsp.data[0])
        }
      } catch (error) {
        console.log("유저 정보 가져오기 실패: ", error);
      }
    };
    fetchMemberInfo();
  }, [userNum]);


  // 파이어베이스 스토리지에 이미지 업로드 함수
  const handleImageUpdate = async () => {
    try {
      const storageRef = ref(storage, "ProfileImage");
      const fileRef = ref(storageRef, file.name);
  
      await uploadBytes(fileRef, file);
      console.log('파일 업로드 성공');
      const downloadURL = await getDownloadURL(fileRef);
      console.log("저장경로 확인: " + downloadURL);
    // "&token="를 기준으로 문자열을 나누고 첫 번째 부분을 사용
    const URL = downloadURL.split("&token=")[0];
    console.log("토큰 제거된 저장경로 확인: " + URL);
      handleApiRequest(URL);
    } catch (error) {
      console.log("이미지 업데이트 실패: ", error);
    }
  };

  // 프로필 이미지 변경
  const handleApiRequest = async (url) => {
    try {
      const rsp = await AxiosApi.profileImgUpdate(userNum, url, grantType, accessToken);
      if (rsp.status) {
        if (rsp.data === true) {
          console.log("프로필 이미지 업데이트 성공: ", rsp.data, rsp.status);
        } else {
          console.log("통신은 성공, 프로필 이미지 업데이트 실패", rsp.data, rsp.status);
        }
      }
    } catch(error) {
      console.log("프로필 이미지 업데이트 실패");
    }
  };

  // 비밀 번호 조합 확인
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (regex.test(password)) {
      setPasswordValidationMessage("정상적인 조합입니다.");
      setIsValidPassword(true);
    } else {
      setPasswordValidationMessage("조합을 다시 확인해주세요.");
      setIsValidPassword(false);
    }
  }
  // 새 비밀번호 일치 여부 확인
  const handlePasswordCheckChange = (e) => {
    setNewPasswordCheck(e.target.value);
    if(newPassword === e.target.value) {
      setNewPasswordCheckMessage("새 비밀번호 값이 일치합니다.");
    } else {
      setNewPasswordCheckMessage("새 비밀번호를 동일하게 입력해 주세요.");
    }
  }

  // 비밀번호 수정
  const handlePasswordChange = async () => {
    const password = document.getElementById("password").value;
    if (newPassword !== newPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    try {
      const rsp = await AxiosApi.passwordUpdate(userNum, password, newPassword, grantType, accessToken);
      if(rsp.status) {
        if(rsp.data === true) {
          console.log("비밀번호 업데이트 성공: ", rsp.data);
        } else {
          console.log("통신은 성공, 비밀번호 업데이트 실패", rsp.data);
        }
      }
    } catch(error) {
      console.log("비밀번호 업데이트 실패: ", error);
    }
  }

  // 한줄 소개 수정
  const handleIntroChange = async () => {
    const intro = document.getElementById("intro").value;
    try {
      const rsp = await AxiosApi.introUpdate(userNum, intro, grantType, accessToken);
      if(rsp.status) {
        if(rsp.data === true) {
          console.log("한 줄 소개 업데이트 성공: ", rsp.data);
        } else {
          console.log("통신은 성공, 한 줄 소개 업데이트 실패", rsp.data);
        }
      }
    } catch(error) {
      console.log("한줄소개 업데이트 실패: ", error);
    }
  }

  // 전화번호 변경
  const handlePhoneChange = async () => {
    const phone = document.getElementById("phone").value;
    try {
      const rsp = await AxiosApi.phoneUpdate(userNum, phone, grantType, accessToken);
      if (rsp.status) {
        if(rsp.data === true) {
          console.log("전화번호 업데이트 성공: ", rsp.data);
        } else {
          console.log("통신은 성공, 전화번호 업데이트 실패", rsp.data);
        }
      }
    } catch (error) {
      console.log("전화번호 업데이트 실패: ", error);
    }
  };

  // 이메일 변경
  const handleEmailChange = async () => {
    const email = document.getElementById("email").value;
    try {
      const rsp = await AxiosApi.emailUpdate(userNum, email, grantType, accessToken);
      if (rsp.status) {
        if(rsp.data === true) {
          console.log("이메일 업데이트 성공: ", rsp.data);
        } else {
          console.log("통신은 성공, 이메일 업데이트 실패", rsp.data);
        }
      }
    } catch (error) {
      console.log("이메일 업데이트 실패: ", error);
    }
  };
  // 회원 탈퇴
  const handleMemberExit = async () => {
    if (withdrawAgreement !== "회원 탈퇴를 동의합니다") {
      alert("정확한 문구를 입력해주세요!");
      return;
    }
    try {
      const rsp = await AxiosApi.memberWithdraw(userNum, grantType, accessToken);
      if (rsp.status) {
        if(rsp.data === true) {
          console.log("회원 탈퇴 성공: ", rsp.data);
          setGrantType("");
          setAccessToken("");
          setRefreshToken("");
          setUserNum(0);
          setUserName("");
          setUserAuthoruty("");
          setIsLogin(false);
      
          // 로컬스토리지에서 제거
          localStorage.removeItem("grantType");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userNum");
          localStorage.removeItem("userName");
          localStorage.removeItem("userAuthority");
          localStorage.removeItem("isLogin");
          navigate("/");
        } else {
          console.log("통신은 성공, 회원 탈퇴 실패", rsp.data);
        }
      }
    } catch (error) {
      console.log("회원 탈퇴 실패: ", error);
    }
  };


  // memberInfo가 로딩 중일 때 표시할 로딩 스피너 등의 UI를 추가할 수 있음
  if (!memberInfo) {
    return <div>회원 정보 로딩중...</div>;
  }

  // useEffect(() => {
  //   return (
  //     setIsSidebar("-300px")
  //   )
  // }, []);

  return (
    <OutBox>
      <Header />
      {isSidebar && <Sidebar/>}
      <Container>
        <SideMenu />
        <Detail>
          <SelectBox>
            회원 정보
          </SelectBox>
          <ContentBox>
          {/* <TitleBox>회원 정보 수정</TitleBox> */}
            <SpecificBox>
              <InfoType>프로필 이미지 수정</InfoType>
              <input type="file" onChange={handleImageChange} />
              <InfoChangeButton onClick={handleImageUpdate}>변경하기</InfoChangeButton>
            </SpecificBox>
            <SpecificBox>
              <InfoType>회원 아이디</InfoType>
              <TextBox>{memberInfo.memberId}</TextBox>
            </SpecificBox>
            <SpecificBox>
              <InfoType>회원 비밀번호</InfoType>
              <GrayInput
                id="password"
                type="password"
                placeholder={"기존 비밀번호"}
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
              />
              <GrayInput
                id="newPassword"
                type="password"
                placeholder={"새로운 비밀번호(영문자, 숫자, 특수기호 포함 8자리 이상)"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              <ValidationMessage isValid={isValidPassword}>
                {passwordValidationMessage}
              </ValidationMessage>
              <GrayInput
                id="newPasswordCheck"
                type="password"
                placeholder={"새로운 비밀번호 확인"}
                value={newPasswordCheck}
                onChange={handlePasswordCheckChange}
              />
              <ValidationMessage isValid={newPassword === newPasswordCheck}>
                {newPasswordCheckMessage}
              </ValidationMessage>
              <InfoChangeButton
                disabled={newPassword !== newPasswordCheck || !isValidPassword || oldPassword === ''}
                onClick={handlePasswordChange}
              >
                변경하기
              </InfoChangeButton>
            </SpecificBox>


            <SpecificBox>
              <InfoType>한 줄 소개(255자 제한)</InfoType>
              <Introinput id="intro" type="text" defaultValue={memberInfo ? memberInfo.intro : ''}></Introinput>
              <InfoChangeButton onClick={handleIntroChange}>변경하기</InfoChangeButton>
            </SpecificBox>
            <SpecificBox>
              <InfoType>전화번호 변경(-포함하여 입력)</InfoType>
              <GrayInput id="phone" type="text" defaultValue={memberInfo ? memberInfo.phone : ''} />
              <InfoChangeButton onClick={handlePhoneChange}>변경하기</InfoChangeButton>
            </SpecificBox>
            <SpecificBox>
              <InfoType>이메일 변경</InfoType>
              <GrayInput id="email" type="text" defaultValue={memberInfo ? memberInfo.email : ''} />
              <InfoChangeButton onClick={handleEmailChange}>변경하기</InfoChangeButton>
            </SpecificBox>
            <SpecificBox>
              <InfoType>회원 탈퇴</InfoType>
              <SmallInfo>아래 칸에 '회원 탈퇴를 동의합니다'를 정확히 입력해 주세요.</SmallInfo>
              <GrayInput id="withdraw" type="text" placeholder="회원 탈퇴를 동의합니다" value={withdrawAgreement} onChange={e => setSignoutAgreement(e.target.value)}/>
              <InfoChangeButton disabled={withdrawAgreement !== "회원 탈퇴를 동의합니다"} onClick={handleMemberExit}>탈퇴하기</InfoChangeButton>
            </SpecificBox>
          </ContentBox>


        </Detail>
      </Container>
      <Footer />
      {/* <ChatBot/> */}
    </OutBox>  
  );
};
export default MyInformation;