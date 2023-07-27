import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import { storage } from "../utils/Firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SideMenu from "../component/SideMenu";
import ChatBot from "../component/ChatBot";

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
  margin-left: 10px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;
// 세부 페이지 중앙 부분
const ContentBox = styled.div`
  width: 90%;
  min-width: 330px;
  margin-top: 3%;
  border: 1px solid #F3E1E1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
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
  @media (max-width: 500px) {
    width: calc(80% - 20px); // 1개를 한 줄에 배치
  }
`;
// 포인트 이미지
const PointImg = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 15px 15px 0 0;
  overflow: hidden;
`;
// 포인트 종류
const PointName = styled.p`
  margin-bottom: 10px;
  margin-left: 5%;
`;
// 포인트 충전 버튼
const PointChargeButton = styled.button`
  width: 100%;
  height: 50px;
  border: 0;
  border-radius: 0 0 13px 13px;
  background-color: #F3E1E1;
  cursor: pointer;
`;

const PaymentPage = () => {
  const navigate = useNavigate();
  // useContext 저장값 불러오기
  const {grantType, accessToken, refreshToken, userNum, userName, userAuthority} = useContext(UserContext);
  // 유저 정보 상태 관리
  const [memberInfo, setMemberInfo] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  // 버튼 클릭시 결제 통신
  const handlePayment = async(points) => {
    try {
      const response = await AxiosApi.chargePoint(userNum, points, grantType, accessToken);
      
      if (response.status === 200) {
        console.log(`${points} 포인트 충전 성공`);
      } else {
        console.log("충전 에러");
      }
    } catch (error) {
      console.error("결제 에러: ", error);
    }
  }

  // 파이어베이스 스토리지 이미지 로딩
  useEffect(() => {
    const storageIconRef = ref(storage, "images"); 
    Promise.all([
      getDownloadURL(ref(storageIconRef, "point.jpeg")),
    ])
    .then((urls) => {
      setImageUrls(urls);
      // console.log(imageUrls);
    })
    .catch((error) => {
      console.error("아이콘 이미지 로딩 실패!!", error);
    });
  }, []);


  return (
    <OutBox>
      <Header />
      <Container>
        <SideMenu />
        <Detail>
          <SelectBox>
            <TextBox>포인트 충전(결제)</TextBox>
          </SelectBox>
          <ContentBox>
            <ContentRowbox>
              <SpecificBox>
                <PointImg src={imageUrls[0]} alt="PointImg"></PointImg>
                <PointName>5,000 Point</PointName>
                <PointChargeButton onClick={()=>handlePayment(5000)}>충전하기</PointChargeButton>
              </SpecificBox>
              <SpecificBox onClick={()=>navigate("/mypage/payment")}>
                <PointImg src={imageUrls[0]} alt="PointImg"></PointImg>
                <PointName>10,000 Point</PointName>
                <PointChargeButton onClick={()=>handlePayment(10000)}>충전하기</PointChargeButton>
              </SpecificBox>
            </ContentRowbox>
            <ContentRowbox>
              <SpecificBox onClick={()=>navigate("/mypage/payment")}>
                <PointImg src={imageUrls[0]} alt="PointImg"></PointImg>
                <PointName>50,000 Point</PointName>
                <PointChargeButton onClick={()=>handlePayment(50000)}>충전하기</PointChargeButton>
              </SpecificBox>
              <SpecificBox onClick={()=>navigate("/mypage/payment")}>
                <PointImg src={imageUrls[0]} alt="PointImg"></PointImg>
                <PointName>100,000 Points</PointName>
                <PointChargeButton onClick={()=>handlePayment(100000)}>충전하기</PointChargeButton>
              </SpecificBox>
            </ContentRowbox>
          </ContentBox>
        </Detail>
      </Container>
      <Footer />
      {/* <ChatBot/>     */}
    </OutBox>
  );
};
export default PaymentPage;