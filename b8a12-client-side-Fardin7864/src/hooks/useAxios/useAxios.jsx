import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase/Firebase";

const instance = axios.create({
    baseURL:'https://blood-connect-final.vercel.app/api/v1',
    // baseURL:'http://localhost:5000/api/v1',
    withCredentials: true,
})

const useAxios = () => {
//     const auth = getAuth(app);
//     const removeUser = () => { 
//         signOut(auth)
//      }
// instance.interceptors.response.use(
//     (response) => {
//         // console.log(response);
//         return response;
//     },
//     (error) => {
//         console.log('error from hook:' , error?.response?.status);
//         // logOut();
//         removeUser();
//         return Promise.reject(error);
//     }
// );
   return instance;
};

export default useAxios;