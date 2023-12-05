import heroBg from "../../../assets/hero/hero.gif";

const Campaign = () => {
  return (
      <div className="flex flex-col lg:flex-row justify-center items-center my-10">
        <div className=" w-full lg:w-1/2  px-5 flex flex-col justify-center items-center text-center">
          <h1 className=" text-3xl lg:text-4xl font-bold text-p leading-snug">
            About Us
          </h1>
          <p className=" text-sm text-justify lg:block my-4 text-gray-600">
          Welcome to HemaConnect, where compassion meets commitment in the noble pursuit of saving lives. Established with a vision to create a community bound by the life-giving thread of blood donation, we stand as a beacon of hope and health.
          </p>
          <button className="hover:bg-p lg:w-48 hover:opacity-75 px-3 lg:px-10 lg:py-3 py-1 rounded-sm bg-p text-xs lg:text-sm font-semibold mb-10">
              Join Us
            </button>
        </div>
        <div className=" w-5/6">
          <div
            className="object-cover bg-no-repeat h-[400px]"
            style={{
              backgroundImage: `url(${heroBg})`,
            }}
          >
            <div className= " w-1/2 bg-black h-full bg-opacity-40"></div>
            <div className=" w-1/2 flex flex-col justify-center relative -top-80 px-5">
              <p className=" text-xs font-bold text-blue-700 bg-white w-1/2 text-center rounded-sm py-1">New Campaign</p>
              <h1 className=" text-3xl font-bold text-white leading-snug">
                Join us in our upcoming Campaign
              </h1>
              <p className=" text-sm hidden lg:block my-4 text-gray-300">
                "No matter the situation, we're dedicated to ensuring a steady
                and accessible blood supply. Our user-friendly platform makes
                than ever."
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Campaign;
