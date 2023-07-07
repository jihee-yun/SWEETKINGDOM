import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../now/component/Header";
import AxiosApi from "./api/AxiosApi";
import GuildSection from "./GuildSection";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 80%;
  margin: 0 auto;
  padding: 50px;
  box-sizing: border-box;
`;

const RegBox = styled.div`
  width: 100%;
  text-align: center;
  background-color: #FAFAFA;

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

  const [guildInfo, setGuildInfo ] = useState("");

  useEffect(() => {
    const guildInfo = async() => {
      const response = await AxiosApi.guildInfoGet("All");
      if(response.status === 200) setGuildInfo(response.data);
    }
    guildInfo();
  },[]);

  const moveToNewGuild = () => {
    navigate('/createguild');
  }

  return(
    <>
    <Header />
    <Container>
      <RegBox>
        <div className="context">
          <h1>일시적 모임을 통해</h1>
          <h1>원하는 목적을 달성해봐요</h1>
          <h3 className="context2">나와 같은 목적을 가진 <br />
              친구들을 직접 모집해보세요</h3>
        </div>
        <button onClick={moveToNewGuild}>길드 만들기</button>
      </RegBox>
      {/* <div className="middle-bar"></div> */}
      <GuildBox>
      <GuildSection guildInfo={guildInfo}/>
      </GuildBox>
    </Container>
    </>
  );
};

export default Guild;