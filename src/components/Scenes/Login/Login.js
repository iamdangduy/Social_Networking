import { useState } from "react";
import "./Login.css";
import LoginAccount from "./LoginAccount/LoginAccount.js";
import RegisterAccount from "./RegisterAccount/RegisterAccount";

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const changeIsRegister = (childrenData) => {
    setIsRegister(childrenData);
  };

  return (
    <div className="Login">
      <div className="content-logo" style={{backgroundImage: "url('/Socialize.png')"}}>
        {/* <img src='/Socialize.png' alt="duiyddz"/> */}
      </div>
      {isRegister ? (
        <RegisterAccount parentCallback={changeIsRegister}></RegisterAccount>
      ) : (
        <LoginAccount parentCallback={changeIsRegister}></LoginAccount>
      )}
    </div>
  );
}

export default Login;
