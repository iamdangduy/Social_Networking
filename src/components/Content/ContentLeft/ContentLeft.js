import { useContext, useEffect, useState } from "react";
import { GetCookie } from "../../Helper";
import ComponentFeed from "./ComponentFeed/ComponentFeed";
import { LoginContext } from "../../GlobalContext";
import "./ContentLeft.css";
import axios from "axios";

function ContentLeft() {
  const isLogin = useContext(LoginContext);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({
    Title: "",
    Image: "",
  });

  useEffect(() => {
    axios
      .get("https://localhost:44395/api/Post/GetListPost")
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleStatus = (e) => {
    const nextStatus = {
      ...status,
      [e.target.name]: e.target.value,
    };
    setStatus(nextStatus);
  };
  let userToken = GetCookie("UserToken");
  const postStatus = async function () {
    let rq = await fetch("https://localhost:44395/api/Post/InsertPost", {
      method: "post",
      headers: {
        Authorization: `${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    });
    let rs = await rq.json();
    if (rs.status === "success") {
      alert("Register Successful!!");
      window.location.reload();
    } else {
      console.log(rs.message);
    }
  };

  return (
    <div className="status-area">
      <div className="status-creator">
        <div className="status-creator-input">
          <div className="status-creator-input-avatar">
            <img
              src={
                isLogin.userInfor.Avatar
                  ? `${isLogin.userInfor.Avatar}`
                  : `https://i.stack.imgur.com/l60Hf.png`
              }
            />
          </div>
          <input
            type="text"
            name="Title"
            value={status.Title}
            onChange={handleStatus}
            placeholder="What's happening?"
          />
        </div>
        <div className="status-creator-footer">
          <div className="status-creator-image">
            <i className="fa-regular fa-image fa-xl"></i>
            <div className="status-creator-image-text">Photo/Videos</div>
          </div>
          <div className="status-creator-button">
            <div className="btn pri-btn" onClick={postStatus}>
              Post
            </div>
          </div>
        </div>
      </div>

      {posts.map((element, index) => (
        <ComponentFeed
          PostId={element.PostId}
          key={element.PostId}
          Title={element.Title}
          ImageLink={element.Image}
          FullName={element.Name}
        />
      ))}
    </div>
  );
}

export default ContentLeft;
