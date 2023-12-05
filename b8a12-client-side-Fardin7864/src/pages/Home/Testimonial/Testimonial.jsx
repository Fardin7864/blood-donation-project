import profile1 from '../../../assets/testimonials/pfp1.jpg'
import profile2 from '../../../assets/testimonials/pfp2.jpg'


const Testimonial = () => {
  return (
    <div className=' px-6'>
      <div className=" mt-16 flex flex-col justify-center items-center">
        <h3 className=" text-b text-3xl md:text-5xl font-extrabold">
        Our Recipient Opinion
        </h3>
        <p className=" lg:w-8/12 text-center text-[#706F7B] py-5 lg:py-5">
        Discover the positive impact we've made on the our clients by reading through their testimonials. Our clients have experienced our service and results, and they're eager to share their positive experiences with you.
        </p>
      </div>
      <div className=' flex lg:flex-row flex-col justify-center gap-10 py-10'>
        <div className={` lg:w-2/6 pt-10 pb-8 rounded-md shadow-xl px-9 space-y-7 `}>
            <h4 className=' text-b text-xl font-medium'>""I recently donated blood through this website, and the experience was fantastic. The user-friendly interface allowed me to easily schedule my appointment online, and the staff at the donation center were incredibly professional and friendly. "</h4>
            <div className=' flex items-center gap-6'>
                <div className=' w-16 h-16'>
                  <img src={profile1} alt="" className=' rounded-full' />
                  </div>
                <div>
                    <h4 className=' text-b font-bold text-md'>Parry Chad</h4>
                    <p className=' text-gray-600 text-xs font-medium'>Bachur Agla</p>
                </div>
            </div>
        </div>
        <div className={` lg:w-2/6 pt-10 pb-8 rounded-md shadow-xl px-9 space-y-7`}>
            <h4 className=' text-b text-xl font-medium'>"As a regular blood donor, I've used various platforms, but this website stands out. The services section provides clear information on different donation options, and the online appointment scheduling is a game-changer for someone "</h4>
            <div className=' flex items-center gap-6'>
                <div className=' w-16 h-16'>
                  <img src={profile2} alt="" className=' rounded-full' />
                  </div>
                <div>
                    <h4 className=' text-b font-bold text-md'>Mir Kashem</h4>
                    <p className=' text-gray-600 text-xs font-medium'>Bachur Agla</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
