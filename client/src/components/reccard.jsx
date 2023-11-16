import "./reccard.css";
export default function Reccard({ image, name, artist_name, type, preview }) {
  // console.log(image);
  // console.log(name);
  // console.log(artist_name);
  // console.log("Entered recard");
  return (
    <>
      {type === "track" ? (
        <div key={name} className="card-container">
          <div className="image-container-card">
            <img
              src={image.url}
              width={image.width - 150}
              height={image.height - 150}
              alt="song image"
            />
          </div>
          <h3>{name}</h3>
          {artist_name && artist_name.map((name) => <p>{name.name}</p>)}
          <div className="audio-container">
            <audio controls id="audioPlayer">
              <source src={preview} />
            </audio>
          </div>
        </div>
      ) : (
        <div key={name} className="artist-card-container">
          <img
            src={image.url}
            width={image.width - 150}
            height={image.height - 150}
            alt="song image"
          />
          <h3>{name}</h3>
        </div>
      )}
      {/* <div key={name} className="card-container">
        <img
          src={image.url}
          width={image.width - 150}
          height={image.height - 150}
          alt="song image"
        />
        <h3>{name}</h3>
        {artist_name && artist_name.map((name) => <p>{name.name}</p>)}
      </div> */}
    </>
  );
}
