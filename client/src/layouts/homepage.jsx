import "./homepage.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../components/nav";
import Profile from "../components/profile";
export default function Homepage() {
  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          <div className="homenav-container">
            <Nav />
          </div>
          <div className="content-container">
            <Routes>
              <Route path="/" exact element={<Profile />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}
