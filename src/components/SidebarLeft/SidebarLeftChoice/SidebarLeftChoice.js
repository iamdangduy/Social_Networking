import "./SidebarLeftChoice.css";

function SidebarLeftChoice(props) {
  return (
    <div className="sidebar-left-row">
      <div className="sidebar-left-row--logo">{props.iconElement}</div>
      <div className="sidebar-left-row--text">
        {props.text}{" "}
        {props.numberNotification ? (
          <span className="notification-number">
            {props.numberNotification}
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SidebarLeftChoice;
