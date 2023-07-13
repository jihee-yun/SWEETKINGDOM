import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AxiosApi from "./api/AxiosApi";
import { UserContext } from "../../context/UserStore";
import { storage } from "../../utils/Firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Header from "../now/component/Header";
import Footer from "../now/component/Footer";
import SideMenu from "./components/SideMenu";
import ChatBot from "./components/ChatBot";

const OutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 1.8s ease-in-out;
`;

const Container = styled.div`
  width: 80%;
  
  display: flex;
`;

const Detail = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  border: 2px solid yellow;
  flex-direction: column;
  align-items: center;
`;

const LineBox = styled.div`
  width: 90%;
  height: 300px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 3%;
  margin-bottom: -1%;
`;

const SquareBox = styled.div`
  width: 25%;
  height: 98%;
  border: 2px solid #F3E1E1;
  border-radius: 15px;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LongBox = styled.div`
  width: 55%;
  height: 98%;
  border: 2px solid #F3E1E1;
  margin-right: 5%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Title = styled.p`
  height: 20px;
  letter-spacing: -1px;
  margin-left: 2%;
`;
const More = styled.p`
  height: 20px;
  letter-spacing: -1px;
  margin-left: auto;
  margin-right: 2%;
  cursor: pointer;
`;

const BoxContent = styled.div`
  width: 90%;
  height: 75%;
  border: 1px solid blue;
`;
const BoxContentLong = styled.div`
  width: 90%;
  height: 75%;
  border: 1px solid blue;
`;



const MyPage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // 로그인시 회원 번호
  const { userNum } = useContext(UserContext);

  // 파이어베이스 스토리지 이미지 로딩
  // useEffect(() => {
  //   const storageIconRef = ref(storage, "essential");

  //   Promise.all([
  //     getDownloadURL(ref(storageIconRef, "logo.png")),
  //   ])
  //     .then((urls) => {
  //       setImageUrls(urls);
  //       // console.log(imageUrls);
  //     })
  //     .catch((error) => {
  //       console.error("아이콘 이미지 로딩 실패!!", error);
  //     });
  // }, []);

  return(
    <OutBox>
    <Header />
    <Container>
      <SideMenu />
      <Detail>
        <LineBox>
          <SquareBox>
            <BoxTitle>
              <Title>작성 리뷰</Title>
              <More onClick={()=>navigate("/mypage/review")}>더 보기</More>
            </BoxTitle>
            <BoxContent></BoxContent>
          </SquareBox>
          <SquareBox>
            <BoxTitle>
              <Title>참여 챌린지</Title>
              <More onClick={()=>navigate("/mypage/challenge")}>더 보기</More>
            </BoxTitle>
            <BoxContent></BoxContent>
          </SquareBox>
          <SquareBox>
            <BoxTitle>
              <Title>참여 소모임</Title>
              <More onClick={()=>navigate("/mypage/somoim")}>더 보기</More>
            </BoxTitle>
            <BoxContent></BoxContent>
          </SquareBox>
        </LineBox>
        <LineBox>
          <LongBox>
            <BoxTitle>
              <Title>캘린더</Title>
              <More onClick={()=>navigate("/mypage/calendar")}>더 보기</More>
            </BoxTitle>
            <BoxContentLong></BoxContentLong>
          </LongBox>
          <SquareBox>
            <BoxTitle>
              <Title>참여 이벤트</Title>
              <More onClick={()=>navigate("/mypage/event")}>더 보기</More>
            </BoxTitle>
            <BoxContent></BoxContent>
          </SquareBox>
        </LineBox>
        <LineBox>
          <SquareBox>
            <BoxTitle>
              <Title>결제/포인트</Title>
              <More onClick={()=>navigate("/mypage/point")}>더 보기</More>
            </BoxTitle>
            <BoxContent></BoxContent>
          </SquareBox>
          <SquareBox>
            <BoxTitle>
              <Title>랭킹</Title>
              <More onClick={()=>navigate("/mypage/ranking")}>더 보기</More>
            </BoxTitle>
            <BoxContent></BoxContent>
          </SquareBox>
          <SquareBox>
            <BoxTitle>
              <Title>문의/신고</Title>
              <More onClick={()=>navigate("/mypage/report")}>더 보기</More>
            </BoxTitle>
            <BoxContent></BoxContent>
          </SquareBox>
        </LineBox>
      </Detail>
    </Container>
    <Footer />
    <ChatBot />
    </OutBox>
  );
};
export default MyPage;