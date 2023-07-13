import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { styled } from 'styled-components';
import profile from '../images/leeknow.jpg';
import MenuIcon from '@mui/icons-material/Menu';




const SidebarContainer = styled.div`
  background-color: #202020;
  transition: 0.4s ease;
  height: 100%;
`

const SidebarTop = styled.div`
display: flex;
flex-direction: column;
`;

const Profile = styled.img`
 width: 200px;
  height: 200px;
  margin: 16px 16px 16px 16px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  align-self: center;
  @media screen and (max-width: 1024px) {
    margin-right: 16px;
  }

`

const Menu = styled.ul`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`  



const Sidebar = ({ width, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  
// button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };


  return (
      <SidebarContainer  style={{ transform: `translatex(${-xPosition}px)`}}>
      <button onClick={() => toggleMenu()}>
          {isOpen ? <span>X</span> : <MenuIcon /> }
      </button>
      <SidebarTop>
      <Profile src={profile}/>
      </SidebarTop>
      <Menu>
        <Link to="/cafe">카페 찾기</Link>
        <Link to="/guild">길드</Link>
        <Link to="/event">퀘스트</Link>
        <Link to="/couponStore">상점</Link>
      </Menu>
      </SidebarContainer>

  )
}

export default Sidebar;

