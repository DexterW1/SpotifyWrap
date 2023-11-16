import "./analysis.css";
import { useState, useEffect } from "react";
import {
  getFeatures,
  getGenre,
  getTrackRec,
  getArtistRec,
} from "../spotify/api";
import Radarchart from "./radarchart";
import Barchart from "./barchart";
import Recommendation from "./recommendation";
export default function Analysis() {
  const [activeButton, setActiveButton] = useState("long");
  const [genre, setGenre] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const [trackrec, setTrackRec] = useState(null);
  const [artistrec, setArtistRec] = useState(null);
  const handleButton = (text) => {
    setActiveButton(text);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await getFeatures(activeButton);
      const genreResults = await getGenre(activeButton);
      const trackrec = await getTrackRec(activeButton);
      const artistrec = await getArtistRec(activeButton);
      setArtistRec(artistrec);
      setTrackRec(trackrec);
      setGenre(genreResults);
      setAudioAnalysis(result);
    };
    fetchData();
  }, [activeButton]);
  // console.log(trackrec);
  return (
    <>
      <div className="analysis-container">
        <header className="analysis-header">
          <h1>Audio Analysis</h1>
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
        <div className="graph-container">
          <div className="bar-container">
            {genre !== null && <Barchart data={genre} />}
          </div>
          <div className="spider-container">
            {audioAnalysis !== null && <Radarchart data={audioAnalysis} />}
          </div>
        </div>
        <div className="recommendation-container">
          <h2 id="track-title">Tracks Recommendations</h2>
          <div className="track-rec-container">
            {trackrec != null && (
              <Recommendation data={trackrec} type="track" />
            )}
          </div>
          <h2 id="artist-title">Artists Recommendations</h2>
          <div className="artist-rec-container">
            {artistrec !== null && (
              <Recommendation data={artistrec} type="artist" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
