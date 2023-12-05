import { Rings } from "react-loader-spinner";
import useAdmin from "../../hooks/useAdmin/useAdmin";
// import useAuth from "../../hooks/useAuth/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useAuthantication from "../../hooks/useAuthan/useAuthantication";

const Adminroute = ({children}) => {
const {user,isLoading} =  useAuthantication();
const {isAdmin, isadminLoading} = useAdmin();
const location = useLocation();
if (isLoading || isadminLoading) {
    return (
        <div className=" w-full flex justify-center items-center">
          <div className="mt-28">
            <Rings
              height="90"
              width="90"
              color="#DC9110"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            />
          </div>
        </div>
      );
}

if (user && isAdmin?.data) {
    return children;
}

return <Navigate to="/" state={{from: location}} replace/>

};

export default Adminroute;