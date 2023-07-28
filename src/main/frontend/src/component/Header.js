import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import Logo from "../images/logo.png";
// import mobileLogo from "../images/.PNG";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import NavBar from "./NavBar";
import SearchIcon from '@mui/icons-material/Search';

const OutBox = styled.div`
max-width: 1440px;
margin: 0 auto;
  width: 100%;
`;

const HeaderContainer = styled.header`

 @media (max-width: 768px) {
  padding: 0;
  align-items: center;
    .logo{
      display: none;
    }
  }
  @media (min-width: 768px) {
    .logo2{
      display: none;
    }
  }
  padding: 1.8rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: 0 auto;
  height: 150px;
  z-index: 98;

  *{
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .logo {
    padding-left: 60px;
  }
  .logo2{
    padding-left: 20px;
    color: #FFCFDA;
    font-size: 1.5rem;
    font-weight: bold;
    .logo-box {
      display: flex;
      align-items: center;
    }
  }
  .mypage {
    margin-left: 10px;
    padding: 0;
    cursor: pointer;
    border: 0;
    background-color: white;
  }
    `;

const Rightbox = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  display: flex;

  .member {
    align-self: flex-start;
    padding-top: 30px;
    padding-right: 70px;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 13px;
    display: flex;
    a {
      text-decoration: none;
      color: #6e6e6e;
    }
  }
`;

const MobileBox = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  width: 99.8%;
  background-color: #FFCFDA;
  height: 40px;
`;
const HamburgerBtn = styled.button`
  margin-top: 5px;
  margin-right: 20px;
  /* margin-left: -10px; */
  padding: 0;
  color: darkgray;
  justify-content: center;
  /* align-items: center; */
  background-color: white;
  cursor: pointer;
  border:none;
`;

const SearchContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 50px;
`;

const SearchBar = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  input {
    font-size: .7rem;
    padding-left: 10px;
    width: 100%;
    height: 25px;
    border-radius: 20px;
    border: 1px solid lightgray;
    box-shadow: 1px 1px 3px lightgray;
    box-sizing: border-box;
    outline: none;
  }
`;

// const NavContainer = styled.nav `
//   width: 100%;
    
//   a {
//     text-decoration: none;
//     color: #646b8c;
//     position: relative;
//   }
//   .Nav {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 10px;
//     text-align: center;
//     padding-right: 20px;
//     height: 60px;
//   }
//   .search {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 10px;
//     width: 200px;
//   }
//   .search-bar {
//     width: 100%;
//     height: 30px;
//     border-radius: 40px;
//     border: solid #646b8c;
//     padding: 0 15px;
//   }
// `;
// const Navlink = styled(Link) `
//   width: 150px;
//   height: 40px;
//   line-height: 40px;
//   font-size: 1rem;
//   font-weight: bold;
//   color: white;

//   &:hover {
//     color: #000;    
//   }
//   .MyPage {
//     font-size: 2.5rem;
//   }
// `;


const Header = () => {
  const { isSidebar, setIsSidebar, isLogin, setIsLogin,  userName, setUserName, 
    setGrantType, setAccessToken,setRefreshToken, setUserNum, userAuthority, setUserAuthoruty}  = useContext(UserContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [keyword, setKeyword] = useState(""); // 검색어 입력을 위한 useState

  // 반응형 UI 적용
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 화면 크기가 768px 이하인 경우
    };
    window.addEventListener("resize", handleResize);
    // 초기 렌더링 시 한 번 호출
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onChangeCafeName = (e) => {
    setKeyword(e.target.value);
  };

  const swordPush = () => {
    navigate(`/cafesearch/${keyword}`);
  };


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
  
  return(
    <OutBox>
    {/* <MobileBox /> */}
      <HeaderContainer>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="로고" style={{width: "150px", height: "150px"}} />
          </Link>
        </div>
        <div className="logo2" onClick={() => navigate("/")}>
          <div className="logo-box">
            <img src={Logo} alt="로고" style={{width: "80px", height: "80px"}}/>
            {/* <p>SWEETKINGDOM</p> */}
          </div>
        </div>
        <Rightbox>
        {isLogin ? (
            <div className="member">
              <p>{userName}님</p>
              {userAuthority === 'ROLE_MEMBER' ? (
                <button className="mypage" onClick={() => navigate("/businesspage")}>회원정보</button>
              ) : (
                <button className="mypage" onClick={() => navigate("/mypage")}>회원정보</button>
              )}
              <button className="mypage" onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <div className="member">
              <Link to="/memberlogin" style={{ marginRight: "10px" }}>로그인</Link>
              <Link to="/membersignup">회원가입</Link>
            </div>
          )}
        </Rightbox>
        {isMobile && (
            <HamburgerBtn className="HamburgerBtn" onClick={() => setIsSidebar("0")}>
              <MenuIcon style={{ fontSize: 30, marginRight: 10 }} />
            </HamburgerBtn> 
          )}
        </HeaderContainer>
        <SearchContainer>
        {isMobile && (
        <SearchBar>
           <input
           type="text"
           className="search-bar"
           value={keyword}
           onChange={onChangeCafeName}
           placeholder="카페 이름 또는 메뉴를 검색해보세요"
          />
          <SearchIcon
            style={{ fontSize: 30, fill: "#FFCFDA" }}
            onClick={swordPush}
          />
        </SearchBar>
        )}
        </SearchContainer>  
        {!isMobile && (
        <NavBar />
        // <NavContainer>
        //   <ul className="Nav">
        //     <Navlink to="/cafe">카페 찾기</Navlink>
        //     <Navlink to="/guild">길드</Navlink>
        //     <Navlink to="/event">이벤트</Navlink>
        //     <Navlink to="/couponStore">상점</Navlink>
        //     <div className="search">
        //       <input
        //         type="text"
        //         className="search-bar"
        //         value={keyword}
        //         onChange={onChangeCafeName}
        //       />
        //       <SearchIcon
        //         style={{ fontSize: 30, marginRight: 10, fill: "#646b8c" }}
        //         onClick={swordPush}
        //       />
        //     </div>
        //   </ul>
        // </NavContainer>
      )}
    </OutBox>
  );
};

export default Header;