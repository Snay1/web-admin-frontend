import axios from "axios";
import { baseURL } from "~/common";

const instance = axios.create({
    baseURL: baseURL
});

export default instance;