import { NavLink } from "react-router-dom";
import "./InforSearch.css";

function InforSearch(props) {
  return (
    <div>
      <NavLink to="/explore">
        <div className="infor-search">
          <div className="infor-search-avatar">
            <img src={props.avatarLink} />
          </div>
          <div className="infor-search-name">{props.inforSearchName}</div>
        </div>
      </NavLink>
    </div>
  );
}

export default InforSearch;
