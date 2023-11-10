import "./login.css";
const url = import.meta.env.VITE_LOGIN || "http://localhost:5000/login";
export default function Login() {
  return (
    <>
      <div className="login-container">
        <h1>Spotify Wrap</h1>
        <a href={url}>LOGIN TO SPOTIFY</a>
      </div>
    </>
  );
}
