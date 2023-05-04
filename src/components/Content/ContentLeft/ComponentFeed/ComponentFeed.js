import "./ComponentFeed.css";

function ComponentFeed(props) {
  return (
    <div className="status-feed">
      <div className="status-feed-user-info">
        <div className="status-feed-user-info--avatar"></div>
        <div className="status-feed-user-info--name">{props.FullName}</div>
      </div>
      <div className="status-feed-content"></div>
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
            <i className="fa-regular fa-share fa-xl"></i>
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
