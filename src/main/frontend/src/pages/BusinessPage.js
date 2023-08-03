import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

const Container = styled.div`
  margin-top: 30px;
  width: 90%;
  display: flex;
  justify-content: center;
`;
// 세부 페이지
const Detail = styled.div`
  width: 95%;
  max-width: 1000px;
  min-width: 400px;
  min-height: 600px;
  display: flex;
  /* border: 2px solid yellow; */
  flex-wrap: wrap;
  justify-content: space-around;
`;

// 각 메뉴별 외부 박스
const SquareBox = styled.div`
  width: 40%;
  min-width: 350px;
  height: 300px;
  margin-top: 2%;
  margin-bottom: 2%;
  border: 1px solid #AE7C7C;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1000px) {
    width: calc(40% - 20px); // 2개를 한 줄에 배치
  }

  @media (max-width: 768px) {
    width: calc(90% - 20px); // 1개를 한 줄에 배치
  }
`;
const ShortBox = styled.div`
  width: 40%;
  min-width: 350px;
  height: 50px;
  margin-top: 2%;
  border: 1px solid #AE7C7C;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: none;

  @media (max-width: 768px) {
    width: calc(90% - 20px); // 1개를 한 줄에 배치
    display: flex;
  }
`;
// 세부 메뉴 이름 + 더보기 버튼
const BoxTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
// 세뮤 메뉴 이름
const Title = styled.p`
  height: 20px;
  letter-spacing: -1px;
  margin-left: 2%;
`;
// 더보기 버튼
const More = styled.p`
  height: 20px;
  letter-spacing: -1px;
  margin-left: auto;
  margin-right: 2%;
  cursor: pointer;
`;
// 세부 내용 목록
const BoxContent = styled.div`
  width: 90%;
  height: 75%;
  border: 1px solid #F1D1D1;
`;



const BusinessPage = () => {
  const navigate = useNavigate();

  const [memberInfo, setMemberInfo] = useState([]);

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

  // 유저 정보 가져오기
  useEffect(() => {
    if(accessToken) {
    const fetchMemberInfo = async () => {
      try {
        const rsp = await AxiosApi.getBusinessMemberAllInfo(userNum, grantType, accessToken);
        if (rsp.status) {
          setMemberInfo(rsp.data[0]);
          console.log("마이페이지 유저 정보 가져오기 성공: ", rsp.data[0])
        }
      } catch (error) {
        console.log("마이페이지 유저 정보 가져오기 실패: ", error);
      }
    };
    fetchMemberInfo();
  } else navigate("/memberlogin");
  }, [userNum, accessToken]);

  useEffect(() => {
    setIsSidebar("-300px")
  }, []);

  return(
    <OutBox>
    <Header />
    {isSidebar && <Sidebar/>}
    <Container>
      <SideMenu />
      <Detail>
        <SquareBox>
          <BoxTitle>
            <Title>카페 등록/관리</Title>
            <More onClick={()=>navigate("/businesspage/cafe")}>더 보기</More>
          </BoxTitle>
          <BoxContent></BoxContent>
        </SquareBox>
        <SquareBox>
          <BoxTitle>
            <Title>리뷰 관리</Title>
            <More onClick={()=>navigate("/businesspage/review")}>더 보기</More>
          </BoxTitle>
          <BoxContent></BoxContent>
        </SquareBox>
        <SquareBox>
          <BoxTitle>
            <Title>카페 챌린지</Title>
            <More onClick={()=>navigate("/businesspage/event")}>더 보기</More>
          </BoxTitle>
          <BoxContent></BoxContent>
        </SquareBox>
        <SquareBox>
          <BoxTitle>
            <Title>문의/신고</Title>
            <More onClick={()=>navigate("/businesspage/report")}>더 보기</More>
          </BoxTitle>
          <BoxContent></BoxContent>
        </SquareBox>
        <ShortBox>
            <BoxTitle>
              <Title>회원 정보</Title>
              <More onClick={()=>navigate("/mypage/information")}>더 보기</More>
            </BoxTitle>
          </ShortBox>
      </Detail>
    </Container>
    <Footer />
    {/* <ChatBot /> */}
    </OutBox>
  );
};
export default BusinessPage;