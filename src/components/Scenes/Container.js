import "./Container.css";
import Navbar from "../Navbar/Navbar";
import SidebarLeft from "../SidebarLeft/SideBarLeft";
import SidebarRight from "../SidebarRight/SidebarRight";
import Content from "../Content/Content";

function Container() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
          <SidebarLeft></SidebarLeft>
          <Content></Content>
          <SidebarRight></SidebarRight>
      </div>
    </div>
  );
}

export default Container;
