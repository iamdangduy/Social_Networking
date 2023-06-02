import "./StatusForm.css";
import "../ComponentFeed/ComponentFeed.css";
import { linkBackend, GetCookie } from "../../../Helper";
import { useState } from "react";

function StatusForm(props) {
  let userToken = GetCookie("UserToken");
  const [commentContent, setCommentContent] = useState("");

  const createComment = async function () {
    let rq = await fetch("https://localhost:44395/api/Comment/InsertComment", {
      method: "post",
      headers: {
        Authorization: `${userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CommentContent: commentContent,
        PostId: props.PostId,
      }),
    });
    let rs = await rq.json();
    if (rs.status === "success") {
      setCommentContent("");
      // alert("Register Successful!!");
      // window.location.reload();
    } else {
      console.log(rs.message);
    }

    console.log(props.PostId);
  };

  const closeModal = (childrenData) => {
    props.parentCallback(childrenData);
  };

  return (
    <div className="StatusForm">
      <div
        className="status-feed"
        style={{
          maxHeight: "700px",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {/* <div className="status-feed-header">
          Nguyeenx Dawng Duy
        </div> */}
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
          <div className="status-feed-user-info--more">
            <i
              className="fa-solid fa-xmark fa-xl"
              onClick={() => closeModal(false)}
            ></i>
          </div>
        </div>
        <div className="status-feed-content">
          <div className="status-feed-content--title">
            <h2>{props.Title}</h2>
          </div>
          <div className="status-feed-content--image">
            {props.ImageLink ? (
              <img src={`${linkBackend}${props.ImageLink}`} alt="" />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="status-feed-like-comment-share">
          <div
            className={`like `}
            // onClick={() => likePost(props.PostId)}
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
          <div className="comment">
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
        {props.Comments.length > 0
          ? props.Comments.map((element, index) => (
              <div className="create-feed-read-comment" key={index}>
                <div
                  className="read-comment-avatar"
                  style={{
                    backgroundImage: `url(${linkBackend}${element.Avatar})`,
                  }}
                ></div>
                <div className="read-comment-user-comment">
                  <div className="read-comment-user-comment-name">
                    {element.Name}
                  </div>
                  <div className="read-comment-user-comment-content">
                    {element.CommentContent}
                  </div>
                </div>
              </div>
            ))
          : ""}

        <div className="status-feed-create-comment-form">
          <div
            className="create-comment-avatar"
            style={{
              backgroundImage: `url(${linkBackend}${props.UserAvatar})`,
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
              onClick={() => createComment}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusForm;
