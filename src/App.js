import React from "react";
import Container from "./components/Scenes/Container";
import Login from "./components/Scenes/Login/Login";
import { useContext } from "react";
import { LoginContext } from "./components/GlobalContext";

function App() {
  const isLogin = useContext(LoginContext);
  return (
    <div className="App">
      {isLogin.isLoggedIn ? <Container /> : <Login />}
    </div>
  );
}

export default App;
