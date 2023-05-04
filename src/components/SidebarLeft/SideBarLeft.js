import { NavLink } from "react-router-dom";
import "./SidebarLeft.css";
import SidebarLeftChoice from "./SidebarLeftChoice/SidebarLeftChoice";

function SidebarLeft() {
  return (
    <div className="side-bar-left">
      <NavLink exact="true" to="/" className="a-navbar-link">
        <SidebarLeftChoice
          text="Feed"
          iconElement={<i className="fa-solid fa-newspaper fa-xl"></i>}
        ></SidebarLeftChoice>
      </NavLink>
      <NavLink to="/community" className="a-navbar-link">
        <SidebarLeftChoice
          text="My Community"
          iconElement={<i className="fa-solid fa-people-group fa-xl"></i>}
        ></SidebarLeftChoice>
      </NavLink>
      <NavLink to="/messages" className="a-navbar-link">
        <SidebarLeftChoice
          text="Messages"
          iconElement={<i className="fa-regular fa-message fa-xl"></i>}
        ></SidebarLeftChoice>
      </NavLink>
      <NavLink to="/notification" className="a-navbar-link">
        <SidebarLeftChoice
          text="Notification"
          iconElement={<i className="fa-regular fa-bell fa-xl"></i>}
        ></SidebarLeftChoice>
      </NavLink>
      <NavLink to="/explore" className="a-navbar-link">
        <SidebarLeftChoice
          text="Explore"
          iconElement={<i className="fa-brands fa-dribbble fa-xl"></i>}
        ></SidebarLeftChoice>
      </NavLink>
      <NavLink to="/profile" className="a-navbar-link">
        <SidebarLeftChoice
          text="Profile"
          iconElement={<i className="fa-regular fa-user fa-xl"></i>}
        ></SidebarLeftChoice>
      </NavLink>
      <NavLink to="/settings" className="a-navbar-link">
        <SidebarLeftChoice
          text="Settings"
          iconElement={<i className="fa-solid fa-gear fa-xl"></i>}
        ></SidebarLeftChoice>
      </NavLink>
      <NavLink to="/logout" className="a-navbar-link">
        <SidebarLeftChoice
          text="Logout"
          iconElement={<i className="fa-solid fa-right-from-bracket fa-xl"></i>}
        ></SidebarLeftChoice>
      </NavLink>
    </div>
  );
}

export default SidebarLeft;
