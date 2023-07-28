import React from "react";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
import MessageModal from "../component/MessageModal";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Sidebar from "../component/Sidebar";


const FindPwBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-top: 50px;
    margin-bottom: 50px;
    font-size: 20px;
    font-weight: bold;
  }

  .loginWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .loginMain {
    display: flex;
    flex-direction: column;
  }

  .loginSmallBox {
    margin-bottom: 15px;
  }

  .loginInput {
    width: 350px;
    height: 30px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }

  .loginButton {
    width: 200px;
    height: 40px;
    margin-top: 20px;
    margin-left: 90px;
    background-color: #FFCFDA;
    font-size: .9rem;
    font-weight: bolder;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  .error-message {
    color: red;
    margin-top: 5px;
  }

  .auth-button {
    background-color: #FFCFDA;
    color: black;
    padding: 10px 20px;
    margin-top: 30px;
    margin-left: 125px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bolder;
    transition: background-color 0.2s ease;

  /* 마우스 호버 시 배경색 변경 */
  &:hover {
    background-color: greenyellow;
  }
}
`;

const FindPw = () => {
  const navigate = useNavigate("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [memberId, setMemberId] = useState("");

  const [findPwSuccess, setFindPwSuccess] = useState(false);
  const [findPwFail, setFindPwFail] = useState(false);

  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [code, setCode] = useState("");

  const [isModalOpen, setIsModalOpen] = useState("");

  const { isSidebar, setIsSidebar } = useContext(UserContext);

    useEffect(() => {
        
        return (
            setIsSidebar("-300px")
        )
    }, []);

  const onClickClose = () => {
    setFindPwSuccess(false);
    setFindPwFail(false);
  };

  const onChangeEmail = (e) => {
    const emailNow = e.target.value;
    setEmail(emailNow);
  };


  const onChangeMemberId = (e) => {
    const memberIdNow = e.target.value;
    setMemberId(memberIdNow);
  }

  const onChangeName = (e) => {
    const nameNow = e.target.value;
    setName(nameNow);
  };

  const handleChangePw = () => {
    navigate("/changepw");
  }

  // 인증메일 모달이 열릴 때 호출되는 함수
  const handleOnOpenModal = () => {
    setIsCodeVerified(false);
    setIsModalOpen(true); // 모달이 열릴 때 인증번호 입력란과 버튼이 나타나도록
  };

  // 인증메일 모달이 닫힐 때 호출되는 함수
  const handleOnCloseModal = () => {
    if (isCodeVerified) {
      setIsModalOpen(false); // 인증코드가 확인된 경우에만 모달을 닫습니다.
    }
  };


  const onClickFindPw = async () => {
    try {
      const response = await AxiosApi.findPw(email, memberId, name);
      if (response.data) {
        setFindPwSuccess(true); 
        console.log(response.data);
      } else {
        setFindPwFail(true);
        console.log(response.data);
      }
    } catch (e) {
      console.log("일치하는 회원정보가 없습니다.");
      console.log(e);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await AxiosApi.codeCheck(email, code);
      if (response.data === true) {
        console.log("인증코드 확인 성공!");
        setIsCodeVerified(true);
        handleChangePw();
      } else {
        console.log("인증코드 확인 실패!", response.data);
        setIsCodeVerified(false);
      }
    } catch (error) {
      console.log("인증코드 확인 오류:", error);
      setIsCodeVerified(false);
    }
  };

  const handleOnKeyPress = (e) => {
    if(e.key === 'Enter') {
      onClickFindPw();
    }
  }


    return (
      <>
        <Header />
        <FindPwBlock>
        <h2>비밀번호 찾기</h2>
        <div className="loginWrapper">
          <div className="loginMain">
            <div className="loginSmallBox">
              {/* 이메일 입력란 */}
              <input
                type="text"
                value={email}
                className="loginInput"
                placeholder="이메일"
                onChange={onChangeEmail}
                onKeyUp={handleOnKeyPress}
              />
            </div>

            <div className="loginSmallBox">
              {/* 아이디 입력란 */}
              <input
                type="text"
                value={memberId}
                className="loginInput"
                placeholder="아이디"
                onChange={onChangeMemberId}
                onKeyUp={handleOnKeyPress}
              />
            </div>

            <div className="loginSmallBox">
              {/* 이름 입력란 */}
              <input
                type="text"
                value={name}
                className="loginInput"
                placeholder="이름"
                onChange={onChangeName}
                onKeyUp={handleOnKeyPress}
              />
            </div>

            {/* 비밀번호 찾기 버튼 */}
            <button className="loginButton" onClick={onClickFindPw}>
              비밀번호 찾기
            </button>

            {/* 인증메일 발송 성공 후, 인증메일 확인 버튼 */}
            {findPwSuccess && (
              <>
                {/* "인증메일로 전송되었습니다"라는 모달 */}
                <MessageModal
                  open={findPwSuccess}
                  confirm={() => {
                    setIsModalOpen(true); // 모달 확인 버튼을 누르면 인증메일 확인 모달이 열리도록
                    setFindPwSuccess(false); // 모달을 다시 열기 위해 findPwSuccess 상태를 false로 설정
                  }}
                  type="modalType"
                  header="SweetKingdom"
                >
                  인증메일로 전송되었습니다.
                </MessageModal>

                {/* 인증메일 확인 버튼 */}
                <div>
                  <button onClick={handleOnOpenModal} className="auth-button">
                    인증메일 확인
                  </button>
                </div>
              </>
            )}

            {/* 모달 창 */}
            <MessageModal
              open={isModalOpen}
              confirm={() => {
                // 인증코드가 확인되었을 때 /changepw 페이지로 이동합니다.
                if (isCodeVerified) {
                  setIsModalOpen(false);
                  handleChangePw(); // /changepw 페이지로 이동
                }
              }}
              close={handleOnCloseModal}
              type="modalType"
              header="SweetKingdom"
            >
              {/* 모달 내용 */}
              <div className="modal-content">
                인증번호가 이메일로 발송되었습니다.
                {/* 인증코드 입력란과 버튼 */}
                <div className="input-container">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="인증코드를 입력하세요"
                  />
                  <button onClick={handleVerifyCode} className="modal-button">
                    인증코드 확인
                  </button>
                </div>
              </div>
            </MessageModal>
          </div>
        </div>

        {findPwFail && (
          <MessageModal
            open={findPwFail}
            confirm={onClickClose}
            close={onClickClose}
            type="modalType"
            header="SweetKingdom"
          >
            일치하는 회원정보가 없습니다.
          </MessageModal>
        )}
      </FindPwBlock>
        <Footer />
        {isSidebar && <Sidebar/>}
      </>
    );
  };
  
export default FindPw;