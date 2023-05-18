import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../../GlobalContext";
import { ConvertDateTime } from "../../Helper";
import "./Profile.css";

function Profile() {
  const isLogin = useContext(LoginContext);
  const [avatar, setAvatar] = useState(isLogin.userInfor.Avatar);
  const [infoUSer, setInfoUser] = useState(isLogin.userInfor);

  console.log(infoUSer);
  useEffect(() => {
    setInfoUser(isLogin.userInfor);
  }, [isLogin.userInfor]);

  const handleInfoUser = (e) => {
    const nextInfoUser = {
      ...infoUSer,
      Avatar: avatar.preview,
      [e.target.name]: e.target.value,
    };
    setInfoUser(nextInfoUser);
  };

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };

  const inputFile = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  return (
    <div className="Profile">
      <h1 style={{ marginBottom: "10px" }}>Edit Profile</h1>
      <div className="profile-avatar" onClick={onButtonClick}>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          ref={inputFile}
          onChange={handlePreviewAvatar}
        />
        <img
          src={avatar ? avatar.preview : `https://i.stack.imgur.com/l60Hf.png`}
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
              onChange={handleInfoUser}
              value={infoUSer.Name}
            />
          </div>
          <div className="profile-infor-left-row">
            <label>Email</label>
            <input className="email" type="text" value={infoUSer.Email} />
          </div>
          <div className="profile-infor-left-row">
            <label>Phone</label>
            <input className="phone" type="text" value={infoUSer.Phone} />
          </div>
        </div>
        <div className="profile-infor-right">
          <div className="profile-infor-right-row">
            <label>Birthday</label>
            <input
              type="date"
              className="date-of-birth"
              value={ConvertDateTime(infoUSer.DateOfBirth)}
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
        <div className="btn pri-btn" style={{ marginLeft: "15px" }}>
          Save
        </div>
        <div className="btn second-btn">Cancel</div>
      </div>
    </div>
  );
}

export default Profile;
