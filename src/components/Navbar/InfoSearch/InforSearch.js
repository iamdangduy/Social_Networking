import "./InforSearch.css"

function InforSearch(props) {
  return (
    <div>
      <div className="infor-search">
        <div className="infor-search-avatar">
          <img src={props.avatarLink}/>
        </div>
        <div className="infor-search-name">{props.inforSearchName}</div>
      </div>
    </div>
  );
}

export default InforSearch;
