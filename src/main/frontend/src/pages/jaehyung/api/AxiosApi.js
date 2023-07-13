import axios from "axios";

const AxiosApi = {
  // 리뷰 전체 다 불러오기(테스트용)
  reviewGet: async (userNum, grantType, accessToken) => {
    return await axios.get(`/review/getbynum?usernum=${userNum}`, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  },

  // 회원 번호로 날짜 내의 리뷰 조회
  reviewGetByDate : async (userNum, startDate, endDate, grantType, accessToken) => {
    const checkData = {
      userNum : userNum,
      startDate : startDate,
      endDate : endDate
    }
    return await axios.post(`/review/getbynumdate`, checkData, {
      headers: {
        Authorization: `${grantType} ${accessToken}`
      }
    });
  }
};
export default AxiosApi;