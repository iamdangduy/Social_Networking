import { useState } from "react";
import { GetCookie, linkBackend } from "../../../Helper";
import axios from "axios";
import "./ComponentFeed.css";

function ComponentFeed(props) {
  const [isShowEdit, setIsShowEdit] = useState(false);
  let userToken = GetCookie("UserToken");
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

  return (
    <div className="status-feed">
      <div className="status-feed-user-info">
        <div style={{ display: "flex" }}>
          <div className="status-feed-user-info--avatar">
            <img src={props.Avatar ? `${linkBackend}${props.Avatar}` : ""} />
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
                  class="fa-solid fa-pen-to-square"
                  style={{ marginRight: "10px" }}
                ></i>
                Sửa
              </div>
              <div
                className="edit-remove-status--row"
                onClick={() => deleteStatus(props.PostId)}
              >
                <i
                  class="fa-solid fa-trash-can"
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
        <div className="status-feed-content--image">
          {props.ImageLink !== "" ? (
            <img src={`${linkBackend}${props.ImageLink}`} alt="" />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="status-feed-like-comment-share">
        <div className="like">
          <div className="icon-like">
            <i className="fa-regular fa-heart fa-xl"></i>
          </div>
          <div className="text-like">Like</div>
        </div>
        <div className="comment">
          <div className="icon-comment">
            <i className="fa-regular fa-comment fa-xl"></i>
          </div>
          <div className="text-comment">Comment</div>
        </div>
        <div className="share">
          <div className="icon-share">
            <i className="fa-solid fa-share fa-xl"></i>
          </div>
          <div className="text-share">Share</div>
        </div>
      </div>
      <div className="status-feed-create-comment">
        <div className="create-comment-avatar"></div>
        <div className="create-comment-text">
          <input type="text" name="input" placeholder="Write a comment" />
        </div>
        <div className="create-comment-button">
          <i className="fa-regular fa-paper-plane fa-xl"></i>
        </div>
      </div>
    </div>
  );
}

export default ComponentFeed;
