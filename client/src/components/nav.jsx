import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import profileIcon from "../images/navicons/profile.png";
import wrapIcon from "../images/navicons/wrap.png";
import micIcon from "../images/navicons/mic.png";
export default function Nav() {
  return (
    <>
      <nav className="sidebar-container">
        <ul className="unorderlist-container">
          <li>
            <img src={profileIcon} alt="" />
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <img src={wrapIcon} alt="" />
            <Link to="/Wrap">Wrap</Link>
          </li>
          <li>
            <img src={micIcon} alt="" />
            <Link to="/Artist">Top Artist</Link>
          </li>
          <li>
            <Link to="/Tracks">Top Tracks</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
