import { useContext, useEffect, useState } from "react";
import { GetCookie, linkBackend } from "../../Helper";
import ComponentFeed from "./ComponentFeed/ComponentFeed";
import { LoginContext } from "../../GlobalContext";
import "./ContentLeft.css";
import axios from "axios";
import StatusForm from "./StatusForm/StatusForm";

function ContentLeft() {
  let userToken = GetCookie("UserToken");
  const isLogin = useContext(LoginContext);
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({
    Title: "",
    Image: "",
  });
  const [isCreateStatus, setIsCreateStatus] = useState(false);
  const [imageData, setImageData] = useState("");
  const [image, setImage] = useState("");
  const [postId, setPostId] = useState("");
  const [postDetail, setPostDetail] = useState({});
  const [isShowPost, setIsShowPost] = useState(true);

  console.log(isShowPost);

  const callbackFunction = (childData) => {
    setIsShowPost(childData);
  };

  useEffect(() => {
    axios
      .get(
        `https://localhost:44395/api/Post/GetPostByPostId?PostId=${postId}`,
        {
          headers: {
            Authorization: `${userToken}`,
          },
        }
      )
      .then((res) => setPostDetail(res.data.data))
      .catch((err) => console.log(err));
  }, [postId]);

  useEffect(() => {
    axios
      .get("https://localhost:44395/api/Post/GetListPost", {
        headers: {
          Authorization: `${userToken}`,
        },
      })
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

  const postStatus = async function () {
    let rq = await fetch("https://localhost:44395/api/Post/InsertPost", {
      method: "post",
      headers: {
        Authorization: `${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...status,
        Image: imageData,
      }),
    });
    let rs = await rq.json();
    if (rs.status === "success") {
      alert("Register Successful!!");
      window.location.reload();
    } else {
      console.log(rs.message);
    }
  };

  const isShowChooseFile = () => {
    document.querySelector(".input-create-image").click();
  };

  const handleShowFormCreateStatus = () => {
    setIsCreateStatus(!isCreateStatus);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      // const base64String =
      setImageData(reader.result.split("base64,")[1]);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const postIdSendFromChildren = (childData, valueData) => {
    setPostId(childData);
    setIsShowPost(valueData);
  };

  return (
    <div className="status-area">
      {isCreateStatus ? (
        <div className="status-area-create-form">
          <div className="status-area-create-form--create">
            <div className="create-form--create-header">
              <h1>Create Post</h1>
              <i
                className="fa-regular fa-circle-xmark fa-2xl"
                onClick={handleShowFormCreateStatus}
              ></i>
            </div>
            <hr />
            <div className="create-form--create-main">
              <input
                className="create-form--create-main-input"
                type="text"
                placeholder="What's in your mind?"
                name="Title"
                value={status.Title}
                onChange={handleStatus}
              />
            </div>
            <div
              className="create-form--create-main-image"
              onClick={isShowChooseFile}
              style={{ backgroundImage: `url('${image.preview}')` }}
            >
              <i className="fa-regular fa-image fa-2xl"></i>
              <input
                type="file"
                className="input-create-image"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="create-form--create-footer">
              <div className="btn pri-btn post-status-btn" onClick={postStatus}>
                Post
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="status-creator">
        <div className="status-creator-input">
          <div className="status-creator-input-avatar">
            <img
              src={
                isLogin.userInfor.Avatar
                  ? `${linkBackend}${isLogin.userInfor.Avatar}`
                  : `https://i.stack.imgur.com/l60Hf.png`
              }
            />
          </div>
          <input
            type="text"
            placeholder="What's happening?"
            onClick={handleShowFormCreateStatus}
          />
        </div>
        <div className="status-creator-footer">
          <div className="status-creator-image">
            <i className="fa-regular fa-image fa-xl"></i>
            <div
              className="status-creator-image-text"
              onClick={handleShowFormCreateStatus}
            >
              Photo/Videos
            </div>
          </div>
          <div className="status-creator-button">
            <div className="btn pri-btn" onClick={handleShowFormCreateStatus}>
              Post
            </div>
          </div>
        </div>
      </div>
      {postDetail.Post && isShowPost ? (
        <div className="comment-detail">
          {(document.body.style.height = "100vh")}
          {(document.body.style.overflowY = "hidden")}
          <div className="comment-detail-form">
            <StatusForm
              FullName={postDetail.Post.Name}
              Avatar={postDetail.Post.Avatar}
              ImageLink={postDetail.Post.Image}
              Title={postDetail.Post.Title}
              UserAvatar={isLogin.userInfor.Avatar}
              Comments={postDetail.Comments}
              parentCallback={callbackFunction}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {posts.map((element, index) => (
        <ComponentFeed
          parentCallback={postIdSendFromChildren}
          PostId={element.PostId}
          Love={element.Love}
          Comment={element.Comment}
          isActive={element.Loved}
          Avatar={element.Avatar}
          key={element.PostId}
          Title={element.Title}
          ImageLink={`${element.Image}`}
          FullName={element.Name}
        />
      ))}
    </div>
  );
}

export default ContentLeft;
