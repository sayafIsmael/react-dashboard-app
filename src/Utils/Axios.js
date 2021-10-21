import axios from "axios";
import { Setting } from "./Settings";

export const Axios = axios.create({
  baseURL: Setting.API_URL,
  ...(localStorage.getItem("access_token") && {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }),
});
