import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import like from "../images/like.png";
import star from "../images/star.png";
import ConfirmModal from "./ConfirmModal";

const ManageReviewBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-top: 30px;
    padding: 20px;

    h2 {
        color: #FFCFDA;
        font-weight: bolder;
        margin-top: -20px;
    }

    .logo {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        margin-top: -10px;
        cursor: pointer;
    }

    .logo img {
        width: 150px;
        height: 130px;
    }

    .board {
        font-family: Arial, sans-serif;
        border-collapse: collapse;
        margin-top: -5px;
        width: 45%;
        margin-left: 50px;
    }

    .board th,
    .board td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
        font-weight: bolder;
    }

    .board th {
        background-color: #f2f2f2;
        text-align: center;
    }

    .board tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    .board tr:hover {
        background-color: #ddd;
    }

    .reviewNum {
        width: 60px;
        height: 30px;
    }

    .cafeNum {
        width: 80px;
        height: 30px;
    }

    .date {
        width: 80px;
        height: 30px;
    }

    .selectBtn {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        margin-bottom: 20px;
    }

    .btn {
        padding: 10px 20px;
        border: none;
        color: black;
        font-weight: bolder;
        font-size: 15px;
        background-color: white;
        cursor: pointer;
    }

    span {
        font-size: 25px;
    }

    @media (max-width: 768px) {
        .board {
            width: 100%;
            margin-left: 0;
        }

        .title,
        .date {
            width: auto;
        }

        .logo img {
            width: 120px;
            height: 100px;
        }
    }
`;


// 하단 페이지 숫자 표시 박스
const NumberSelectBox = styled.div`
  height: 30px;
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// 페이지 1개씩 좌측 이동
const LeftButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: large;
  color: #7d5a5a;
  border: 0;
  background-color: #f1d1d1;
  border-radius: 50%;
  margin-right: 2%;
  cursor: pointer;
`;
// 페이지 한개씩 우측 이동
const RightButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: large;
  color: #7d5a5a;
  border: 0;
  background-color: #f1d1d1;
  border-radius: 50%;
  margin-left: 2%;
  cursor: pointer;
`;
// 하단 페이지 번호
const PageNumber = styled.p`
  margin-left: 1%;
  cursor: pointer;
  color: #7D5A5A;
  ${({ active }) =>
    active &&
    `
    font-size: 20px;
    font-weight: bold;
  `}
  ${({ disabled }) =>
    disabled &&
    `
  pointer-events: none;
  color: gray;
  `}
`;

const SuperLeftButton = styled.button`
  width: 30px;
  height: 30px;
  letter-spacing: -2px;
  font-size: large;
  color: #7d5a5a;
  border: 0;
  background-color: #f1d1d1;
  border-radius: 50%;
  margin-right: 1%;
  cursor: pointer;
`;
const SuperRightButton = styled.button`
  width: 30px;
  height: 30px;
  letter-spacing: -2px;
  font-size: large;
  color: #7d5a5a;
  border: 0;
  background-color: #f1d1d1;
  border-radius: 50%;
  margin-left: 1%;
  cursor: pointer;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButtonHover = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bolder;

  &:hover, &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const ContentBox = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
`;

