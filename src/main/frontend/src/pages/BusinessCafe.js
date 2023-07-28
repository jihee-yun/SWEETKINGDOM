import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SideMenu from "../component/SideMenu";
import ChatBot from "../component/ChatBot";
import firebase from "firebase/app";
import { storage } from "../context/Firebase";
import Sidebar from "../component/Sidebar";

const OutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 사이드 메뉴 + 세부 페이지
const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
`;
// 세부 페이지
const Detail = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 768px;
  /* height: 1000px; */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* border: 2px solid yellow; */
`;
// 결제 내역, 포인트 내역 선택 박스
const RowBox = styled.div`
  width: 100%;
  margin-top: 1%;
  margin-bottom: 2%;
  display: flex;
  justify-content: center;
`;
// 포인트 내역, 결제 내역 버튼
const TypeButton = styled.button`
  width: 35%;
  min-width: 150px;
  height: 50px;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid #7d5a5a;
  border-radius: 15px;
  background-color: ${({ selected }) => (selected ? "#F3E1E1" : "white")};
  cursor: pointer;

  &:hover {
    background-color: #F3E1E1;
  }
`;

// 세부 페이지 윗쪽 부분
const SelectBox = styled.div`
  width: 90%;
  min-width: 300px;
  height: 80px;
  margin-top: 3%;
  border: 1px solid #F3E1E1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TextBox = styled.p`
  margin-left: 20px;
  @media (max-width: 768px) {
    text-align: center;
    margin: 0;
  }
`;
// 세부 페이지 중앙 부분
const ContentBox = styled.div`
  width: 90%;
  min-width: 300px;
  margin-top: 3%;
  border: 1px solid #F3E1E1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 세부 입력 박스
const SpecificBox = styled.div`
  width: 95%;
  margin: 10px;
  border: 1px solid #F3E1E1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;
// 각 박스별 정보 표시 p태크
const InfoType = styled.p`
  width: 80%;
  min-width: 100px;
  text-align: center;
`;
// 회색 바탕의 입력창
const GrayInput = styled.input`
  width: 80%;
  min-width: 200px;
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
  padding-left: 10px;
  border: 0;
  background-color: #eee;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
// 라디오 버튼
const RadioInput = styled.input`
  margin: 0 5px;
`;
// 카페 등록 버튼
const InfoChangeButton = styled.button`
  width: 150px;
  height: 40px;
  margin: 5px;
  color: white;
  background-color: #F1D1D1;
  border: 0;
  cursor: pointer;
`;


