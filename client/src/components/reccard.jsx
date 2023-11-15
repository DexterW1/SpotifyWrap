import "./reccard.css";
export default function Reccard({ image, name, artist_name }) {
  console.log(image);
  console.log(name);
  console.log(artist_name);
  console.log("Entered recard");
  return (
    <>
      <div className="card-container">
        <img
          src={image.url}
          width={image.width - 150}
          height={image.height - 150}
          alt=""
        />
        <h3>{name}</h3>
        {artist_name && artist_name.map((name) => <p>{name.name}</p>)}
      </div>
    </>
  );
}
