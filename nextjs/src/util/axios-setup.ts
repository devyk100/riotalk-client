import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080', // Backend URL
    withCredentials: true, // This allows sending cookies with the request
  });