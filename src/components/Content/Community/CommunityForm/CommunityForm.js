import "./CommunityForm.css";

function CommunityForm() {
  return (
    <div className="CommunityForm">
      <div className="community-form--main">
        <div className="community-form--avatar"></div>
        <div className="community-form--name">
          <div>Nguyễn Đăng Duy</div>
          <div className="community-form--second-name">
            Fullstack Web Dev
          </div>
        </div>
      </div>
      <div className="community-form--footer">
        <div className="btn pri-btn follow-btn">Accept</div>
        <div className="btn second-btn ignore-btn">Ignore</div>
      </div>
    </div>
  );
}

export default CommunityForm;