const BusinessCafe = () => {
  // useContext 저장값 불러오기
  const {isSidebar, setIsSidebar} = useContext(UserContext);
  // 로컬 스토리지 저장값 불러오기
  const userNum = localStorage.getItem("userNum");
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userName = localStorage.getItem("userName");
  const userAuthority = localStorage.getItem("userAuthority");
  const isLogin = localStorage.getItem("isLogin");
  
  // 포인트, 결제 선택 버튼
  const [selectedButton, setSelectedButton] = useState("register");
  // 포인트, 결제 차이
  const handleTypeButtonClick = (buttonType) => {
    setSelectedButton(buttonType);
  }; 
  // 입력값 상태 저장
  const [cafeName, setCafeName] = useState("");
  const [cafeAddress, setCafeAddress] = useState("");
  const [cafeTime, setCafeTime] = useState("");
  const [cafePhone, setCafePhone] = useState("");
  const [cafeIntro, setCafeIntro] = useState("");
  const [cafeDetail, setCafeDetail] = useState("");
  // 라디오 버튼 상태
  const [selectedRegion, setSelectedRegion] = useState('서울특별시');
  const [isButtonActive, setIsButtonActive] = useState(false);
  // 이미지 업로드용 상태
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // 라디오 버튼 변경 처리 핸들러
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  }
  // 상태 변경 핸들러
  const handleCafeNameChange = (event) => setCafeName(event.target.value);
  const handleCafeAddressChange = (event) => setCafeAddress(event.target.value);
  const handleCafeTimeChange = (event) => setCafeTime(event.target.value);
  const handleCafePhoneChange = (event) => setCafePhone(event.target.value);
  const handleCafeIntroChange = (event) => setCafeIntro(event.target.value);
  const handleCafeDetailChange = (event) => setCafeDetail(event.target.value);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // 파이어베이스 스토리지에 이미지 업로드 함수
  const handleCafeRegister = async () => {
    try {
      // 이미지를 Firebase Storage에 업로드
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
  
      // 업로드 상태를 모니터링
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // 진행 상태를 표시하는 로직이 들어갈 수 있습니다.
        },
        (error) => {
          // 에러 핸들링
          console.log(error);
        },
        () => {
          // 업로드가 완료되면 이미지 URL을 가져옵니다.
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setImageUrl(url);
              // API에 요청을 보냅니다.
              handleApiRequest(url);
            });
        }
      );
    } catch (error) {
      console.log("카페 생성 실패: ", error);
    }
  };

  // 모든 입력 필드가 비어 있지 않고, 이미지가 null이 아닌지 확인합니다.
  useEffect(() => {
    if (cafeName && cafeAddress && cafeTime && cafePhone && cafeIntro && cafeDetail && image) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [cafeName, cafeAddress, cafeTime, cafePhone, cafeIntro, cafeDetail, image]);

  // db에 카페 등록 통신
  const handleApiRequest = async (url) => {
    try {
      const rsp = await AxiosApi.cafeCreate(
        userNum,
        cafeName,
        selectedRegion,
        cafeAddress,
        cafeTime,
        cafePhone,
        cafeIntro,
        cafeDetail,
        url, // 썸네일 이미지 URL 추가
        grantType,
        accessToken
      );
  
      if (rsp.status) {
        if (rsp.data === "true") {
          console.log("카페 생성 성공: ", rsp.data);
        } else {
          console.log("통신은 성공, 카페 생성 실패", rsp.data);
        }
      }
    } catch (error) {
      console.log("카페 생성 실패: ", error);
    }
  };
  
  useEffect(() => {
    return (
      setIsSidebar("-300px")
    )
  }, []);

  return(
    <OutBox>
      <Header />
      {isSidebar && <Sidebar/>}
      <Container>
        <SideMenu />
        <Detail>
          <RowBox>
            <TypeButton
              selected={selectedButton === "register"}
              onClick={() => handleTypeButtonClick("register")}
              >
              카페 등록
            </TypeButton>
            <TypeButton
              selected={selectedButton === "manage"}
              onClick={() => handleTypeButtonClick("manage")}
            >
              카페 관리
            </TypeButton>
          </RowBox>
          {selectedButton === "register" ? (
            <>
            <ContentBox>
              <SpecificBox>
                <InfoType>카페 이름</InfoType>
                <GrayInput type="text" placeholder="50자 이내" value={cafeName} onChange={handleCafeNameChange} />
              </SpecificBox>
              <SpecificBox>
                <InfoType>카페 지역</InfoType>
                <RowBox>
                <label>
                  <RadioInput 
                    type="radio"
                    value="서울특별시"
                    checked={selectedRegion === '서울특별시'}
                    onChange={handleRegionChange}
                  />
                  서울특별시
                </label>
                <label>
                  <RadioInput 
                    type="radio"
                    value="경기도"
                    checked={selectedRegion === '경기도'}
                    onChange={handleRegionChange}
                  />
                  경기도
                </label>
                <label>
                  <RadioInput 
                    type="radio"
                    value="부산광역시"
                    checked={selectedRegion === '부산광역시'}
                    onChange={handleRegionChange}
                  />
                  부산광역시
                </label>
                </RowBox>
              </SpecificBox>
              <SpecificBox>
                <InfoType>카페 주소</InfoType>
                <GrayInput type="text" placeholder="100자 이내" value={cafeAddress} onChange={handleCafeAddressChange} />
              </SpecificBox>
              <SpecificBox>
                <InfoType>카페 운영시간</InfoType>
                <GrayInput type="text" placeholder="ex) 화~일 10:00~22:00" value={cafeTime} onChange={handleCafeTimeChange} />
              </SpecificBox>
              <SpecificBox>
                <InfoType>카페 전화번호</InfoType>
                <GrayInput type="text" placeholder="ex) 010-0000-0000" value={cafePhone} onChange={handleCafePhoneChange} />
              </SpecificBox>
              <SpecificBox>
                <InfoType>카페 한 줄 소개</InfoType>
                <GrayInput type="text" placeholder="50자 이내" value={cafeIntro} onChange={handleCafeIntroChange} />
              </SpecificBox>
              <SpecificBox>
                <InfoType>카페 자세한 소개</InfoType>
                <GrayInput type="text" placeholder="1000자 이내" value={cafeDetail} onChange={handleCafeDetailChange} />
              </SpecificBox>
              <SpecificBox>
                <InfoType>카페 썸네일</InfoType>
                <input type="file" onChange={handleImageChange} />
              </SpecificBox>
              <InfoChangeButton onClick={handleCafeRegister} disabled={!isButtonActive}>등록하기</InfoChangeButton>
            </ContentBox>
            </>
          ) : (
            <>
            <SelectBox>
              <TextBox>메뉴 박스</TextBox>
            </SelectBox>
            <ContentBox>



            </ContentBox>
            </>
          )}
        
        </Detail>
      </Container>
      <Footer />
    </OutBox>
  );
};
export default BusinessCafe;