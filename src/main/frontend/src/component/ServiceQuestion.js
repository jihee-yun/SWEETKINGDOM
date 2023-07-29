import { useState, navigate } from "react";
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import UserQna from "./UserQna";
import BusinessQna from "./BusinessQna";
import { useNavigate } from "react-router-dom";
import QnaSearchList from "./QnaSearchList";

const Fnq = styled.div`
margin-top: 2rem;

`;

const Search = styled.div`
margin-top: 1rem;
padding: 1.875rem 2.5rem;
background-color: #f7f7fa;
border-radius: 0.375rem;
    `;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 0.25rem;
    background-color: #ffffff;
    border: 0.0625rem solid #e6e8ed;

    .search-bar {
    border: none;
    background-color: transparent;
    width: 100%;
    padding-bottom: 0.0625rem;
    border-radius: 0.25rem;
    flex: 1;
    margin-top: -0.0625rem;
    margin-bottom: -0.0625rem;

    }

`;

const Box = styled.div`
margin-top: 2rem;
width: 100%;
`;

const TabSetting = styled.div`
width: 100%;
display: flex;
justify-content: center;
flex-direction: column;
`;

const TabList = styled.div`
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: relative;
  list-style:none;
  padding: 0;
  margin: 0 0 30px 0;
  border-bottom: 1px solid black;
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


const ServiceQuestion = () => {

  const [keyword, setKeyword] = useState(""); // 검색어 입력을 위한 useState
  const navigate = useNavigate();

  const onChangeSearch = (e) => {
      setKeyword(e.target.value);
    };

  const swordPush = () => {
      navigate(`/qnasearch/${keyword}`);
    };

  const [activeIndex, setActiveIndex] = useState(0);
  const tabClickHandler=(index)=>{
      setActiveIndex(index)
    }

    const tabContArr=[
      {
        index: 0,
        tabTitle: "사용자",
        tabCont: <UserQna />
      },
      {
        index: 1,
        tabTitle: "사업자",
        tabCont: <BusinessQna />
      }
    ];

    return(
    <>
   <Fnq>
    <h2>FAQ 검색</h2>
    <Search>
    <SearchBar>
        <input type="text" className="search-bar" placeholder="궁금하신 내용을 검색해 보세요."
               value={keyword}
               onChange={onChangeSearch}
              /> <SearchIcon style={{ fontSize: 30, marginRight: 10 }}
                            onClick={swordPush}
              />
    </SearchBar>
    </Search>        
    </Fnq> 
    
     
    <Box>
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
      </Box>
  
    </>
    );
};
export default ServiceQuestion;