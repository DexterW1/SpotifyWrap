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
      `http://localhost:5000/refresh_token?refresh_token=${getLocalRefreshToken()}`
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
  if (Date.now() - getLocalTimeStamp() > exp_time) {
    console.log("entered date exp");
    getRefreshToken();
  }
  const LocalAccessToken = getLocalAccessToken();
  if (!LocalAccessToken || LocalAccessToken === undefined) {
    // const urlParams = new URLSearchParams(window.location.hash.substring(1));
    // const access_token = urlParams.get("access_token");
    // const refresh_token = urlParams.get("refresh_token");
    // setLocalAccessToken(access_token);
    // setLocalRefreshToken(refresh_token);
    // return { access_token, refresh_token };
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
  console.log("logout");
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
