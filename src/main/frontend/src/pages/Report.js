import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const AdminDeclarationBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 80px 80px 80px;
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  .report {
    margin-bottom: 20px;
  }

  .report fieldset {
    border: none;
    margin: 10px;
    padding: 0;
  }

  .report legend {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .report p {
    font-size: 20px;
  }

  .report ul {
    margin: 5px;
    padding-left: 40px;
  }

  .report li {
    margin-bottom: 5px;
    font-size: 20px;
  }

  .logo {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .writer input[type="id"],
  .title input[type="text"] {
    width: 200px;
    height: 30px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 14px;
    color: #333;
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .title h2 {
    color: #FFCFDA;
    font-weight: bolder;
    font-size: 35px;
    margin-right: 20px;
  }

  .textarea {
    width: 100%;
    height: 250px;
    margin-bottom: 20px;
    margin-top: 5px;
    font-size: 15px;
  }

  .reportBtn {
    display: flex;
    justify-content: center;
  }

  .reportBtn button {
    width: 150px;
    height: 30px;
    margin-top: 20px;
    border: none;
    background-color: #FFCFDA;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    margin: 20px;
    .title h2 {
      font-size: 25px;
      margin-top: 20px;
    }
    .writer input[type="id"],
    .title input[type="text"] {
      width: 50%;
    }
  }
`;



const Report = () => {
    const navigate = useNavigate("");

    const [reportText, setReportText] = useState("");
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeId = (e) => {
        setUserId(e.target.value);
    }

    const handleSubmit = () => {
        setReportText('');
        navigate('/');
    }

    const LogoClick = () => {
        navigate('/');
    }

    return (
        <AdminDeclarationBlock>

            <div className="report">
                <form action="#" method="text">
                    <fieldset>
                        <legend>신고 이용 안내</legend>
                        <p>Sweet kingdom에서 신고 방법은 다음과 같습니다.</p>
                        <ul>
                            <li>1. 나타나는 신고 양식에 필요한 정보를 정확히 기입합니다.</li>
                            <li>2. 등록 버튼을 클릭하여 신고를 완료합니다.</li>
                        </ul>
                        <p>신고 유형 의심</p>
                        <ul>
                            <li>1. 고의적으로 리뷰를 테러할 경우</li>
                            <li>2. 욕설 및 폭언이 심할 경우</li>
                            <li>3. 쿠폰 등을 도용할 경우</li>
                            <li>4. 포인트가 누락될 경우</li>
                        </ul>
                    </fieldset>
                </form>
            </div>
            
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>

            

                <div className="writer">
                    <input type="id" placeholder="작성자" value={userId} onChange={onChangeId}/>
                </div>

                <div className="title">
                    <input type="text" placeholder="글 제목" value={title} onChange={onChangeTitle}/>
                </div>

                <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="신고 내용을 기입해주세요."
                    className="textarea"/>

                <div className="reportBtn">
                    <button onClick={handleSubmit}>등록</button>
                </div>
            
        </AdminDeclarationBlock>
    );
}

export default Report;