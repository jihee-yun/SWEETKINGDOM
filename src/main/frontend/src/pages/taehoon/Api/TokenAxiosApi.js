import axios from "axios";
//const KH_DOMAIN = "http://localhost:8111";

const TokenAxiosApi = {
    // 사용자의 ID와 비밀번호를 전달받아 서버로 POST 요청
    getToken : async(userId, pw) => {
        const token = {
            userId : userId,
            pw: pw
        };
        return await axios.post("/auth", token, {
            headers : {
                'Content-Type' : 'application/json' 
            }
        });
    },

    // 토큰을 전달받아 서버로 GET 요청
    userInfo : async(token) => {
        return await axios.get("/user", {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        });
    },

    // 사용자 정보 업데이트
    editInfo : async(data) => {
        const updateData = {
            id : data.id,
            pw : data.pw,
            token : data.token
        };
        console.log(data.token);
        return await axios.get("/editInfo", updateData, {
            headrs : {
                'Content-Type' : 'appllication/json',
                'Authorization' : 'Bearer ' + data.token
            }
        });
    },
};

export default TokenAxiosApi;