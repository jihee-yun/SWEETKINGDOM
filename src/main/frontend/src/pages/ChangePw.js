import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import MessageModal from "../component/MessageModal";
import Header from "../component/Header";
import Footer from "../component/Footer";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Sidebar from "../component/Sidebar";

const ChangePwBlock = styled.div`
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

  .hint {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-top: -5px;
    margin-bottom: 5px;
  }

  .message.success {
    color: green;
  }

  .message.error {
    color: red;
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

`;

const ChangePw = () => {
    const navigate = useNavigate("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [memberId, setMemberId] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [pwMsg, setPwMsg] = useState("");
    const [conPwMsg, setConPwMsg] = useState("");

    const [isConPw, setIsConPw] = useState(false);
    const [isPw, setIsPw] = useState(false);

    const { isSidebar, setIsSidebar } = useContext(UserContext);

    useEffect(() => {
        
        return (
            setIsSidebar("-300px")
        )
    }, []);

    const onChangeNewPassword = (e) => {
        const passwordRex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,15}$/;
        const currentPw = e.target.value;
        setNewPassword(currentPw);
        
        if (!passwordRex.test(currentPw)) {
          setPwMsg("숫자+영문자+특수문자 조합으로 7자리 이상 입력해주세요.");
          setIsPw(false);
        } else {
          setPwMsg("안전한 비밀번호에요!");
          setIsPw(true);
        }
      };

      const onChangeMemberId = (e) => {
        const memberIdNow = e.target.value;
        setMemberId(memberIdNow);
      }

    // 아이디와 새 비밀번호가 모두 비어있지 않은지 확인하는 조건 추가
    const isFormValid = memberId.trim() !== "" && newPassword.trim() !== "";
    


      const onChangeConfirmPassword = (e) => {
        const currentConPw = e.target.value;
        setConfirmPassword(currentConPw);
    
        if (currentConPw === newPassword) {
          setConPwMsg("비밀번호가 일치합니다.");
          setIsConPw(true);
        } else {
          setConPwMsg("비밀번호가 일치하지 않습니다.");
          setIsConPw(false);
        }
      };


   // 새 비밀번호 변경 요청 보내기
   const handleChangePw = async () => {
    const response = await AxiosApi.changePassword(memberId, newPassword);
    console.log("응답 데이터:", response.data);
    if (response) {
      setModalMessage("비밀번호가 성공적으로 변경되었습니다.");
      setShowModal(true);
      setNewPassword("");
      setConfirmPassword("");

    } else {
      setModalMessage("비밀번호 변경에 실패하였습니다. 다시 시도해주세요.");
      setShowModal(true);
    }
  };

  // 확인 버튼 누를 시 페이지 이동
  const handleModalConfirm = () => {
    setShowModal(false);
    navigate('/memberlogin');
  };

  return (
    <>
      <Header />
      <ChangePwBlock>
        <h2>비밀번호 변경</h2>
        <div className="loginWrapper">
          <div className="loginMain">
          <div className="loginSmallBox">
              {/* 아이디 입력란 */}
              <input
                type="text"
                value={memberId}
                className="loginInput"
                placeholder="아이디"
                onChange={onChangeMemberId}
              />
            </div>
            <div className="loginSmallBox">
              <input
                type="password"
                value={newPassword}
                className="loginInput"
                placeholder="새 비밀번호"
                onChange={onChangeNewPassword}
                />
            </div>

            <div className="hint">
                {newPassword.length > 0 && (<span className={`message ${isPw ? 'success' : 'error'}`}>{pwMsg}</span>)}
            </div>

            <div className="loginSmallBox">
              <input
                type="password"
                value={confirmPassword}
                className="loginInput"
                placeholder="새 비밀번호 확인"
                onChange={onChangeConfirmPassword}
                />
            </div>

            <div className="hint">
                {newPassword.length > 0 && (<span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMsg}</span>)}
            </div>


            {/* 비밀번호 찾기 버튼 */}
            <button className="loginButton" onClick={handleChangePw} disabled={!isFormValid}>
              비밀번호 변경
            </button>

            {showModal && (
                <MessageModal
                open={showModal}
                close={() => setShowModal(false)}
                header="Sweet Kingdom"
                confirm={handleModalConfirm}
                >
                {modalMessage}
                </MessageModal>
            )}
          </div>
        </div>
      </ChangePwBlock>
      <Footer />
      {isSidebar && <Sidebar/>}
    </>
  );
};

export default ChangePw;