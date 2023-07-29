import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AvgStar from "../component/AvgStar";
import Star from "../component/Star";
import CafeReviewFilter from "../component/CafeReviewFilter";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import dot from "../images/dots.png";
import CafeReviewModal from "../component/CafeReviewModal";
import CafeReviewLike from "../component/CafeReviewLike";
import Modal from "../utils/Modal2";
import CompleteModal from "../utils/CompleteModal";
import { UserContext } from "../context/UserStore";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Sidebar from "../component/Sidebar";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
  @media (max-width: 430px) {
    width: 100%;
  }
  max-width: 1440px;
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

const Bar = styled.div`
  position: relative;
  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const CafeReview = () => {
  const context = useContext(UserContext);
  const { isSidebar } = context;
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state;
  const cafeNum = info[0].id;
  const userNum = localStorage.getItem("userNum");
  // const userNum = parseInt(userNumStr);

  // 특정 카페 리뷰 조회
  const [cafeReviewInfo, setCafeReviewInfo] = useState("");
  // 모달창 상태값 
  const [isModalVisible, setModalVisible] = useState(false);
  // 특정 리뷰 값만 모달창 오픈
  const [openReviewId, setOpenReviewId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [category, setCategory] = useState("최신순");

  localStorage.setItem("reviewCategory", category);
  const selectCategory = localStorage.getItem("reviewCategory");

  console.log(userNum);

  useEffect(() => {
    const cafeReview = async() => {
      const response = await AxiosApi.cafeReviewGet(cafeNum, selectCategory);
      if(response.status === 200) setCafeReviewInfo(response.data);
    };
    cafeReview();
  }, [cafeNum, selectCategory]);
  
  // 평균 별점 점수 전달
  const star = cafeReviewInfo.length > 0 ? cafeReviewInfo[0].avgScore : 0;
  const count = cafeReviewInfo.length > 0 ? cafeReviewInfo[0].countReview : 0;
  
  const prevPage = () => {
    navigate(-1);
  };

  const sendCafeNum = () => {
    if(userNum) {
      navigate('/cafe/review/write', {state : {cafeNum}});
    } else {
      completeModal(true);
    }
  };

  const modalOpen = (id) => {
    setModalVisible(!isModalVisible);
    setOpenReviewId(id);
  };

  const closeModal = () => {
    setOpenReviewId(null);
    completeModal(false);
  };
  
  const completeModal = (isOpen) => {
    setDeleteModalOpen(isOpen);
  };

  const complete = (index) => {
    if(index === 1) {
      navigate(-1);
    } else navigate('/memberlogin')
  };

  const categoryChange = (e) => {
    setCategory(e);
    localStorage.setItem("reviewCategory", e);
  }

  return(
    <>
    <Header />
    {isSidebar && <Sidebar />}
    <Container>
    <Box>
    <div className="back" onClick={prevPage}><ArrowBackIosIcon style={{width: "18px", height: "18px", marginLeft:"5px"}}/></div>
    <br /><br />
    <div className="count-review"><p>총 {count}개의 후기</p></div>
    <div className="top">
    <AvgStar avgStar={star}/>
    <button className="write" onClick={sendCafeNum}>후기 작성</button>
    </div>
    <CafeReviewFilter onClickCategory={categoryChange}/>
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
      {review.userNum === userNum && <img src={dot} alt="메뉴바" />}
      {isModalVisible && openReviewId === review.id && (
        <CafeReviewModal reviewInfo={cafeReviewInfo} id={review.id} cafeNum={cafeNum} onClose={closeModal} isModalOpen={completeModal} />
      )}
      </Bar>
      </div>
      <Content><p>{review.content}</p></Content>
      <Img>
      {review.url1 && <Photo className="photo" imageurl={review.url1}></Photo>}
      {review.url2 && <Photo className="photo" imageurl={review.url2}></Photo>} </Img>
      <CafeReviewLike memNum={userNum} reviewId={review.id} likeCount={review.likeCount}/>
      <br /><hr />
    </ReviewBox>
     ))}
    </Box>
    <Modal move={true} header="완료" open={isDeleteModalOpen} confirm={userNum ? () => complete(1) : () => complete(2)} close={closeModal}>
      <CompleteModal content={userNum ? "리뷰가 삭제되었습니다" : "로그인이 필요합니다. 로그인 페이지로 이동할까요?"} maxCharacters={userNum ? 0 : 11}/>
    </Modal>
    </Container>
    <Footer />
    </>
  );
};

export default CafeReview;