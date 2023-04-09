import axios from "axios";

const NewRequest = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default NewRequest;
