import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyleSheetManager } from "styled-components";
import seoul from "../images/seoul.jpeg";
import Header from "../component/Header"
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 80%;
  padding: 50px; // 헤더랑 푸터 여백주려고 넣어둠
  margin: 0 auto;
  box-sizing: border-box;
`;

const Box = styled.div`
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 30px;
  }
  @media (max-width: 430px) {
    width: 100%;
  }
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  gap: 30px;
  padding-top: 120px;
  padding-bottom: 120px;
`;

const CategoryBox = styled.div`
  @media (max-width: 430px) {
    width: 100px;
    height: 70px;
    p{
      font-size: 1rem !important; // 권장하는 방법 아님....다른 방법...
    }
  }

  width: 170px;
  height: 70px;
  border-radius: 5px;
  object-fit: cover;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
  cursor: pointer;

  p {
    margin: 40px 0 0 10px;
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
  }
`;

const Cafe = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setRegion , isSidebar, setIsSidebar } = context;

  const selectCategory = (category) => {
    setRegion(category);
    localStorage.setItem("region", category);
    navigate('/cafe/main')
  }

  useEffect(() => {
    setIsSidebar('-380px');
  }, [])


  return(
    <>
    <Header />
    {isSidebar && <Sidebar/>}
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'imageurl'}>
    <Container>
      <Box>
      <CategoryBox imageurl={seoul} onClick={() => selectCategory("전체")}><p>전체</p></CategoryBox>
      <CategoryBox imageurl={seoul} onClick={() => selectCategory("서울특별시")}><p>서울특별시</p></CategoryBox>
      <CategoryBox imageurl={seoul} onClick={() => selectCategory("경기도")}><p>경기도</p></CategoryBox>
      <CategoryBox imageurl={seoul} onClick={() => selectCategory("부산광역시")}><p>부산광역시</p></CategoryBox>
      </Box>
    </Container>
    </StyleSheetManager>
    <Footer />
    </>
  );
};

export default Cafe;