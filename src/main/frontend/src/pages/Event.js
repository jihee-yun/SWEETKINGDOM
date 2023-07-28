import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Roulette from "../component/Roulette";
import menu from "../images/menu.png";
import shopping from "../images/shopping.png";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import ad from "../images/event-ad.png";
import ad2 from "../images/ad-media.png";
import MenuBox from "../utils/MenuBox";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";
import { UserContext } from "../context/UserStore";

const Box = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 430px) {
    width: 100%;
  }

  width: 80%;
  margin: 0 auto;
  margin-top: 80px;

  h3 {
    margin-left: 40px;
  }

  .r-title {
    margin-top: 100px;

    @media (max-width: 768px) {
      margin-bottom: 80px;
    }

    @media (max-width: 430px) {
      width: 300px;
    }
  }
`;

const ChallengeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  }
`;

const ChallengeBox = styled.div`
  margin: 30px 30px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  border-radius: 10px;
  box-shadow: 0 3px 3px #A4A4A4;
  cursor: pointer;
`;  

const ChallengeTitle = styled.div`
  width: 220px;
  height: 300px;
  border: none;
  
  .shadow {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,.7) 50%, rgba(0,0,0,0) 100%);
  }
`;

const Title = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  margin-left: 12px;
  font-size: 1rem;
  margin-top: 240px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: bolder;
`;

const Thumb = styled.div`
  width: 100%;
  height: 100%;
  object-fit: fit;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  border: none;
`;

const EventFooter = styled.div` 
 .event-box{
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
 }
`;

const AdBox = styled.div`
  .adImg {
    width: 260px;
    height: 330px;
    margin: 50px;
  }
  @media (max-width: 768px) {
    .adImg {
      display: none;
    }
  }
`;

const MediaBox = styled.div`
  .ad {
    display: none;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 50px;
    .ad {
      display: block;
      width: 100%;
      height: 220px;
    }
  }
  @media (max-width: 430px) {
    .ad {
      height: 110px;
    }
  }

`;

const Event = () => {
  const navigate = useNavigate();
  const [challengeInfo, setChallengeInfo] = useState("");
  const context = useContext(UserContext);
  const { isSidebar } = context;

  const cafeOpen = () => {
    navigate('/cafe');
  };

  useEffect(() => {
    const challengeInfo = async() => {
      const rsp = await AxiosApi.challengeGet("ALL");
      if(rsp.status === 200) setChallengeInfo(rsp.data);
    };
    challengeInfo();
  }, []);


  const navigateCh = (id) => {
    const editedInfo = challengeInfo.filter(item => item.id === id);
    navigate('/challengeMain', {state: {editedInfo}});
  };

  const navigatePoint = () => {
    navigate('/couponStore');
  };

  return(
    <>
    <Header />
    {isSidebar && <Sidebar />}
      <Box>
        <h3>이 달의 퀘스트</h3>
        <ChallengeContainer>
        {challengeInfo && challengeInfo.map(item => (
        <ChallengeBox key={item.id} onClick={() => navigateCh(item.id)}>
            <ChallengeTitle >
              <Thumb className="img" imageurl={item.thumbnail}></Thumb>
              <div className="shadow"></div>
              <Title>{item.challengeName}</Title>
            </ChallengeTitle>
        </ChallengeBox>
        ))}
        </ChallengeContainer>
        <div className="r-title">
          <h3>룰렛 돌리고 포인트 받아가기</h3>
        </div>
        <Roulette />
        <EventFooter>
          <div className="event-box">
            <MediaBox>
              <a href="https://www.coca-cola.co.kr/" target="_blank" rel="noopener noreferrer">
                <img className="ad" src={ad2} alt="광고2" />
              </a>
            </MediaBox>
            <MenuBox>
              <div>
                <img src={menu} alt="카페메뉴" />
                <h3>카페 확인하기</h3>
                <p>포인트를 사용할 카페를 찾아보세요!</p>
                <div className="menuButton">
                  <button onClick={cafeOpen}>둘러보기</button>
                </div>
              </div>
            </MenuBox>
            <AdBox>
              <div>
                <a href="https://www.coca-cola.co.kr/" target="_blank" rel="noopener noreferrer">
                <img className="adImg" src={ad} alt="광고" />
                </a>
              </div>
            </AdBox>
            <MenuBox>
              <div>
              <img src={shopping} alt="쇼핑" />
                <h3>포인트샵</h3>
                <p>쌓인 포인트로 구매하세요!</p>
                <div className="menuButton">
                <button onClick={navigatePoint}>바로 가기</button>
                </div>
              </div>
          </MenuBox>
          </div>
        </EventFooter>
      </Box>
      <Footer />
    </>
  );
};

export default Event;