import axios from "axios";

const AxiosApi = {
      // 회원가입 여부 
      checkId : async(userId) => {
        return await axios.get(`/user/check?userId=${userId}`);
      },
      
        // 회원가입
        userReg : async(userId, password, name, phone, email, birthday, gender, authority) => {
            const member ={
                userId : userId,
                password: password,
                name : name,
                phone : phone,
                email : email,
                birthday : birthday,
                gender : gender,
                authority : authority
        };
            return await axios.post("/user/new", member);
        },

         // 로그인
        userLogin: async (userId, password, grantType, accessToken) => {
          console.log('grantType:', grantType);
          console.log('accessToken:', accessToken);
        
          const loginData = {
            userId: userId,
            password: password
          };
        
        return await axios.post("/user/login", loginData, {
          headers: {
            Authorization: `${grantType} ${accessToken}`
          }
        });
      },

      // 비밀번호 찾기
      findPw: async(email) => {
        const data = {
            email: email
        };
        return await axios.post("/findpw", data);
    },

    // 아이디 찾기
    findId : async(email) => {
      const data = {
        email : email
      };
      return await axios.post("/findId", data);
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
        },
        
        // // 신고 내역 조회
        reportGet : async(reportNum, userId, title, reportDate) => {
          const report = {
            reportNum : reportNum,
            userId : userId,
            title : title,
            reportDate : reportDate

          };
          return await axios.get(`/report/getReportNum?reportNum=${reportNum}`, report);
        }

    };

export default AxiosApi;