import { Routes, Route } from "react-router-dom";
import "./Content.css";
import ContentLeft from "./ContentLeft/ContentLeft";
import Community from "./Community/Community";
import Notification from "./Notification/Notification";

function Content() {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<ContentLeft/>} />
        <Route path="/community" element={<Community/>} />
        <Route path="/notification" element={<Notification/>} />
      </Routes>
    </div>
  );
}

export default Content;
