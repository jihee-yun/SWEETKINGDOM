import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";
import filterimg from "../images/filter.png";
import AxiosApi from "../api/AxiosApi";
import Header from "../component/Header";
import Modal from "../utils/Modal2";
import CafeFilterModal from "../component/CafeFilterModal";
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";

const Container = styled.div`
  max-width: 1440px;
  width: 80%;
  margin: 0 auto;
  /* padding: 50px; */

  button{
    position: absolute;
    left: 20px;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 70px;
    height: 35px;
    margin: 50px 0 30px 0;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
    font-weight: 600;
    color: black;
    cursor: pointer;
  }

  img{
    width: 15px;
    height: 15px;
  }
`;

const Box = styled.div`
  @media (max-width: 768px) {
    justify-content: center;
  }
  position: relative;
  width: 100%;
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  grid-gap: 25px;
  align-items: center;
  padding-top: 50px;
  margin-top: 100px;
`;

const CafeBox = styled.div`
  height: 300px;
  margin: 30px 15px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  border-radius: 10px;
  box-shadow: 0 3px 3px #A4A4A4;
  cursor: pointer;

  &:hover{
    transform: scale(1.02);
  }

  .background {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,.7) 50%, rgba(0,0,0,0) 100%);
  }

  .content {
    position: absolute;
    padding: 20px;
    bottom: -20px;
    color: white;

    .intro{
      height: 45px;
    }
    
    p {
      font-weight: bold;
      &:nth-child(1) {
        font-size: .7rem;
        text-decoration: underline #FFCFDA 3px;
        text-underline-offset: 5px;
      }
      &:nth-child(2) {
        color: #FFCFDA;
        font-size: .9rem;
      }
      &:nth-child(3) {
        font-size: 1.1rem;
      }
    }
  }
`;

const Thumb = styled.div`
  width: 100%;
  height: 100%;
  object-fit: fit;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
`;

const CafeMain = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { isSidebar, setRegion, setCafeNum } = context; // cafeNum 유저스토어에 저장하기
  const { category } = useParams();

  const getRegion = localStorage.getItem("region");
  const getOption = localStorage.getItem("option");

  // 전체 카페 정보
  const [allCafeInfo, setAllCafeInfo] = useState([]);
  // 무한 스크롤을 위한 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
  // 무한 스크롤을 위한 
  const [cafeInfo, setCafeInfo] = useState([]);
  // 인기순, 별점순 정렬
  const [sortingOption, setSortingOption] = useState("");
  // 필터 값 저장
  const [selectRegion, setSelectRegion] = useState("");
  const [selectOption, setSelectOption] = useState("");

  useEffect(() => {
    const cafeInfo = async() => {
      let response;
      if(getRegion && (getOption === "인기순")) {
        response = await AxiosApi.cafeInfoGet(getRegion, "인기순");
      } else if(getRegion && (getOption === "별점순")) {
        response = await AxiosApi.cafeInfoGet(getRegion, "별점순");
      } else response = await AxiosApi.cafeInfoGet(category);
      if(response.status === 200) setAllCafeInfo(response.data);
    };
    cafeInfo();
  }, [category, getRegion, getOption]);

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
    setCafeInfo(allCafeInfo.slice(0, endIndex));
  }, [currentPage, allCafeInfo]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 모달창
  const [modalOpen, setModalOpen] = useState(false);
  
  const filterModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 필터 값으로 결과 조회
  const confirm = () => {
    setRegion(selectRegion);
    localStorage.setItem("region", selectRegion);
    setSortingOption(selectOption);
    localStorage.setItem("option", selectOption);
    console.log("필터 선택 값 : " + selectOption);
    setModalOpen(false);
  }

  const selectCafe = (cafeNum) => {
    setCafeNum(cafeNum);
    localStorage.setItem("cafeNum", cafeNum);
    navigate(`/cafe/detail/${cafeNum}`);
  }

  return(
    <>
    <Header />
    {isSidebar && <Sidebar />}
    <Container> 
    <Box>
    <button className="filter" onClick={filterModal}><img src={filterimg} alt="필터이미지" /><p>필터</p></button>
    {cafeInfo && cafeInfo.map(cafe => (
    <CafeBox key={cafe.id} onClick={() => selectCafe(cafe.id)}>
      <Thumb className="img" imageurl={cafe.thumbnail}/>
      <div className="background"></div>
      <div className="content">
        <p>{cafe.region}</p>
        <p>{cafe.cafeName}</p>
        <p className="intro">{cafe.intro}</p> 
      </div>
    </CafeBox>
    ))}
    </Box>
    </Container>
    <Footer />
    <Modal open={modalOpen} type={true} close={closeModal} confirm={() => confirm(selectOption)} header="필터">
    <CafeFilterModal 
    selectRegion={selectRegion} setSelectRegion={setSelectRegion}
    selectOption={selectOption} setSelectOption={setSelectOption}/>
    </Modal>
    </>
  );
};

export default CafeMain;
