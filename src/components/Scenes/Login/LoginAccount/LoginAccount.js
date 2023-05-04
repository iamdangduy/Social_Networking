import { useState, useContext } from "react";
import "./LoginAccount.css";
import { LoginContext } from "../../../../App";

function LoginAccount(props) {
  const displayRegisterForm = () => {
    props.parentCallback(true);
  };

  const isLogin = useContext(LoginContext);
  console.log(isLogin);

  function SetCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  // function GetCookie(cname) {
  //   let name = cname + "=";
  //   let decodedCookie = decodeURIComponent(document.cookie);
  //   let ca = decodedCookie.split(";");
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) == " ") {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) == 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }

  const [loginInfor, setLoginInfor] = useState({
    Email: "",
    Password: "",
  });

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const onUpdateField = (e) => {
    const nextFormState = {
      ...loginInfor,
      [e.target.name]: e.target.value,
    };
    setLoginInfor(nextFormState);
  };

  const onSubmitForm = (e) => {
    validateUser();
    e.preventDefault();
    console.log(loginInfor);
  };

  const validateUser = () => {
    if (loginInfor.Email.replace(/\s/g, "") === "") setEmailValid(true);
    else if (
      !loginInfor.Email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      setEmailValid(true);
    else setEmailValid(false);
    if (loginInfor.Password.indexOf(" ") >= 0) setPasswordValid(true);
    if (loginInfor.Password === "") setPasswordValid(true);
    else setPasswordValid(false);
    if (emailValid === false && passwordValid === false) loginAccount();
  };

  const loginAccount = async function () {
    console.log("Login Success!!");
    const url = "https://localhost:44395/api/User/Login";
    let rq = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfor),
    });
    let rs = await rq.json();
    if (rs.status === "success") SetCookie("UserToken", rs.data.token);
    else {
      console.log(rs.message);
    }
  };

  return (
    <div className="content-login">
      <div className="content-header">
        <div className="content-header--text">
          <h1>Login</h1>
        </div>
      </div>
      <div className="content-main">
        <input
          type="text"
          name="Email"
          value={loginInfor.Email}
          onChange={onUpdateField}
          className="email-phone-login"
          placeholder="Email or username"
        />
        {emailValid ? (
          <label className="error-message">
            Email do not empty / is not valid
          </label>
        ) : (
          ""
        )}
        <input
          type="password"
          name="Password"
          onChange={onUpdateField}
          value={loginInfor.Password}
          className="password-login"
          placeholder="Password"
        />
        {passwordValid ? (
          <label className="error-message">Password do not empty</label>
        ) : (
          ""
        )}
        <div className="button-login">
          <div className="btn pri-btn btn-login" onClick={onSubmitForm}>
            Đăng nhập
          </div>
        </div>
      </div>
      <hr />
      <div className="button-register">
        <div className="btn success-btn" onClick={displayRegisterForm}>
          Create new account
        </div>
      </div>
    </div>
  );
}

export default LoginAccount;