import { useContext, useEffect, useState } from "react";
import ComponentFeed from "../ContentLeft/ComponentFeed/ComponentFeed";
import { LoginContext } from "../../GlobalContext";
import "./Explore.css";
import { ConvertDateTime, linkBackend, GetCookie } from "../../Helper";
import axios from "axios";

function Explore() {
  const isLogin = useContext(LoginContext);
  let userToken = GetCookie("UserToken");
  const [posts, setPosts] = useState([]);
  const [friend, setFriend] = useState({
    UserId: "",
    FriendId: isLogin.friendInfo.UserId,
  });

  console.log(isLogin.friendInfo.UserId);

  useEffect(() => {
    axios
      .get(
        `https://localhost:44395/api/Post/GetListPostByUserId?UserId=${isLogin.friendInfo.UserId}`
      )
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err));
  }, [isLogin.friendInfo.UserId]);

  const addfriend = async function () {
    let rq = await fetch(
      "https://localhost:44395/api/FriendShip/InsertFriendShip",
      {
        method: "post",
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...friend,
          FriendId: isLogin.friendInfo.UserId,
        }),
      }
    );
    let rs = await rq.json();
    if (rs.status === "success") {
      alert("Register Successful!!");
      // window.location.reload();
    } else {
      console.log(rs.message);
    }
  };

  return (
    <div className="Explore">
      <div
        className="explore-header"
        style={{
          backgroundImage: `url(${linkBackend}${isLogin.friendInfo.CoverPhoto})`,
        }}
      >
        <div
          className="explore-header--avatar"
          style={{
            backgroundImage: `url(${linkBackend}${isLogin.friendInfo.Avatar})`,
          }}
        ></div>
      </div>
      <div className="explore-main">
        <div className="explore-main-info">
          <div className="explore-main--fullname">
            <h1>{isLogin.friendInfo.Name}</h1>
            <div className="explore-main--label-name">
              {isLogin.friendInfo.Name}
            </div>
          </div>
          {isLogin.userInfor.UserId === isLogin.friendInfo.UserId ? (
            ""
          ) : (
            <div
              className="explore-main--addfriend btn pri-btn"
              onClick={addfriend}
            >
              Add Friend
            </div>
          )}
        </div>
        <div className="explore-main-content">
          <div className="explore-main-content--left">
            <h2>Intro</h2>
            <div className="explore-main-content--left-rows">
              <i
                className="fa-regular fa-user"
                style={{ marginRight: "20px" }}
              ></i>
              {isLogin.friendInfo.Name}
            </div>
            <div className="explore-main-content--left-rows">
              <i
                className="fa-solid fa-cake-candles"
                style={{ marginRight: "20px" }}
              ></i>
              {ConvertDateTime(isLogin.friendInfo.DateOfBirth)}
            </div>
            <div className="explore-main-content--left-rows">
              <i
                className="fa-regular fa-envelope"
                style={{ marginRight: "20px" }}
              ></i>
              {isLogin.friendInfo.Email}
            </div>
            <div className="explore-main-content--left-rows">
              <i
                className="fa-solid fa-phone"
                style={{ marginRight: "20px" }}
              ></i>
              {isLogin.friendInfo.Phone}
            </div>
          </div>
          <div className="explore-main-content--right">
            {posts.map((element, index) => (
              <ComponentFeed
                PostId={element.PostId}
                Avatar={element.Avatar}
                key={element.PostId}
                Title={element.Title}
                ImageLink={`${element.Image}`}
                FullName={element.Name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
