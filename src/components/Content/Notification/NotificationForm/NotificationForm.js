import "./NotificationForm.css";

function NotificationForm(props) {
  return (
    <div className="NotificationForm">
      <div className="notification-form--activites">
        <div className="notification-form--avatar"></div>
        <div className="notification-form--user-activites">{props.activites}</div>
        <div className="notification-form--create-time">{props.createTime}</div>
      </div>
      <div className="notification-form--isread"></div>
    </div>
  );
}

export default NotificationForm;
