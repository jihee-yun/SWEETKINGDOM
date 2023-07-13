import React, { useEffect, useState } from "react";
import styled from "styled-components";
import challengePin from "./images/challengePin.png"
import { Link, useLocation } from "react-router-dom";
import ChallnegeModal from "./ChallengeModal";


const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Box = styled.div`
  width: 80%;
  margin: 0 auto;

  h2 {
    font-weight: bolder;
  }

`;

const ChHeader = styled.div`
  margin-top: 40px;

  .ch-header{
    display: flex;
    flex-direction: row;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

const ChBox = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  .ch-box1 {
    width: auto;
    height: 550px;
    margin: 30px;

    .title {
      font-size: 1.3rem;
      font-weight: bolder;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 40px;
    }

    .step {
      font-size: 1.2rem;
      font-weight: bolder;
      color: #FFCFDA;
      text-align: center;
    }

    .content {
      font-size: 1.1rem;
      font-weight: bolder;
      border: 3px solid #FFCFDA;
      width: 400px;
      height: 70px;
      border-radius: 40px;
      margin: 0 auto;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
  }
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  button {
    border: none;
    width: 400px;
    height: 50px;
    border-radius: 20px;
    background-color: #FFCFDA;
    margin-top: 100px;
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bolder;
    color: white;
    cursor: pointer;
  }
`;

const Confirm = styled.div`
  margin-top: 150px;

  .title {
    font-size: 1.3rem;
    font-weight: bolder;
    border-radius: 20px;
    text-align: center;
    margin-bottom: 40px;
  }

  .content {
    width: 400px;
    height: 100px;
    font-size: 1.1rem;
    font-weight: bolder;
    /* background-color: #FFCFDA; */
    border: 3px solid #FFCFDA;
    border-radius: 20px;
    margin: 0 auto;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
`;

const CafeIntro = styled.div`
  font-size: .9rem;
  color: gray;
  text-align: center;
  margin-bottom: 60px;
  cursor: pointer;

  .link_style {
    color: inherit;
    text-decoration: none;
  }
`;

const ChallengeMain = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [challengeInfo, setChallengeInfo] = useState("");
  const location = useLocation();
  const info = location.state && location.state.editedInfo;

  console.log(info);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  return(
    <>
    <Container>
      <Box>
        <div>
          <ChHeader>
            <div className="ch-header">
              <img src={challengePin} alt="핀" />
              <h2>제휴 카페 "5곳" 방문하기 퀘스트</h2>
            </div>
          </ChHeader>        
          <ChBox>
          <div className="ch-box1">
            <p className="title">참여 방법</p>
            <p className="step">STEP 1</p>
            <p className="content">퀘스트를 신청하세요.</p>
            <p className="step">STEP 2</p>
            <p className="content">스위트킹덤 제휴 카페를 확인하세요.</p>
            <p className="step">STEP 3</p>
            <p className="content">해당하는 카페에 방문하세요.</p>
            <p className="step">STEP 4</p>
            <p className="content">인증 방법에 따라 인증하세요.</p>
          </div>
          </ChBox>
          <Confirm>
            <div className="ch-box2">
              <p className="title">퀘스트 인증 방법</p>
              <div className="content">
                <p>카페 직원에게 아이디를 알려주세요.</p>
                <p>마이페이지에서 스탬프가 찍혔는지 확인하면 완료!</p>
              </div>
            </div>
          </Confirm>
          <Btn>
            <div>
              <button onClick={openModal}>오늘부터 시작하기</button>
              <ChallnegeModal type={true} open={modalOpen} close={closeModal}>퀘스트 신청이 완료되었습니다.</ChallnegeModal>
            </div>
          </Btn>
        </div>
        <CafeIntro>
          <div>
            <Link to='/cafe' className="link_style">제휴 카페 알아보기</Link></div>
        </CafeIntro>
      </Box>
      
    </Container>
    </>
  );
};

export default ChallengeMain;