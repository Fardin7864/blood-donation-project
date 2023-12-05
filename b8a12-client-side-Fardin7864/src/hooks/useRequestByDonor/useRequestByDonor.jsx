import { useQuery } from "@tanstack/react-query";
import useAxios from "../useAxios/useAxios";
import useAuthantication from "../useAuthan/useAuthantication";

const useRequestByDonor = (page,pageSize) => {
    const {user} = useAuthantication();
    const axiosSecure = useAxios();
    const {data: bloodRequest, refetch: loadBloodRequest} = useQuery({
        queryKey: ['requestByDonor', user?.email],
        queryFn: async () => { 
           const res = await axiosSecure.get(`/requests?pageNumber=${page}&pageSize=${pageSize}`)
            return res.data;
         }
    })
    return {bloodRequest, loadBloodRequest}
};

export default useRequestByDonor;