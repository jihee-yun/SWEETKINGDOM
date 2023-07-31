import {useState, navigate} from "react";
import { styled } from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1;
    position: relative;
    z-index: 0;
    * {
        box-sizing: border-box;
    }
`;

const Info = styled.div`
display: flex;
flex-direction: column;
width: 100%;
/* margin: 3.125rem auto 0; */
`

const InfoItem = styled.div`

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.5;
    color: #202225;
}
`;


const InfoTime = styled.div`
  display: block;
.number {
    font-size: 2rem;
    font-weight: 700;
    color: #202225;
    line-height: 1.5;
}
.desc {
    margin-top: 0.125rem;
    font-size: .875rem;
    color: #52565d;
    line-height: 1.45;
}

`;

const InfoText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #e6e8ed;
    padding: 2.5rem;
    border-radius: 0.375rem;
    height: 180px;

`;

const Button = styled.button`
margin-top: 10px;
display: flex;
align-items: center;
justify-content: center;
background-color: #ffffff;
width: 130px;
height: 60px;
padding: 0 0 0 0;
border-radius: 5px;
border: 1px solid #9da1a8;
background-color: #ffffff;
transition: background-color 0.3s, color 0.3s, border-color 0.1s;
white-space: pre-wrap;
font-weight: bold;

&:hover {
    cursor: pointer;
    background-color: #f7f7fa;    
  }

`;

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

const FaqList = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 2rem;

`;

const UserFaq = styled.div`
justify-content: space-between;

`;

const UserTitle = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #52565d;

    .h3 {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.5;
    color: #202225;
    }
`;

const ViewLink = styled(Link)`
 color: #52565d;
 font-size: .875rem;
 line-height: 1.5;
 display: flex;
 align-items: center;
 align-self: center;
 margin-left: 200px;
 margin-top: 10px;

    .a {
        text-decoration: none;
    }


`;


const ServiceHome = () => {
    const [keyword, setKeyword] = useState(""); // 검색어 입력을 위한 useState
    const navigate = useNavigate();

    const onChangeSearch = (e) => {
        setKeyword(e.target.value);
      };

    const swordPush = () => {
        navigate(`/qnasearch/${keyword}`);
      };

    const question = () => {
        navigate('/servicecenter', {state : 2})
    };

    return(
    <Container>
    <Info>
    <InfoItem>
        <div className="title"><h3>문의</h3></div> 
    <InfoText>
        <InfoTime>
            <h1 className="number">1588-0000 </h1>
            <p className="desc">월~금요일 10:00~17:00 (점심시간 12:00~13:30 / 주말,공휴일 제외)</p>
            </InfoTime>
            <Button className="btn" onClick={question} >1:1문의</Button>
    </InfoText>
    </InfoItem>
    </Info>

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

    {/* <FaqList>
     <UserFaq>
        <UserTitle>
          <h2>리뷰어 TOP5 FAQ</h2>
          <ViewLink to="/"> 전체보기 </ViewLink>
        </UserTitle>
     </UserFaq>
    <UserFaq>
        <UserTitle>
            <h2>사업자 TOP5 FAQ</h2>
            <ViewLink to="/"> 전체보기 </ViewLink>
        </UserTitle>
    </UserFaq>
    </FaqList> */}
 </Container>
    );
};
export default ServiceHome;