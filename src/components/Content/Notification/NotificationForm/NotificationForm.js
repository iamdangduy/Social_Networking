import axios from "axios";
import { GetCookie } from "../../../Helper";
import "./NotificationForm.css";

function NotificationForm(props) {
  let userToken = GetCookie("UserToken");
  const readNotification = (NotificationId) => {
    axios
      .get(
        `https://localhost:44395/api/Notification/UpdateNotificationRead?NotificationId=${NotificationId}`,
        {
          headers: {
            Authorization: `${userToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="NotificationForm"
      onClick={() => readNotification(props.NotificationId)}
    >
      <div className="notification-form--activites">
        {/* <div className="notification-form--avatar"></div> */}
        <div className="notification-form--user-activites">
          {props.activites}
        </div>
        <div className="notification-form--create-time">{props.createTime}</div>
      </div>
      {props.IsRead ? "" : <div className="notification-form--isread"></div>}
    </div>
  );
}

export default NotificationForm;
