import axios from "axios";
//const KH_DOMAIN = "http://localhost:8111";

const AxiosApi = {
      // 회원가입 여부 
      checkId : async(userId) => {
        return await axios.get(`/user/check?userId=${userId}`);
      },
      
        // 회원가입
        userReg : async(userId, password, name) => {
            const member ={
                userId : userId,
                password: password,
                name : name
        };
            return await axios.post("/user/new", member);
        },

        // 로그인
        userLogin: async (userId, password) => {
        const loginData = {
          userId: userId,
          password: password,
        };

        try {
          const response = await axios.post("/user/login", loginData);
          return response.data; // 로그인 성공 시 추가 작업을 위해 필요한 데이터 반환
        } catch (error) {
          // 로그인 실패 처리
          throw new Error('로그인에 실패했습니다.');
        }
      },

        // 관리자 등록
        adminReg : async(name, gender, age, adminId, adminPw) => {
          const admin = {
            name : name,
            gender : gender,
            age : age,
            adminId : adminId,
            adminPw : adminPw
          };
          return await axios.post("/admin", admin);
        } 
    };

export default AxiosApi;