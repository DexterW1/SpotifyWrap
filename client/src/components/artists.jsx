import "./artists.css";
import { useState, useEffect } from "react";
import Loader from "./loader";
import { getArtist } from "../spotify/api";
export default function Artists() {
  const [activeButton, setActiveButton] = useState("long");
  const [artistData, setArtistData] = useState(null);
  const handleButton = (text) => {
    setActiveButton(text);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getArtist(activeButton);
      setArtistData(data);
    };
    fetchData();
  }, [activeButton]);
  if (!artistData) {
    return <Loader />;
  }
  // console.log(artistData);
  return (
    <div className="artists-container">
      <header className="artists-header">
        <h1>Top Artists</h1>
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
      <div className="artists-list">
        {artistData.items.map((item) => (
          <div className="artist-card" key={item.name}>
            <img src={item.images[0].url} height={200} width={200} alt="" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
