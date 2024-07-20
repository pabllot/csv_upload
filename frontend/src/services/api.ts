import axios from "axios";

const PROD = "https://seucardapioaqui.com:3004";
const DEV = "http://localhost:3000";

export const api = axios.create({
  baseURL: PROD,
});
