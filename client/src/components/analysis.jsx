import "./analysis.css";
import { useState, useEffect } from "react";
import { getFeatures } from "../spotify/api";
import Radarchart from "./radarchart";
export default function Analysis() {
  const [activeButton, setActiveButton] = useState("long");
  const [genre, setGenre] = useState(null);
  const [audioAnalysis, setAudioAnalysis] = useState(null);
  const handleButton = (text) => {
    setActiveButton(text);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await getFeatures(activeButton);
      // console.log("Entered in use Effect", result);
      setAudioAnalysis(result);
    };
    fetchData();
  }, [activeButton]);
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
          <div className="bar-container"></div>
          <div className="spider-container">
            {audioAnalysis !== null && <Radarchart data={audioAnalysis} />}
          </div>
        </div>
      </div>
    </>
  );
}
