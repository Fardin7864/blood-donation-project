import { Link } from 'react-router-dom';
import banner from '../../../assets/banner/2690848-removebg.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Banner = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh(); // Refresh AOS to detect new elements (optional)
  }, []);
  return (
    <div  className=" flex flex-col-reverse lg:flex-row gap-10 justify-center mb-10">
      <div className="lg:w-2/6 flex flex-col justify-center relative lg:-right-28">
        <h1 className=" text-4xl text-p leading-snug">
          <span className=" font-extrabold ">Help </span>& Save Life By <br /> Donating <span className=" font-extrabold">Blood</span>
        </h1>
        <p data-aos="fade-up" className=" hidden lg:block my-4 text-gray-600">
          "Champions for Life: Ignite the Flame of Benevolence! Your Invitation
          to Be a Pivotal Force in Our Community's Health and Happiness – Step
          Forward, Donate Blood, and Become the Architect of Positive Change!"
        </p>
        <div  data-aos="fade-up" className=' flex gap-7 my-5'>
        <button  className="hover:bg-p lg:w-48 hover:opacity-75 px-3 lg:px-10 lg:py-3 rounded-sm border border-[#00a1ab] text-xs lg:text-sm text-[#00a1ab] font-semibold mb-10">Join as a donor</button>
        <Link to="search" className="hover:bg-p lg:w-48 hover:opacity-75 px-3 lg:px-10 lg:py-3 py-1 rounded-sm bg-p text-xs lg:text-sm font-semibold mb-10">Search Donors</Link>
        </div>
      </div>
      <div className='-mt-5 lg:mt-0 lg:w-4/6'>
        <img src={banner} alt="" />
      </div>
    </div>
  );
};

export default Banner;
