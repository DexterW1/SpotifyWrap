import "./homepage.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../components/nav";
import Profile from "../components/profile";
import Artists from "../components/artists";
import Tracks from "../components/tracks";
import Wrap from "../components/wrap";
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
              <Route path="/Wrap" element={<Wrap />} />
              <Route path="/Tracks" element={<Tracks />} />
              <Route path="/Artists" element={<Artists />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}
