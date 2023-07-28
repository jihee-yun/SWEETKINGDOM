import React from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import admin from "../images/admin.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../utils/Modal";
import AxiosApi from "../api/AxiosApi";


const AdminBlock = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1500px;
    height: 800px;
    background-color: white;

    .logo {
        justify-content: center;
        align-items: center;
        display: flex;
        width: 200px;
        height: 180px;
        margin-left: 95px;
    }

    .item2{
        margin-top: 20px;
        margin: 10px;
        margin-bottom: 20px;
    }

    .log_btn {
        width: 200px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #FFCFDA;
        margin-left: 140px;
        margin-top: 20px;
        margin-bottom: 20px;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .adminLogo img{
        width: 80px;
        height: 60px;
        margin-left: 40px;
        margin-top: 30px;
    }

    @media (max-width: 768px) {
        width: 450px;
        height: auto;
        padding: 20px;
    


    .logo {
        justify-content: center;
        align-items: center;
        display: flex;
        width: 150px;
        height: 150px;
        margin-left: 120px;
    }

    .item2{
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .log_btn {
        width: 200px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #FFCFDA;
        margin-left: 140px;
        margin-top: 10px;
        margin-bottom: 10px;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .adminLogo img{
        width: 60px;
        height: 40px;
        margin-left: 40px;
        margin-top: 20px;
    }
}
`;

const Input = styled.input`
    margin-left: 30px;
    margin-right: 30px;
    width: 400px; /* 원하는 너비 설정 */
    height: auto; /* 높이값 초기화 */
    line-height : normal; /* line-height 초기화 */
    padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
    font-family: inherit; /* 폰트 상속 */
    border: 1px solid #999;
    border-radius: 18px; /* iSO 둥근모서리 제거 */
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
`;

const AdminContainer = styled.div`
    padding: 50px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
`;

const Admin = () => {
    const navigate = useNavigate();


    // 키보드 입력
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    
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

    //팝업 처리
    const [modalOpen, setModalopen] = useState(false);
    const closeModal = () => {
        setModalopen(false);
    }

    const onClickLogin = async() => {
        const response = await AxiosApi.adminLogin(inputId, inputPw);
        if(response.status === 200) {
            handleLoginSuccess();
        }else {
            handleLoginFail();
        }
    }

    const handleLoginSuccess = () => {
        console.log('로그인 성공');
        navigate('/admininfo');
    }

      
    const handleLoginFail = () => {
        console.log('로그인 실패');
        setModalopen(true);
    };

    const LogoClick = () => {
        navigate('/');
    }


    return(
        <AdminBlock>
            <AdminContainer>
                <div className="logo">
                    <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
                </div>

                <div className="adminLogo">
                    <img src={admin} alt="admin" className="admin"/>
                </div>


                <br/>

                    <div className="item2">
                        <Input placeholder="아이디" value={inputId} onChange={onChangeId} onKeyPress={handleKeyPress}/>
                    </div>

                    <div className="item2">
                        <Input type="password" placeholder="비밀번호" value={inputPw} onChange={onChangePw} onKeyPress={handleKeyPress}/>
                    </div>

                    <div className="item2">
                        <button className="log_btn" onClick={onClickLogin}>로그인</button>
                    </div>

                    <Modal open={modalOpen} close={closeModal} header="Sweet Kingdom">
                        아이디 및 패스워드를 확인하세요.
                    </Modal>
            </AdminContainer>
        </AdminBlock>
    );
}

export default Admin;