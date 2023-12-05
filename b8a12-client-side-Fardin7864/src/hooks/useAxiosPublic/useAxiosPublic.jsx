import axios from "axios";

const instens = axios.create({
    // baseURL: "http://localhost:5000/api/v1",
    baseURL: "https://blood-connect-final.vercel.app/api/v1",
    withCredentials: true,
})

const useAxiosPublic = () => {
    return instens;

};

export default useAxiosPublic;