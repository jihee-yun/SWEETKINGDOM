import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import SideMenu from "../component/SideMenu";
import ChatBot from "../component/ChatBot";

const OutBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 95%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;
const Detail = styled.div`
  width: 100%;
  min-width: 350px;
  max-width: 1000px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* border: 2px solid yellow; */
`;
// 결제 내역, 포인트 내역 선택 박스
const RowBox = styled.div`
  width: 100%;
  margin-top: 1%;
  margin-bottom: 2%;
  display: flex;
  justify-content: center;
`;
// 포인트 내역, 결제 내역 버튼
const TypeButton = styled.button`
  width: 35%;
  min-width: 150px;
  height: 50px;
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid #7d5a5a;
  border-radius: 15px;
  background-color: ${({ selected }) => (selected ? "#F3E1E1" : "white")};
  cursor: pointer;

  &:hover {
    background-color: #F3E1E1;
  }
`;

// 세부 내역 박스
const SelectBox = styled.div`
  width: 90%;
  min-width: 330px;
  height: 80px;
  margin-top: 3%;
  border: 1px solid #f3e1e1;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;
const SelectButton = styled.button`
  width: 8%;
  min-width: 50px;
  height: 50px;
  letter-spacing: -1px;
  background-color: white;
  border: 0;
  color: #7d5a5a;
  cursor: pointer;
`;
const DatePick = styled.div`
  min-width: 100px;
  margin-left: auto;
  margin-right: 1%;
  padding-left: 1%;
  padding-right: 1%;
  border: 1px solid #f3e1e1;
  border-radius: 10px;
`;
const DateSelected = styled.p`
  cursor: pointer;
`;

const ContentBox = styled.div`
  width: 90%;
  min-width: 330px;
  min-height: 400px;
  margin-top: 3%;
  border: 1px solid #f3e1e1;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const ContentTop = styled.div`
  height: 50px;
  display: flex;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: -1%;
`;
const ContentNum = styled.p`
  width: 10%;
  min-width: 50px;
  margin-left: 1%;
  text-align: center;
`;
const ContentTitle = styled.p`
  width: 55%;
  min-width: 80px;
  margin-left: 2%;
  text-align: center;
`;
const ContentPoint = styled.p`
  width: 10%;
  min-width: 50px;
  margin-left: 2%;
  text-align: center;
`;
const ContentDate = styled.p`
  width: 15%;
  min-width: 50px;
  margin-left: 2%;
  text-align: center;
`;
const ContentDetail = styled.div`
  min-height: 400px;
//  border: 1px solid blue;
`;
const ContentLists = styled.p`
  display: flex;
  /* border-bottom: 1px solid #f3e1e1; */
  margin-top: -1%;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: -1%;
`;
const ListNum = styled.p`
  width: 10%;
  min-width: 50px;
  margin-left: 1%;
  text-align: center;
`;
const ListTitle = styled.p`
  width: 55%;
  min-width: 80px;
  margin-left: 2%;
  text-align: center;
  cursor: pointer;
`;
const ListPoint = styled.p`
  width: 10%;
  min-width: 50px;
  margin-left: 2%;
  text-align: center;
`;
const ListDate = styled.p`
  width: 15%;
  min-width: 50px;
  margin-left: 2%;
  text-align: center;
`;

// 하단 페이지 숫자 표시 박스
const NumberSelectBox = styled.div`
  height: 30px;
  margin-top: 3%;
  margin-bottom: 3%;
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

