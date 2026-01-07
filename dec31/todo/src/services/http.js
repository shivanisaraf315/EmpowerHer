import axios from "axios";

export const http = axios.create({
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});
