import axios from "axios";
import { API } from "../API/API";

export const postRegis = (data) => {
  const res = axios.post(`${API}register`, data);
  return res;
};

export const fetchData = (url, data) => {
  const res = axios.post(`${API}${url}`, data)
  return res
}