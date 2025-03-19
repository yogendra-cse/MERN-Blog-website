import axios from 'axios';
const apiRequest = axios.create({
  baseURL: "http://localhost:4005",
  withCredentials: true,
});
export default apiRequest;

