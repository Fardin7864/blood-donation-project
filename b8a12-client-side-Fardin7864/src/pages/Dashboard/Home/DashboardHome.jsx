import useDataUser from "../../../hooks/useUser/useDataUser";
import RequestsTable from "../components/RequestsTable";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";

const DashboardHome = () => {
  const { userData = {} } = useDataUser();
  const axiosPublic= useAxiosPublic();
console.log(userData)

  const { data: bloodRequest } = useQuery({
    queryKey: ["requestByDonor", userData?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/request-count`
      );
      return res.data.result;
    },
  });
  const { data: totalUsers } = useQuery({
    queryKey: ["totalUserCount", userData?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/user-count`
      );
      return res.data.result;
    },
  });
  console.log('blood request:',bloodRequest , 'user-count:', totalUsers)

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h3 className=" text-xl text-p font-cinzel text-center">
        Hi,{" "}
        <span className="text-2xl text-[#850143] font-semibold">
          {userData?.name?.toUpperCase()}{" "}
        </span>
        Welcome to HemaConnect!
      </h3>
      {userData?.role === "admin" ? (
        <div className="stats shadow flex flex-col lg:flex-row">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Requests</div>
            <div className="stat-value text-primary">{bloodRequest}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-secondary">{totalUsers}</div>
          </div>


          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Funding</div>
            <div className="stat-value text-secondary">2.6M</div>
          </div>
        </div>
      ) : (
        <div className=" mt-10 bg-gray-50 rounded-lg pt-5 px-4 pb-10">
          <h3 className=" text-2xl font-medium text-center text-p my-5 underline">
            Your Most Recent Requests
          </h3>
          <RequestsTable requests={bloodRequest} />
          <div className=" w-full flex justify-center items-center my-4">
            <Link to="/dashboard/my-donation-requests">
              <button className=" btn btn-outline btn-md">
                View My All Request
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
