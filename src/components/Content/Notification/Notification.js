import "./Notification.css";
import NotificationForm from "./NotificationForm/NotificationForm";

function Notification() {
  return (
    <div className="Notification">
      <div className="notification-header">Notification</div>

      <NotificationForm
        activites="Đăng duy đã yêu thích bài viết của bạn"
        createTime="(12 min ago)"
      ></NotificationForm>
    </div>
  );
}

export default Notification;
