import "./tracks.css";
import { useEffect, useState } from "react";
import { getTracks } from "../spotify/api";
import Loader from "./loader";
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
export default function Tracks() {
  const [activeButton, setActiveButton] = useState("long");
  const [tracksData, setTracksData] = useState(null);
  const handleButton = (text) => {
    setActiveButton(text);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTracks(activeButton);
      setTracksData(data);
    };
    fetchData();
  }, [activeButton]);
  console.log(tracksData);
  if (!tracksData) {
    return <Loader />;
  }
  return (
    <>
      <div className="track-container">
        <header className="tracks-header">
          <h1>Top Tracks</h1>
          <div className="nav">
            <button
              onClick={() => handleButton("long")}
              className={activeButton === "long" ? "active long" : "long"}
            >
              All Time
            </button>
            <button
              onClick={() => handleButton("medium")}
              className={activeButton === "medium" ? "active medium" : "medium"}
            >
              Last 6 Months
            </button>
            <button
              onClick={() => handleButton("short")}
              className={activeButton === "short" ? "active short" : "short"}
            >
              Last 4 Weeks
            </button>
          </div>
        </header>
        <div className="tracks-list">
          <ul>
            {tracksData.items.map((item) => (
              <li key={item.id}>
                <img
                  className="albumImg"
                  src={item.album.images[0].url}
                  width={55}
                  height={55}
                  alt=""
                />
                <div className="track-album-info">
                  <div className="track-album-name">
                    <p id="songName">{item.name}</p>
                    <div className="track-artists-name-container">
                      {item.artists.map((item) => (
                        <p className="track-artists-name" key={item.name}>
                          {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="track-album-timestamp">
                    <p>{convertMsToMin(item.duration_ms)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
