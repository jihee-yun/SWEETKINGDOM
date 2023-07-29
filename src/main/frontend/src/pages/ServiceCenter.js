import { useState, useContext } from "react";
import { styled } from "styled-components";
import Header from "../component/Header";
import ServiceHome from "../component/ServiceHome";
import Footer from "../component/Footer";
import Request from "../component/Request";
import ServiceQuestion from "../component/ServiceQuestion";
import { UserContext } from "../context/UserStore";
import Sidebar from "../component/Sidebar";

const Container = styled.div`
max-width: 1440px;
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
`;


const TabSetting = styled.div`
  width: 90%;
`;

const TabList = styled.ul`
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
  list-style:none;
  padding: 0;
  margin: 0 0 30px 0;
  border-bottom: 0.0625rem solid #e6e8ed;
  
`;

const TabItem = styled.div`
  text-align: center;
  cursor: pointer;
  outline: 0;
  font-size: 1.2rem;
  margin-right: 20px;
  margin-bottom: 20px;
  color: ${({ isActive }) => (isActive ? 'black' : '#9da1a8')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};


`;




const ServiceCenter = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabClickHandler=(index)=>{
      setActiveIndex(index)
    }
    const { isSidebar, setIsSidebar } = useContext(UserContext);
    
    const tabContArr=[
      {
        index: 0,
        tabTitle: "홈",
        tabCont: <ServiceHome />
      },
      {
        index: 1,
        tabTitle: "자주 묻는 질문",
        tabCont:<ServiceQuestion/>
      },
      {
        index: 2,
        tabTitle: "1:1 문의",
        tabCont: <Request/>
      }
    ];

    return(
        <>
        <Container>
            <Header/>
            <h1>고객센터</h1>
        <TabSetting>
        <TabList>
          {tabContArr.map((section, index)=>{
            return(
              <TabItem
                key={index}
                isActive={index === activeIndex} 
                onClick={()=>tabClickHandler(index)}
              >
                {section.tabTitle}
              </TabItem>
            )
          })}
        </TabList>

        <div>
          { tabContArr[activeIndex].tabCont }
        </div>
      </TabSetting>
      <Footer />
      {isSidebar && <Sidebar/>}
    </Container>
        
        </>
    )
}

export default ServiceCenter;