import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios/useAxios";
import useAuthantication from "../useAuthan/useAuthantication";


const useDataUser = () => {
    const axiosSecure = useAxios();
    const {user} = useAuthantication();
    const {data: userData, refetch: userDataLoader} = useQuery({
        queryKey:['userDataFromDatabase',user?.email],
        queryFn: async () => { 
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data[0];
         }
    })


    return {userData,userDataLoader};
};

export default useDataUser;
