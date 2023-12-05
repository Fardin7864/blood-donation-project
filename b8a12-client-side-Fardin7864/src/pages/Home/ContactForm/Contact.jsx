import bgimg from '../../../assets/hero/book-bg.png'
import { FaCalendarAlt, FaCarSide, FaInbox, FaStarOfLife} from 'react-icons/fa'
import {FaLocationDot, FaPersonRifle} from 'react-icons/fa6'
import Swal from 'sweetalert2'




const Contact = () => {

    const popUp = () => { 
        Swal.fire({
            title: 'Success!',
            text: 'Successfully Booked a Test Drive!',
            icon: 'success',
            confirmButtonText: 'Okay'
          })
     }
    const bgColor = "bg-white"
    return (
        <div className=' md:mt-48 lg:mt-0 flex justify-center mb-10'>
            <div className={`${bgColor} shadow-xl bg-cover bg-no-repeat z-50 px-4 lg:px-16 py-14 rounded-lg`}  style={{backgroundImage: `url(${bgimg})`}}>
                <h1 className=' text-b text-2xl font-bold'>Contact Us</h1>
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9'>
                <div>
                    <h4 className=' text-b text-lg font-semibold mt-6 mb-2 flex items-center gap-3'><FaPersonRifle className=' text-xl'/> Name <FaStarOfLife className=' text-p text-xs'/></h4>
                    <input required 
                    name="" 
                    id=""
                    placeholder='Name' 
                    className=' py-3 text-base pl-3 pr-40 rounded-md border border-gray-400 text-gray-500'
                    />
                </div>
                <div>
                    <h4 className=' text-b text-lg font-semibold mt-6 mb-2 flex items-center gap-3'><FaInbox className=' text-xl'/> Email <FaStarOfLife className=' text-p text-xs'/></h4>
                    <input required 
                    name="" 
                    id=""
                    placeholder='Email' 
                    className=' py-3 text-base pl-3 pr-40 rounded-md border border-gray-400 text-gray-500'
                    />
                </div>
                <div>
                    <button onClick={popUp} type='submit' className=' bg-[#850143] hover:opacity-75 hover:shadow-xl active:opacity-60 text-base py-[14px] mt-14 text-white px-3 rounded-md w-full font-semibold'>SUBMIT</button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;