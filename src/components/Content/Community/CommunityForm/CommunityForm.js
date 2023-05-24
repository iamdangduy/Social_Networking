import axios from "axios";
import { linkBackend } from "../../../Helper";
import "./CommunityForm.css";

function CommunityForm(props) {
  const AcceptedFriend = (FriendShipId) => {
    axios
      .get(
        `https://localhost:44395/api/FriendShip/AcceptFriendShip?FriendShipId=${FriendShipId}`
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="CommunityForm">
      <div className="community-form--main">
        <div
          className="community-form--avatar"
          style={{ backgroundImage: `url(${linkBackend}${props.Avatar})` }}
        ></div>
        <div className="community-form--name">
          <div>{props.FullName}</div>
          <div className="community-form--second-name">{props.LabelName}</div>
        </div>
      </div>
      <div className="community-form--footer">
        <div
          className="btn pri-btn follow-btn"
          onClick={() => AcceptedFriend(props.FriendShipId)}
        >
          Accept
        </div>
        <div className="btn second-btn ignore-btn">Ignore</div>
      </div>
    </div>
  );
}

export default CommunityForm;
