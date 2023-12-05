import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Helmet } from "react-helmet";
import useAuthantication from "../../../hooks/useAuthan/useAuthantication";
import useDataUser from "../../../hooks/useUser/useDataUser";
import useAxios from "../../../hooks/useAxios/useAxios";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

const BloodRequest = () => {
  const { successToast, errorToast } = useAuthantication();
  const [startDate, setStartDate] = useState(new Date());
  const [district, setDistrict] = useState();
  const [upazila, setupazila] = useState();
  const [error, setError] = useState("");
  const { userData, userDataLoader } = useDataUser();
  const [donationTime, setdonationTime] = useState("12:00");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxios();
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
    setError("");
    const newUser = {
      requesterName: userData.name.toLowerCase(),
      requesterEmail: userData.email,
      recipientName: formData.recipient_name,
      recipientBloodGroup: formData.blood_group,
      recipientDistrict: formData.district,
      recipientUpazila: formData.upazila,
      recipientHospital: formData.hospital,
      fullAddress: formData.full_address,
      donationDate: startDate,
      donationTime: donationTime,
      requesterMessage: formData.message,
      requestStatus: "pending",
      requestDate: new Date(),
      donorName: "",
      donorEmail: "",
    };

    if (userData.status === "block") {
      errorToast("You are blocked by admin!");
    } else if (userData.status === "active") {
      axiosSecure
        .post("/request", newUser)
        .then((res) => {
          if (res.data._id) {
            reset();
            successToast("Created a new request!");
            userDataLoader();
            navigate("/dashboard");
          }
          // if()
        })
        .catch((err) => console.log(err));
    }

    // console.log("Full Donation request: ",newUser)
  };


  return (
    <div className=" w-full">
      <Helmet>
        <title>Blood Request</title>
      </Helmet>
      <div className="bg-gradient-to-b  from-[#00a1ab] to-[#00a1ab]  p-5 text-b w-full rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)} className=" py-5">
          <div className=" flex flex-col lg:flex-row w-full gap-8 justify-between">
            {/* Name */}
            <div className=" flex flex-col gap-3 mt-3 text-white w-full">
              <label htmlFor="name" className="text-xl flex gap-3 items-center">
                Requester Name
              </label>
              <input
                type="text"
                name="requester_name"
                placeholder="Name"
                value={userData?.name}
                {...register("requester_name")}
                className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
              />
            </div>
            {/* requester Email */}
            <div className=" flex flex-col gap-3 mt-3 text-white w-full">
              <label htmlFor="name" className="text-xl flex gap-3 items-center">
                Requester Email
              </label>
              <input
                type="text"
                name="requester_email"
                value={userData?.email}
                {...register("requester_email")}
                className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
              />
            </div>
          </div>
          {/* Recipient details */}
          <div className=" flex flex-col lg:flex-row w-full gap-8 justify-between">
            {/* recipient Name */}
            <div className=" flex flex-col gap-3 mt-3 text-white w-full">
              <label htmlFor="name" className="text-xl flex gap-3 items-center">
                Recipient Name
              </label>
              <input
                type="text"
                name="recipient_name"
                placeholder="Name"
                {...register("recipient_name", { required: true })}
                className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
              />
              {errors.recipient_name?.type === "required" && (
                <p className=" text-red-800" role="alert">
                  Recipient name is required
                </p>
              )}
            </div>
            {/* Blood group */}
            <div className=" w-full">
              <h4 className=" text-white text-lg font-semibold mt-4 mb-2 flex items-center gap-3">
                Recipient Blood Goup{" "}
              </h4>
              <Select
                name="blood_group"
                {...register("blood_group", { required: true })}
                required
                options={bloodGroups}
                placeholder="Blood Group"
                onChange={(selectedOption) =>
                  setValue("blood_group", selectedOption.value.toLowerCase())
                }
                styles={selectStyles}
              />
              {errors.blood_group?.type === "required" && (
                <p className=" text-red-800" role="alert">
                  Blood group is required
                </p>
              )}
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
                {...register("district", { required: true })}
                options={districtList}
                placeholder="Change District"
                onChange={(selectedOption) => {
                  setValue("district", selectedOption.value);
                }}
                styles={selectStyles}
              />
              {errors.district?.type === "required" && (
                <p className=" text-red-800" role="alert">
                  District is required
                </p>
              )}
            </div>
            {/* Upazila */}
            <div className=" w-full">
              <h4 className=" text-white text-lg font-semibold mt-[26px] mb-2 flex items-center gap-3">
                Upazila{" "}
              </h4>
              <Select
                options={upozilaList}
                {...register("upazila", { required: true })}
                name="upazila"
                placeholder="Change Upazila"
                onChange={(selectedOption) => {
                  setValue("upazila", selectedOption.value);
                }}
                styles={selectStyles}
              />
              {errors.upazila?.type === "required" && (
                <p className=" text-red-800" role="alert">
                  Upazila is required
                </p>
              )}
            </div>
          </div>
          {/* time and date */}
          <div className=" flex flex-col lg:flex-row gap-8">
            {/* hospital name */}
            <div className=" flex flex-col gap-3 mt-3 text-white w-full">
              <label htmlFor="name" className="text-xl flex gap-3 items-center">
                Hospital
              </label>
              <input
                type="text"
                name="hospital"
                placeholder="Hospital Name"
                {...register("hospital", { required: true })}
                className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
              />
              {errors.hospital?.type === "required" && (
                <p className=" text-red-800" role="alert">
                  Hospital name is required
                </p>
              )}
            </div>
            {/* full address */}
            <div className=" flex flex-col gap-3 mt-3 text-white w-full">
              <label htmlFor="name" className="text-xl flex gap-3 items-center">
                Full Address
              </label>
              <input
                type="text"
                name="full_address"
                placeholder="Address"
                {...register("full_address", { required: true })}
                className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
              />
              {errors.full_address?.type === "required" && (
                <p className=" text-red-800" role="alert">
                  Address is required
                </p>
              )}
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row gap-8">
            {/* donation date */}
            <div className=" flex flex-col gap-3 mt-3 text-white w-full">
              <label htmlFor="name" className="text-xl flex gap-3 items-center">
                Donation Date
              </label>
              <DatePicker
                selected={startDate}
                className="w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                onChange={(date) => setStartDate(date)}
              />
            </div>
            {/*  donation time */}
            <div className=" flex flex-col gap-3 mt-3 text-white w-full">
              <label htmlFor="name" className="text-xl flex gap-3 items-center">
                Donation Time
              </label>
              <input
                type="time"
                required
                value={donationTime}
                onChange={(e) => setdonationTime(e.target.value)}
                className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
              />
            </div>
          </div>
          <div className=" flex flex-col gap-3 mt-3 text-white w-full">
            <label htmlFor="name" className="text-xl flex gap-3 items-center">
              Requester Message
            </label>
            <textarea
              type="text"
              name="message"
              placeholder="Message"
              {...register("message", { required: true })}
              className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
            />
            {errors.message?.type === "required" && (
              <p className=" text-red-800" role="alert">
                Message is required
              </p>
            )}
          </div>
          <div className=" w-full mt-6">
            <button
              type="submit"
              className="text-lg hover:opacity-70 active:opacity-25 text-white font-bold bg-gradient-to-r from-[#be006b] to-[#e33b54] via-[#e33b44] py-3 px-3 rounded-lg w-full mt-4"
            >
              Create Request
            </button>
          </div>
          {/* error set */}
          {error && <p className=" text-sm text-red-800">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default BloodRequest;
