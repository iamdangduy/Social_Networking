import "./Community.css";
import CommunityForm from "./CommunityForm/CommunityForm";
import { GetCookie } from "../../Helper";
import { useEffect, useState } from "react";
import axios from "axios";

function Community() {
  let userToken = GetCookie("UserToken");
  const [listAdd, setListAdd] = useState([]);
  console.log(listAdd);

  useEffect(() => {
    axios
      .get(`https://localhost:44395/api/FriendShip/GetListFriendShipPending`, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setListAdd(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="Community">
      {listAdd.map((element, index) => (
        <CommunityForm
          FriendShipId={element.FriendShipId}
          key={index}
          FullName={element.Name}
          Avatar={element.Avatar}
        />
      ))}
    </div>
  );
}

export default Community;
