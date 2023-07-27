import React, { useState } from "react";
import { styled } from "styled-components";
import AxiosApi from "../api/AxiosApi";
import Modal from "../utils/Modal2";
import CompleteModal from "../utils/CompleteModal";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 100px;

    p {
    font-size: .75rem;
    color: #9da1a8;
    line-height: 1.5;
    margin-top: 0.5rem;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    }

    *{
        box-sizing: border-box;
    }
`;

const Form = styled.div`
    @media (max-width: 768px) {
    width: 100%;
   }
    width: 70%;
    margin-top: 0em;

`;

const EmailBox = styled.div`
    display: flex;
    flex-direction: row;

.email {
    width: 100px;
    margin-right: 20px;
    font-weight: bold;
    font-size: 1rem;
    line-height: 3.125rem;
    color: #202225;
}
`

const CategoryBox = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    /* justify-content: center; */
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 1rem;

    .box {
        gap: 10px;
        display: flex;
        flex-direction: column;
    }

    .category {
        width: 100px;
        margin-right: 10px;
    }

    button {
        cursor: pointer;
        font-weight: bold;
        margin-right: 10px;
        height: 30px;
        width: 80px;
        border-radius: 20px;
        border: 1px solid lightgray;
    }
`;

const InputBox = styled.div`
    width: 100%;

    .requestemail{
    width: 100%;
    border: 0.0625rem solid #e6e8ed;
    border-radius: 0.25rem;
    padding: 0.8125rem 0.9375rem;
    color: #202225;
    font-size: 1rem;
    line-height: 1.5;
}

`;

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 0.75rem;

    .content{
    width: 100px;
    margin-right: 20px;
    font-weight: bold;
    font-size: 1rem;
    line-height: 3.125rem;
    color: #202225;
    }


`;

const InputBox2 = styled.div`
width: 100%;

.contentbox{
    width: 100%;
    height: 21rem;
    }

    textarea {
    resize: none;
    box-sizing: border-box;
    outline: 0;
    box-shadow: none;
    appearance: none;
    -webkit-appearance: none;
    display: block;
    border: 0.0625rem solid #e6e8ed;
    border-radius: 0.25rem;
    padding: 0.5rem 0.75rem;
    font-size: .875rem;
    }
`

const BUTTON = styled.div`
    margin-top: 3.125rem;
    display: flex;
    justify-content: center;
    

    button {
    @media (max-width: 768px) {
    width: 100px;
   }
    width: 200px;
    height: 30px;
    border-radius: 15px;
    border: none;
    font-weight: bold;
    background-color: #FFCFDA;
    color: #585858;
    cursor: pointer;

    &:hover {
        color: white;
    }
    }
`

const Request = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userNum = localStorage.getItem("userNum");
    const grantType = localStorage.getItem("grantType");
    const accessToken = localStorage.getItem("accessToken");

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const changeContent = (e) => {
        setContent(e.target.value);
    }

    console.log(userNum);

    const summit = async() => {
        if(!userNum) {
            setIsModalOpen(true);
        } else {
             const response = await AxiosApi.summitReport(userNum, grantType, accessToken, category, questionType, title, content);
            if(response.data === true) {
                setIsModalOpen(true);
            }
        }
    }

    const complete = (index) => {
        if(index === 1) {
            navigate('/');
        } else navigate('/memberlogin')
      }
    

    const closeModal = () => {
        setIsModalOpen(false);
    };


    console.log(questionType);
    console.log(category);
    console.log(title);
    console.log(content);

    return(
        <Container>
            <Form>
        
            <CategoryBox>
                <div className="category">유형 선택</div>
                <div className="box">
                <div className="type">
                    <button onClick={() => setQuestionType("REQUEST")} style={{ boxShadow: questionType === "REQUEST" ? "inset 1px 1px 1px lightgray" : "none", backgroundColor: questionType === "REQUEST" ? "#FFCFDA" : "white" }}>문의</button>
                    <button onClick={() => setQuestionType("REPORT")} style={{ boxShadow: questionType === "REPORT" ? "inset 1px 1px 1px lightgray" : "none", backgroundColor: questionType === "REPORT" ? "#FFCFDA" : "white" }}>신고</button>
                </div>
                <div className="type">
                    <button onClick={() => setCategory("USER")} style={{ boxShadow: category === "USER" ? "inset 1px 1px 1px lightgray" : "none", backgroundColor: category === "USER" ? "#FFCFDA" : "white" }}>일반 회원</button>
                    <button onClick={() => setCategory("BUSINESS")} style={{ boxShadow: category === "BUSINESS" ? "inset 1px 1px 1px lightgray" : "none", backgroundColor: category === "BUSINESS" ? "#FFCFDA" : "white" }}>사업자 회원</button>
                </div>
                </div>
            </CategoryBox>   
            <EmailBox>
                <div className="email">문의 제목</div>
                <InputBox>
                <input type="text" className="requestemail" onChange={changeTitle}></input>
                {/* <p>입력하신 이메일로 답변이 발송됩니다.</p> */}
                </InputBox>
            </EmailBox>
            <ContentBox>
                <div className="content">문의 내용</div>
                <InputBox2>
                <textarea type="text" placeholder="문의 내용을 입력해 주세요." className="contentbox" onChange={changeContent}></textarea>
                </InputBox2>
            </ContentBox>
            <BUTTON>
                <button className="button" onClick={summit}>등록</button>
            </BUTTON>
            </Form>
            <Modal move={true} header="완료" open={isModalOpen} confirm={userNum ? () => complete(1) : () => complete(2)} close={closeModal}>
                <CompleteModal content={userNum ? "문의가 등록되었습니다" : "로그인이 필요합니다. 로그인 페이지로 이동할까요?"} maxCharacters={userNum ? 0 : 11}/>
            </Modal>
        </Container>
    );
};

export default Request;