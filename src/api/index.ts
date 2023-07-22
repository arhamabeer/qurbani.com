import axios from "axios";
import { API_URL } from "../config/api_endpoint";

const instance = axios.create({
  baseURL: API_URL,
});

/**
 *
 * @param token token after authentication
 * @returns {Promise} axios object
 */
const instanceAuth = (token: string) =>
  axios.create({
    baseURL: API_URL,
    headers: {
      authorization: "Bearer " + token,
    },
  });

export { instance, instanceAuth };
