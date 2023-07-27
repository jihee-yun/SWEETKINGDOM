import React from "react";
import styled from "styled-components";

const ModalBox = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;

const MemberBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
`;

const GuildMemberModal = ({members}) => {

  console.log(members);

  return(
    <>
    <ModalBox> 
      <Box>
      {members && members.map(index => (
        <MemberBox key={index} imageurl={index}></MemberBox>
      ))}
      </Box>
    </ModalBox>
    </>
  );
};

export default GuildMemberModal;