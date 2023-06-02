import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../GlobalContext";
import { ConvertDateTime, GetCookie, linkBackend } from "../../Helper";
import "./Profile.css";

function Profile() {
  let userToken = GetCookie("UserToken");
  const isLogin = useContext(LoginContext);
  const [infoUSer, setInfoUser] = useState("");
  const [avatar, setAvatar] = useState(isLogin.userInfor.Avatar);
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    setInfoUser(isLogin.userInfor);
  }, [isLogin.userInfor]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      // const base64String =
      setImageData(reader.result.split("base64,")[1]);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInfoUser = (e) => {
    setInfoUser({
      ...infoUSer,
      [e.target.name]: e.target.value,
    });
  };

  const updateInfoUser = async function () {
    const nextInfoUser = {
      ...infoUSer,
      Avatar: imageData,
    };
    isLogin.setUserGlobalContext(nextInfoUser);
    const url = "https://localhost:44395/api/User/UpdateInfoUser";
    let rq = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...infoUSer,
        Avatar: imageData,
      }),
    });
    let rs = await rq.json();
    if (rs.status === "success") {
      alert("Register Successful!!");
      window.location.reload();
    }
    console.log(rs);
  };

  const onSubmitAvatar = () => {
    document.querySelector("#file").click();
  };

  return (
    <div className="Profile">
      <h1 style={{ marginBottom: "10px" }}>Edit Profile</h1>
      <div className="profile-avatar" onClick={onSubmitAvatar}>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img
          src={
            avatar.preview !== null
              ? `${linkBackend}${infoUSer.Avatar}`
              : avatar.preview
          }
          alt="123"
        />
      </div>
      <div className="profile-infor">
        <div className="profile-infor-left">
          <div className="profile-infor-left-row">
            <label>Full name</label>
            <input
              className="full-name"
              type="text"
              name="Name"
              value={infoUSer.Name}
              onChange={handleInfoUser}
            />
          </div>
          <div className="profile-infor-left-row">
            <label>Email</label>
            <input
              className="email"
              type="text"
              value={infoUSer.Email}
              onChange={handleInfoUser}
            />
          </div>
          <div className="profile-infor-left-row">
            <label>Phone</label>
            <input
              className="phone"
              type="text"
              value={infoUSer.Phone}
              onChange={handleInfoUser}
            />
          </div>
        </div>
        <div className="profile-infor-right">
          <div className="profile-infor-right-row">
            <label>Birthday</label>
            <input
              type="date"
              className="date-of-birth"
              value={ConvertDateTime(infoUSer.DateOfBirth)}
              onChange={handleInfoUser}
            />
          </div>
          <div className="profile-infor-right-row">
            <label>Bio</label>
            <input type="text" />
          </div>
          <div className="profile-infor-right-row">
            <label>Website</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <h1 style={{ marginTop: "10px" }}>Social Link</h1>
      <div className="profile-infor">
        <div className="profile-infor-left">
          <div className="profile-infor-left-row">
            <label>Facebook</label>
            <input type="text" />
          </div>
          <div className="profile-infor-left-row">
            <label>Instagram</label>
            <input type="text" />
          </div>
        </div>
        <div className="profile-infor-right">
          <div className="profile-infor-right-row">
            <label>Twitter</label>
            <input type="text" />
          </div>
          <div className="profile-infor-right-row">
            <label>Linkedin</label>
            <input type="text" />
          </div>
        </div>
      </div>
      <div className="profile-bottom">
        <div
          className="btn pri-btn"
          style={{ marginLeft: "15px" }}
          onClick={updateInfoUser}
        >
          Save
        </div>
        <div className="btn second-btn">Cancel</div>
      </div>
    </div>
  );
}

export default Profile;
