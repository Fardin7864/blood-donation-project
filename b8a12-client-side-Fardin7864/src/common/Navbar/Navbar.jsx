import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo/anuj24may_7-removebg-preview.png'
import useAuthantication from "../../hooks/useAuthan/useAuthantication";

const Navbar = () => {
  const {user , logOut, successToast} = useAuthantication();
  // console.log(user)
  const naveLinks = (
    <>
      <li className="font-normal text-base px-2 ">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-normal text-base px-2 ">
        <NavLink to="/donation-request">Donation Request</NavLink>
      </li>
      <li className="font-normal text-base px-2 ">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li className="font-normal text-base px-2 ">
        <NavLink to="/funding">Funding</NavLink>
      </li>
      <li className="font-normal text-base px-2 ">
        <NavLink to="/blog">Blog</NavLink>
      </li>
    </>
  );


// console.log(profile)
 const handleSignOut = () => { 
  logOut();
  successToast('Log Out successfully!')
  }




  return (
    <div className=" navbar bg-white z-[100] text-black pt-5 sticky -top-7">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu bg-transparent menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {naveLinks}
          </ul>
        </div>
        <div className=" flex justify-center items-center">
          <div className="h-14 flex justify-center items-center">
            <img src={logo} alt=""  className=" w-full h-full"/>
            <h4 className=" text-2xl font-extrabold font-roboto"><span className=" bg-p pl-1">B</span>LOOD.</h4>
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{naveLinks}</ul>
      </div>
      {
        user && 
        <div className="navbar-end flex items-center gap-4">
          <img src={user?.photoURL } alt=""  className=" w-7 h-7 rounded-full hidden md:block "/>
        <p className=" text-lg font-bold text-p hidden md:block">{user?.displayName}</p>
        <button onClick={handleSignOut}  className="bg-p hover:opacity-75 text-white hover:shadow-xl active:opacity-60 py-2 px-3 text-sm font-medium rounded-lg flex items-center justify-center gap-5">Sign Out</button>
      </div> 
      || 
      <div className="navbar-end flex gap-3">
        <Link to="/login" className="bg-p hover:opacity-75 text-white hover:shadow-xl active:opacity-60 py-2 px-3 text-sm font-medium rounded-lg flex items-center justify-center gap-5">Log In</Link>
        <Link to="/signup" className="bg-p hover:opacity-75 text-white hover:shadow-xl active:opacity-60 py-2 px-3 text-sm font-medium rounded-lg flex items-center justify-center gap-5">Register</Link>
        </div>
      }
      
    </div>
  );
};

export default Navbar;
