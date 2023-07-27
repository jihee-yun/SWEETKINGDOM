import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/logo.png";
import AxiosApi from "../api/AxiosApi";
import Modal from "./Modal";

const AdminRegBlock = styled.div`
  text-align: center;
  margin: 20px auto;
  width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  h2 {
    margin-bottom: 20px;
    color : #FFCFDA;
  }

  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 10px;
    cursor: pointer;
  }

  .logo img {
    width: 150px;
    height: 130px;
  }
  
    form {
        display: flex;
        flex-direction: column;
    }

    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        font-weight: bold;
    }

    input[type="radio"] {
        margin-left: 20px;
    }

   /* CSS 스타일 */
    .gender-group {
        display: flex;
        align-items: center;
    }

    .gender-label {
        margin-right: 10px;
        font-size: 18px;
    }

    .radio-buttons {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .radio-buttons span {
        margin-right: 20px;
        font-size: 18px;
    }

    .radio-buttons input[type="radio"] {
        margin-right: 5px;
        margin-top: 1px;
    }



    input[type="text"],
    input[type="password"],
    input[type="radio"] {
        flex: 1;
        padding: 8px;
        margin-right: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

   .button[type="submit"] {
        width: 200px;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

const AdminReg = () => {
    const navigate = useNavigate();

    const [adminId, setAdminId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    // 팝업
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
          adminId.trim() !== "" &&
          password.trim() !== "" &&
          name.trim() !== "" &&
          birthday.trim() !== "" &&
          phone.trim() !== "" &&
          gender.trim() !== ""
        ) {
          const adminSignUp = await AxiosApi.adminReg(
            adminId,
            password,
            name,
            birthday,
            phone,
            gender
          );
          console.log(adminSignUp);
          setModalText("등록이 완료되었습니다.");
          setModalOpen(true);
          navigate('/admin');
        } else {
          setModalText("모든 필드를 입력해주세요.");
          setModalOpen(true);
        }
      };

    const LogoClick = () => {
        navigate("/admin");
    };


  return (
    <AdminRegBlock>
        <div className="logo">
            <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
        </div>
       
      <h2>관리자 등록</h2>
        
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required placeholder="아이디"
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required placeholder="비밀번호"
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required placeholder="이름"
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required placeholder="생년월일 ex)2000-01-01"
          />
        </label>

        <br />

        <label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required placeholder="전화번호 ex)010-1111-1111"
          />
        </label>

        <br/>

        <div className="gender-group">
            <label className="gender-label">성별</label>
                <div className="radio-buttons">
                    <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    onChange={(e) => setGender(e.target.value)}
                    checked={gender === 'MALE'}
                    required
                    />
                    <span>남성</span>
                    <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={gender === 'FEMALE'}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    />
                    <span>여성</span>
            </div>
        </div>

        <br />

        <SubmitButton type="submit" onClick={handleSubmit}>
            등록
        </SubmitButton>
        </form>
        {/* 모달 창 */}
        <Modal>
        {modalOpen && (
            <div>
            <div>{modalText}</div>
            <button type="button" onClick={() => setModalOpen(false)}>
                닫기
            </button>
            </div>
        )}
        </Modal>
        
    </AdminRegBlock>
  );
};

export default AdminReg;
