import "./homepage.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "../components/nav";
import Profile from "../components/profile";
import Mainscreen from "./mainscreen";
export default function Homepage() {
  return (
    <>
      <div className="wrapper">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" exact element={<Mainscreen />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
