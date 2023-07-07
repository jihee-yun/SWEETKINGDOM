import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Roulette from "./Roulette";
import quiz from "./images/quiz.png";
import shopping from "./images/shopping.png";
import { useNavigate } from "react-router-dom";
import AxiosApi from "./Api/AxiosApi";

const ContainerBox = styled.div`
  /* max-width: 1440px;
  margin: 0 auto; */
`;

const Box = styled.div`
  width: 80%;
  margin: 0 auto;

  .r-title {
    margin-top: 100px;
  }
`;

const ChallengeBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const EventFooter = styled.div` 

 .event-box{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
 }
`;

const QuizBox = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin: 50px;

  img {
    width: 80px;
    height: 80px;
    margin: 20px 0 10px 20px;
  }
  
  h3 {
    margin-left: 20px;
    line-height: 10%;
  }

  p {
    margin-left: 20px;
    color: gray;
    font-size: 1rem;
  }

  .quizButton{
    width: 50%;
    height: 50px;
    margin: 0 auto;
  }
  button {
    margin-top: 25px;
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 20px;
    color: white;
    background-color: #7D5A5A;
    font-size: 1.1rem;
    font-weight: bolder;
    cursor: pointer;
  }
`;

const AdBox = styled.div`
  width: 280px;
  height: 280px;
  border: 1px solid black;
  margin: 50px;
`;

const LuckyBox = styled.div`
  width: 280px;
  height: 280px;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin: 50px;

  img {
    width: 80px;
    height: 80px;
    margin: 20px 0 10px 20px;
  }
  
  h3 {
    margin-left: 20px;
    line-height: 10%;
  }

  p {
    margin-left: 20px;
    color: gray;
    font-size: 1rem;
  }

  .shoppingButton{
    width: 50%;
    height: 50px;
    margin: 0 auto;
  }
  button {
    margin-top: 25px;
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 20px;
    color: white;
    background-color: #7D5A5A;
    font-size: 1.1rem;
    font-weight: bolder;
    cursor: pointer;
  }
`;

const ChallengeTitle = styled.div`
  position: relative;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 220px;
  height: 300px;
  margin-right: 50px; 
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  cursor: pointer;

  .shadow {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    border-radius: 20px;
    background: linear-gradient(to top, rgba(0,0,0,.7) 23%, rgba(0,0,0,0) 100%);
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
  border-radius: 20px;
  border: none;
`;

const Event = () => {
  const navigate = useNavigate();
  const [challengeInfo, setChallengeInfo] = useState("");


  useEffect(() => {
    const challengeInfo = async() => {
      const rsp = await AxiosApi.challengeGet("ALL");
      if(rsp.status === 200) setChallengeInfo(rsp.data);
    };
    challengeInfo();
  }, []);

  const navigateCh = () => {
    navigate('/challengeMain');
  };

  const navigatePoint = () => {
    navigate('/couponStore');
  };

  const quizOpen = () => { // 퀴즈 새 창으로 열기
    // const width = Math.min(window.innerWidth, 500);
    // const height = Math.min(window.innerHeight, 700);
    // const newWindow = window.open("", "_blank", `width=${width},height=${height}`);
    // newWindow.location.href = "/quizMain";
    navigate('/quizMain');
  };

  

  return(
    <>
      <ContainerBox>
        <Box>
          <h3>이 달의 퀘스트</h3>
          <ChallengeBox onClick={navigateCh}>
            {challengeInfo && challengeInfo.map(item => (
              <ChallengeTitle key={item.challengeName}>
                <Thumb className="img" imageurl={item.thumbnail}></Thumb>
                <div className="shadow"></div>
                <Title>{item.challengeName}</Title>
              </ChallengeTitle>
            ))}
          </ChallengeBox>
          <div className="r-title">
            <h3>룰렛 돌리고 포인트 받아가기</h3>
          </div>
          <Roulette />
          <EventFooter>
            <div className="event-box">
              <QuizBox>
                <div>
                  <img src={quiz} alt="퀴즈" />
                  <h3 className="quizTitle">깜짝 퀴즈</h3>
                  <p>퀴즈 풀고 포인트 받기</p>
                  <div className="quizButton">
                    <button onClick={quizOpen}>퀴즈 풀기</button>
                  </div>
                </div>
              </QuizBox>
              <AdBox>
                <div><p>광고 이미지 들어갈 자리</p></div>
              </AdBox>
              <LuckyBox>
                <div>
                <img src={shopping} alt="퀴즈" />
                  <h3 className="shoppingTitle">포인트샵</h3>
                  <p>쌓인 포인트로 구매하세요!</p>
                  <div className="shoppingButton">
                  <button onClick={navigatePoint}>바로 가기</button>
                  </div>
                </div>
            </LuckyBox>
            </div>
          </EventFooter>
        </Box>
      </ContainerBox>
    </>
  );
};

export default Event;