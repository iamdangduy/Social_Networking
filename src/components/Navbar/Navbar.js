import "./Navbar.css";

function Navbar() {
  return (
    <div className="navigation-bar">
      <div className="navigation-logo"></div>
      <div className="navigation-search">
        <input type="text" name="input" placeholder="Placeholder" />
      </div>
      <div className="navigation-avatar">
        <div className="navigation-avatar--image"></div>
        <div className="navigation-avatar--name">iamdangduy</div>
      </div>
    </div>
  );
}

export default Navbar;