const MyPoint = () => {
  // useContext 저장값 불러오기
  const {grantType, accessToken, refreshToken, userNum, userName, userAuthority} = useContext(UserContext);
  
  // 포인트, 결제 선택 버튼
  // const [selectedButton, setSelectedButton] = useState("point");
  // 포인트, 결제 차이
  // const handleTypeButtonClick = (buttonType) => {
  //   setSelectedButton(buttonType);
  // };  
  // 날짜 선택 state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDate, setShowDate] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [eventInfo, setEventInfo] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 10;
  // 첫 번째 페이지 여부 확인
  const isFirstPage = pageNumber === 1;
  // 마지막 페이지 여부 확인
  const isLastPage =
    pageNumber === Math.ceil(eventInfo.length / itemsPerPage);

  const handleDateChange = (date) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
    // startDate와 endDate가 설정되면 DatePicker를 숨김
    if (date[0] && date[1]) {
      setShowDatePicker(false);
      setShowDate(true);
    }
  };

  // 날짜 선택 누르면 달력 표시, 제거
  const handleButtonClick = () => {
    setShowDatePicker(!showDatePicker);
    setShowDate(!showDate);
  };

  // 이벤트 데이터 받기
  useEffect(() => {
    const getEventInfo = async () => {
      const rsp = await AxiosApi.getPointByDate(userNum, startDate, endDate, grantType, accessToken);
      if (rsp.status === 200) {
        setEventInfo(rsp.data);
        console.log("포인트/결제 내역 받기 성공");
        console.log(rsp.data);
      }
    };
    getEventInfo();
  }, [startDate, endDate]);

  // 최초 날짜 한 달로 설정
  useEffect(() => {
    handleDateMonth();
  }, []);

  // 페이지 변경 시 아이템 표시
  const handlePageChange = (page) => {
    setPageNumber(page);
  };

 // 현재 페이지에 해당하는 아이템 가져오기
  const getCurrentItems = () => {
    const sortedEventInfo = eventInfo.sort(
      (a, b) => new Date(b.writtenTime) - new Date(a.writtenTime)
    );
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedEventInfo.slice(startIndex, endIndex);
  };

  // 페이지 10개씩 나누어 표시하기
  const getPageNumbers = () => {
    const totalPageCount = Math.ceil(eventInfo.length / itemsPerPage);
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

    // 조회 기간을 전체로 설정
  const handleDateAll = () => {
    setStartDate(new Date(2019, 11, 31));
    setEndDate(new Date());
    setPageNumber(1);
  };
  // 조회 기간을 일주일로 설정
  const handleDateWeek = () => {
    const today = new Date();
    const oneWeekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    setStartDate(oneWeekAgo);
    setEndDate(today);
    setPageNumber(1);
  };
  // 조회 기간을 한 달로 설정
  const handleDateMonth = () => {
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate() -1);
    setStartDate(oneMonthAgo);
    setEndDate(today);
    setPageNumber(1);
  };
  // 조회 기간을 일 년으로 설정
  const handleDateYear = () => {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    setStartDate(oneYearAgo);
    setEndDate(today);
    setPageNumber(1);
  };


  return (
    <OutBox>
      <Header />
      <Container>
        <SideMenu />
        <Detail>
          {/* <RowBox>
            <TypeButton
              selected={selectedButton === "point"}
              onClick={() => handleTypeButtonClick("point")}
              >
              포인트 내역
            </TypeButton>
            <TypeButton
              selected={selectedButton === "payment"}
              onClick={() => handleTypeButtonClick("payment")}
              >
              결제 내역
            </TypeButton>
          </RowBox> */}
          {/* {selectedButton === "point" ? (
          <> */}
            <SelectBox>
              <SelectButton onClick={handleDateAll}>전체</SelectButton>
              <SelectButton onClick={handleDateWeek}>일주일</SelectButton>
              <SelectButton onClick={handleDateMonth}>한 달</SelectButton>
              <SelectButton onClick={handleDateYear}>일 년</SelectButton>
              <DatePick>
                {showDate && (
                  <DateSelected onClick={handleButtonClick}>
                    {startDate && endDate
                      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                      : "Show DatePicker"}
                  </DateSelected>
                )}
                {showDatePicker && (
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                  />
                )}
              </DatePick>
            </SelectBox>
            <ContentBox>
              <ContentTop>
                <ContentNum>번호</ContentNum>
                <ContentTitle>포인트 상세 내역</ContentTitle>
                <ContentPoint>포인트</ContentPoint>
                <ContentDate>날짜</ContentDate>
              </ContentTop>
              <hr style={{ margin: "1%" }} />
              <ContentDetail>
                {getCurrentItems().map((item, index) => (
                  <ContentLists key={index}>
                    <ListNum>{item.id}</ListNum>
                    <ListTitle>{item.pointType}</ListTitle>
                    <ListPoint>{item.point}</ListPoint>
                    <ListDate>
                      {new Date(item.pointDate)
                        .toISOString()
                        .split("T")[0]}
                    </ListDate>
                  </ContentLists>
                ))}
              </ContentDetail>
              <NumberSelectBox>
                <SuperLeftButton
                  onClick={() => setPageNumber(1)}
                  disabled={isFirstPage}
                >
                  {"<<"}
                </SuperLeftButton>
                <LeftButton
                  onClick={() => handlePageChange(pageNumber - 1)}
                  disabled={isFirstPage}
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
                  disabled={isLastPage}
                >
                  {">"}
                </RightButton>
                <SuperRightButton
                  onClick={() => setPageNumber(Math.ceil(eventInfo.length / itemsPerPage))}
                  disabled={isLastPage}
                >
                  {">>"}
                </SuperRightButton>
              </NumberSelectBox>
            </ContentBox>
            {/* </>
            ) : (
            <>
            <SelectBox>
                <SelectButton onClick={handleDateAll}>전체</SelectButton>
                <SelectButton onClick={handleDateWeek}>일주일</SelectButton>
                <SelectButton onClick={handleDateMonth}>한 달</SelectButton>
                <SelectButton onClick={handleDateYear}>일 년</SelectButton>
                <DatePick>
                  {showDate && (
                    <DateSelected onClick={handleButtonClick}>
                      {startDate && endDate
                        ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                        : "Show DatePicker"}
                    </DateSelected>
                  )}
                  {showDatePicker && (
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                    />
                  )}
                </DatePick>
              </SelectBox>
              <ContentBox>
                <ContentTop>
                  <ContentNum>번호</ContentNum>
                  <ContentTitle>결제 상세 내역</ContentTitle>
                  <ContentCafe>포인트</ContentCafe>
                  <ContentDate>날짜</ContentDate>
                </ContentTop>
                <hr style={{ margin: "1%" }} />
                <ContentDetail>
                  {getCurrentItems().map((item, index) => (
                    <ContentLists key={index}>
                      <ListNum>{item.eventNum}</ListNum>
                      <ListTitle>{item.eventContent}</ListTitle>
                      <ListCafe>{item.eventPoint}</ListCafe>
                      <ListDate>
                        {new Date(item.writtenTime)
                          .toISOString()
                          .split("T")[0]}
                      </ListDate>
                    </ContentLists>
                  ))}
                </ContentDetail>
                <NumberSelectBox>
                  <SuperLeftButton
                    onClick={() => setPageNumber(1)}
                    disabled={isFirstPage}
                  >
                    {"<<"}
                  </SuperLeftButton>
                  <LeftButton
                    onClick={() => handlePageChange(pageNumber - 1)}
                    disabled={isFirstPage}
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
                    disabled={isLastPage}
                  >
                    {">"}
                  </RightButton>
                  <SuperRightButton
                    onClick={() => setPageNumber(Math.ceil(eventInfo.length / itemsPerPage))}
                    disabled={isLastPage}
                  >
                    {">>"}
                  </SuperRightButton>
                </NumberSelectBox>
              </ContentBox>
              </>
            )} */}
        </Detail>
      </Container>
      <Footer />
      {/* <ChatBot/> */}
    </OutBox>
  );
};
export default MyPoint;