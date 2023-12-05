import bloddonation from "../../../assets/banner/donatingBlood.jpg";

const About = () => {
  return (
    <>
      <div className=" flex flex-col-reverse lg:flex-row gap-10 justify-center mt-32 mb-14">
        <div className=" -mt-14 lg:mt-0 lg:w-1/2">
          <img src={bloddonation} alt="" />
        </div>
        <div className="lg:w-2/6 flex flex-col justify-center">
          <p className=" font-bold text-blue-700">Blood Rquest</p>
          <h1 className=" text-4xl text-p leading-snug">
            Can not find Blood ? Do no Warry...
          </h1>
          <p className=" hidden lg:block my-4 text-gray-600">
            "HemaConnect has you covered. Our platform is here to connect donors
            with those in need. No matter the situation, we're dedicated to
            ensuring a steady and accessible blood supply. Your health and
            well-being matter to us, and our user-friendly platform makes
            finding and receiving blood easier than ever."
          </p>
          <div className=" flex gap-7 my-5">
            <button className="hover:bg-p lg:w-48 hover:opacity-75 px-3 lg:px-10 lg:py-3 py-1 rounded-sm bg-p text-xs lg:text-sm font-semibold mb-10">
              Create Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
