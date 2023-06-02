import { useContext, useState } from "react";
import { GetCookie, linkBackend } from "../../../Helper";
import axios from "axios";
import "./ComponentFeed.css";
import { LoginContext } from "../../../GlobalContext";

function ComponentFeed(props) {
  let userToken = GetCookie("UserToken");
  const isLogin = useContext(LoginContext);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const createComment = async function (PostId) {
    let rq = await fetch("https://localhost:44395/api/Comment/InsertComment", {
      method: "post",
      headers: {
        Authorization: `${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CommentContent: commentContent,
        PostId: PostId,
      }),
    });
    let rs = await rq.json();
    if (rs.status === "success") {
      setCommentContent("");
      props.reRenderPosts();
      // alert("Register Successful!!");
      // window.location.reload();
    } else {
      console.log(rs.message);
    }

    console.log(props.PostId);
  };

  const deleteStatus = (postId) => {
    axios
      .get(`https://localhost:44395/api/Post/DeletePost?PostId=${postId}`, {
        headers: {
          Authorization: `${userToken}`,
          "Content-Type": "application/json",
        },
      })
      .then(window.location.reload())
      // .then(window.location.reload())
      .catch((err) => alert(err));
  };

  const likePost = async function (postId) {
    let rq = await fetch(`https://localhost:44395/api/Love/InsertLove`, {
      method: "post",
      headers: {
        Authorization: `${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ PostId: postId }),
    });
    let rs = await rq.json();
    if (rs.status === "success") {
      setRefetch(!true);
      props.reRenderPosts();
    } else {
      console.log(rs.message);
    }
  };

  const getPost = (postId, isShow) => {
    props.parentCallback(postId, isShow);
  };

  return (
    <div className="status-feed">
      <div className="status-feed-user-info">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="status-feed-user-info--avatar">
            <img
              src={props.Avatar ? `${linkBackend}${props.Avatar}` : ""}
              alt="duy"
            />
          </div>
          <div className="status-feed-user-info--name">
            <h3>{props.FullName}</h3>
          </div>
        </div>
        <div
          className="status-feed-user-info--more"
          onClick={() => {
            setIsShowEdit(!isShowEdit);
          }}
        >
          <i className="fa-solid fa-ellipsis fa-xl"></i>
          {isShowEdit && (
            <div className="edit-remove-status">
              <div className="edit-remove-status--row">
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ marginRight: "10px" }}
                ></i>
                Sửa
              </div>
              <div
                className="edit-remove-status--row"
                onClick={() => deleteStatus(props.PostId)}
              >
                <i
                  className="fa-solid fa-trash-can"
                  style={{ marginRight: "10px" }}
                ></i>
                Xoá
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="status-feed-content">
        <div className="status-feed-content--title">
          <h2>{props.Title}</h2>
        </div>
        {props.ImageLink ? (
          <div className="status-feed-content--image">
            <img src={`${linkBackend}${props.ImageLink}`} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="status-feed-like-comment-share">
        <div
          className={`like ${props.isActive > 0 || refetch ? "active" : ""}`}
          onClick={() => likePost(props.PostId)}
        >
          <div className="icon-like">
            <i className="fa-regular fa-heart fa-xl"></i>
          </div>
          <div className="text-like">
            Love
            {props.Love > 0 ? (
              <span
                style={{
                  color: "white",
                  backgroundColor: "#4D646F",
                  padding: "2px 8px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                }}
              >
                {props.Love}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="comment" onClick={() => getPost(props.PostId, true)}>
          <div className="icon-comment">
            <i className="fa-regular fa-comment fa-xl"></i>
          </div>
          <div className="text-comment">
            Comment
            {props.Comment > 0 ? (
              <span
                style={{
                  color: "white",
                  backgroundColor: "#4D646F",
                  padding: "2px 8px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                }}
              >
                {props.Comment}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="share">
          <div className="icon-share">
            <i className="fa-solid fa-share fa-xl"></i>
          </div>
          <div className="text-share">Share</div>
        </div>
      </div>
      <div className="status-feed-create-comment">
        <div
          className="create-comment-avatar"
          style={{
            backgroundImage: `url(${linkBackend}${isLogin.userInfor.Avatar})`,
          }}
        ></div>
        <div className="create-comment-text">
          <input
            type="text"
            name="input"
            placeholder="Write a comment"
            onChange={(e) => setCommentContent(e.target.value)}
            value={commentContent}
          />
        </div>
        <div className="create-comment-button">
          <i
            className="fa-regular fa-paper-plane fa-xl"
            onClick={() => createComment(props.PostId)}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default ComponentFeed;
