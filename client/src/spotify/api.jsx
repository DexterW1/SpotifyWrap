const url = import.meta.env.VITE_URL || "http://localhost:5000/";
const exp_time = 3600 * 1000;
const setLocalTimeStamp = () => {
  window.localStorage.setItem("spotify_timestamp", Date.now());
};
const setLocalAccessToken = (token) => {
  setLocalTimeStamp();
  window.localStorage.setItem("spotify_accessToken", token);
};
const setLocalRefreshToken = (token) => {
  window.localStorage.setItem("spotify_refreshToken", token);
};
const getLocalTimeStamp = () => {
  return window.localStorage.getItem("spotify_timestamp");
};
export const getLocalAccessToken = () => {
  return window.localStorage.getItem("spotify_accessToken");
};
const getLocalRefreshToken = () => {
  return window.localStorage.getItem("spotify_refreshToken");
};

const getRefreshToken = async () => {
  try {
    const res = await fetch(
      `${url}refresh_token?refresh_token=${getLocalRefreshToken()}`
    );
    const data = await res.json();
    setLocalAccessToken(data.access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};
const getToken = () => {
  if (Date.now() - getLocalTimeStamp() >= exp_time) {
    getRefreshToken();
  }
  const LocalAccessToken = getLocalAccessToken();
  if (!LocalAccessToken || LocalAccessToken === undefined) {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const access_token = urlParams.get("access_token");
    if (access_token) {
      const refresh_token = urlParams.get("refresh_token");
      setLocalAccessToken(access_token);
      setLocalRefreshToken(refresh_token);
      return access_token;
    }
  }
  return LocalAccessToken;
};
export const token = getToken();
export const logout = () => {
  // console.log("logout");
  window.localStorage.removeItem("spotify_accessToken");
  window.localStorage.removeItem("spotify_refreshToken");
  window.localStorage.removeItem("spotify_timestamp");
  // window.location.reload();
  window.location.href = "/";
};
//api calls
const headers = {
  Authorization: `Bearer ${getLocalAccessToken()}`,
};

//---------------------------------------- HELPER FUNCTIONS FOR API ----------------------
const getIdsFromTracks = (data) => {
  let result = "";
  for (let item of data) {
    result += item.id + ",";
  }
  return result;
};
const getAverage = (data) => {
  const properties = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "speechiness",
    "valence",
  ];
  const averageValues = {};
  properties.forEach((property) => {
    const propertySum = data.audio_features.reduce(
      (sum, obj) => sum + obj[property],
      0
    );
    averageValues[property] = propertySum / data.audio_features.length;
  });
  return averageValues;
};
///=================Global values ==========================
let global;
// API CALLS ---------------------------------
//function to grab userpicture and followers
export const getUser = async () => {
  const res = await fetch("https://api.spotify.com/v1/me", { headers });
  const data = await res.json();
  return data;
};
//function to grab following people count
export const getFollowing = async () => {
  const res = await fetch(
    "https://api.spotify.com/v1/me/following?type=artist",
    {
      headers,
    }
  );
  const data = await res.json();
  return data;
};
//function to grab total playlist count
export const getPlaylist = async () => {
  const res = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers,
  });
  const data = await res.json();
  return data;
};
//function to grab top items of user
export const getTopItems = async () => {
  const resArtist = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term",
    {
      headers,
    }
  );
  const resTrack = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term",
    {
      headers,
    }
  );
  const dataArtist = await resArtist.json();
  const dataTrack = await resTrack.json();
  const combinedData = {
    artist: dataArtist,
    track: dataTrack,
  };
  // console.log(combinedData);
  return combinedData;
};

//function to grab artist data in range
export const getArtist = async (range) => {
  let limit = 0;
  let time_range = "";
  if (range === "long") {
    limit = 50;
    time_range = "long_term";
  } else if (range === "medium") {
    limit = 30;
    time_range = "medium_term";
  } else if (range === "short") {
    limit = 13;
    time_range = "short_term";
  }
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=${limit}`,
    { headers }
  );
  const data = await res.json();
  return data;
};
//function to grab tracks data in range
export const getTracks = async (range) => {
  let limit = 0;
  let time_range = "";
  if (range === "long") {
    limit = 50;
    time_range = "long_term";
  } else if (range === "medium") {
    limit = 30;
    time_range = "medium_term";
  } else if (range === "short") {
    limit = 13;
    time_range = "short_term";
  }
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}`,
    { headers }
  );
  const data = await res.json();
  // console.log(data);
  return data;
};

//function to grab Audio Features in range
export const getFeatures = async (range) => {
  const trackData = await getTracks(range);
  const data = getIdsFromTracks(trackData.items);
  const res = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${data}`,
    { headers }
  );
  const result = await res.json();
  const transformedData = Object.entries(getAverage(result)).map(
    ([subject, value]) => ({
      subject,
      value,
    })
  );
  return transformedData;
};
//function to grab Artist Genere in range
export const getGenre = async (range) => {
  let genreCount = {};
  const data = await getArtist(range);
  data.items.forEach((artist) => {
    artist.genres.forEach((genre) => {
      if (genreCount[genre]) {
        genreCount[genre].count += 1;
      } else {
        genreCount[genre] = { genre: genre, count: 1 };
      }
    });
  });
  const dataArray = Object.values(genreCount);
  const filteredData = dataArray.filter((item) => item.count > 1);
  // console.log(filteredData);
  return filteredData;
};
//function to get track recommendation
export const getTrackRec = async (range) => {
  const data = await getTracks(range);
  const filteredData = data.items.splice(0, 5);
  // console.log(data);
  // console.log(getIdsFromTracks(filteredData));
  let ids = getIdsFromTracks(filteredData);
  // console.log(ids.slice(0, 22));
  ids = ids.slice(0, -1);
  const res = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${ids}`,
    { headers }
  );
  const newData = await res.json();
  // console.log(newData);
  return newData.tracks;
};
//function to get Artist recommendation
export const getArtistRec = async (range) => {
  let recArray = [];
  const artistData = await getArtist(range);
  // console.log(getIdsFromTracks(artistData.items.slice(0, 5)));
  let stringArray = getIdsFromTracks(artistData.items.slice(0, 5)).split(",");
  stringArray = stringArray.splice(0, stringArray.length - 1);

  // Use Promise.all to wait for all fetch operations to complete
  await Promise.all(
    stringArray.map(async (id) => {
      const res = await fetch(
        `https://api.spotify.com/v1/artists/${id}/related-artists`,
        { headers }
      );
      const data = await res.json();
      recArray.push(data.artists[0], data.artists[1]);
    })
  );
  return recArray;
};
