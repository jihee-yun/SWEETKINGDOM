import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import admin from "../../images/admin.png";
import logo from "../../images/logo.png";

const AdminRegBlock = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    color: #FFCFDA;
    font-weight: bolder;
    font-size: 30px;
    

    .inputContainer {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .regBtn button{
        width: 150px;
        height: 30px;
        margin-top: 50px;
        border: none;
        background-color: #FFCFDA;
        cursor: pointer;
    }

    .admin img {
        width: 60px;
        height: 60px;
        margin-right: 350px;
        margin-top : 10px;
    }

    h2 {
        margin-bottom: -70px;
    }

    .logo {
        width: 200px;
        height: 150px;
        margin-bottom: -20px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        /* 모바일 화면에 대한 스타일 조정 */
        margin-top: 40px;
        font-size: 20px;

        .inputContainer {
            margin-top: 40px;
        }

        .regBtn button {
            width: 150px;
            height: 30px;
            margin-top: 60px;
        }

        .admin img {
            margin-bottom: -10px;
        }

        .logo {
            width: 150px;
            height: 120px;
            margin-bottom: 10px;
        }
    }
`;

const Input = styled.input`
    margin-top: 10px;
    width: 400px;
    height: 25px;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 20px;
    outline: none;
`;

const Select = styled.select`
    margin-top: -45px;
    width: 250px;
    height: 50px;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 20px;
    outline: none;
    background-color: #EFEFEF;
    font-size: 16px;

    @media (max-width: 768px) {
        width: 250px;
        height: 50px;
        margin-right: -20px;
        margin-top : -40px;
        margin-bottom: -20px;
    }
`;

const Label = styled.div`
    margin-right: 350px;
    margin-top: 20px;
`

const AdminReg = () => {
    const navigate = useNavigate("");

    const [adminID, setAdminID] = useState('');
    const [adminPw, setAdminPw] = useState('');
    const [adminName, setAdminName] = useState('');
    const [adminAge, setAdminAge] = useState('');
  
    const onChangeId = (e) => {
      setAdminID(e.target.value);
    };
  
    const onChangePw = (e) => {
      setAdminPw(e.target.value);
    };
  
    const onChangeName = (e) => {
      setAdminName(e.target.value);
    };

    const onChangeAge = (e) => {
        setAdminAge(e.target.value);
    }

    const handleClick = () => {
        navigate('/admin');
    }

    const LogoClick = () => {
        navigate('/admininfo');
    }
  

  
    return (
      <AdminRegBlock>
        <div className="logo">
            <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
        </div>
        <h2>관리자 등록</h2>

        <div className="admin">
            <img src={admin} alt="admin" className="admin"/>
        </div>
  
        <div className="inputContainer">
          <Input type="name" placeholder="이름" value={adminName} onChange={onChangeName} />
        </div>

        <div className="inputContainer">
            <Label>성별 : </Label>
                <Select>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </Select>
        </div>

        <div className="inputContainer">
          <Input type="age" placeholder="나이" value={adminAge} onChange={onChangeAge} />
        </div>

        <div className="inputContainer">
          <Input type="id" placeholder="아이디" value={adminID} onChange={onChangeId} />
        </div>
  
        <div className="inputContainer">
          <Input type="password" placeholder="비밀번호" value={adminPw} onChange={onChangePw} />
        </div>
  
        <div className="regBtn">
          <button onClick={handleClick}>등록</button>
        </div>
      </AdminRegBlock>
    );
  };
  
  export default AdminReg;