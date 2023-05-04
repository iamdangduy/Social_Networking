import Container from "./components/Scenes/Container";
import Login from "./components/Scenes/Login/Login";
import { createContext, useState } from "react";

export const LoginContext = createContext();

function App() {

  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={isLogin}>
      <div className="App">
        {isLogin ? <Container></Container> : <Login></Login>}
        {/* <AlertNotification></AlertNotification> */}
        {/* <Login></Login> */}
        {/* <Container></Container> */}
      </div>
    </LoginContext.Provider>
  );
}

export default App;
