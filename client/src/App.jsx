import "./App.css";
import axios from "axios";

function App() {
  const handleLogin = () => {
    axios.get("http://localhost:5000/callback").then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <h1>Login with Spotify</h1>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default App;
