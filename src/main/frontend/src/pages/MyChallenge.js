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


const OutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 사이드 메뉴 + 세부 페이지
const Container = styled.div`
  width: 95%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;
// 세부 페이지
const Detail = styled.div`
  width: 100%;
  min-width: 350px;
  max-width: 1000px;
  min-height: 600px;
  /* height: 1000px; */
  display: flex;
  flex-direction: column;
  align-items: center;

  /* border: 2px solid yellow; */
`;

// 세부 페이지 윗쪽 부분
const SelectBox = styled.div`
  width: 90%;
  min-width: 330px;
  height: 80px;
  margin-top: 3%;
  border: 1px solid #F3E1E1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TextBox = styled.p`
  margin-left: 10px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
// 세부 페이지 중앙 부분
const ContentBox = styled.div`
  width: 90%;
  min-width: 330px;
  min-height: 600px;
  margin-top: 3%;
  border: 1px solid #F3E1E1;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
// 세부 페이지 가로 박스
const ContentRowbox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
// 세부 정보들 나열해주는 박스
const SpecificBox = styled.div`
  margin: 20px;
  width: 40%;
  min-width: 300px;
  border: 1px solid #F3E1E1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  @media (max-width: 670px) {
    width: calc(80% - 20px); // 1개를 한 줄에 배치
  }
`;
// 그냥 가로 박스
const RowBox = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  flex-direction: row;
`;
// 챌린지 이미지(썸네일)
const ChallengeImg = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
`;
// 챌린지 이름
const ChallengeName = styled.p`

`;
// 더보기 버튼
const More = styled.p`
  font-size: .6rem;
  height: 10px;
  letter-spacing: -1px;
  margin-left: auto;
  margin-right: 1%;
  cursor: pointer;
`;
// 챌린지 카운트
const CahllengeCount = styled.p`
  margin-right: auto; 
  margin-bottom: -5px;
  margin-left: 5%;
`;
// 챌린지 내용
const ChallengeDetail = styled.p`
  margin-right: auto;
  margin-bottom: -5px;
  margin-left: 5%;
`;
// 챌린지 만료 날짜
const ChallengeExpired = styled.p`
  margin-right: auto;
  margin-left: 5%;
`;


const MyChallenge = () => {
  const navigate = useNavigate();
  // useContext 저장값 불러오기
  const {isSidebar, setIsSidebar} = useContext(UserContext);
  // 유저 정보 상태 관리
  const [memberInfo, setMemberInfo] = useState(null);
  // 로컬 스토리지 저장값 불러오기
  const userNum = localStorage.getItem("userNum");
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userName = localStorage.getItem("userName");
  const userAuthority = localStorage.getItem("userAuthority");
  const isLogin = localStorage.getItem("isLogin");

  // 페이지 랜더링시 유저 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const rsp = await AxiosApi.getMemberChallengeInfo(userNum, grantType, accessToken);
        if (rsp.status) {
          setMemberInfo(rsp.data);
          console.log("챌린지 정보 가져오기 성공: ", rsp.data)
        }
      } catch (error) {
        console.log("챌린지 정보 가져오기 실패: ", error);
      }
    };
    fetchMemberInfo();
  }, [userNum]);

  useEffect(() => {
    return (
      setIsSidebar("-300px")
    )
  }, []);

  return (
    <OutBox>
      <Header />
      {isSidebar && <Sidebar/>}
      <Container>
        <SideMenu />
        <Detail>
          <SelectBox>
            <TextBox>참여중인 챌린지 조회</TextBox>
          </SelectBox>
          <ContentBox>
            {memberInfo && memberInfo.map((challenge, index) => (
              <SpecificBox key={index}>
                <ChallengeImg src={challenge.thumbnail} alt="ChallengeImg"></ChallengeImg>
                <RowBox>
                  <ChallengeName>{challenge.challengeName}</ChallengeName>
                  <More onClick={()=>navigate("/mypage/challenge")}>자세히 보기</More>
                </RowBox>
                <CahllengeCount>참여 중인 인원 수: {challenge.count}</CahllengeCount>
                <ChallengeDetail>내용: {challenge.detail}</ChallengeDetail>
                <ChallengeExpired>만료날짜: {challenge.endTime}</ChallengeExpired>  
              </SpecificBox>
            ))}
          </ContentBox>
        </Detail>
      </Container>
      <Footer />
      {/* <ChatBot/> */}
    </OutBox>
  );
};
export default MyChallenge;