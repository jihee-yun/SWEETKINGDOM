import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import user from "../images/user1.png";
import member from "../images/role-member.png";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  /* margin: 0 auto; */
`;

const SelectBox = styled.div`
   @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
  width: 50%;
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 50px;
`;

const SelectAuth = styled.div`
 @media (max-width: 768px) {
    width: 150px;
    height: 200px;
    font-size: 1.2rem;
  }

  margin: 0 auto;
  width: 230px;
  height: 300px;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 1px 0px 3px lightgray;
  font-size: 1.8rem;
  font-weight: bold;
  color: darkgray;
  cursor: pointer;

  img{
    @media (max-width: 768px) {
    margin-top: 60px;
    width: 50px;
    height: 50px;
  }
    margin-top: 80px;
    width: 100px;
    height: 100px;
  }

  .box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  transition: all 0.3s;
  &:hover{
    transform: scale(1.02);
  }
`;

const TextBox = styled.p`
  font-size: 1rem;
  margin: 0;
  h5{
    color: darkgray;
  }
`;

const MemberSignUpPage = () => {
  const navigate = useNavigate();

  // 일반 회원, 사업자 회원 구분
  const [authority, setAuthority] = useState("");

  console.log(authority);

  const selectAuth = (index) => {
    if(index === 1) {
      setAuthority("ROLE_USER")
    } else setAuthority("ROLE_MEMBER");
  }

  useEffect(() => {
    if (authority !== "") {
      navigate("/signupform", { state: { authority }});
    }
  }, [authority]);

  return (
    <>
    <Header />
    <Container>
      <TextBox><h2>SWEET KINGDOM 회원가입</h2></TextBox>
      <TextBox><h5>해당하는 유형을 선택하여 회원가입을 진행해주세요<br />사업자 회원의 경우 최대 1주일의 심사가 진행됩니다</h5></TextBox>
      <br /><br />
      <SelectBox>
        <SelectAuth onClick={() => selectAuth(1)}>
          <div className="box">
            <img src={user} alt="일반 유저" />
            <p>일반 회원</p>
          </div>
        </SelectAuth>
        <SelectAuth onClick={() => selectAuth(2)}>
        <div className="box">
            <img src={member} alt="사업자 유저" />
            <p>사업자 회원</p>
          </div>
        </SelectAuth>
      </SelectBox>
    </Container>
    <Footer />
    </>
  );
};

export default MemberSignUpPage;