import { useState, createContext, useEffect } from "react";
import TokenAxiosApi from "../pages/taehoon/Api/TokenAxiosApi";
import { Navigate } from "react-router-dom";

export const UserContext = createContext(null);

const UserStore = ({children}) => {
  // 엑세스 토큰, 리프레시 토큰
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  // 아이디
  const [userID, setUserID] = useState("");
  // 비밀번호
  const [passWord, setPassWord] = useState("");
  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);
  // 로그인시 쿼리문에 쓰일 회원번호
  const [userNum, setUserNum] = useState(0);
  // 지역별 카페메인으로 이동
  const [region, setRegion] = useState("");
  // 카페번호
  const [cafeNum, setCafeNum] = useState("");
  // 길드번호
  const [guildNum, setGuildNum] = useState("");
  // 사이드바
  const [isSidebar, setIsSidebar] = useState(true);

  const restoreSession = async() => {
    const token =  localStorage.getItem('token');
    if(token) {
      try{
        const rsp = await TokenAxiosApi.userInfo(token);
        setUserID(rsp.data[0].id);
        setPassWord(rsp.data[0].pw);
        handleLogin();
      } catch(error) {
        console.log("오류 발생 : "+error);
        handleLogOut();
        Navigate("/main");
      }
    }
  }

  const handleLogin = () => {
    setIsLogin(true);
  }

  useEffect(()=> {
    const fetchData = async() => {
      await restoreSession();
    }
    fetchData();
  }, []);
  
  const handleLogOut = () => {
    localStorage.removeItem('token');
    setIsLogin(false);
    setUserID("");
    setPassWord("");
  }


  const contextValue = {
    accessToken, setAccessToken, refreshToken, setRefreshToken,
    userID, setUserID, passWord, setPassWord, isLogin, setIsLogin, userNum, setUserNum, 
    region, setRegion, cafeNum, setCafeNum, guildNum, setGuildNum,
    handleLogin, handleLogOut, setIsSidebar
  };



  return(
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>    
  )
}
export default UserStore;