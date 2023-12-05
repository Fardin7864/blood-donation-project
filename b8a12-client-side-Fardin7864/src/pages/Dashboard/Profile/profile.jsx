import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { MdBloodtype, MdEmail } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import Select from "react-select";
import axios from "axios";
import { Helmet } from "react-helmet";
import useAuthantication from "../../../hooks/useAuthan/useAuthantication";
import useDataUser from "../../../hooks/useUser/useDataUser";
import useAxios from "../../../hooks/useAxios/useAxios";
const image_hosting_key = import.meta.env.VITE_image_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const {
    successToast,
    errorToast,
    creatUres,
    user,
    updateUserProfile,
    loadUser,
    updateUserName,
  } = useAuthantication();
  const [district, setDistrict] = useState();
  const [upazila, setupazila] = useState();
  const [error, setError] = useState("");
  const { userData,userDataLoader } = useDataUser();
  const [isupdate, setupdate] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
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

  // form submit
  const onSubmit = async (formData) => {
    setError("");
    let img;
    if(formData.image[0])
    {
      const imageFile = { image: formData.image[0] };
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      img = res?.data?.data?.display_url ;
    }
    const newUser = img
      ? {
          name: formData.name.toLowerCase(),
          bloodGroup: formData.blood_group,
          district: formData.district,
          upazila: formData.upazila,
          profile: img,
        }
      : {
          name: formData.name.toLowerCase(),
          bloodGroup: formData.blood_group,
          district: formData.district,
          upazila: formData.upazila,
        };
        axiosSecure.patch(`/user/${userData._id}`,newUser)
        .then(res => {
            console.log(res)
            if (img) {
              console.log('update if block!')
              updateUserProfile(formData.name?.toLowerCase(),img)
              loadUser();
              console.log(user)
            }
            else{
              updateUserName(newUser?.name)
              loadUser();
              console.log("updated user: " , user)
            }
            successToast("Updated profile successfully!");
            userDataLoader();
            loadUser();

          
        })
        .catch(err => {
          errorToast(err.message)
        })

  };

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



  return (
    <>
      <Helmet>
        <title>Dashboard | Profile</title>
      </Helmet>
      <div className="bg-gradient-to-b  from-[#00a1ab] to-[#00a1ab]  p-5 text-b w-full rounded-xl px-9">
        <div className=" flex flex-col justify-center items-center">
          <div className="avatar mb-2">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={userData?.profile} />
            </div>
          </div>
          <h3 className=" text-3xl text-white font-bold text-center">
            {userData?.name?.toUpperCase()}
          </h3>
          <h5 className=" text-lg text-gray-100 flex justify-center items-center gap-2">
            <MdEmail />
            <span>Email : </span> {userData?.email}
          </h5>
          <h5 className=" text-lg text-gray-100 flex justify-center items-center gap-2">
            <FaAddressBook />
            <span>Address : </span>{" "}
            {userData?.district?.replace(/\b\w/g, (c) => c.toUpperCase())}
            <span className=" hidden md:block"> , {userData?.upazila?.replace(/\b\w/g, (c) => c.toUpperCase())}</span> 
          </h5>
          <h5 className=" text-lg text-gray-100 flex justify-center items-center gap-2">
            <MdBloodtype/> Blood Group : {userData?.bloodGroup.toUpperCase()}
          </h5>
        </div>

        <div className=" flex justify-center items-center w-full">
        <button onClick={()=> setupdate(!isupdate)} className=" btn text-lg hover:opacity-70 active:opacity-25 text-white font-bold bg-gradient-to-r from-[#be006b] to-[#e33b44] via-[#e33b44] py-3 px-3 rounded-lg mt-4">Update Profile</button>
        </div>
        {
            isupdate? (        <form onSubmit={handleSubmit(onSubmit)} className=" py-5">
            <div className=" flex flex-col lg:flex-row w-full gap-8 justify-between">
              {/* Name */}
              <div className=" flex flex-col gap-3 mt-3 text-white w-full">
                <label
                  htmlFor="name"
                  className="text-xl flex gap-3 items-center"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  defaultValue={userData?.name}
                  {...register("name")}
                  className=" w-full text-xl py-2 bg-[#f3f3f3] rounded-lg pl-4 text-black"
                />
              </div>
              {/* Blood group */}
              <div className=" w-full">
                <h4 className=" text-white text-lg font-semibold mt-4 mb-2 flex items-center gap-3">
                  Blood Goup{" "}
                </h4>
                <Select
                  name="blood_group"
                  {...register("blood_group")}
                  required
                  options={bloodGroups}
                  placeholder="Change Blood Group"
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
            <div className=" flex flex-col lg:flex-row gap-8">
              {/* upload profile */}
              <div className=" flex flex-col gap-2 mt-3 text-white w-full">
                <label
                  htmlFor="photo"
                  className="text-xl flex gap-3 items-center text-white"
                >
                  Photo
                </label>
                <input
                  {...register("image")}
                  type="file"
                  name="image"
                  className="file-input text-black file-input-bordered w-full max-w-xs"
                />
              </div>
              <div className=" w-full mt-6">
                <button
                  type="submit"
                  className="text-lg hover:opacity-70 active:opacity-25 text-white font-bold bg-gradient-to-r from-[#be006b] to-[#e33b54] via-[#e33b44] py-3 px-3 rounded-lg w-full mt-4"
                >
                  Save Change
                </button>
              </div>
            </div>
            {/* error set */}
            {error && <p className=" text-sm text-red-700">{error}</p>}
          </form>) : ("")
        }

      </div>
    </>
  );
};

export default Profile;
