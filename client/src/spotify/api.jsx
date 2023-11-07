import axios from "axios";

const getToken = () => {
  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  const access_token = urlParams.get("access_token");
  const refresh_token = urlParams.get("refresh_token");
  return { access_token, refresh_token };
};
export const token = getToken();

//api calls
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
