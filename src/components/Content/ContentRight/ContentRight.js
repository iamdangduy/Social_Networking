import "./ContentRight.css";

function ContentRight() {
  return (
    <div className="introduce-area">
      <div className="page-you-might-love">
        <div className="page-you-might-love--header">
          <h2>You might like</h2>
          <a href="#">See all</a>
        </div>
        <hr />
        <div className="page-you-might-love--main">
          <div className="page-you-might-love--avatar"></div>
          <div className="page-you-might-love--name">
            <div>Nguyễn Đăng Duy</div>
            <div className="page-you-might-love--second-name">Fullstack Web Dev</div>
          </div>
        </div>
        <div className="page-you-might-love--footer">
          <div className="btn pri-btn follow-btn">Follow</div>
          <div className="btn second-btn ignore-btn">Ignore</div>
        </div>
      </div>
    </div>
  );
}

export default ContentRight;
