import axios from "axios";

const BASE_URL = "http://localhost:3003/api/";


  // const persistedUserData = JSON.parse(localStorage.getItem("persist:root"));

  // const userJson = JSON.parse(persistedUserData.user);

// const TOKEN = userJson.currentUser.accessToken;

const accessToken = localStorage.getItem('token')



export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `${accessToken}`}
});
