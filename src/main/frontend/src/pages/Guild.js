import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import AxiosApi from "../api/AxiosApi";
import GuildSection from "../component/GuildSection";
import GuildFilterCategory from "../component/GuildFilterCategory";
import { UserContext } from "../context/UserStore";
import Modal from "../utils/Modal2";
import CompleteModal from "../utils/CompleteModal";
import Sidebar from "../component/Sidebar";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  max-width: 1440px;
  width: 80%;
  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
`;

const RegBox = styled.div`
  width: 100%;
  text-align: center;
  background-color: #FAFAFA;
  box-sizing: border-box;

  .context{
    @media (max-width: 768px) {
      padding: 30px;
      h1{
        font-size: 1.2rem;
      }
      h3{
        font-size: .9rem;
      }
    }

    padding: 50px;

    .context2{
      color: darkgray;
      line-height: 30px;
      margin-top: 30px;
    }
  }
  
  button{
    @media (max-width: 768px) {
      font-size: .9rem;
    }
    margin-bottom: 50px;
    width: 150px;
    height: 40px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #585858;
    border: none;
    border-radius: 3px;
    background-color: #FFCFDA;
    cursor: pointer;
    &:hover{
      color: white;
    }
  }
`;

const GuildBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Guild = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { isSidebar } = context;
  const userNum = localStorage.getItem("userNum");
  const userAuthority = localStorage.getItem("userAuthority");

  const [allGuildInfo, setAllGuildInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [guildInfo, setGuildInfo ] = useState([]);
  const [category, setCategory] = useState("All");

  localStorage.setItem("guildCategory", category);
  const selectCategory = localStorage.getItem("guildCategory");

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const guildInfo = async() => {
      const response = await AxiosApi.guildInfoGet(selectCategory);
      if(response.status === 200) setAllGuildInfo(response.data);
    }
    guildInfo();
  },[selectCategory]);

  // 무한 스크롤 이벤트 처리
  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (isAtBottom) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    setGuildInfo(allGuildInfo.slice(0, endIndex));
  }, [currentPage, allGuildInfo]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const moveToNewGuild = () => {
    if(!userNum) {
      setModalOpen(true);
    } else navigate('/createguild');
  }

  const categoryChange = (e) => {
    setCategory(e);
    localStorage.setItem("guildCategory", e);
  }

  const complete = () => {
    navigate('/memberlogin');
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return(
    <>
    <Header />
    {isSidebar && <Sidebar />}
    <Container>
      <RegBox>
        <div className="context">
          <h1>일시적 모임을 통해</h1>
          <h1>원하는 목적을 달성해봐요</h1>
          <h3 className="context2">나와 같은 목적을 가진 <br />
              친구들을 직접 모집해보세요</h3>
        </div>
        {userAuthority === 'ROLE_USER' || !userAuthority ?  <button onClick={moveToNewGuild}>길드 만들기</button> :
        <button style={{ backgroundColor: "darkgray", cursor: "none"}}>길드 만들기</button>}
      </RegBox>
      {/* <div className="middle-bar"></div> */}
      <GuildFilterCategory onClickCategory={categoryChange} />
      <GuildBox>
      <GuildSection guildInfo={guildInfo}/>
      </GuildBox>
      <Modal move={true} header="완료" open={isModalOpen} confirm={complete} close={closeModal}>
        <CompleteModal content={"로그인이 필요합니다. 로그인 페이지로 이동할까요?"} maxCharacters={11}/>
      </Modal>
    </Container>
    <Footer />
    </>
  );
};

export default Guild;