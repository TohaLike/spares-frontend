import axios from "axios";

export const API_URL = `${process.env.SERVER_URL}/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default $api;
