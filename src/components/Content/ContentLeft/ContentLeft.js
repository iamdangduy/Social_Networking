import ComponentFeed from "./ComponentFeed/ComponentFeed";
import "./ContentLeft.css";

function ContentLeft() {
  return (
    <div className="status-area">
      <div className="status-creator">
        <div className="status-creator-input">
          <div className="status-creator-input-avatar"></div>
          <input type="text" name="input" placeholder="What's happening?" />
        </div>
        <div className="status-creator-footer">
          <div className="status-creator-image">
            <i className="fa-regular fa-image fa-xl"></i>
            <div className="status-creator-image-text">Photo/Videos</div>
          </div>
          <div className="status-creator-button">
            <div className="btn pri-btn">Post</div>
          </div>
        </div>
      </div>

      <ComponentFeed FullName="Nguyễn Đăng Duy"></ComponentFeed>
      <ComponentFeed FullName="Nguyễn Đăng A"></ComponentFeed>
      <ComponentFeed FullName="Nguyễn Đăng B"></ComponentFeed>
      <ComponentFeed FullName="Nguyễn Đăng Duy"></ComponentFeed>
    </div>
  );
}

export default ContentLeft;
