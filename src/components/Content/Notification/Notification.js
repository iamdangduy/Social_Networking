import "./Notification.css";
import { useEffect, useState } from "react";
import { GetCookie, ConvertDateTime } from "../../Helper";
import NotificationForm from "./NotificationForm/NotificationForm";
import axios from "axios";

function Notification() {
  let userToken = GetCookie("UserToken");
  const [notifications, setNotifications] = useState([]);

  console.log(notifications);

  useEffect(() => {
    axios
      .get(`https://localhost:44395/api/Notification/GetListNotification`, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => setNotifications(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="Notification">
      <div className="notification-header">Notification</div>
      {notifications.length > 0
        ? notifications.map((element, index) => (
            <NotificationForm
              key={index}
              IsRead={element.IsRead}
              NotificationId={element.NotificationId}
              activites={element.MessageShort}
              createTime={ConvertDateTime(element.CreateTime)}
            ></NotificationForm>
          ))
        : ""}
    </div>
  );
}

export default Notification;
