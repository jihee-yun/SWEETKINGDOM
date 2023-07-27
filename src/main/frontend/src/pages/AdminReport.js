import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import ConfirmModal from "./ConfirmModal";
import report from "../images/report.png";




const AdminReportBlock = styled.div`
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

    .number {
        width: 100px;
        height: 30px;
    }

    .title {
        width: 300px;
        height: 30px;
    }

    .user {
        width: 160px;
        height: 30px;
    }

    .date {
        width: 150px;
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

const AdminReport = () => {
    const navigate = useNavigate("");

    const [reportInfo, setReportInfo] = useState([]);
    const [pageNumber, setPageNumber] = useState("");
    const perPage = 10;

    // 첫번째 페이지
    const firstPage = pageNumber === 1;

    // 마지막 페이지
    const lastPage = Math.ceil(reportInfo.length / perPage);

    // 신고내역 클릭에 대한 상태를 저장할 state를 생성
    const [selectedReport, setSelectedReport] = useState(null);

    // 모달 팝업을 보여주기 위한 상태
    const [showModal, setShowModal] = useState(false);

    // 삭제 확인 모달을 띄우기 위한 상태
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // 삭제할 신고 내역 정보를 저장할 상태
    const [reportToDelete, setReportToDelete] = useState(null);

    const getReportInfo = async() => {
      try {
        const rsp = await AxiosApi.reportGetAll();
        if(rsp.status === 200) setReportInfo(rsp.data);
      }catch(error) {
        console.error('Error fetching reviews : ', error);
      }
    }

    // 삭제 확인 모달에서 '확인' 버튼을 클릭할 때 실행될 함수
    const handleConfirmDelete = () => {
      if(reportToDelete) {
        // 신고 내역 삭제 처리
        deleteReports(reportToDelete.reportNum);

        // 모달 닫기 및 신고 내역 초기화
        setShowConfirmModal(false);
        setReportToDelete(null);
      }
    }

    // 신고 삭제 버튼을 클릭할 때 실행될 함수
    const deleteReportClick = async(reportNum) => {
      const report = getCurrentItems().find((reportInfo) => reportInfo.reportNum === reportNum);
      setReportToDelete(report);
      setShowConfirmModal(true);
    }

    // 신고 삭제 함수
    const deleteReports = async(reportNum) => {
      try {
        const rsp = await AxiosApi.deleteReports(reportNum);
        if(rsp.status === 200) {
          // 신고정보가 성공적으로 삭제되었다면, 다시 신고 정보를 가져온다.
          getReportInfo();
          setShowModal(false);
        } 
      }catch(error) {
        console.error('신고 삭제 오류 : ', error);
      }
    };

    useEffect(()=> {
      getReportInfo();
    },[]);

    // 클릭 이벤트를 처리할 함수
    const handleRowClick = (reportNum) => {
        const selectedReportData = getCurrentItems().find(report => report.reportNum === reportNum);
        setSelectedReport(selectedReportData);
        setShowModal(true); // 모달 팝업 보여주기
        navigate(`/admin/report?reportNum=${reportNum}`);
    };

    // 모달 닫기 처리
    const closeModal = () => {
        setShowModal(false);
        setSelectedReport(null); // 선택한 신고내역 초기화
        navigate(`/admin/report`);
    };

    // 페이지 변경 시 아이템 표시
    const handlePageChange = (page) => {
        setPageNumber(page);
    };


    // 현재 페이지에 해당하는 아이템 가져오기
    const getCurrentItems = () => {
        // reportDate를 기준으로 내림차순으로 reportInfo를 정렬합니다.
        const sortedReportInfo = reportInfo.sort(
          (a, b) => new Date(b.reportDate) - new Date(a.reportDate)
        );
      
        const startIndex = (pageNumber - 1) * perPage;
        const endIndex = startIndex + perPage;
      
        return sortedReportInfo.slice(startIndex, endIndex);
      };

  // 페이지 10개씩 나누어 표시하기
  const getPageNumbers = () => {
    const totalPageCount = Math.ceil(reportInfo.length / perPage);
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


    const LogoClick = () => {
        navigate('/admininfo');
    }

    // 모달 팝업을 보여줄 때, 조건부 렌더링을 통해 해당 모달 컨텐츠가 보여지도록 해야 합니다.
    if (showModal && selectedReport) {
        return (
            <div className="modal">
                <ModalContent>
                <CloseButtonHover onClick={closeModal}>&times;</CloseButtonHover>
                <img src={report} alt="" className="report" width="150px" height="100px" style={{ margin: '0 -20px' }}/>
                    <h2>제목 : {selectedReport.title}</h2>
                    <p>글번호 : {selectedReport.reportNum}</p>
                    <p>작성자 : {selectedReport.userId}</p>
                    <p>날짜 : {selectedReport.reportDate}</p>
                    <br/>
                    <h3>내용</h3>
                <ContentBox>
                    <p>{selectedReport.content}</p>
                </ContentBox>
                <br/>
                <DeleteButton onClick={()=>deleteReportClick(selectedReport.reportNum)}>삭제</DeleteButton>
                {showConfirmModal && (
                    <ConfirmModal
                      message="삭제하시겠습니까?"
                      onClose={()=> setShowConfirmModal(false)}
                      onConfirm={handleConfirmDelete}
                      />
                  )}
                </ModalContent>
            </div>
        );
      }
    
    
    return(
        <AdminReportBlock>
            
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>

            <h2>신고 내역</h2>

            <table className="board">
                <thead>
                    <tr>
                    <th className="number">번호</th>
                    <th className="user">작성자</th>
                    <th className="title">제목</th>
                    <th className="date">날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentItems().map((report) => (
                        <tr key={report.reportNum}>
                            <td className="number" onClick={() => handleRowClick(report.reportNum)} style={{ cursor: 'pointer' }}>{report.reportNum}</td>
                            <td className="user">{report.userId}</td>
                            <td className="title" onClick={() => handleRowClick(report.reportNum)} style={{ cursor: 'pointer' }}>
                                {report.title}
                            </td>
                            <td className="date">{report.reportDate}</td>
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
                onClick={() => setPageNumber(Math.ceil(reportInfo.length / perPage))}
                disabled={lastPage}
              >
                {">>"}
              </SuperRightButton>
            </NumberSelectBox>
        </AdminReportBlock>
    );
}

export default AdminReport;