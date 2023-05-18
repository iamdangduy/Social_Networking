import axios from "axios";
import { LoginContext } from "../GlobalContext";
import InforSearch from "./InfoSearch/InforSearch.js";
import "./Navbar.css";
import { useContext, useEffect, useState } from "react";

function Navbar() {
  const isLogin = useContext(LoginContext);
  const [keyword, setKeyword] = useState("");
  const [arrayUserSearch, setArrayUserSearch] = useState([]);
  console.log(arrayUserSearch);

  // useEffect(() => {
  //   axios
  //     .get(`https://localhost:44395/api/User/GetListUserByName?UserName=${keyword}`)
  //     .then((res) => res.data)
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // }, [keyword]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          `https://localhost:44395/api/User/GetListUserByName?UserName=${keyword}`
        )
        .then((res) => res.data)
        .then((data) => setArrayUserSearch(data.data))
        .catch((err) => console.log(err));
    }
  };

  const onFocusOut = () => {
    setArrayUserSearch([]);
  }

  return (
    <div className="navigation-bar">
      <div className="navigation-logo"></div>
      <div className="navigation-search">
        <div>
          <input
            type="text"
            name="input"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onFocusOut}
            placeholder="Nhập từ khoá tìm kiếm"
          />
        </div>
        {arrayUserSearch.length > 0
          ? arrayUserSearch.map((element, index) => {
              return (
                <InforSearch
                  key={index}
                  inforSearchName={element.Name}
                  avatarLink={element.Avatar}
                />
              );
            })
          : ""}
      </div>
      <div className="navigation-avatar">
        <div className="navigation-avatar--image">
          <img
            src={
              isLogin.userInfor.Avatar
                ? `${isLogin.userInfor.Avatar}`
                : `https://i.stack.imgur.com/l60Hf.png`
            }
          />
        </div>
        <div className="navigation-avatar--name">{isLogin.userInfor.Name}</div>
      </div>
    </div>
  );
}

export default Navbar;
