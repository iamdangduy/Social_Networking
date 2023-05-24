
import "./FriendsOnline.css";


function FriendsOnline(props) {
  
  return (
    <div className="sidebar-right-friends-online">
      <div
        className="friends-online-avatar"
        style={{ backgroundImage: `url("${props.imgLink}")` }}
      ></div>
      <div className="friends-online-name">{props.friendsName}</div>
    </div>
  );
}

export default FriendsOnline;
