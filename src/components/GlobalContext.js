import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { GetCookie } from "./Helper";
export const LoginContext = React.createContext();

function LoginProvider(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    UserId: "",
    Name: "",
    Avatar: "",
    CoverPhoto: "",
    Account: "",
  });
  const [friendInfo, setFriendInfor] = useState({
    UserId: "",
    Name: "",
    Avatar: "",
    CoverPhoto: "",
    Account: "",
    DateOfBirth: 0,
    Email: "",
    Phone: "",
  });

  let userToken = GetCookie("UserToken");

  const changeValueIsLogin = () => {
    setIsLogin(true);
  };

  const setUserGlobalContext = (dataValue) => {
    setUser(dataValue);
  };

  const setFriendInfoGlobalContext = (dataValue) => {
    setFriendInfor(dataValue);
  };

  useEffect(() => {
    if (userToken !== "") {
      axios
        .get("https://localhost:44395/api/User/GetInforUser", {
          headers: {
            Authorization: `${userToken}`,
          },
        })
        .then((res) => {
          setUser(res.data.data);
          setFriendInfor(res.data.data);
        })
        .then(changeValueIsLogin())
        .catch((err) => console.log(err));
    }
  }, [userToken]);

  const initValue = {
    isLoggedIn: isLogin,
    changeLogin: changeValueIsLogin,
    setUserGlobalContext: setUserGlobalContext,
    setFriendInfoGlobalContext,
    userInfor: user,
    friendInfo: friendInfo,
  };

  return (
    <LoginContext.Provider value={initValue}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
