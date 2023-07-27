import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserStore";
import member from "../images/team.png";

const GuildSectionBox = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 430px) {
    width: 100%;
    height: 400px;
  }

  position: relative;
  margin-top: 50px;
  width: 45%;
  height: 210px;
  transition: all 0.3s;
  border-radius: 10px;
  box-shadow: 0 1px 2px #A4A4A4;
  cursor: pointer;

  &:hover{
    transform: scale(1.02);
  }

  .section1{
    @media (max-width: 430px) {
    flex-direction: column;
    }
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 25px;
  }

  .section2{
    @media (max-width: 430px) {
    width: 90%;
    margin-top: 30px;
    margin-left: 0;
    }
    width: 50%;
    margin-left: 30px;

    p{
      padding-left: 3px;
      font-weight: bold;
      font-size: .9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%; /* 원하는 글자 수에 맞게 조정 */
    }

    .intro{
      font-size: .8rem;
      font-weight: normal;
    }

    button{
      color: #7c7c7c;
      border: none;
      height: 25px;
      border-radius: 15px;
    }

    .guild-member-section{
      display: flex;
      height: 50px;
    }
  }

  .section3{
    width: 100%;
    display: flex;
    align-items: center;
    /* margin-top: 35px; */

    .count-section{
      position: absolute;
      right: 35px;
      bottom: 28px;
      display: flex;
      align-items: center;
      
      img{
        width: 25px;
        height: 25px;
        margin: 10px 0 0 25px;
      }
      p{
        margin-left: 10px;
        font-size: 1.0rem;
        font-weight: bold;
        color: darkgray;
      }
    }
  }
`;

const Thumb = styled.div`
    @media (max-width: 430px) {
    width: 90%;
    }
    width: 40%;
    height: 160px;
    border-radius: 5px;
    object-fit: cover;
    background-image: url(${props => props.$imageurl});
    background-size: cover;
    background-position: center;
`;

const Profile = styled.div`
    width: 50px;
    height: 50px;
    border: 3px solid white;
    border-radius: 50px;
    /* box-shadow: 1px 1px 1px lightgray; */
    margin-right: -15px;
    object-fit: cover;
    background-image: url(${props => props.$imageurl2});
    background-size: cover;
    background-position: center;
`;

const GuildSection = ({guildInfo}) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setGuildNum } = context;

  console.log(guildInfo);

  const selectGuild = (guildNum) => {
    setGuildNum(guildNum);
    localStorage.setItem("guildNum", guildNum);
    navigate('/guild/detail');
  }

  return(
    <>
    {guildInfo && guildInfo.map(guild => (
    <GuildSectionBox key={guild.id} onClick={() => selectGuild(guild.id)}>
      <div className="section1">
        <Thumb className="thum" $imageurl={guild.thumbnail} />
        <div className="section2">
          <button>{guild.region}</button> 
          <p>{guild.guildName}</p>
          <p className="intro">길드 한 줄 소개 소개 소개길드 한 줄 소개 소개 소개길드 한 줄 소개 소개 소개</p>
          <div className="section3">
          <div className="guild-member-section">
          {guild.memberProfileList.map((profile, index) => (
            <Profile key={index} className="guild-member" $imageurl2={profile} />
          ))}
          </div>
          <div className="count-section">
            <img src={member} alt="멤버" />
            <p>{guild.countMember + 1}/{guild.limitMember}</p>
          </div>
          </div>
        </div>
      </div>
      </GuildSectionBox>
      ))}
    </>
  );
};

export default GuildSection;