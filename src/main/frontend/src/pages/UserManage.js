import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../api/AxiosApi";
import user from "../images/user.png";
import businessman from "../images/business.png";
import ConfirmModal from "./ConfirmModal";

const UserManageBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-top: 20px;
    padding: 20px;

    .userManage {
        font-size: 15px;
        color : #FFCFDA;
        margin-right: 10px;
    }
    
    .logo img{
        width: 180px;
        height: 150px;
        margin-top: 10px;
        cursor: pointer;
    }

    p {
        color: #FFCFDA;
        font-weight: bolder;
    }

    .number {
      width: 80px;
      height: 30px;
    }

    .name {
      width: 120px;
      height: 30px;
    }

    .point {
      width: 200px;
      height: 30px;
    }
    
    .birth {
      width: 140px;
      height: 30px;
    }

    .gender {
      width: 80px;
      height: 30px;
    }

    .authority {
      width: 90px;
      height: 30px;
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

    

    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            align-items: center;
        }

        .box {
            margin: 20px 0;
        }

        .logo img {
            margin-top: 10px;
            width: 150px;
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

const Image = styled.div`
  width: 200px;
  height: 180px;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

// 삭제 버튼 스타일링
const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const EditButton = styled.button`
  background-color: #2196F3;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: #0d8bf2;
  }
`;

// EditForm 스타일 적용
const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

// Label 스타일을 적용합니다.
const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Input 스타일을 적용합니다.
const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// SaveButton 스타일 적용
const SaveButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;

  &:hover {
    background-color: #45a049;
  }
`;

// CancelButton 스타일 적용
const CancelButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  width: 250px;

  &:hover {
    background-color: #d32f2f;
  }
