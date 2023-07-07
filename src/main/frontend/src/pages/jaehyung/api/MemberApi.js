import axios from "axios";
//const DOMAIN = "http://localhost:8111";

const MemberApi = {
  // 사업자 회원 로그인
  memberSignup : async (memberId, password, name, phone, email, birthday, gender, authority) => {
    const signupData = {
      memberId : memberId,
      password : password,
      name : name,
      phone : phone,
      email : email,
      birthday : birthday,
      gender : gender,
      authority : authority
    }
    return await axios.post(`/member/signup`, signupData);
  },

  memberLogIn : async (memberId, password, authority) => {
    const logInData = {
      memberId : memberId,
      password : password,
      authority : authority
    }
    return await axios.post(`/member/login`, logInData);
  }



};
export default MemberApi;