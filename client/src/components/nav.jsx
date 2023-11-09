import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./nav.css";
import profileIcon from "../images/navicons/profile.png";
import wrapIcon from "../images/navicons/wrap.png";
import micIcon from "../images/navicons/mic.png";
import spotifyIcon from "../images/icons/Spotify_Icon_RGB_Green.png";
import musicIcon from "../images/navicons/musicnote.png";
export default function Nav() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  return (
    <>
      <nav className="sidebar-container">
        <ul className="unorderlist-container">
          <li className="spotify-logo-link">
            <Link to="/Profile">
              <img id="spotifyIcon" src={spotifyIcon} alt="" />
            </Link>
          </li>
          <li
            className={
              activeLink === "/Profile" ? "nav-active hoverable" : "hoverable"
            }
          >
            <Link to="/Profile">
              <img id="profileIcon" src={profileIcon} alt="" />
              <p>Profile</p>
            </Link>
          </li>
          <li
            className={
              activeLink === "/Wrap" ? "nav-active hoverable" : "hoverable"
            }
          >
            <Link to="/Wrap">
              <img id="wrapIcon" src={wrapIcon} alt="" />
              <p>Wrap</p>
            </Link>
          </li>
          <li
            className={
              activeLink === "/Artists" ? "nav-active hoverable" : "hoverable"
            }
          >
            <Link to="/Artists">
              <img id="micIcon" src={micIcon} alt="" />
              <p>Top Artist</p>
            </Link>
          </li>
          <li
            className={
              activeLink === "/Tracks" ? "nav-active hoverable" : "hoverable"
            }
          >
            <Link to="/Tracks">
              <img id="musicIcon" src={musicIcon} alt="" />
              <p>Top Tracks</p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
