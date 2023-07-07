import axios from "axios";
//const DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 리뷰 전체 다 불러오기(테스트용)
  reviewGet: async (userNum) => {
    return await axios.get(`/review/getbynum?usernum=${userNum}`);
  },

  // 회원 번호로 리뷰 조회
  reviewGetByDate : async (userNum, startDate, endDate) => {
    const checkData = {
      userNum : userNum,
      startDate : startDate,
      endDate : endDate
    }
    return await axios.post(`/review/getbynum&date`, checkData);
  },







  // memberLogin: async(memberId, password) => {
  //   const loginData = {
  //       memberid: memberId,
  //       password: password,
  //     };
    
  //     try {
  //       const response = await axios.post(KH_DOMAIN +'/member/login', loginData);
  //       const { authToken } = response.data; // 서버에서 발급한 토큰 받아오기
    
  //       // 토큰 저장 (로컬 스토리지 등에 저장)
  //       localStorage.setItem('authToken', authToken);
    
  //       // 이후에 API 요청 시 헤더에 토큰 포함하여 보내기
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    
  //       return response.data; // 로그인 성공 시 추가 작업을 위해 필요한 데이터 반환
  //     } catch (error) {
  //       // 로그인 실패 처리
  //       throw new Error('로그인에 실패했습니다.');
  //     }
  //   }
};
export default AxiosApi;