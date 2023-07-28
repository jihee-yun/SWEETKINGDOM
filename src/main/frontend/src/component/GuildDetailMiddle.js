import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import location from "../images/location.png";
import member from "../images/member.png";
import Modal from "../utils/Modal2";
import GuildMemberModal from "./GuildMemberModal";
import GuildJoinModal from "./GuildJoinModal";
import CompleteModal from "../utils/CompleteModal";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";

const Middle = styled.div`
  position: absolute;
  width: 100%;
  background-color: #FAFAFA;
  z-index: 0;
  
  .box{
    width: 80%;
    margin: 0 auto;
  }

  p{
    margin: 0 auto;
  }

  .member-box{

    p{
      font-size: .9rem;
      font-weight: bold;
      color: #7D5A5A;
    }

    .host-box{
      display: flex;
      align-items: center;
      h5, h6{
        margin: 0;
        padding: 5px;
      }
    }

    .host {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-fit: cover;
      background-image: url(${props => props.imageurl});
      background-size: cover;
      background-position: center;
      margin-right: 20px;
    }
  }

  .guild-content{
    padding-top: 250px;
  }

  .members{
    @media (max-width: 768px) {
     h4{
      font-size: .9rem;
     }
    }
    height: 200px;
    background-color: #FAF2F2;
    border-radius: 5px;
    margin-top: 30px;
    padding-top: 50px;
    text-align: center;

    .member-profile{
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-fit: cover;
      background-size: cover;
      background-position: center;
    }

    .profile-box {
      display: flex;
      justify-content: center;
      gap: 15px;
    }

    button{
      border: none;
      border-radius: 50px;
      width: 150px;
      height: 35px;
      font-size: .9rem;
      font-weight: bold;
      color: #585858;
      background-color: #FFCFDA;
      cursor: pointer;
      
      &:hover{
        color: white;
      }
    }
  }

  .guide{

    p{
      font-size: .9rem;
      font-weight: bold;
      color: #7D5A5A;
      margin-bottom: 10px;
    }

    img{
      width: 20px;
      height: 20px;
    }

    .detailbox{
      display: flex;
      align-items: flex-start;
      padding-top: 10px;

      p{
        margin: 0 0 0 10px;
        font-weight: bold;
        font-size: .8rem;
        color: black;
      }
    }
  }

  .join-button{
    .is-join, .limit-member, .join{
      width: 100%;
      height: 50px;
      border: none;
      border-radius: 5px;
      background-color: lightgray;
      font-size: 1rem;
      font-weight: bold;
      color: white;
      margin-top: 30px;
    } 
    .join{
      background-color: #FFCFDA;
      cursor: pointer;

      &:hover{
        color: white;
      }
    }
  }
`;

const GuildDetailMiddle = ({guildNum, guildInfo}) => {
  // const context = useContext(UserContext);
  // const { userNum, grantType, accessToken } = context;
  const navigate = useNavigate("");
  const [modalOpen, setModalOpen] = useState(null);
  const [isTrue, setIsTrue] = useState("");

  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken")
  const userNum = localStorage.getItem("userNum");

  // 인원 마감 버튼
  const { limitMember, memberNumList } = guildInfo[0];
  console.log(limitMember, memberNumList);
  const isJoinable = memberNumList.length < limitMember - 1;

  useEffect(() => {
    if(userNum) {
    const isMember = async() => {
      const response = await AxiosApi.isMemberGet(guildNum, userNum);
      if(response.status === 200) setIsTrue(response.data);
    }
    isMember();
    }
  },[guildNum, userNum]);

  const joinGuild = async() => {
    const response = await AxiosApi.joinGuild(guildNum, userNum, grantType, accessToken);
    if(response.data === true) {
      openModal("complete");
    } 
  }

  const complete = () => {
    if(userNum !== 0) {
      navigate(-1);
    } else navigate('/memberlogin')
  }

  const openModal = (type) => {
    setModalOpen(type);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  return(
    <>
    {guildInfo && guildInfo.map(guild => (
    <Middle key={guild.id}>
        <div className="box">
        <p className="guild-content">  
        {guild.detailIntro.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
        </p>
        <div className="member-box">
          <br /><br /><br /><br /><br />
          <p>멤버 소개</p>
          <br />
          <div className="host-box">
          <div className="host" style={{ backgroundImage: `url(${guild.leaderProfileList})` }}></div>
          <div className="host-intro">
          <h5>{guild.leaderId}</h5>
          <h6>{guild.leaderIntro}</h6>
          </div>
          </div>
          <div className="members">
            <div className="profile-box">
              {guild.memberProfileList.slice(0, 3).map(index => (
              <div key={index} style={{ backgroundImage: `url(${index})`}} className="member-profile"></div>
            ))}
            </div>
            <br />
            <h4>함께 할 멤버들을 확인하고 길드에 가입해 보세요!</h4>
            <button onClick={() => openModal("members")}>전체 멤버 확인하기</button>
          </div>
        </div>
        <br /><br /><br />
        <div className="guide">
          <p>주요 안내사항</p>
          <div className="detailbox"><img src={member} alt="회원수" /><p>{guild.limitMember}</p></div>
          <div className="detailbox"><img src={location} alt="위치" /><p>{guild.region}</p></div>
        </div>
        </div>
        <div className="join-button">
          {isTrue === 1 ? (<button className="is-join">이미 가입된 회원입니다</button>)
          : !isJoinable ? (
            <button className="limit-member">인원 마감</button>
          ) : (
            <button className="join" onClick={userNum !==0 ? () => openModal("join") : () => openModal("complete")}>가입하기</button>
          )}
        </div>
        <Modal move={modalOpen === "complete" ? true : false} open={modalOpen !== null} type={modalOpen === "join" ? true : false} confirm={modalOpen === "join" ? joinGuild : complete} close={closeModal} header={modalOpen === "join" ? "길드 가입" : modalOpen === "complete" ? "완료" : "전체 멤버"}>
          {modalOpen === "members" ? (
            <GuildMemberModal members={guild.memberProfileList} />
          ) : modalOpen === "join" ? (
            <GuildJoinModal />
          ) : modalOpen === "complete" ? (
            <CompleteModal content={userNum !== 0 ? "가입이 완료되었습니다": "로그인이 필요합니다. 로그인 페이지로 이동할까요?"} maxCharacters={userNum !== 0 ? 0 : 11}/>
          ) : null}
        </Modal>
      </Middle>
      ))}
    </>
  );
};

export default GuildDetailMiddle;