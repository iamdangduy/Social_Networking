import { Routes, Route } from "react-router-dom";
import "./Content.css";
import ContentLeft from "./ContentLeft/ContentLeft";
import Community from "./Community/Community";
import Notification from "./Notification/Notification";
import Profile from "./Profile/Profile";
import Explore from "./Explore/Explore";

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<ContentLeft/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/explore" element={<Explore/>} />
      </Routes>
    </div>
  );
}

export default Content;
