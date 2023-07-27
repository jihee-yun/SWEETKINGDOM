import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import Header from "../component/Header";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  /* padding: 50px; */

  button{
    position: absolute;
    left: 20px;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 70px;
    height: 35px;
    margin: 50px 0 30px 0;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
    font-weight: 600;
    color: black;
    cursor: pointer;
  }

  img{
    width: 15px;
    height: 15px;
  }
`;

const Box = styled.div`
  @media (max-width: 768px) {
    justify-content: center;
  }
  position: relative;
  width: 100%;
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  grid-gap: 25px;
  align-items: center;
  padding-top: 50px;
  margin-top: 100px;
`;

const CafeBox = styled.div`
  height: 300px;
  margin: 30px 15px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  border-radius: 10px;
  box-shadow: 0 3px 3px #A4A4A4;
  cursor: pointer;

  &:hover{
    transform: scale(1.02);
  }

  .background {
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,.7) 50%, rgba(0,0,0,0) 100%);
  }

  .content {
    position: absolute;
    padding: 20px;
    bottom: -20px;
    color: white;

    .intro{
      height: 45px;
    }
    
    p {
      font-weight: bold;
      &:nth-child(1) {
        font-size: .7rem;
        text-decoration: underline #FFCFDA 3px;
        text-underline-offset: 5px;
      }
      &:nth-child(2) {
        color: #FFCFDA;
        font-size: .9rem;
      }
      &:nth-child(3) {
        font-size: 1.1rem;
      }
    }
  }
`;

const Thumb = styled.div`
  width: 100%;
  height: 100%;
  object-fit: fit;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
`;

const StatusBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  align-self: center;
  padding-left: 32px;
  margin: 16px 0 16px 0;
  width: 98%;
  height: 80px;
  background: #FFD0E4;
  color: white;
  border-radius: 5px;
`;

const FalseResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
`;

const CafeSearch = () => {
    const navigate = useNavigate();
    const { keyword } = useParams();
    const [searchResult, setSearchResult] = useState("");
    const [isSearchResult, setIsSearchResult] = useState(false);
    const context = useContext(UserContext);
    const { setCafeNum } = context; 

    useEffect(() => {
        const search = async () => {
            try{
                const rsp = await AxiosApi.searchListLoad(keyword);
                setSearchResult(rsp.data);
                console.log(rsp);
                if(rsp.data.length > 0){
                    setIsSearchResult(true);
                } else if (rsp.data.length === 0) {
                    setIsSearchResult(false);
                }
            } catch (error) {
                console.error("검색결과 받아오기 실패", error);
            }
        };
        search();
    }, [keyword]);

    const cardClick = (cafeNum) => {
      setCafeNum(cafeNum);
    localStorage.setItem("cafeNum", cafeNum);
    navigate('/cafe/detail');
    };



return(
  <>
  <Header />
  <Container>
    {isSearchResult ? (
      <>
       <StatusBox>
              <p>{searchResult.length} 개의 검색 결과가 있습니다.</p>
       </StatusBox>
       <Box>
      {searchResult.map(e => (
         <CafeBox key={e.id}
         onClick={() => cardClick(e.id)}>
         <Thumb className="img" imageurl={e.thumbnail}/>
         <div className="background"></div>
          <div className="content">
            <p>{e.region}</p>
            <p>{e.cafeName}</p>
            <p className="intro">{e.intro}</p> 
         </div>
        </CafeBox>
      ))}
    </Box>
      </>
    ) : (
      <>
      <StatusBox>
        <p>{searchResult.length} 개의 검색 결과가 있습니다.</p>
      </StatusBox>
      <FalseResult>
        <span>검색 결과가 존재하지 않습니다.</span>
      </FalseResult>
    </>
    )}
  </Container>
  </>
   
    );
};
export default CafeSearch;