import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "./Api/AxiosApi";
import logo from "../../images/logo.png";
import Modal from "./Modal";

const SignUpBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  .logo {
    cursor: pointer;
  }

  .agreeContents {
    width: 600px;
    height: 250px;
    overflow: auto;
    border: 1px solid black;
    padding: 10px;
    white-space: pre-wrap;
    border-radius: 5px;
    font-size: 15px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .Info {
    font-size: 12px;
  }

  .hint {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .name {
    margin-bottom :30px;
  }

  .email {
    margin-top: 10px;
  }

  .message {
    font-size: 14px;
    margin-left: 5px;
  }

  .message.success {
    color: green;
  }

  .message.error {
    color: red;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 40px;
  }

  .label {
    margin-right: 10px;
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .radio-group {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .radio-group label {
    margin-right: 10px;
    font-size: 18px;
  }

  input[type="radio"] {
    margin-left: 60px;
  }

  
  .item1 button{
    border-radius: 5px;
    border: 1px solid black;
    border: none;
    font-size: 15px;
    color : black;
    background-color: #FFCFDA;
    width: 80px;
    height: 30px;
    cursor: pointer;
  }

  .signBtn {
    display: flex;
    justify-content: flex-end;
    margin-right: 220px;
  }

  .signBtn button {
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      border: none;
      border-radius: 5px;
      width: 180px;
      height: 30px;
      font-size: 20px;
      background-color: #FFCFDA;
      cursor: pointer;
  }
  
  input[type="checkbox"] {
    height: 12px;
  }

  img {
    width: 150px;
    height: 130px;
    display: flex;
  }


  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;

    .agreeContents {
      width: 100%;
      max-width: 450px;
    }

    .container {
      align-items: center;
    }

    .row {
      flex-direction: row;
      margin-left: 0;
      margin-right: 90px;
    }

    .label {
      font-size: 20px;
      margin-right: 30px;
      display: flex;
      align-items: center;
    }

    input[type="radio"] {
      margin-left: 10px;
    }

    .item1 {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 0;
    }

    .item1 button {
      width: 20%;
      margin-left: 30px;
      margin-top: 10px;
    }

    .signBtn {
      justify-content: center;
      margin-right: 0;
    }

    .signBtn button {
      width: 50%;
    }
  }
`;
    


const SignUpContainer = styled.div`
  padding: 50px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
`;

const SignTitle = styled.div`
    font-size: 25px;
    text-align: center;
    margin-bottom: 10px;
    margin-left: -60px;
    color: #FFCFDA;
    font-weight: bolder;

    @media (max-width:768px) {
        margin-left: 15px;
    }
`;

const SignAgree = styled.div`
    font-size: 18px;
`;

const Input = styled.input`
  margin-left: 30px;
  margin-top: 10px;
  margin-right: 30px;
  width: 400px; /* 원하는 너비 설정 */
  height: auto; /* 높이값 초기화 */
  line-height : normal; /* line-height 초기화 */
  padding: .8em .5em; /* 원하는 여백 설정, 상하단 여백으로 높이를 조절 */
  border: 1px solid #999;
  border-radius: 18px; /* iSO 둥근모서리 제거 */
  outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */

  @media (max-width:768px) {
    margin-top: 30px;
    width: 350px;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();

  // 아이디, 비밀번호, 전화번호, 이메일, 생일, 성별, 사업자+회원
  const [userID, setUserID] = useState("");
  const [passWord, setPassWord] = useState("");
  const [conPw, setConPw] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [authority, setAuthority] = useState("");
  

  // 오류 메세지
  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [conPwMsg, setConPwMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [birthMsg, setBirthMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");

  // 유효성 검사
  const [isID, setIsID] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  // 팝업
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("중복된 아이디 입니다.");

  // 약관 동의
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  // 이름
  const onChangeName = (e) => {
    setName(e.target.value);
  }

  // 성별
  const handleGender = (e) => {
    setGender(e.target.value);
  }

  // 사업자 or 회원
  const handleAuthority = (e) => {
    setAuthority(e.target.value);
  }

  const closeModal = () => {
    setModalOpen(false);
    navigate('/');
  }

  // 아이디 정규식
  const onChangeId = (e) => {
    setUserID(e.target.value)
    if (e.target.value.length < 5 || e.target.value.length > 12) {
        setIdMsg("5자리 이상 12자리 미만으로 입력해 주세요.");
        setIsID(false);    
    } else {
        setIdMsg("올바른 형식 입니다.");
        setIsID(true);
    }
}

  // 비밀번호 정규식 확인
  const onChangePw = (e) => {
    const passwordRex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,15}$/;
    const currentPw = e.target.value;
    setPassWord(currentPw);
    if (!passwordRex.test(currentPw)) {
      setPwMsg("숫자+영문자+특수문자 조합으로 7자리 이상 입력해주세요.");
      setIsPw(false);
    } else {
      setPwMsg("안전한 비밀번호에요!");
      setIsPw(true);
    }
  };

  // 비밀번호 확인 일치 여부
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setConPw(passwordCurrent);
    if (passwordCurrent !== passWord) {
      setConPwMsg("비밀번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMsg("비밀번호가 일치 합니다.");
      setIsConPw(true);
    }
  };

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

  // 아이디 중복확인
  const onClickIdCheck = async() => {
        console.log(userID);
        const mailCheck = await AxiosApi.checkId(userID);
        console.log(mailCheck.data);
        if(mailCheck.data === true) {
            setIdMsg("이미 사용중인 아이디입니다.");
            setIsID(false);
        }else{
            setIdMsg("사용 가능한 아이디입니다.");
            setIsID(true);
        }
  }

  // 생일 정규식
  const onChangeBirth = (e) => {
    const validBirthDay = (birthday) => {
      const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
      return birthdateRegex.test(birthday);
    };
    setBirthDay(e.target.value);
    if(!validBirthDay(e.target.value)) {
      setBirthMsg("올바른 형식의 생년월일을 입력하세요 (yyyy-mm-dd).");
      setIsBirth(false);
    }else{
      setBirthMsg("유효한 생년월일입니다.");
      setIsBirth(true);
    }
  }

  // 전화번호 정규식
  const onChnagePhoneNum = (e) => {
    const validPhoneNum = (phoneNum) => {
      const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
      return phoneRegex.test(phoneNum);
    };
    setPhoneNum(e.target.value);
    if(!validPhoneNum(e.target.value)) {
      setPhoneMsg("올바른 형식의 전화번호를 입력하세요.");
      setIsPhone(false);
    }else{
      setPhoneMsg("유효한 전화번호입니다.");
      setIsPhone(true);
    }
  }
  
    
    

  const LogoClick = () => {
        navigate('/');
  }
  

  const handleSubmit = async() => {
      const signUp = await AxiosApi.userReg(userID, passWord, name, phoneNum, email, birthday, gender, authority);
      console.log(signUp);
      setModalText("회원가입이 완료되었습니다.");
      setModalOpen(true);
  };

  return (
    <SignUpBlock>
    <SignUpContainer>
       <img src={logo} alt="logo" className="logo" onClick={LogoClick}/>
      <SignTitle>회원가입</SignTitle>
        <br/>
          <SignAgree>약관동의</SignAgree>
             <div className="agreeContents">
                        제 1 조 (목적)
                            <br />
                            이 약관은 Sweet Kingdom(이하 "사이트"라 합니다)에서 제공하는 인터넷서비스(이하 "서비스"라 합니다)의 이용 조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다.
                            <br />
                            <br /> 

                            제 2 조 (약관의 효력 및 변경)
                            <br />
                            ① 이 약관은 서비스 화면이나 기타의 방법으로 이용고객에게 공지함으로써 효력을 발생합니다.
                            <br />
                            ② 사이트는 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력을 발생합니다.
                            <br />

                            제 3 조 (용어의 정의)
                            <br />
                            이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                            <br />
                            ① 회원 : 사이트와 서비스 이용계약을 체결하거나 이용자 아이디(ID)를 부여받은 개인 또는 단체를 말합니다.
                            <br />
                            ② 신청자 : 회원가입을 신청하는 개인 또는 단체를 말합니다.
                            <br />
                            ③ 아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이 정하고 사이트가 승인하는 문자와 숫자의 조합을 말합니다.
                            <br />
                            ④ 비밀번호 : 회원이 부여 받은 아이디(ID)와 일치된 회원임을 확인하고, 회원 자신의 비밀을 보호하기 위하여 회원이 정한 문자와 숫자의 조합을 말합니다.
                            <br />
                            ⑤ 해지 : 사이트 또는 회원이 서비스 이용계약을 취소하는 것을 말합니다.
                            <br />

                            

                            제 2 장 서비스 이용계약
                            <br />
                            

                            제 4 조 (이용계약의 성립)
                            <br />
                            ① 이용약관 하단의 동의 버튼을 누르면 이 약관에 동의하는 것으로 간주됩니다.
                            <br />
                            ② 이용계약은 서비스 이용희망자의 이용약관 동의 후 이용 신청에 대하여 사이트가 승낙함으로써 성립합니다.
                            <br />
                            <br />
                            

                            제 5 조 (이용신청)
                            <br />
                            ① 신청자가 본 서비스를 이용하기 위해서는 사이트 소정의 가입신청 양식에서 요구하는 이용자 정보를 기록하여 제출해야 합니다.
                            <br />
                            ② 가입신청 양식에 기재하는 모든 이용자 정보는 모두 실제 데이터인 것으로 간주됩니다. 실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를 받을 수 없으며, 서비스의 제한을 받을 수 있습니다.
                            <br />
                            <br />

                            제 6 조 (이용신청의 승낙)
                            <br />
                            ① 사이트는 신청자에 대하여 제2항, 제3항의 경우를 예외로 하여 서비스 이용신청을 승낙합니다.
                            <br />
                            ② 사이트는 다음에 해당하는 경우에 그 신청에 대한 승낙 제한사유가 해소될 때까지 승낙을 유보할 수 있습니다.
                            <br />
                            가. 서비스 관련 설비에 여유가 없는 경우
                            <br />
                            나. 기술상 지장이 있는 경우
                            <br />
                            다. 기타 사이트가 필요하다고 인정되는 경우
                            <br />
                            ③ 사이트는 신청자가 다음에 해당하는 경우에는 승낙을 거부할 수 있습니다.
                            <br />
                            가. 다른 개인(사이트)의 명의를 사용하여 신청한 경우
                            <br />
                            나. 이용자 정보를 허위로 기재하여 신청한 경우
                            <br />
                            다. 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우
                            <br />
                            라. 기타 사이트 소정의 이용신청요건을 충족하지 못하는 경우
                            <br />
                            <br />

                            

                            제 7 조 (이용자정보의 변경)
                            <br />
                            회원은 이용 신청시에 기재했던 회원정보가 변경되었을 경우에는, 온라인으로 수정하여야 하며 변경하지 않음으로 인하여 발생되는 모든 문제의 책임은 회원에게 있습니다.
                            <br />
                            <br />
                            

                            제 3 장 계약 당사자의 의무
                            <br />
                            <br />

                            제 8 조 (사이트의 의무)
                            <br />
                            ① 사이트는 회원에게 각 호의 서비스를 제공합니다.
                            <br />
                            가. 신규서비스와 도메인 정보에 대한 뉴스레터 발송
                            <br />
                            나. 추가 도메인 등록시 개인정보 자동 입력
                            <br />
                            다. 도메인 등록, 관리를 위한 각종 부가서비스
                            <br />
                            ② 사이트는 서비스 제공과 관련하여 취득한 회원의 개인정보를 회원의 동의없이 타인에게 누설, 공개 또는 배포할 수 없으며, 서비스관련 업무 이외의 상업적 목적으로 사용할 수 없습니다. 단, 다음 각 호의 1에 해당하는 경우는 예외입니다.
                            <br />
                            가. 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우
                            <br />
                            나. 범죄에 대한 수사상의 목적이 있거나 정보통신윤리 위원회의 요청이 있는 경우
                            <br />
                            다. 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우
                            <br />
                            ③ 사이트는 이 약관에서 정한 바에 따라 지속적, 안정적으로 서비스를 제공할 의무가 있습니다.
                            <br />
                            <br />

                            제 9 조 (회원의 의무)
                            <br />
                            ① 회원은 서비스 이용 시 다음 각 호의 행위를 하지 않아야 합니다.
                            <br />
                            가. 다른 회원의 ID를 부정하게 사용하는 행위<br />
                            나. 서비스에서 얻은 정보를 사이트의 사전승낙 없이 회원의 이용 이외의 목적으로 복제하거나 이를 변경, 출판 및 방송 등에 사용하거나 타인에게 제공하는 행위<br />
                            다. 사이트의 저작권, 타인의 저작권 등 기타 권리를 침해하는 행위<br />
                            라. 공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등을 타인에게 유포하는 행위<br />
                            마. 범죄와 결부된다고 객관적으로 판단되는 행위<br />
                            바. 기타 관계법령에 위배되는 행위<br />
                            ② 회원은 관계법령, 이 약관에서 규정하는 사항, 서비스 이용 안내 및 주의 사항을 준수하여야 합니다.<br />
                            ③ 회원은 내용별로 사이트가 서비스 공지사항에 게시하거나 별도로 공지한 이용 제한 사항을 준수하여야 합니다.<br /><br />

                            

                            제 4 장 서비스 제공 및 이용
                            <br />
                            

                            제 10 조 (회원 아이디(ID)와 비밀번호 관리에 대한 회원의 의무)<br />
                            ① 아이디(ID)와 비밀번호에 대한 모든 관리는 회원에게 책임이 있습니다. 회원에게 부여된 아이디(ID)와 비밀번호의 관리소홀, 부정사용에 의하여 발생하는 모든 결과에 대한 전적인 책임은 회원에게 있습니다.<br />
                            ② 자신의 아이디(ID)가 부정하게 사용된 경우 또는 기타 보안 위반에 대하여, 회원은 반드시 사이트에 그 사실을 통보해야 합니다.
                            <br /><br />

                            [부칙]
                            <br />
                            

                            (시행일) 이 약관은 2023년 08월부터 시행합니다.<br />
                            
                    </div>
                <div className="myCheck">
                    <label for="myCheckbox">Sweet Kingdom 회원 약관에 동의합니다.
                    <input type="checkbox" id="myCheckbox" checked={isChecked} onChange={handleCheckBox}/>
                    </label>
                </div>


                <br/>
                <br/>

                <div className="Info">
                    <h3>회원정보 입력</h3>
                </div>

                <div className="item1">
                    <Input type="email" placeholder="아이디" value={userID} onChange={onChangeId}/>
                        <button classname="checkID" onClick={onClickIdCheck}>중복확인</button>
                </div>

                <div className="hint">
                    {userID.length > 0 && (<span className={`message ${isID ? 'success' : 'error'}`}>{idMsg}</span>)}
                </div>

                <br/>            

                <div classname="item2">
                    <Input type="password" placeholder="비밀번호" value={passWord} onChange={onChangePw}/>
                </div>

                <div className="hint">
                    {passWord.length > 0 && (<span className={`message ${isPw ? 'success' : 'error'}`}>{pwMsg}</span>)}
                </div>

                <br/>

                <div className="item3">
                    <Input type="password" placeholder="비밀번호 확인" value ={conPw} onChange={onChangeConPw}/>
                </div>


                <div className="hint">
                    {passWord.length > 0 && (<span className={`message ${isConPw ? 'success' : 'error'}`}>{conPwMsg}</span>)}
                </div>

                <br/>

                <div className="name">
                  <Input type="name" placeholder="이름" value={name} onChange={onChangeName}/>
                </div>

                <div classname="phone">
                  <Input type="phone" placeholder="전화번호" value={phoneNum} onChange={onChnagePhoneNum}/>
                </div>


                <div className="hint">
                    {phoneNum.length > 0 && (<span className={`message ${isPhone ? 'success' : 'error'}`}>{phoneMsg}</span>)}
                </div>

                <br/>


                <div className="email">
                  <Input type="email" placeholder="이메일" value={email} onChange={onChangeEmail}/>
                </div>


                <div className="hint">
                    {email.length > 0 && (<span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMsg}</span>)}
                </div>
                
                <br/>

                <div className="birthday">
                    <Input type="text" placeholder="생년월일(YYYY-MM-DD)" value={birthday} onChange={onChangeBirth}/>
                </div>

                <div className="hint">
                    {birthday.length > 0 && (<span className={`message ${isBirth ? 'success' : 'error'}`}>{birthMsg}</span>)}
                </div>

                <br/>

                <div className="container">
                  <div className="row">
                    <span className="label">성별 </span>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          value="MALE"
                          checked={gender === 'MALE'}
                          onChange={handleGender}
                        />
                        남성
                      </label>

                      <label>
                        <input
                          type="radio"
                          value="FEMALE"
                          checked={gender === 'FEMALE'}
                          onChange={handleGender}
                        />
                        여성
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <span className="label">권한 </span>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          value="ROLE_USER"
                          checked={authority === 'ROLE_USER'}
                          onChange={handleAuthority}
                        />
                        일반
                      </label>

                      <label>
                        <input
                          type="radio"
                          value="ROLE_MEMBER"
                          checked={authority === 'ROLE_MEMBER'}
                          onChange={handleAuthority}
                        />
                        사업자
                      </label>
                    </div>
                  </div>
                </div>
    

                
                <div className="signBtn">
                  {(isChecked && isID && isPw && isConPw && isEmail && isBirth && isPhone) ?
                    <button className="enable-button" onClick={handleSubmit}>회원가입</button> :
                    <button className="disable-button">회원가입</button>}
                    <Modal open={modalOpen} close={closeModal} header="Sweet Kingdom">{modalText}</Modal>
                </div>
    </SignUpContainer>
  </SignUpBlock>
  );
};

export default SignUp;