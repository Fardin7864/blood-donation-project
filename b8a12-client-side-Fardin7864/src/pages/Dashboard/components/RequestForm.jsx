import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAuthantication from "../../../hooks/useAuthan/useAuthantication";
import useDataUser from "../../../hooks/useUser/useDataUser";
import useAxios from "../../../hooks/useAxios/useAxios";
import DatePicker from "react-datepicker";
import { useLoaderData, useNavigate } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";


const RequestForm = () => {
    const userData = useLoaderData();
    // console.log(userData)
    const {
        successToast,
        errorToast,
      } = useAuthantication();
      const [startDate, setStartDate] = useState(new Date());
      const [district, setDistrict] = useState();
      const [upazila, setupazila] = useState();
    //   const { userData,userDataLoader } = useDataUser();
      const [donationTime, setdonationTime] = useState('12:00');
      const navigate = useNavigate();
      const axiosSecure = useAxios();
      const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm();

    //   useEffect(() => { 
    //     axiosPublic.get(`/requests?`)
    //    },[])

    useEffect(() => {
      fetch("/district.json")
        .then((res) => res.json())
        .then((data) => setDistrict(Object.values(data)));
    }, []);
  
    useEffect(() => {
      fetch("/upozila.json")
        .then((res) => res.json())
        .then((data) => setupazila(Object.values(data)));
    }, []);
  
    const districtList = district?.map((item) => ({
      value: `${item.name.toLowerCase()}`,
      label: `${item.name}`,
    }));
    const upozilaList = upazila?.map((item) => ({
      value: `${item.name.toLowerCase()}`,
      label: `${item.name}`,
    }));
    //blood group
    const bloodGroups = [
      { value: "A+", label: "A+" },
      { value: "A-", label: "A-" },
      { value: "B+", label: "B+" },
      { value: "B-", label: "B-" },
      { value: "AB+", label: "AB+" },
      { value: "AB-", label: "AB-" },
      { value: "O+", label: "O+" },
      { value: "O-", label: "O-" },
    ];
      
    const selectStyles = {
      control: (provided, state) => ({
        ...provided,
        width: "100%",
        fontSize: "20px",
        fontWeight: "400",
        paddingLeft: "5px",
        paddingTop: "1px",
        paddingBottom: "1px",
        backgroundColor: "#f3f3f3",
        borderRadius: "0.4rem",
        border: "none",
        color: "",
      }),
    };

    const onSubmit = (formData) => {
        const newUser ={
              recipientName: formData.recipient_name || userData?.recipientName,
              recipientBloodGroup: formData.blood_group || userData?.recipientBloodGroup,
              recipientDistrict: formData.district || userData?.recipientDistrict,
              recipientUpazila: formData.upazila || userData?.recipientUpazila,
              recipientHospital: formData.hospital || userData?.recipientHospital,
              fullAddress: formData.full_address || userData?.fullAddress,
              donationDate: startDate || userData?.donationDate,
              donationTime: donationTime || userData?.donationTime,
              requesterMessage: formData.message || userData?.requesterMessage,
              requestDate: new Date() || userData?.requestDate,
              donorName:  userData?.donorName,
              donorEmail: userData?.donorEmail,
            }
            console.log("Full Donation request: ",newUser)
            axiosSecure.put(`/requests/${userData._id}`,newUser)
            .then(res => {
                // console.log(res.data.message)
                if(res.data.message === "updated"){
                    successToast("Succesfully updated the request!")
                    reset();
                    navigate('/dashboard/all-blood-donation-request')
                }
            })
            .catch(err => errorToast(err))
      };


    return (
        <div className="bg-gradient-to-b  from-[#00a1ab] to-[#00a1ab]  p-5 text-b w-full rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className=" py-5">
              <div className=" flex flex-col lg:flex-row w-full gap-8 justify-between">
                {/* Name */}
                <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                  <label
                    htmlFor="name"
                    className="text-xl flex gap-3 items-center"
                  >
                   Requester Name
                  </label>
                  <input
                    type="text"
                    name="requester_name"
                    placeholder="Name"
                    value={userData?.requesterName}
                    {...register("requester_name")}
                    className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                  />
                </div>
                {/* requester Email */}
                <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                  <label
                    htmlFor="name"
                    className="text-xl flex gap-3 items-center"
                  >
                   Requester Email
                  </label>
                  <input
                    type="text"
                    name="requester_email"
                    value={userData?.requesterEmail}
                    {...register("requester_email")}
                    className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                  />
                </div>
              </div>
              {/* Recipient details */}
              <div className=" flex flex-col lg:flex-row w-full gap-8 justify-between">
                {/* recipient Name */}
                <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                  <label
                    htmlFor="name"
                    className="text-xl flex gap-3 items-center"
                  >
                  Recipient Name
                  </label>
                  <input
                    type="text"
                    name="recipient_name"
                    placeholder="Name"
                    defaultValue={userData?.recipientName}
                    {...register("recipient_name")}
                    className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                  />
                </div>
                {/* Blood group */}
                <div className=" w-full">
                  <h4 className=" text-white text-lg font-semibold mt-4 mb-2 flex items-center gap-3">
                  Recipient Blood Goup{" "}
                  </h4>
                  <Select
                    name="blood_group"
                    {...register("blood_group")}
                    options={bloodGroups}
                    placeholder="Blood Group"
                    onChange={(selectedOption) =>
                      setValue("blood_group", selectedOption.value.toLowerCase())
                    }
                    styles={selectStyles}
                  />
                </div>
              </div>
              <div className=" flex flex-col lg:flex-row justify-between gap-8">
                {/* District */}
                <div className=" w-full">
                  <h4 className=" text-white text-lg font-semibold mt-6 mb-2 flex items-center gap-3">
                    District{" "}
                  </h4>
                  <Select
                    name="district"
                    {...register("district")}
                    options={districtList}
                    placeholder="Change District"
                    onChange={(selectedOption) => {
                      setValue("district", selectedOption.value);
                    }}
                    styles={selectStyles}
                  />
                </div>
                {/* Upazila */}
                <div className=" w-full">
                  <h4 className=" text-white text-lg font-semibold mt-[26px] mb-2 flex items-center gap-3">
                    Upazila{" "}
                  </h4>
                  <Select
                    options={upozilaList}
                    {...register("upazila")}
                    name="upazila"
                    placeholder="Change Upazila"
                    onChange={(selectedOption) => {
                      setValue("upazila", selectedOption.value);
                    }}
                    styles={selectStyles}
                  />
                </div>
              </div>
              {/* time and date */}
              <div className=" flex flex-col lg:flex-row gap-8">
                  {/* hospital name */}
                  <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                  <label
                    htmlFor="name"
                    className="text-xl flex gap-3 items-center"
                  >
                  Hospital
                  </label>
                  <input
                    type="text"
                    name="hospital"
                    defaultValue={userData?.
                        recipientHospital
                        }
                    placeholder="Hospital Name"
                    {...register("hospital", {required: true})}
                    className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                  />
                </div>
                {/* full address */}
                <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                  <label
                    htmlFor="name"
                    className="text-xl flex gap-3 items-center"
                  >
                  Full Address
                  </label>
                  <input
                    type="text"
                    name="full_address"
                    placeholder="Address"
                    defaultValue={userData?.
                        fullAddress
                        }
                    {...register("full_address")}
                    className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                  />
                </div>
              </div>
              <div className=" flex flex-col lg:flex-row gap-8">
                  {/* donation date */}
                <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                  <label
                    htmlFor="name"
                    className="text-xl flex gap-3 items-center"
                  >
                    Donation Date
                  </label>
                <DatePicker
                 selected={startDate}
                 className="w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                  onChange={(date) => setStartDate(date)} />
                </div>
                {/*  donation time */}
                <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                  <label
                    htmlFor="name"
                    className="text-xl flex gap-3 items-center"
                  >
                  Donation Time
                  </label>
                    <input
                      type="time"
                      value={donationTime}
                      onChange={(e) => setdonationTime(e.target.value)}
                      className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                      />
                </div>
              </div>
              <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                  <label
                    htmlFor="name"
                    className="text-xl flex gap-3 items-center"
                  >
                  Requester Message
                  </label>
                  <textarea
                    type="text"
                    name="message"
                    placeholder="Message"
                    defaultValue={userData?.
                        requesterMessage
                        }
                    {...register("message")}
                    className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                  />
                </div>
                <div className=" w-full mt-6">
                  <button
                    type="submit"
                    className="text-lg hover:opacity-70 active:opacity-25 text-white font-bold bg-gradient-to-r from-[#be006b] to-[#e33b54] via-[#e33b44] py-3 px-3 rounded-lg w-full mt-4"
                  >
                    Update Request
                  </button>
                </div>
        </form>
        </div>
    );
};

export default RequestForm;