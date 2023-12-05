import { FaRegQuestionCircle } from "react-icons/fa";
import {
  MdHome,
  MdMenu,
  MdOutlinePerson,
  MdRequestQuote,
} from "react-icons/md";
import { NavLink, Outlet, Link } from "react-router-dom/dist";
import useDataUser from "../../../hooks/useUser/useDataUser";
import { AiFillProfile } from "react-icons/ai";
import { FcHome } from "react-icons/fc";

const Dashboard = () => {
  const { userData } = useDataUser();
  // console.log(userData)
  // console.log(userData.role)
  const dashboardLinks = (
    <>
      <li className="btn btn-ghost">
        <Link to="/dashboard">
          <MdHome className="text-xl" /> Home{" "}
        </Link>
      </li>
      <li className="btn btn-ghost">
        <NavLink to="/dashboard/profile">
          <MdOutlinePerson className="text-xl" /> Profile{" "}
        </NavLink>
      </li>
      <li className="btn btn-ghost">
        <NavLink to="/dashboard/my-donation-requests">
          <FaRegQuestionCircle /> My Donation Request{" "}
        </NavLink>
      </li>
      <li className="btn btn-ghost">
        <NavLink to="/dashboard/create-donation-request">
          {" "}
          Create Donation Request{" "}
        </NavLink>
      </li>
      {userData?.role === "admin" && (
        <>
          <li className="btn btn-ghost">
            <NavLink to="/dashboard/all-user">
              <AiFillProfile /> All Users
            </NavLink>
          </li>
          <li className="btn btn-ghost">
            <NavLink to="/dashboard/all-blood-donation-request">
              <MdRequestQuote /> All Donation Requests
            </NavLink>
          </li>
          <li className="btn btn-ghost">
            <NavLink to="/dashboard/content-management">
              Content Management
            </NavLink>
          </li>
          {/* <li className="btn btn-ghost mt-5 border-2 border-red-400">
            <NavLink to="/">
              <FcHome /> User Home
            </NavLink>
          </li> */}
        </>
      )}
      {userData?.role === "volunteer" && (
        <>
          <li className="btn btn-ghost">
            <NavLink to="/dashboard/all-blood-donation-request">
              <MdRequestQuote /> All Donation Requests
            </NavLink>
          </li>
          <li className="btn btn-ghost">
            <NavLink to="/dashboard/content-management">
              Content Management
            </NavLink>
          </li>
        </>
      )}
      <li className="btn btn-ghost mt-5 border-2 border-red-400">
        <NavLink to="/">
          <FcHome /> User Home
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open bg-[#f4f7fc]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <label
        htmlFor="my-drawer-2"
        className=" m-5 drawer-button absolute lg:hidden"
      >
        <MdMenu className=" text-3xl text-black z-20" />
      </label>
      <div className=" rounded-lg lg:p-8 p-4 drawer-content bg-[#fefefe] flex flex-col items-center lg:m-5 mt-16">
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side lg:bg-[#262D3F]  text-white pt-10">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <h3 className=" text-[#99E1D9] font-cinzel text-center text-2xl font-semibold">
          Dashboard
        </h3>
        <div className=" w-full h-1 border-2 rounded-full border-cyan-200"></div>
        <ul className="menu p-4 w-80 min-h-full">
          {/* Sidebar content here */}
          {dashboardLinks}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
