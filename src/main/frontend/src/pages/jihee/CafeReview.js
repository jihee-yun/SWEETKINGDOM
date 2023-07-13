import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AvgStar from "./AvgStar";
import Star from "./Star";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "./api/AxiosApi";
import like from "../jihee/images/like1.png";
import dot from "../jihee/images/dots.png";
import CafeReviewModal from "./CafeReviewModal";

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

  .count-review {
    margin-left: 5px;
    font-size: .8rem;
    font-weight: bold;
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
  margin-top: 50px;
  .review-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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
  @media (max-width: 768px) {
    flex-direction: column;
  }
 width: 100%;
 display: flex;
 gap: 20px;
`;

const Photo = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
  width: 50%;
  height: 314px;
  margin-top: 20px;
  object-fit: cover;
  background-image: url(${props => props.imageurl});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const Like = styled.div`
  margin-top: 20px;
  width: 10%;

  button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 60px;
    height: 25px;
    background-color: white;
    border: .5px solid lightgray;
    border-radius: 15px;
    box-shadow: 0px 1px 1px lightgray;
    cursor: pointer;
  }

  img {
    width: 12px;
    height: 12px;
  }
`;

const Bar = styled.div`
  position: relative;
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const CafeReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state;
  const cafeNum = info[0].id;

  // 특정 카페 리뷰 조회
  const [cafeReviewInfo, setCafeReviewInfo] = useState("");
  // 모달창 상태값 
  const [isModalVisible, setModalVisible] = useState(false);
  // 특정 리뷰 값만 모달창 오픈
  const [openReviewId, setOpenReviewId] = useState(null);

  const memNum = 3; // 여기에 이제 로그인 된 회원번호 받아오기
  console.log(cafeReviewInfo);

  useEffect(() => {
    const cafeReview = async() => {
      const response = await AxiosApi.cafeReviewGet(cafeNum);
      if(response.status === 200) setCafeReviewInfo(response.data);
    };
    cafeReview();
  }, [cafeNum]);
  
  // 평균 별점 점수 전달
  const star = cafeReviewInfo.length > 0 ? cafeReviewInfo[0].avgScore : 0;
  const count = cafeReviewInfo.length > 0 ? cafeReviewInfo[0].countReview : 0;
  
  const prevPage = () => {
    navigate(-1);
  };

  const sendCafeNum = () => {
    navigate('/cafe/review/write', {state : {cafeNum}});
  };

  const modalOpen = (id) => {
    setModalVisible(!isModalVisible);
    setOpenReviewId(id);
  };

  const closeModal = () => {
    setOpenReviewId(null);
  };

  const changeLikeCount = (id) => {
    console.log(id);
  }

  return(
    <>
    <Container>
    <Box>
    <div className="back" onClick={prevPage}><ArrowBackIosIcon style={{width: "18px", height: "18px"}}/></div>
    <br /><br />
    <div className="count-review"><p>총 {count}개의 후기</p></div>
    <div className="top">
    <AvgStar avgStar={star}/>
    <button className="write" onClick={sendCafeNum}>후기 작성</button>
    </div>
    {cafeReviewInfo && cafeReviewInfo.map(review =>(
    <ReviewBox key={review.id}>
      <div className="review-top">
      <MemberBox>
        <div className="profile"><img src={review.profile} alt="프사" /></div>
        <div className="right">
          <div className="star"><Star star={review.score} /></div>
          <div className="id"><span>{review.userId}&nbsp;&nbsp;&nbsp;{review.writtenDay}</span></div>
        </div>
      </MemberBox>
      <Bar onClick={() => modalOpen(review.id)}>
      {review.userNum === memNum && <img src={dot} alt="메뉴바" />}
      {isModalVisible && openReviewId === review.id && (
        <CafeReviewModal reviewInfo={cafeReviewInfo} id={review.id} cafeNum={cafeNum} onClose={closeModal} />
      )}
      </Bar>
      </div>
      <Content><p>{review.content}</p></Content>
      <Img>
      {review.url1 && <Photo className="photo" imageurl={review.url1}></Photo>}
      {review.url2 && <Photo className="photo" imageurl={review.url2}></Photo>} </Img>
      <Like onClick={() => changeLikeCount(review.id)}><button><img src={like} alt="좋아요" /><p>{review.likeCount}</p></button></Like>
      <br /><hr />
    </ReviewBox>
     ))}
    </Box>
    </Container>
    </>
  );
};

export default CafeReview;