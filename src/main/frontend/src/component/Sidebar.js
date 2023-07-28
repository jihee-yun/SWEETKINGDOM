import { useContext, navigate, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import profile from '../images/leeknow.jpg';
import { UserContext } from "../context/UserStore";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AxiosApi from '../api/AxiosApi';
import user from '../images/user2.png';


const SidebarContainer = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 100%;
  position: fixed;
  top: 0;
  right: ${(props) => props.Xlocation};
  transition: 0.4s ease;
  display: flex;
  flex-direction: column;
  padding: 25px;
  border-radius: 10px;
  background: #F2F2F2;
  z-index: 100;
  background-color: #F8E0E6;

  /* &.active {
    right: 0px;
    trans
  } */
`;
const SidebarTop = styled.div`
  display: flex;
  justify-content: flex-end;
  .xButton {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 3px;
    display: flex;
    color: black;
    align-items: center;
    background-color: #F8E0E6;
    cursor: pointer;

    &:active {
      color: white;
    }
  }
  
`;

const ProfileBox = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  .userName {
    align-self: center;
    cursor: pointer;
    font-weight: bold;
    font-size: 14px;
  }
`

const LogoutBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const LoginBox = styled.div`
    width: 180px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    background-color: #e47e7e;
    border-radius: 2.7rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .login {
    position: relative;
    align-self: center;
    cursor: pointer;
    color: white;
    text-decoration: none;
    }

`

const Profile = styled.img`
  width: 200px;
  height: 200px;
  margin: 16px 16px 16px 16px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  align-self: center;

`


const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style:none;
`  
const NavLink = styled(Link) `
  text-decoration: none;
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: bold;
  color: inherit;
  align-self: center;
  color: #585858;
  &:hover {
    color: white;
  }
`

const Sidebar = () => {
  const { isSidebar, setIsSidebar, isLogin, setIsLogin,  userName, setUserName, 
    setGrantType, setAccessToken,setRefreshToken, userNum, setUserNum, userAuthority, setUserAuthoruty}  = useContext(UserContext);
    const [sideBarInfo, setSideBarInfo] = useState([]);
    const navigate = useNavigate();

  // 로그아웃 버튼 누르면 함수 실행
  const handleLogout = () => {
    setGrantType("");
    setAccessToken("");
    setRefreshToken("");
    setUserNum(0);
    setUserName("");
    setUserAuthoruty("");
    setIsLogin(false);

    // 로컬스토리지에서 제거
    localStorage.removeItem("grantType");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userNum");
    localStorage.removeItem("userName");
    localStorage.removeItem("userAuthority");
    localStorage.removeItem("isLogin");
    
    navigate("/");
  }

  useEffect(() => {
    const getSidebarInfo = async (memberNum) => {
      if(isSidebar && isLogin) {
        const memInfo = await AxiosApi.getMemberInfo(memberNum);
        setSideBarInfo(memInfo.data);
        console.log(memInfo);
      } else {
        setSideBarInfo([]);
      }
    };
    getSidebarInfo(userNum)

    console.log(sideBarInfo);
    
  }, [isSidebar, isLogin]);

  const closeSideBar = () => {
    setIsSidebar('-380px');
  }

  return (

      <SidebarContainer  Xlocation={isSidebar}>
      <SidebarTop>
      <button className="xButton" onClick={() => setIsSidebar("-300px")}>
          <CloseRoundedIcon />
        </button>
      </SidebarTop>
      {isLogin ? (
        <>
      <ProfileBox>
      {userAuthority === 'ROLE_MEMBER' ? (
                <div className="profile" onClick={() => navigate("/businesspage")}> <Profile src={profile}/></div>
              ) : (
                <div className="profile" onClick={() => navigate("/mypage")}> <Profile src={profile}/></div>
              )}
      {userAuthority === 'ROLE_MEMBER' ? (
                <div className="userName" onClick={() => navigate("/businesspage")}>{userName}님</div>
              ) : (
                <div className="userName" onClick={() => navigate("/mypage")}>{userName}님</div>
              )}
      </ProfileBox>
            <Menu>
            <NavLink to="/cafe" onClick={closeSideBar}>카페 찾기</NavLink>
            <NavLink to="/guild" onClick={closeSideBar}>길드</NavLink>
            <NavLink to="/event" onClick={closeSideBar}>이벤트</NavLink>
            <NavLink to="/couponStore" onClick={closeSideBar}>상점</NavLink>
          </Menu> 
          <LogoutBox>
          <LoginBox>
              <div onClick={handleLogout} className="login">로그아웃</div>
          </LoginBox>   
          </LogoutBox>

          </> 
      ) : (
        <>
        <ProfileBox>
        <Profile src={user}/>
        <LoginBox>
              <Link to="/memberlogin" className="login">로그인</Link>
          </LoginBox> 
        </ProfileBox>
                    <Menu>
                    <NavLink to="/cafe" onClick={closeSideBar}>카페 찾기</NavLink>
                    <NavLink to="/guild" onClick={closeSideBar}>길드</NavLink>
                    <NavLink to="/event" onClick={closeSideBar}>이벤트</NavLink>
                    <NavLink to="/couponStore" onClick={closeSideBar}>상점</NavLink>
                  </Menu> 
       </>
        
      )}
      </SidebarContainer>
     

  );
};

export default Sidebar;