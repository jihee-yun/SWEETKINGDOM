import React from "react";
import styled from "styled-components";
import { useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

const AdminDeclarationBlock = styled.div`
    position: relative;
    display: flex;
    background-color: white;
    justify-content: center;
    margin-right: 250px;
    margin-left: 60px;
    margin-top: 60px;
    

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
        margin-top: 50px;
        margin-right: 20px; /* 로고와의 간격 조정을 위한 우측 마진 추가 */
    }

    .title img {
        width: 120px;
        height: 100px;
    }

    .textarea {
        width: 500px;
        height: 300px;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-left: 20px;
        font-size: 15px;
    }

    .report {
        font-family: Arial, sans-serif;
        max-width: 750px;
        height: 550px;
        margin-left : 30px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f7f7f7;
    }

    legend {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        font-size: 20px;
    }

    ul {
        margin: 5px;
        padding-left: 40px;
    }

    fieldset {
        border: none;
        margin: 10px;
        padding: 0;
    }

    li {
        margin-bottom: 5px;
        font-size: 20px;
    }

    .reportBtn {
        display: flex;
        justify-content: center;
    }

    .reportBtn button {
        width: 150px;
        height: 30px;
        margin-top: 40px;
        border: none;
        background-color: #FFCFDA;
        cursor: pointer;
    }

    .logo {
        width: 120px;
        height: 120px;
        align-items: center;
        margin-top: 10px;
        margin-left: 120px;
        cursor: pointer;
    }

    .reportTypes {
        display: flex;
        gap: 16px;
    }

    .reportTypes span{
        margin-left: 5px;
    }

    input[type="checkbox"] {
        width: 10px;
        height: 10px;
        transform: scale(1.5);
    }


    @media (max-width: 768px) {

        .report {
            width: 30%;
            margin-left: 0;
            margin-right: -80px;
        }

        .report-content {
            max-height: none;
        }

        .textarea {
            width: 450px;
        }

        legend {
            font-size: 14px;
            margin-bottom: 5px;
        }

        p {
            font-size: 14px;
        }

        ul {
            padding-left: 20px;
        }

        li {
            font-size: 14px;
        }

        .reportBtn button {
            width: 100px;
            height: 20px;
            margin-top: 20px;
            font-size: 12px;
        }

        .logo {
            width: 80px;
            height: 80px;
            margin-top: 10px;
            margin-left: 80px;
            cursor: pointer;
        }

        .reportTypes span {
            font-size: 12px;
        }

        input[type="checkbox"] {
            width: 12px;
            height: 12px;
            transform: scale(1.2);
        }
    }    
`;

const Report = () => {
    const navigate = useNavigate("");

    const [reportText, setReportText] = useState("");
    const [reportTypes, setReportTypes] = useState([]);

    const handleSubmit = () => {
        setReportText('');
    }

    const handleReportTypeChange = (value, checked) => {
        if (checked) {
            // 선택된 신고유형을 reportTypes 배열에 추가
            setReportTypes([...reportTypes, value]);
        } else {
            // 선택 해제된 신고유형을 reportTypes 배열에서 제거
            setReportTypes(reportTypes.filter(type => type !== value));
        }
    };

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
                            <li>1. 신고 유형의 체크 박스를 선택합니다.</li>
                            <li>2. 나타나는 신고 양식에 필요한 정보를 정확히 기입합니다.</li>
                            <li>3. 등록 버튼을 클릭하여 신고를 완료합니다.</li>
                        </ul>
                        <p>신고 유형 의심</p>
                        <ul>
                            <li>1. 고의적으로 리뷰를 테러할 경우</li>
                            <li>2. 욕설 및 폭언이 심할 경우</li>
                            <li>3. 쿠폰 등을 도용할 경우</li>
                        </ul>
                    </fieldset>
                </form>
            </div>
            
            <div className="logo">
                <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
            </div>

            <div className="container">
                <div className="title">
                    <h2>신고</h2>
                </div>

                <div className="reportTypes">
                    <label>
                        <input
                            type="checkbox"
                            value="포인트 누락"
                            onChange={(e) => handleReportTypeChange(e.target.value, e.target.checked)}
                        />
                        <span>포인트 누락</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="쿠폰 도용"
                            onChange={(e) => handleReportTypeChange(e.target.value, e.target.checked)}
                        />
                        <span>쿠폰 도용</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="욕설 및 폭언"
                            onChange={(e) => handleReportTypeChange(e.target.value, e.target.checked)}
                        />
                        <span>욕설 및 폭언</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="리뷰 테러"
                            onChange={(e) => handleReportTypeChange(e.target.value, e.target.checked)}
                        />
                        <span>리뷰 테러</span>
                    </label>
                </div>

                <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="신고 유형의 체크박스를 선택하시고, 신고 내용을 기입해주세요."
                    className="textarea"/>

                <div className="reportBtn">
                    <button onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </AdminDeclarationBlock>
    );
}

export default Report;