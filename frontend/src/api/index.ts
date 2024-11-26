import axios from "axios";

export const api = axios.create({
    baseURL: 'http://143.198.171.212:3000'
});