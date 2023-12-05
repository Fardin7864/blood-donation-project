import { useQuery } from "@tanstack/react-query";
// import useAuth from "../useAuth/useAuth";
// import useAxios from "../useAxios/useAxios";
import useAuthantication from "../useAuthan/useAuthantication";
import useAxios from "../useAxios/useAxios";

const useAdmin = () => {
    const {user} = useAuthantication();
    const axiosSecure = useAxios();

    const {data: isAdmin, isLoading: isadminLoading} = useQuery({
        queryKey: [user?.email, "isAdminss"],
        queryFn: () => axiosSecure.get(`/users/admin/${user.email}`)
           
    })

    return {isAdmin, isadminLoading}

};

export default useAdmin;