import axios from "axios";

const MemberApi = {
  // 일반 회원 가입
  userSignup : async (userId, password, name, phone, email, birthday, gender, authority) => {
    const signupData = {
      userId : userId,
      password : password,
      name : name,
      phone : phone,
      email : email,
      birthday : birthday,
      gender : gender,
      authority : authority
    }
    return await axios.post(`/user/signup`, signupData);
  },

  // 사업자 회원 가입
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

  // 일반 회원 로그인
  userLogin : async (userId, password) => {
    const loginData = {
      userId : userId,
      password : password
    }
    return await axios.post(`/user/login`, loginData);
  },
  // 사업자 회원 로그인
  memberLogin : async (memberId, password) => {
    const loginData = {
      memberId : memberId,
      password : password
    }
    return await axios.post(`/member/login`, loginData);
  },

  // 조회에 사용될 일반 회원 번호 조회
//  userNumGet : async (userId) => {
//    const userIdData = {
//      userId : userId
//    }
//    return await axios.post(`${DOMAIN}/user/numget`, userIdData);
//  },

  // 조회에 사용될 사업자 회원 번호 조회
//  memberNumGet : async (memberId) => {
//    const memberIdData = {
//      memberId : memberId
//    }
//    return await axios.post(`${DOMAIN}/member/numget`, memberIdData);
//  },



  // 마이페이지 정보수정을 위한 회원 정보 조회
  getMemberInfo: async (memberNum, grantType, accessToken) => {
    return await axios.get(`/info/memberinfo?membernum=${memberNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 한줄소개 업데이트 테스트
  introUpdate: async (memberNum, intro, grantType, accessToken) => {
    const introData = {
      memberNum : memberNum,
      intro : intro
    }
    return await axios.post(`/info/introchange`, introData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },
  // 전화 번호 업데이트
  phoneUpdate: async(memberNum, phone, grantType, accessToken) => {
    const phoneData = {
      memberNum : memberNum,
      phone : phone
    }
    return await axios.post(`/info/phonechange`, phoneData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  }

};
export default MemberApi;