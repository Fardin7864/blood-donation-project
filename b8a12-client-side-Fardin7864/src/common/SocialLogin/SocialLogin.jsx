import {FcGoogle} from "react-icons/fc"
import { useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios/useAxios";
import useAuthantication from "../../hooks/useAuthan/useAuthantication";

const SocialLogin = () => {
    const{socilaLogin, google, successToast, errorToast} = useAuthantication();
    const navigate = useNavigate();
    const location = useLocation();
    const axios = useAxios();
    const handlePopup = (provider) => { 
        socilaLogin(provider)
        .then(() => { 
            axios.post('/jwt')
            .then(res => {console.log(res.data)})
            navigate(location?.state ? location.state : "/")
            successToast("Login successfull!") })
        .catch(() => {
            errorToast("Faild!")})
     }
    return (
        <div className=" mt-4">
            <button onClick={() => handlePopup(google)}  className="btn w-full bg-gradient-to-r from-[#be006b] to-blue-700  bg-clip-text flex items-center text-white"> <FcGoogle className=" text-xl"></FcGoogle>With Google</button>
        </div>
    );
};

export default SocialLogin;