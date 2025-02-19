import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:3000",
});
const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