`;



const UserManage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 10;

   // 첫번째 페이지
   const firstPage = pageNumber === 1;

   // 마지막 페이지
   const lastPage = Math.ceil(userInfo.length / perPage);

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userInfoToSave, setUserInfoToSave] = useState(null);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);

  const LogoClick = () => {
    navigate('/admininfo');
  }

  const handleDeleteUserClick = (memberNum) => {
    const user = getCurrentItems().find((userInfo) => userInfo.memberNum === memberNum);
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUsers(userToDelete.memberNum);
      setUserToDelete(null);
    }
    setShowConfirmModal(false);
  };

  const handleSaveClick = () => {
    setUserInfoToSave(selectedUserInfo);
    setShowConfirmModal(true); // 저장 버튼을 누르면 모달창 띄우기
  };

  // 수정된 정보를 서버에 저장하고, 화면에 반영
  const handleConfirmSave = async () => {
    if (selectedUserInfo) {
      try {
        await saveUserInfo(selectedUserInfo); // 서버에 데이터 저장
        setIsEditing(false); // 수정 모드 종료
        setShowConfirmModal(false);
      } catch (error) {
        console.error('Error saving user info:', error);
        // 저장에 실패한 경우에 대한 처리를 추가할 수 있다.
        // 이 경우, 상태를 원래대로 초기화하는 작업이 필요하다.
      setSelectedUserInfo(null);
      }
    }
  };

  const handleCancelSave = () => {
    setShowConfirmModal(false);
    setUserInfoToSave(null);
  };

  const handleRowClick = (memberNum) => {
    const selectedUserInfoData = getCurrentItems().find(userInfo => userInfo.memberNum === memberNum);
    setSelectedUserInfo(selectedUserInfoData);

    // 모달이 열릴 때마다 수정 모드를 종료합니다.
    setIsEditing(false);

    setShowModal(true);
    navigate(`/admin/userManage?memberNum=${memberNum}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUserInfo(null);
    navigate(`/admin/userManage`);
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const getCurrentItems = () => {
    const sortedUserInfo = userInfo.sort((a, b) => b.memberNum - a.memberNum);
    const startIndex = (pageNumber - 1) * perPage;
    const endIndex = startIndex + perPage;
    return sortedUserInfo.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const totalPageCount = Math.ceil(userInfo.length / perPage);
    const currentPage = pageNumber;
    const pageNumbers = [];

    if (currentPage <= 10) {
      for (let i = 1; i <= Math.min(10, totalPageCount); i++) {
        pageNumbers.push(i);
      }
      if (totalPageCount > 10) {
        pageNumbers.push("...");
        pageNumbers.push(totalPageCount);
      }
    } else {
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

  const saveUserInfo = async (userInfoToSave) => {
    try {
      console.log('userInfoToSave:', userInfoToSave); // 로그 추가
      const rsp = await AxiosApi.saveUserInfo(userInfoToSave);
      if (rsp.status === 200) {
        // 변경된 사용자 데이터로 userInfo 상태를 업데이트한다.
        setUserInfo((prevUserInfo) =>
          prevUserInfo.map((user) =>
            user.memberNum === userInfoToSave.memberNum ? { ...user, ...userInfoToSave } : user
          )
        );
        setIsEditing(false); // 수정이 성공하면 수정 모드를 종료한다.
      }
    } catch (error) {
      console.error('사용자 정보 저장 오류:', error);
    }
  };

  const getUserInfo = async () => {
    try {
      const rsp = await AxiosApi.userGetAll();
      if (rsp.status === 200) setUserInfo(rsp.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUsers = async (memberNum) => {
    try {
      const rsp = await AxiosApi.deleteUsers(memberNum);
      if (rsp.status === 200) {
        getUserInfo();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

    

    // 모달 팝업을 보여줄 때, 조건부 렌더링을 통해 해당 모달 컨텐츠가 보여지도록 해야 합니다.
    if(showModal && selectedUserInfo) {
      return(
        <div className="modal">

          <ModalContent>
            <CloseButtonHover onClick={closeModal}>&times;</CloseButtonHover>
            <Image>
                {selectedUserInfo.authority === 'ROLE_USER' && <img src={user} alt="" className="user" width="150px" height="150px" style={{margin : "0 -20px"}}/>}
                {selectedUserInfo.authority === 'ROLE_MEMBER' && <img src={businessman} alt="" className="businessman" width="250px" height="150px" style={{margin : "0 -20px"}}/>}
            </Image>

        {isEditing ? (
          <EditForm>
            <Label>
              이름
              <Input
                type="text"
                value={selectedUserInfo.name}
                onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, name: e.target.value })}
              />
            </Label>
            <Label>
              생년월일
              <Input
                type="text"
                value={selectedUserInfo.birthday}
                onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, birthday: e.target.value })}
              />
            </Label>
            <Label>
              권한
              <Input
                type="text"
                value={selectedUserInfo.authority}
                onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, authority: e.target.value })}
              />
            </Label>
            <Label>
              보유 포인트
              <Input
                type="text"
                value={selectedUserInfo.totalPoint}
                onChange={(e) => setSelectedUserInfo({ ...selectedUserInfo, totalPoint: e.target.value })}
              />
            </Label>
            <SaveButton onClick={handleSaveClick}>저장</SaveButton>
            {showConfirmModal && (
            <ConfirmModal
              message="저장하시겠습니까?" // 모달 창에 보여줄 메시지
              onClose={handleCancelSave} // 취소 버튼을 눌렀을 때 실행될 함수
              onConfirm={handleConfirmSave} // 확인 버튼을 눌렀을 때 실행될 함수
            />
          )}

            <CancelButton onClick={() => setIsEditing(false)}>취소</CancelButton>
          </EditForm>
        ) : (
          <>
            <h2>번호 : {selectedUserInfo.memberNum}</h2>
            <p>이름 : {selectedUserInfo.name}</p>
            <p>생년월일 : {selectedUserInfo.birthday}</p>
            <p>성별 : {selectedUserInfo.gender}</p>
            <p>권한 : {selectedUserInfo.authority}</p>
            <p>보유 포인트 : {selectedUserInfo.totalPoint}</p>
          
          <DeleteButton onClick={() => handleDeleteUserClick(selectedUserInfo.memberNum)}>삭제</DeleteButton>

            {showConfirmModal && (
                <ConfirmModal
                  message="삭제하시겠습니까?"
                  onClose={() => setShowConfirmModal(false)}
                  onConfirm={handleConfirmDelete}
                />
              )}
            <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
            </>
        )}
        
          </ModalContent>
        </div>
      )
    }
    
    return(
        <UserManageBlock>
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>

            <div className="userManage">
                <h2>사용자 관리</h2>
            </div>

            <table className="board">
              <thead>
                  <tr>
                      <th className="number">번호</th>
                      <th className="name">이름</th>
                      <th className="birth">생년월일</th>
                      <th className="gender">성별</th>
                      <th className="authority">권한</th>
                  </tr>
              </thead>
              <tbody>
                  {getCurrentItems().map((userInfo) => (
                      <tr key={userInfo.memberNum}>
                          <td className="number" onClick={() => handleRowClick(userInfo.memberNum)} style={{ cursor: 'pointer' }}>{userInfo.memberNum}</td>
                          <td className="name">{userInfo.name}</td>
                          <td className="birthday">{userInfo.birthday}</td>
                          <td className="gender">{userInfo.gender}</td>
                          <td className="authority">{userInfo.authority}</td>
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
                onClick={() => setPageNumber(Math.ceil(userInfo.length / perPage))}
                disabled={lastPage}
              >
                {">>"}
              </SuperRightButton>
            </NumberSelectBox>


     </UserManageBlock>
    );
}

export default UserManage;