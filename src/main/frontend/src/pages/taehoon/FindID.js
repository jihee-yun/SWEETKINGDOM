import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.png";

const FindIdBlock = styled.div`
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: -30px;

    .logo {
        margin-top: 80px;
        cursor: pointer;
    }

    .findId p {
        font-size: 20px;
        margin-top: 10px;
        color: #FFCFDA;
        font-weight: bold;
    }

    .inputId {
        margin-bottom: 20px;
    }

    .hint {
        margin-top : -70px;
        font-size: 15px;
        margin-right: 220px;
        color: #999;
    }

    .check button {
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
  margin-left: 30px;
  margin-right: 30px;
  width: 400px; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const FindID = () => {
    const navigate = useNavigate("");

    // 아이디 입력
    const [userID, setUserID] = useState("");

    // 유효성 검사
    const [idMsg, setIdMsg] = useState("");
    const [isID, setIsID] = useState("");

    const onChangeId = (e) => {
        const validateEmail = (email) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        };
        setUserID(e.target.value);
        if (!validateEmail(e.target.value)) {
          setIdMsg("이메일 형식으로 입력해주세요");
        } else {
          setIdMsg("올바른 형식입니다.");
        }
      };

    const LogoClick = () => {
        navigate('/');
    }

    return(
        <FindIdBlock>
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>

            <br/>

            <div className="findId">
                <p>아이디를 찾기 위해 이메일을 입력해 주세요.</p>
            </div>

            <div className="inputId">
               <Input type="email" placeholder="이메일" value={userID} onChange={onChangeId}/>
            </div>

            <div className="check">
                <button>확인</button>
            </div>

            <div className="hint">
                {userID.length > 0 && (<span className={`message ${isID ? 'success' : 'error'}`}>{idMsg}</span>)}
            </div>

        </FindIdBlock>
    );
}

export default FindID;