import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import { storage } from "../utils/Firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Side = styled.div`
  width: 250px;
  min-width: 200px;
  height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #7D5A5A;
  border-radius: 3px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileBox = styled.div`
  width: 95%;
  height: 200px;
  margin: 2%;
  border: 1px solid #7D5A5A;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .profileImg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const MyName = styled.p`
  /* border: 1px solid black; */
  margin-top : 2%;
  margin-bottom: 0;
  cursor: pointer;
`;

const MyPoint = styled.p`
  margin: 1%;
  /* border: 1px solid black; */
  cursor: pointer;
`;

const NaviButton = styled.button`
  width: 100%;
  height: 60px;
  font-size: 1em;
  font-weight: bold;
  background-color: white;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 5px;
  color: #7D5A5A;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: #F1D1D1;
    color: white;
  }
  
  &:active {
    background-color: #F3E1E1;
    color: white;
    border-color: #F1D1D1;
  }
`;


const SideMenuForBusiness = () => {
  const navigate = useNavigate();

  const [memberInfo, setMemberInfo] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // 로그인시 회원 정보
  const {grantType, accessToken, refreshToken, userNum, userName, userAuthority} = useContext(UserContext);

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const rsp = await AxiosApi.getMemberInfo(userNum, grantType, accessToken);
        if (rsp.status) {
          setMemberInfo(rsp.data[0]);
          console.log("사이드 메뉴 유저 정보 가져오기 성공: ", rsp.data[0])
        }
      } catch (error) {
        console.log("사이드 메뉴유저 정보 가져오기 실패: ", error);
      }
    };
    fetchMemberInfo();
  }, [userNum]);

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

  return (
    <Side>
      <ProfileBox>
        <img className="profileImg" src={imageUrls[0]} alt="프로필 이미지" onClick={()=>navigate("/mypage")}/>
        <MyName onClick={()=>navigate("/blog")}>{userName}님 블로그 이동</MyName>
        <MyPoint onClick={()=>navigate("/mypage/point")}>{memberInfo.totalPoint} point</MyPoint>
      </ProfileBox>
      <NaviButton onClick={()=>navigate("/businesspage/cafe")}>카페 등록 / 관리</NaviButton>
      <NaviButton onClick={()=>navigate("/businesspage/review")}>리뷰 관리</NaviButton>
      {/* <NaviButton onClick={()=>navigate("/businesspage/challenge")}>카페 챌린지</NaviButton> */}
      {/* <NaviButton onClick={()=>navigate("/businesspage/event")}>카페 이벤트</NaviButton> */}
      {/* <NaviButton onClick={()=>navigate("/businesspage/calendar")}>캘린더</NaviButton> */}
      {/* <NaviButton onClick={()=>navigate("/businesspage/point")}>포인트 / 결제 내역</NaviButton> */}
      {/* <NaviButton onClick={()=>navigate("/businesspage/ranking")}>랭킹</NaviButton> */}
      <NaviButton onClick={()=>navigate("/businesspage/information")}>회원 정보</NaviButton>
      <NaviButton onClick={()=>navigate("/businesspage/report")}>문의 / 신고 내역</NaviButton>
      
    </Side>
  );
};
export default SideMenuForBusiness;