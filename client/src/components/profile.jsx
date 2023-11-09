import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import { logout } from "../spotify/api";
import {
  getUser,
  getFollowing,
  getPlaylist,
  getTopItems,
} from "../spotify/api";
import Loader from "../components/loader";
function convertMsToMin(time) {
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  } else {
    return `${seconds}`;
  }
}
export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [userTopItem, setUserTopItem] = useState(null);
  const [followData, setFollowData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        const follower = await getFollowing();
        const playlist = await getPlaylist();
        const topitem = await getTopItems();
        setUserTopItem(topitem);
        setPlaylistData(playlist);
        setFollowData(follower);
        setUserData(user);
      } catch (error) {
        // Handle errors if any
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  if (!userData) {
    return <Loader />;
  }
  console.log(userTopItem);
  return (
    <>
      <div className="profile-container">
        <div className="intro-container">
          <div className="profile-image-container">
            <img src={userData.images[1].url} alt="" />
          </div>
          <h1 id="profileDisplayName">{userData.display_name}</h1>
          <div className="follow-container">
            <div className="follow-item">
              <h1>{userData.followers.total}</h1>
              <p>Followers</p>
            </div>
            <div className="follow-item">
              <h1>{followData.artists.total}</h1>
              <p>Following</p>
            </div>

            <div className="follow-item">
              <h1>{playlistData.total}</h1>
              <p>Playlist</p>
            </div>
          </div>
          <button onClick={logout}>LOGOUT</button>
        </div>
        <div className="profile-list-container">
          <div className="profile top-tracks">
            <div className="profile-header">
              <h1>Top Artists of All Time</h1>
              <Link to="/Artists">See More</Link>
            </div>
            <div className="list-container">
              <ul>
                {userTopItem.artist.items.map((item) => (
                  <li key={item.name}>
                    <img
                      src={item.images[0].url}
                      width={50}
                      height={50}
                      alt=""
                    />
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="profile top-artist">
            <div className="profile-header">
              <h1>Top Tracks of All Time</h1>
              <Link to="/Tracks">See More</Link>
            </div>
            <div className="list-container">
              <ul>
                {userTopItem.track.items.map((item) => (
                  <li key={item.id}>
                    <img
                      className="album"
                      src={item.album.images[0].url}
                      width={50}
                      height={50}
                      alt=""
                    />
                    <div className="album-info">
                      <div className="album-name">
                        <p>{item.name}</p>
                        <div className="artists-name-container">
                          {item.artists.map((item) => (
                            <p className="artists-name" key={item.name}>
                              {item.name}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="album-timestamp">
                        <p>{convertMsToMin(item.duration_ms)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
