import { useState, useEffect } from "react";
import "./App.css";
import Login from "./layouts/login";
import Homepage from "./layouts/homepage";
import { token } from "./spotify/api";
function App() {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    setAccessToken(token);
  }, []);
  return <>{accessToken.access_token !== null ? <Homepage /> : <Login />}</>;
}

export default App;
