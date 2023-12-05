import { useContext } from "react";
import { AuthContext } from "../../providers/authProvider/AuthanticationProvider";

const useAuthantication = () => {
   const auth = useContext(AuthContext)
   return auth;
};

export default useAuthantication;