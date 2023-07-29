import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { styled } from "styled-components";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from "./Header";
import Footer from "./Footer";

const Container = styled.div`
max-width: 1440px;
margin: 0 auto;
`

const Box = styled.div`

margin-top: 2rem;
display: flex;
justify-content: space-between;
`;

const Question = styled.span`
font-weight: bold;
`;

const Button = styled.button`
background-color: #ffffff;
border: none;
align-items: center;
align-self: center;
`;

const Box2 = styled.div`
margin-top: 20px;
border-bottom: 1px solid #a5acb1;

`;

const Answer = styled.ul`
    display: flex;
    padding-bottom: 1.875rem;
    padding-left: 0;
    padding-right: 0;
    color: #33363b;
    cursor: pointer;

.answer {
  border-radius: 5px;
  line-height: 1.7;
  letter-spacing: -.05rem;
  white-space: pre-wrap;
  word-break: keep-all;
  color: #52565d;
  font-size: 1rem;
  padding: 1.875rem 1.5rem;
  background-color: #f7f7fa;
}

`;

const StatusBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  align-self: center;
  margin-top: 20px;
  width: 98%;
  height: 80px;
  color: #6E6E6E;
  font-weight: bold;
  border-bottom: solid #e6e8ed;
  border-bottom-width: thin;
`;

const FalseResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  font-weight: bold;
`;

const QnaSearchList = () => {
    const { keyword } = useParams();
    const [searchResult, setSearchResult] = useState("");
    const [isSearchResult, setIsSearchResult] = useState(false);
    const [isOpen, setIsOpen] = useState({});

    useEffect(() => {
        const search = async() => {
            try{
                const rsp = await AxiosApi.qnaSearchListLoad(keyword);
                setSearchResult(rsp.data);
                console.log(rsp);
                if(rsp.data.length > 0) {
                    setIsSearchResult(true);
                } else if(rsp.data.length === 0) {
                    setIsSearchResult(false);;
                }
            } catch(error) {
                console.error("검색결과 받아오기 실패", error);
            }
        };
        search();
    }, [keyword]);
      
    const questionOpen = (index) => {
      setIsOpen((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };



    return(
    <Container>
    <Header/>
    {isSearchResult ? (
      <>
    {searchResult.map((keyword, index) => (
      <div key={keyword.id}>
      <Box>
        <Question > {keyword.question}
          <Button onClick={() => questionOpen(index)}>
          {isOpen[index] ? <ExpandMoreIcon style={{fill: "gray"}}/> : <ExpandLessIcon style={{fill: "gray"}}/>}
        </Button> </Question>
      </Box>
      <Box2>
      <Answer style={{ display: isOpen[index] ? "block" : "none" }}>
        <div className="answer">{keyword.answer}</div>
      </Answer>
      </Box2>
      </div>
      ))}
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
    <Footer />
    </Container>
    )
}
export default QnaSearchList;