import { useQuery } from "@tanstack/react-query";
import useDataUser from "../useUser/useDataUser";
import useAxios from "../useAxios/useAxios";

const useAllUser = () => {
    const {userData} = useDataUser();
    const axiosSecure = useAxios();
    
    const {data: allUserData} = useQuery({
        queryKey: ['alluserByadmin'],
        queryFn: async () => { 
            const res = await axiosSecure.get(`/all-user?email=${userData.email}`)
            return res;
         }
    })
    console.log(allUserData)
    return {allUserData};
};

export default useAllUser;