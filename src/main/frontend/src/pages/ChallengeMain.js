import React, { useContext, useState } from "react";
import styled from "styled-components";
import challengePin from "../images/challengePin.png"
import { Link, useLocation, useNavigate } from "react-router-dom";
import ChallnegeModal from "../component/ChallengeModal";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 430px) {
    width: 100%;
  }
`;

const Box = styled.div`
  width: 80%;
  margin: 0 auto;

  h2 {
    font-weight: bolder;

    @media (max-width: 430px) {
      font-size: 1.3rem;
    }
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
      width: 80%;
      height: 70px;
      border-radius: 40px;
      margin: 0 auto;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      @media (max-width: 430px) {
        font-size: 1rem;
      }
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
    font-size: 1.1rem;
    font-weight: bolder;
    cursor: pointer;

    @media (max-width: 430px) {
      width: 300px;
    }
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
    width: 80%;
    height: 100px;
    font-size: 1.1rem;
    font-weight: bolder;
    border: 3px solid #FFCFDA;
    border-radius: 20px;
    margin: 0 auto;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    @media (max-width: 430px) {
      p {
        font-size: 1rem;
      }
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
  const context = useContext(UserContext);
  const {isLogin, userNum, grantType, accessToken} = context;
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const info = location.state && location.state.editedInfo[0].id;
  const navigate = useNavigate();

  console.log(info);
  console.log(userNum);

  const applyChallenge = async() => {
    if (!isLogin) {
      navigate('/memberlogin');
      return;
    }
    const response = await AxiosApi.challengeApply(info, userNum, grantType, accessToken);
    if(response.status === 200 && response.data === true) {
      setModalOpen(true); 
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return(
    <>
    <Header />
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
            <p className="content">제휴 카페를 확인하세요.</p>
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
                <p>카페 직원에게 신청한 퀘스트 인증 페이지를 보여주세요</p>
                <p>직원이 확인해주면 완료!</p>
              </div>
            </div>
          </Confirm>
          <Btn>
            <div>
             <button onClick={applyChallenge}>오늘부터 시작하기</button>
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
    <Footer />
    </>
  );
};

export default ChallengeMain;