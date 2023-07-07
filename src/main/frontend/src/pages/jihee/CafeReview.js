import React from "react";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AvgStar from "./AvgStar";
import Star from "./Star";
import img2 from "./images/카페임시이미지.jpeg";
import img from "./images/카페4-4.jpeg";
import img1 from "./images/카페5-2.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
  @media (max-width: 430px) {
    width: 100%;
  }

  width: 50%;
  margin: 0 auto;

  .back{
    margin: 30px 0;
    color: darkgray;
    cursor: pointer;
  }

  hr {
    background-color: lightgray;
    border: .3px solid lightgray;
  }
`;

const Box = styled.div`
  width: 90%;
  margin: 0 auto;

  .top{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .write{
      height: 30px;
      border: none;
      border-radius: 5px;
      background-color: #FFCFDA;
      font-size: .8rem;
      font-weight: 700;
      cursor: pointer;

      &:hover{
        color: white;
      }
    }
  }
`;

const ReviewBox = styled.div`
  width: 100%;
`;

const MemberBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;

  .profile img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    background-image: url(${props => props.imageurl});
    background-size: cover;
    background-position: center;
  }

  .right{
    margin-left: 20px;
    line-height: 30px;
    font-size: .9rem;

    .id{
      margin-left: 3px;
      font-size: .7rem;
    }
  }
`;

const Content = styled.div`
 width: 100%;
 margin-top: 20px;
 p{
  font-size: .9rem;
  padding-left: 10px;
 }
 
`;

const Img = styled.div`
  @media (max-width: 430px) {
    flex-direction: column;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
 width: 100%;
 display: flex;
 gap: 20px;

 .photo img{
  width: 100%;
  height: 314px;
  margin-top: 20px;
  object-fit: cover;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
 }
`;

const CafeReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state;
  const cafeNum = info[0].id;

  console.log(info);
  console.log(cafeNum);
  const star = 5;
  
  const prevPage = () => {
    navigate(-1);
  }

  return(
    <>
    <Container>
    <Box>
    <div className="back" onClick={prevPage}><ArrowBackIosIcon style={{width: "18px", height: "18px"}}/></div>
    <br /><br />
    <div className="top">
    <AvgStar star={star}/>
    <Link to={{ pathname: "/cafe/review/write", state: { cafeNum: cafeNum } }} style={{ textDecoration: "none", color: "inherit"}}>
    <button className="write">후기 작성</button></Link>
    </div>
    <br /><br /><br />
    <ReviewBox>
      <MemberBox>
        <div className="profile"><img src={img2} alt="프사" /></div>
        <div className="right">
          <div className="star"><Star /></div>
          <div className="id"><span>jihee1025&nbsp;&nbsp;&nbsp;2023-06-29</span></div>
        </div>
      </MemberBox>
      <Content><p>커피가 맛있어여..</p></Content>
      <Img>
      <div className="photo" imageurl={img}><img src={img} alt="이미지" /></div>
      <div className="photo" imageurl={img}><img src={img1} alt="이미지" /></div>
      </Img>
      <br /><hr />
    </ReviewBox>
    </Box>
    </Container>
    </>
  );
};

export default CafeReview;