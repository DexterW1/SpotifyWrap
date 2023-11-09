import { Audio } from "react-loader-spinner";
import "./loader.css";
export default function Loader() {
  return (
    <div className="loader-container">
      <Audio
        height="100"
        width="100"
        color="#1db954"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
}
