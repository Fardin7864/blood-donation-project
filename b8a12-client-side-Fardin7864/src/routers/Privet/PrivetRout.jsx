import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../../hooks/useAuth/useAuth";
import { Rings } from "react-loader-spinner";
import useAuthantication from "../../hooks/useAuthan/useAuthantication";

const PrivetRout = ({ children }) => {
  const { user, isLoading } = useAuthantication();
  const location = useLocation();
  if (isLoading) {
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

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.state} />;
};

export default PrivetRout;
