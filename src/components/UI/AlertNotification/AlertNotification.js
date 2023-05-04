import "./AlertNotification.css";

function AlertNotification(props) {

  const handleCloseDialog = () => {
    props.parentHide("");
  }

  return (
    <div className="AlertNotification">
      <div className="alert-notification">
        <div className="alert-notification--header">
          <i
            style={{ color: "#E60000" }}
            className="fa-solid fa-circle-exclamation fa-2xl"
          ></i>
          <i className="fa-solid fa-xmark fa-2xl" onClick={() => handleCloseDialog()}></i>
        </div>
        <div className="alert-notification--content">{props.textMessage}</div>
      </div>
    </div>
  );
}

export default AlertNotification;
