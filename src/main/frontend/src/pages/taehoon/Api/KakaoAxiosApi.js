import axios from "axios"

const KakaoAxiosApi =  {
    kakaoAuthCode : async(authorizationCode) => {
        try {
          const kakaoLogin = {
          authorizationCode : authorizationCode
        };
        return await axios.post("/kakao", kakaoLogin);
        } catch (error) {
          throw error;
        }
      }
};


export default KakaoAxiosApi;