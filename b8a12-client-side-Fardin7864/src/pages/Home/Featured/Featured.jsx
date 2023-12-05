import { FaHeartPulse, FaMagnifyingGlass, FaPerson } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <div data-aos="fade-up" className=" flex justify-center items-center my-10">
      <div className=" grid grid-cols-1 lg:grid-cols-3  lg:w-8/12 gap-10">
        <Link className=" active:bg-opacity-20 hover:bg-violet-100 card bg-base-100 shadow-xl py-4">
          <figure className="px-10 pt-10">
            <div className=" bg-violet-500 w-10 h-10 rotate-45 my-3 absolute"></div>
            <FaHeartPulse className=" text-xl text-white z-20"/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-p font-bold">Donate Blood</h2>
            <p className=" text-gray-500 text-justify text-xs">
              Donating blood is a simple yet impactful way to save lives. By
              giving a small part of yourself.
            </p>
          </div>
        </Link>
        {/* 2nd card */}
        <Link className=" active:bg-opacity-20 hover:bg-red-100 card bg-base-100 shadow-xl py-4">
          <figure className="px-10 pt-10">
            <div className=" bg-[#7a0a0a] w-10 h-10 rotate-45 my-3 absolute"></div>
            <FaMagnifyingGlass className=" text-xl text-white z-20"/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-p font-bold">Search Blood</h2>
            <p className=" text-gray-500 text-justify text-xs">
              Donating blood is a simple yet impactful way to save lives. By
              giving a small part of yourself.
            </p>
          </div>
        </Link>
        <Link className=" active:bg-opacity-20 hover:bg-cyan-100 card bg-base-100 shadow-xl py-4">
          <figure className="px-10 pt-10">
            <div className=" bg-p w-10 h-10 rotate-45 my-3 absolute"></div>
            <FaPerson className=" text-xl text-white z-20"/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-p font-bold">Patitent List</h2>
            <p className=" text-gray-500 text-justify text-xs">
              Donating blood is a simple yet impactful way to save lives. By
              giving a small part of yourself.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Featured;
