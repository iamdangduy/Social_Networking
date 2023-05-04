import { useState } from "react";
import axios from "axios";
import "./RegisterAccount.css";

function RegisterAccount(props) {
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [rePasswordValid, setRePasswordValid] = useState(false);
  const [form, setForm] = useState({
    Email: "",
    Name: "",
    Password: "",
    RePassword: "",
    DateOfBirth: "",
    Gender: "",
  });

  const displayRegisterForm = () => {
    props.parentCallback(false);
  };

  const validateUser = () => {
    if (form.Email.replace(/\s/g, "") === "") setEmailValid(true);
    else if (
      !form.Email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      setEmailValid(true);
    else setEmailValid(false);
    if (form.Name === "") setNameValid(true);
    else setNameValid(false);
    if (form.Password.indexOf(" ") >= 0) setPasswordValid(true);
    if (form.Password === "") setPasswordValid(true);
    else setPasswordValid(false);
    // else if (date === "")
    // else if (gender === "") setMassage("Gender do not empty");
    if (form.Password !== form.RePassword) setRePasswordValid(true);
    else setRePasswordValid(false);
    if (
      nameValid === false &&
      emailValid === false &&
      passwordValid === false &&
      rePasswordValid === false
    )
      createNewAccount();
  };

  const createNewAccount = async function () {
    console.log("Register Success!!");
    const url = "https://localhost:44395/api/User/Register";
    let rq = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    let rs = await rq.json();
    if (rs.status === "success") 
    alert("Register Successful!!");
    displayRegisterForm();
    console.log(rs);
  };

  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const onSubmitForm = (e) => {
    validateUser();
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="RegisterAccount">
      <div className="register-header">
        <h1>Register</h1>
      </div>
      <div className="register-main">
        <input
          className="input-form-register"
          type="text"
          name="Email"
          value={form.Email}
          placeholder="Your Email"
          onChange={onUpdateField}
        />
        {emailValid ? (
          <label className="error-message">
            Email do not empty / is not valid
          </label>
        ) : (
          ""
        )}
        <input
          className="input-form-register"
          type="text"
          name="Name"
          value={form.Name}
          placeholder="Your Name"
          onChange={onUpdateField}
        />
        {nameValid ? (
          <label className="error-message">Name do not empty</label>
        ) : (
          ""
        )}

        <input
          className="input-form-register"
          type="password"
          name="Password"
          value={form.Password}
          placeholder="Create Password"
          onChange={onUpdateField}
        />
        {passwordValid ? (
          <label className="error-message">Password do not empty</label>
        ) : (
          ""
        )}
        <input
          className="input-form-register"
          type="password"
          name="RePassword"
          value={form.RePassword}
          placeholder="Confirm Password"
          onChange={onUpdateField}
        />
        {rePasswordValid ? (
          <label className="error-message">
            Re password do not like password
          </label>
        ) : (
          ""
        )}
        {/* <label className="error-message">Repassword do not like password</label> */}

        <div className="select-dob-male">
          <input
            onChange={onUpdateField}
            className="input-form-register"
            type="date"
            name="DateOfBirth"
            value={form.DateOfBirth}
          />
          <div className="select-male">
            <input
              onChange={onUpdateField}
              type="radio"
              name="Gender"
              value="Male"
              className="radio-input"
            />
            Male
            <input
              onChange={onUpdateField}
              type="radio"
              name="Gender"
              value="Female"
              className="radio-input"
            />
            Female
          </div>
        </div>
      </div>
      <div className="register-footer">
        <hr />
        <div className="btn success-btn" onClick={onSubmitForm}>
          Sign Up
        </div>
        <div className="text-already-have-acoount">
          Already have account ?
          <a
            href="#"
            onClick={displayRegisterForm}
            style={{ marginLeft: "10px" }}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterAccount;
