import { Link } from "react-router-dom";
import "./nav.css";
import profileIcon from "../images/navicons/profile.png";
import wrapIcon from "../images/navicons/wrap.png";
import micIcon from "../images/navicons/mic.png";
import spotifyIcon from "../images/icons/Spotify_Icon_RGB_Green.png";
export default function Nav() {
  return (
    <>
      <nav className="sidebar-container">
        <ul className="unorderlist-container">
          <li>
            <Link to="/Profile">
              <img id="spotifyIcon" src={spotifyIcon} alt="" />
            </Link>
          </li>
          <li>
            <img id="profileIcon" src={profileIcon} alt="" />
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <img id="wrapIcon" src={wrapIcon} alt="" />
            <Link to="/Wrap">Wrap</Link>
          </li>
          <li>
            <img id="micIcon" src={micIcon} alt="" />
            <Link to="/Artists">Top Artist</Link>
          </li>
          <li>
            <Link to="/Tracks">Top Tracks</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
