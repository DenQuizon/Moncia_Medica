import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://final-backend-lac.vercel.app",
});
const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
