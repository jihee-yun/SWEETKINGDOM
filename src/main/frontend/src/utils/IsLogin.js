import { useContext } from "react";
import { UserContext } from "../context/UserStore";

const IsLogin = () => {
  const context = useContext(UserContext);
  const { accessToken } = context;

  return accessToken ? true : false;
}

export default IsLogin;