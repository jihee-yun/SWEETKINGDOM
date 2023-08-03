import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SideMenu from "../component/SideMenu";
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
  max-width: 1000px;
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
  text-align: center;
`;
// 세부 페이지 중앙 부분
const ContentBox = styled.div`
  width: 90%;
  min-width: 330px;
  /* min-width: 500px; */
  /* min-height: 600px; */
  margin-top: 3%;
  border: 1px solid #F3E1E1;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
// 세부 페이지 가로 박스
// const ContentRowbox = styled.div`
//   /* border: 1px solid red; */
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// `;
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
// 길드 이미지(썸네일)
const GuildImg = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
`;
// 그냥 가로 박스
const RowBox = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: -10px;
`;
// 길드 이름
const GuildName = styled.p`

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
// 길드 카테고리
const GuildCategory = styled.p`
  margin-right: auto; 
  margin-bottom: -5px;
  margin-left: 5%;
`;
// 길드 지역
const GuildRegion = styled.p`
  margin-right: auto;
  margin-bottom: -5px;
  margin-left: 5%;
`;
// 길드 인원수
const GuildMemberNum = styled.p`
  margin-right: auto;
  margin-bottom: -5px;
  margin-left: 5%;
`;
// 길드 소개
const GuildIntro = styled.p`
  margin-right: auto;
  margin-left: 5%;
`;

const MyGuild = () => {
  const navigate = useNavigate();
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
  // 유저 정보 상태 관리
  const [memberInfo, setMemberInfo] = useState(null);

  const categoryNames = {
    1: "친목",
    2: "퀘스트"
  };

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const rsp = await AxiosApi.getMemberGuildInfo(userNum, grantType, accessToken);
        if (rsp.status) {
          setMemberInfo(rsp.data);
          console.log("길드 정보 가져오기 성공: ", rsp.data)
        }
      } catch (error) {
        console.log("길드 정보 가져오기 실패: ", error);
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
            <TextBox>참여중인 길드 조회</TextBox>
          </SelectBox>
          <ContentBox>
            {memberInfo && memberInfo.map((guild, index) => (
              <SpecificBox key={index}>
                <GuildImg src={guild.thumbnail} alt="GuildImg"></GuildImg>
                <RowBox>
                  <GuildName>{guild.guildName}</GuildName>
                  <More onClick={()=>navigate(`/guild/detail/${guild.id}`)}>자세히 보기</More>
                </RowBox>
                <GuildCategory>카테고리: {categoryNames[guild.category]}</GuildCategory>
                <GuildRegion>지역: {guild.region}</GuildRegion>
                <GuildIntro>소개: {guild.intro}</GuildIntro>  
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
export default MyGuild;