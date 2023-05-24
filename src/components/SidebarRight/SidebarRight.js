import FriendsOnline from "./FriendsOnline/FriendsOnline";
import { useState } from "react";
import "./SidebarRight.css";
import { useEffect } from "react";
import { GetCookie, linkBackend } from "../Helper";
import axios from "axios";

function SidebarRight() {
  let userToken = GetCookie("UserToken");
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({
    FriendShipId: "",
    Name: "",
    Avatar: "",
  });

  const AcceptedFriend = (FriendShipId) => {
    axios
      .get(
        `https://localhost:44395/api/FriendShip/AcceptFriendShip?FriendShipId=${FriendShipId}`
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`https://localhost:44395/api/FriendShip/GetListFriendShipAccepted`, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setFriends(res.data.data))
      .catch((err) => console.log(err));

    axios
      .get(
        `https://localhost:44395/api/FriendShip/GetNearlistFriendShipPending`,
        {
          headers: {
            Authorization: `${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => setFriend(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="side-bar-right">
      <div className="sidebar-right-search">
        <input type="text" name="input" placeholder="Placeholder" />
      </div>
      <hr />
      <div className="sidebar-right-friends-request">
        <div className="friends-request--header">Friend request</div>
        {friend ? (
          <div className="friends-request--main">
            <div
              className="friends-request--main-left"
              style={{ backgroundImage: `url(${linkBackend}${friend.Avatar})` }}
            ></div>
            <div className="friends-request--main-right">
              <div className="friends-request--main-right-name">
                {friend.Name}
              </div>
              <div className="friends-request--main-right-button">
                <div
                  className="btn pri-btn"
                  onClick={() => AcceptedFriend(friend.FriendShipId)}
                >
                  Xác nhận
                </div>
                <div className="btn second-btn">Xoá</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <hr />
      <div className="friends-online">
        <div className="friends-online--yourfriend">Your Friend</div>
        {friends.map((element, index) => (
          <FriendsOnline
            key={index}
            imgLink={`${linkBackend}${element.Avatar}`}
            friendsName={element.Name}
          ></FriendsOnline>
        ))}
      </div>
    </div>
  );
}

export default SidebarRight;
