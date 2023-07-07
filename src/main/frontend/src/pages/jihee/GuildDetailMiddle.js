import React, { useEffect, useState } from "react";
import styled from "styled-components";
import cafeimg1 from "./images/카페임시이미지.jpeg";
import location from "./images/location.png";
import member from "./images/member.png";
import Modal from "./Modal";

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
      margin: 0 auto;
      object-fit: cover;
      background-size: cover;
      background-position: center;
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

  .join{
    width: 100%;
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: #FFCFDA;
    font-size: 1.2rem;
    font-weight: bold;
    color: #585858;
    margin-top: 30px;
    cursor: pointer;

    &:hover{
      color: white;
    }
  }
`;

const GuildDetailMiddle = ({guildNum, guildInfo}) => {
  const [modalOpen, setModalOpen] = useState(false);


  const memberModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return(
    <>
    {guildInfo && guildInfo.map(guild => (
    <Middle key={guild.id}>
        <div className="box">
        <p className="guild-content">  {guild.detailIntro.split("\n").map((line, index) => (
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
            <div style={{ backgroundImage: `url(${cafeimg1})`}} className="member-profile"></div>
            <br />
            <h4>함께 할 멤버들을 확인하고 길드에 가입해 보세요!</h4>
            <button onClick={memberModal}>전체 멤버 확인하기</button>
          </div>
        </div>
        <br /><br /><br />
        <div className="guide">
          <p>주요 안내사항</p>
          <div className="detailbox"><img src={member} alt="회원수" /><p>{guild.limitMember}</p></div>
          <div className="detailbox"><img src={location} alt="위치" /><p>{guild.region}</p></div>
        </div>
        </div>
        <button className="join">가입하기</button>
        <Modal open={modalOpen} type={false} close={closeModal} header="전체 멤버">

        </Modal>
      </Middle>
      ))}
    </>
  );
};

export default GuildDetailMiddle;