import {useState, navigate} from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from "react-router-dom";


const NavContainer = styled.nav`
    display: flex;
    justify-content: center;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    box-shadow: 0 10px 10px rgba(159, 162, 177, .8);
    border-radius: 40px;
    height: 60px;
    width: 100%;
    max-width: 1000px;
  }

  li:not(:last-child) {
    margin-right: 20px;
  }

  a {
    display: block;
    font-size: 20px;
    font-weight: bold;
    color: #848484;
    text-decoration: none;
    padding: 7px 15px;
    transition: all .35s ease-in-out;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 200px;
  }
  .search-bar {
    width: 100%;
    height: 30px;
    border-radius: 40px;
    border: solid #646b8c;
    padding: 0 15px;
  }
`;

const StyledTarget = styled.div`
  position: absolute;
  border-bottom: 4px solid transparent;
  z-index: -1;
  transform: translateX(-60px);
  transition: transform var(--line-transition-duration) var(--line-easing);
`;

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [targetStyle, setTargetStyle] = useState({});
  const [keyword, setKeyword] = useState(""); // 검색어 입력을 위한 useState
  const navigate = useNavigate();
  const fixedColor = "#FFD0E4";

  const links = [
    { text: "카페 찾기", url: "/cafe" },
    { text: "길드", url: "/guild" },
    { text: "이벤트", url: "/event" },
    { text: "상점", url: "/couponStore" },
  ];


  const onChangeCafeName = (e) => {
    setKeyword(e.target.value);
  };

  const swordPush = () => {
    navigate(`/cafesearch/${keyword}`);
  };

  function mouseenterFunc(index, e) {
    e.preventDefault();
    if (index !== activeIndex) {
      setActiveIndex(index);

      const { width, height, left, top } = e.target.getBoundingClientRect();
      const color = fixedColor; // 고정된 컬러 값을 사용하도록 변경

      setTargetStyle({
        width: `${width}px`,
        height: `${height}px`,
        left: `${left + window.pageXOffset}px`,
        top: `${top + window.pageYOffset}px`,
        borderColor: color,
        transform: "none"
      });
    }
  }


  function resizeFunc() {
    if (activeIndex !== null) {
      const activeLink = document.querySelector(`.mynav li:nth-child(${activeIndex + 1}) a`);
      if (activeLink) {
        const { left, top } = activeLink.getBoundingClientRect();
  
        setTargetStyle(prevStyle => ({
          ...prevStyle,
          left: `${left + window.pageXOffset}px`,
          top: `${top + window.pageYOffset}px`
        }));
      }
    }
  }

  window.addEventListener("resize", resizeFunc);

  return (
    <NavContainer>
      <ul className="Nav">
        {links.map((link, index) => (
          <div
            key={index}
            className={index === activeIndex ? "active" : ""}
            onMouseEnter={(e) => mouseenterFunc(index, e)}
            style={{marginRight:"40px"}}
          >
          <Link to={link.url}>{link.text}</Link>
          </div>
        ))}
        <div className="search">
          <input
            type="text"
            className="search-bar"
            value={keyword}
            onChange={onChangeCafeName}
          />
          <SearchIcon
            style={{ fontSize: 30, marginRight: 10, fill: "#646b8c" }}
            onClick={swordPush}
          />
        </div>
      </ul>
      <StyledTarget style={targetStyle} />
    </NavContainer>
  );
};

export default NavBar;