// 삭제 버튼 스타일링
const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;


    const ManageReview = () => {
        const navigate = useNavigate("");

        const [reviewInfo, setReviewInfo] = useState([]);
        const [pageNumber, setPageNumber] = useState("");
        const perPage = 10;

        const onClickLogo = () => {
            navigate('/admininfo');
    }

     // 첫번째 페이지
     const firstPage = pageNumber === 1;

     // 마지막 페이지
     const lastPage = Math.ceil(reviewInfo.length / perPage);

     // 신고내역 클릭에 대한 상태를 저장할 state를 생성
    const [selectedReview, setSelectedReview] = useState(null);

    // 모달 팝업을 보여주기 위한 상태
    const [showModal, setShowModal] = useState(false);

    // 삭제할 리뷰 정보를 저장할 상태
    const [reviewToDelete, setReviewToDelete] = useState(null);

    // 삭제 확인 모달을 띄우기 위한 상태
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const getReviewInfo = async() => {
      try {
        const rsp = await AxiosApi.reviewGetAll();
        if(rsp.status === 200) setReviewInfo(rsp.data);
      }catch(error) {
        console.error('Error fetching reviews : ', error);
      }
    }

    // 리뷰 삭제 버튼을 클릭할 때 실행될 함수
    const deleteReviewClick = (reviewNum) => {
      const review = getCurrentItems().find((reviewInfo) => reviewInfo.reviewNum === reviewNum);
      setReviewToDelete(review);
      setShowConfirmModal(true);
    } 

    // 리뷰 삭제 함수
    const deleteReviews = async (reviewNum) => {
      try {
        const rsp = await AxiosApi.deleteReviews(reviewNum);
        if (rsp.status === 200) {
          // 리뷰가 성공적으로 삭제되었다면, 다시 리뷰 정보를 가져온다.
          getReviewInfo();
          setShowModal(false);
        }
      } catch (error) {
        console.error('리뷰 삭제 오류:', error);
      }
    };

    // 삭제 확인 모달에서 '확인' 버튼을 클릭할 때 실행될 함수
    const handleConfirmDelete = () => {
      if(reviewToDelete) {
        // 리뷰 삭제 처리
        deleteReviews(reviewToDelete.reviewNum);


        // 모달 닫기 및 리뷰 정보 초기화
        setShowConfirmModal(false);
        setReviewToDelete(null);
      }
    }

    useEffect(() => {
      // 페이지가 처음 로딩될 때 리뷰 정보를 가져오기 위해 호출합니다.
      getReviewInfo();
    }, []);
    
    // 클릭 이벤트를 처리할 함수
    const handleRowClick = (reviewNum) => {
        const selectedReviewData = getCurrentItems().find(review => review.reviewNum === reviewNum);
        setSelectedReview(selectedReviewData);
        setShowModal(true); // 모달 팝업 보여주기
        navigate(`/admin/manageReview?reviewNum=${reviewNum}`);
    };

    // 모달 닫기 처리
    const closeModal = () => {
        setShowModal(false);
        setSelectedReview(null); // 선택한 신고내역 초기화
        navigate(`/admin/manageReview`);
    };

    // 페이지 변경 시 아이템 표시
    const handlePageChange = (page) => {
        setPageNumber(page);
    };


    // 현재 페이지에 해당하는 아이템 가져오기
    const getCurrentItems = () => {
        // reviewDate를 기준으로 내림차순으로 reviewInfo를 정렬합니다.
        const sortedReviewInfo = reviewInfo.sort(
          (a, b) => new Date(b.writtenTime) - new Date(a.writtenTime)
        );
      
        const startIndex = (pageNumber - 1) * perPage;
        const endIndex = startIndex + perPage;
      
        return sortedReviewInfo.slice(startIndex, endIndex);
      };

  // 페이지 10개씩 나누어 표시하기
  const getPageNumbers = () => {
    const totalPageCount = Math.ceil(reviewInfo.length / perPage);
    const currentPage = pageNumber;

    const pageNumbers = [];

    if (currentPage <= 10) { // 현재 페이지가 10 이하인 경우
      for (let i = 1; i <= Math.min(10, totalPageCount); i++) {
        pageNumbers.push(i);
      }
      if (totalPageCount > 10) {
        pageNumbers.push("...");
        pageNumbers.push(totalPageCount);
      }
    } else { // 현재 페이지가 11 이상인 경우
      pageNumbers.push(1);
      pageNumbers.push("...");
      const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
      const endPage = Math.min(startPage + 9, totalPageCount);
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (endPage < totalPageCount) {
        pageNumbers.push("...");
        pageNumbers.push(totalPageCount);
      }
    }

    return pageNumbers;
  };


    const pageNumbers = getPageNumbers();

    // 모달 팝업을 보여줄 때, 조건부 렌더링을 통해 해당 모달 컨텐츠가 보여지도록 해야 합니다.
    if (showModal && selectedReview) {
        return (
            <div className="modal">
                <ModalContent>
                <CloseButtonHover onClick={closeModal}>&times;</CloseButtonHover>
                <DeleteButton onClick={()=>deleteReviewClick(selectedReview.reviewNum)}>삭제</DeleteButton>
                  {showConfirmModal && (
                    <ConfirmModal
                      message="삭제하시겠습니까?"
                      onClose={()=> setShowConfirmModal(false)}
                      onConfirm={handleConfirmDelete}
                      />
                  )}
                    <h2>리뷰번호 : {selectedReview.reviewNum}</h2>
                    <p>카페번호 : {selectedReview.cafeNum}</p>
                    <p>날짜 : {selectedReview.writtenTime}</p>
                    <br/>
                    <h3>내용</h3>
                <ContentBox>
                    <p>{selectedReview.reviewContent}</p>
                </ContentBox>
                    <br/>
                    <img src={selectedReview.reviewImgUrl1} alt="" className="image" style={{ width: "400px", height: "250px"}}/>
                    <br/>
                    <br/>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                            src={like}
                            alt=""
                            className="like"
                            style={{ width: "50px", height: "30px"}}
                        />
                        <span style={{ fontSize: "25px", fontWeight: "bold", color: "#FFCFDA"}}>{selectedReview.likeCount}</span>
                    </div>
                    <br/>
                    <div style={{ display: "flex", alignItems: "center"}}>
                        <img src={star} alt="" className="star" style={{width:"60px", height:"50px", marginBottom:"5px"}}/>
                        <span style={{ fontSize: "25px", fontWeight: "bold", color: "#FFCFDA"}}>{selectedReview.score} / 5</span>
                    </div>
                </ModalContent>
            </div>
        );
      }
    
    return(
        
        <ManageReviewBlock>
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={onClickLogo}/>
            </div>

            <div className="review">
                <h2>리뷰 관리</h2>
            </div>

            <table className="board">
                <thead>
                    <tr>
                        <th class="reviewNum">리뷰번호</th>
                        <th class="cafeNum">카페번호</th>
                        <th class="date">날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentItems().map((review) => (
                            <tr key={review.reviewNum}>
                                <td className="reviewNum" onClick={() => handleRowClick(review.reviewNum)} style={{ cursor: 'pointer' }}>{review.reviewNum}</td>
                                <td className="cafeNum" onClick={() => handleRowClick(review.reviewNum)} style={{ cursor: 'pointer' }}>
                                    {review.cafeNum}
                                </td>
                                <td className="date">{review.writtenTime}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <NumberSelectBox>
              <SuperLeftButton
                onClick={() => setPageNumber(1)}
                disabled={firstPage}
              >
                {"<<"}
              </SuperLeftButton>
              <LeftButton
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={firstPage}
              >
                {"<"}
              </LeftButton>
              {pageNumbers.map((page, index) => (
                <PageNumber
                  key={index}
                  onClick={() => handlePageChange(page)}
                  active={pageNumber === page}
                  disabled={page === "..."}
                >
                  {page}
                </PageNumber>
              ))}
              <RightButton
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={lastPage}
              >
                {">"}
              </RightButton>
              <SuperRightButton
                onClick={() => setPageNumber(Math.ceil(reviewInfo.length / perPage))}
                disabled={lastPage}
              >
                {">>"}
              </SuperRightButton>
            </NumberSelectBox>
        </ManageReviewBlock>
    );
}

export default ManageReview;