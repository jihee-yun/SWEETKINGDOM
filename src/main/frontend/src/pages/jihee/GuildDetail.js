import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context/UserStore";
import GuildDetailMiddle from "./GuildDetailMiddle";
import AxiosApi from "./api/AxiosApi";
import logo from "./images/logo.png";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 50%;
  margin: 0 auto;
  position: relative;
`;

const Top = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const Logo = styled.img`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 80px;
  height: 80px;
  z-index: 2;
  cursor: pointer;
`;

const Box = styled.div`
  width: 100%;
  margin: 0 auto;
  position: absolute;
  z-index: 1;

  .box{
    position: relative;
    width: 95%;
    margin: 0 auto;
    height: 170px;
    border-radius: 10px;
    background-color: white;
    margin-top: -30px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    .content{
      padding-top: 65px;
      
      button{
        height: 25px;
        border: none;
        border-radius: 10px;
        font-weight: bold;
        background-color: #FFCFDA;
      }
    }
  }
`;

const Thumb = styled.div`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const HostProfile = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  z-index: 2;
  top: calc(100% - 220px); 
  left: calc(50% - 50px); 
  object-fit: cover;
  background-image: url(${props => props.imageurl2});
  background-size: cover;
  background-position: center;
`;

const GuildDetail = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { guildNum } = context;

  const [detailInfo, setDetailInfo] = useState("");

  useEffect(() => {
    const detailInfo = async() => {
      const response = await AxiosApi.guildDeInfoGet(guildNum);
      if(response.status === 200) setDetailInfo(response.data);
    };
    detailInfo();
  },[guildNum]);

  console.log(guildNum);
  console.log(detailInfo);

  return(
    <>
    {detailInfo && detailInfo.map(guild => (
    <Container key={guild.id}>
      <Top>
        <Thumb className="img" imageurl={guild.thumbnail} />
        <Link to="/guild" style={{ textDecoration: "none", color: "inherit"}}><Logo src={logo} alt="스위트킹덤로고" /></Link>
      </Top>
      <Box>
        <div className="box">
          <div className="content">
          <button>방장</button>
          <h2>{guild.guildName}</h2>
          </div>
        </div>
        <HostProfile className="host-profile" imageurl2={guild.leaderProfileList}></HostProfile>
      </Box>
      <GuildDetailMiddle guildNum={guildNum} guildInfo={detailInfo}></GuildDetailMiddle>
    </Container>
    ))}
    </>
  );
};

export default GuildDetail;