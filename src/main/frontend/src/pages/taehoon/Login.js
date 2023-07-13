import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../images/logo.png";
// import kakao from "../../images/kakao.png";
// import naver from "../../images/naver.png";
// import google from "../../images/google.png";
import { UserContext } from "../../context/UserStore";
import AxiosApi from "./Api/AxiosApi";
import Modal from "../jihee/Modal";


const LoginBlock = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin-top: 50px;

    .elseLink1 {
        text-decoration: none;
        color: #FFCFDA;
        margin-left: 90px;
        font-size: 15px;
        font-weight: bold;
    }

    .elseLink2 {
        text-decoration: none;
        color: #FFCFDA;
        margin-left: 10px;
        transform: skew(-10deg);
        font-size: 15px;
        font-weight: bold;
    }

    .elseLink3 {
        text-decoration: none;
        color: #FFCFDA;
        margin-left: 10px;
        transform: skew(-10deg);
        font-size: 15px;
        font-weight: bold;
    }

    .logo {
        width : 200px;
        height: 180px;
        align-items: center;
        margin-left: 70px;
    }
    
    .item2{
        margin-top: 20px;
        justify-content: center;
        align-items: center;
    }

    .log_btn {
        width: 200px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #FFCFDA;
        margin-left: 140px;
        margin-bottom: 20px;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .pipe {
        margin: 10px; /* 파이프 양쪽에 여백 추가 */
        color: gray; /* 파이프 색상 설정 */
    }

    h4 {
        text-align: center;
        margin-top: 5px;
        color: #FFCFDA;
        font-size: 15px;
    }

    .socialLogin {
        display: flex;
        justify-content: space-between;
        margin-left: 140px;
        margin-right: 140px;
    }

    .socialLogin img{
        width: 50px;
        height: 50px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        padding: 20px;


        .elseLink1 {
            margin-left: 50px;
            font-weight: bold;
        }
        .elseLink2 {
            margin-left: 20px;
            font-weight: bold;
        }
        .elseLink3 {
            margin-left: 20px;
            font-weight: bold;
        }

        .logo {
            width: 150px;
            height: 150px;
            margin-left: 65px;
            margin-bottom: 20px;
        }

        .item2 {
            margin-top: 10px;
            margin-left: -30px;
        }

        .log_btn {
            width: 150px;
            padding: 10px 10px;
            font-size: 16px;
            background-color: #FFCFDA;
            margin-left: 160px;
            margin-bottom: 20px;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .pipe {
            margin: 10px;
        }

        h4 {
            font-size: 13px;
            margin-left: -30px;
        }

        .socialLogin {
            align-items: center;
            margin-left: 120px;
            margin-right: 160px;
            margin-top: 20px;
        }

        .socialLogin img {
            width: 40px;
            height: 40px;
            margin-top: 10px;
        }
    }
`;

const LoginContainer = styled.div`
    padding: 50px;
    background-color: #ffffff;
    border: 1px solid #F5F5F5;
    border-radius: 4px;
    box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0);
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


const Login = () => {

    // 카카오
    const LoginKakao = () => {
        const REDIRECT_URI = `http://localhost:8111/login/oauth/kakao`;
        const CLIENT_ID = `6d3f2009d780565597964da82299382f`;
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = KAKAO_AUTH_URL;
    }

    const context = useContext(UserContext);
    const {setUserID, setPassWord, setIsLogin} = context;

    const navigate = useNavigate("");
    
    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");


    //팝업 처리
    const [modalOpen, setModalopen] = useState(false);
    const closeModal = () => {
        setModalopen(false);
    }

    const onChangeId = (e) => {
        setInputId(e.target.value);
    }

    const onChangePw = (e) => {
        // const passwordCurrent = e.target.value;
        // setInputPw(passwordCurrent);
        setInputPw(e.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          event.preventDefault(); // 기본 엔터 키 동작 방지
          onClickLogin(); // 로그인 함수 호출
        }
      };

    const onClickLogin = async() => {
        const response = await AxiosApi.userLogin(inputId, inputPw);
        if(response) handleLoginSuccess();
        else handleLoginFail();
    }


    const handleLoginSuccess = () => {
        console.log('로그인 성공');
        navigate('/');
    }

      
    const handleLoginFail = () => {
        console.log('로그인 실패');
        setModalopen(true);
    };




    const LogoClick = () => {
        navigate('/');
    }
    

    return(
        <LoginBlock>
            <LoginContainer>

            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>    
            
                    
                    <br/>

                    <div className="item2">
                        <Input placeholder="아이디(이메일)" value={inputId} onChange={onChangeId} onKeyPress={handleKeyPress}/>
                    </div>

                    <div className="item2">
                        <Input type="password" placeholder="비밀번호" value={inputPw} onChange={onChangePw} onKeyPress={handleKeyPress}/>
                    </div>

                    <div className="item2">
                        <button className="log_btn" onClick={onClickLogin}>로그인</button>
                    </div>

                    <div className="else">
                        <Link to="/findpw" className="elseLink1">비밀번호 찾기</Link>
                        <span className="pipe">|</span>
                        <Link to="/findId" className="elseLink2">아이디 찾기</Link>
                        <span className="pipe">|</span>
                        <Link to="/signup" className="elseLink3">회원가입</Link>
                    </div>

                    <br/>
                    {/* <h4>OR</h4> */}

                    {/* <div className="socialLogin">
                        
                            <img src={kakao} alt="kakao" className="kakao" onClick={LoginKakao}/>
                        
                        <img src={naver} alt="naver" className="naver"/>
                        <img src={google} alt="google" className="google"/>
                    </div> */}

                    <Modal open={modalOpen} close={closeModal} header="Sweet Kingdom">
                        아이디 및 패스워드를 확인하세요.
                    </Modal>
                    
            </LoginContainer>
        </LoginBlock>
    );
}

export default Login;