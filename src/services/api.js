import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const IS_LOCAL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export default API;

