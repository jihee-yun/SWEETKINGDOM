import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { styled } from 'styled-components';
import profile from '../images/leeknow.jpg';
import { UserContext } from '../../../context/UserStore';
import CloseIcon from '@mui/icons-material/CloseOutlined';

const Container = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 100%;
  display: none;
  position: fixed;
  right: -300px;
  transition: right 0.3s ease-in-out;
  flex-direction: column;
  padding: 25px;
  border-radius: 10px;
  background: rgb(223, 214, 210, 0.9);
  z-index: 11;
  &.active {
    right: 0px;
  }
`
const SideBarTop = styled.div`
  display: flex;
  justify-content: flex-end;
  .xButton {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 3px;
    display: flex;
    color: black;
    justify-content: center;
    align-items: center;
    &:active {
      background: rgb(193, 159, 138);
      color: white;
    }
  }
`;

const Profile = styled.img`
width: 200px;
  height: 200px;
  margin: 16px 16px 16px 16px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  align-self: center;
`

const Menu = styled.div`
width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`  

const Side = styled.ul`
  .show-menu{
width: 376px;
height: 500px;
position: absolute;
left: 0px;
transition: 1s;
}

.hide-menu{
width: 376px;
height: 500px;
position: absolute;
left: -376px;
transition: 1s;
}
`;




const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);



  return (
    <Container> 
      <SideBarTop>
        <button className="xButton" onClick={() => setShowSidebar(false)}>
          <CloseIcon />
        </button>
      </SideBarTop>
      <Profile src={profile}></Profile>
      <Menu>
        <Link to="/cafe">카페 찾기</Link>
        <Link to="/guild">길드</Link>
        <Link to="/event">퀘스트</Link>
        <Link to="/couponStore">상점</Link>
      </Menu>
    </Container>
  )
}

export default Sidebar;