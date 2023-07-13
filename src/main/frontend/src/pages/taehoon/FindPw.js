import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.png";
import AxiosApi from "./Api/AxiosApi";
import Modal from "./Modal";


const FindPwBlock = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
    
    .logo {
        margin-top: 80px;
        cursor: pointer;
    }

    .findpw p {
        font-size: 20px;
        color: #FFCFDA;
        font-weight: bold;
        margin-top: 10px;
    }

    .inputEmail {
        margin-left: -540px;
    }

    .hint {
        font-size: 13px;
        margin-right: 240px;
        margin-top: 10px;
        color: #999;
    }

    .message.success {
        color: green;
    }

    .message.error {
        color: red;
    }

    .pwBtn button {
        margin-top: 30px;
        width: 150px;
        height: 30px;
        background-color: #FFCFDA;
        color: black;
        border: none;
        font-size: 15px;
        cursor: pointer;
    }
`;


const Input = styled.input`
    margin-left: 545px;
    width: 400px; /* 원하는 너비 설정 */
    height: auto; /* 높이값 초기화 */
    line-height : normal; /* line-height 초기화 */
    padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
    border: 1px solid #999;
    border-radius: 18px; /* iSO 둥근모서리 제거 */
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;


const FindPw = () => {
    const navigate = useNavigate();

    // 이메일
    const [email, setEmail] = useState("");

    // 오류 메세지
    const [emailMsg, setEmailMsg] = useState("");

    // 유효성 검사
    const [isEmail, setIsEmail] = useState("");

    // 팝업
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState(false);


    const onClickLogo = () => {
        navigate('/');
    }

    // 이메일 정규식
    const onChangeEmail = (e) => {
        const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };
        setEmail(e.target.value);
        if (!validateEmail(e.target.value)) {
            setEmailMsg("이메일 형식으로 입력해주세요");
            setIsEmail(false);
        } else {
            setEmailMsg("올바른 형식입니다.");
            setIsEmail(true);
        }
    }

    const handleSendEmail = async () => {
        try {
          // 이메일 전송 요청
          const response = await AxiosApi.findPw(email);
      
          // 이메일 전송 성공
          setModalText('이메일로 전송되었습니다.');
          setModalOpen(true);
        } catch (error) {
          // 이메일 전송 실패
          setModalText('이메일 전송에 실패했습니다.');
          setModalOpen(true);
        }
      };


      const closeModal = () => {
        setModalOpen(false);
        navigate("/login");
    }

    return(
        <FindPwBlock>

            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={onClickLogo}/>
            </div>
            
            <br/>

            <div className="findpw">
                <p>비밀번호 찾기를 위해 ID를 입력해 주세요.</p>
            </div>

            <div className="inputEmail">
                <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail}/>
            </div>

            <div className="hint">
                    {email.length > 0 && (<span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMsg}</span>)}
            </div>


            <div className="pwBtn">
                <button onClick={handleSendEmail}>임시 비밀번호 발급</button>
                <Modal open={modalOpen} close={closeModal} header="Sweet Kingdom">이메일로 전송되었습니다.</Modal>
            </div>
            

        </FindPwBlock>
    );
}

export default FindPw;