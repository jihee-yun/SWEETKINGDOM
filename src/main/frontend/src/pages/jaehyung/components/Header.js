import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Head = styled.div`
  width: 100%;
  height: 200px;
  background-color: #F3E1E1;
  cursor: pointer;
  
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.8s ease-in-out;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
`;

const Header = () => {
  const navigate = useNavigate();
  
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const styleTags = Array.from(
      document.querySelectorAll('style[data-styled="true"]')
    );

    const showStyleTags = () => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        const currentTag = styleTags[currentIndex];

        if (currentTag) {
          currentTag.setAttribute("data-loaded", "true");
          currentIndex++;
        
          if (currentIndex >= styleTags.length) {
            clearInterval(interval);
            setLoaded(true);
          }
        } else {
          clearInterval(interval);
          setLoaded(true);
        }
        
      }, 200); // 각 스타일 태그가 표시되는 시간 간격 (200ms)
    };
    showStyleTags();
  }, []);

  return (
    <>
      <Head onClick={()=> navigate("/mypage")} loaded={loaded}>상단</Head>
    </>
  );
};
export default Header;