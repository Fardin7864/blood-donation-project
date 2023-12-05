import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuthantication from "../../hooks/useAuthan/useAuthantication";
import { useForm } from "react-hook-form";
import { MdBloodtype } from "react-icons/md";
import { FaLocationDot, FaStarOfLife } from "react-icons/fa6";
import Select from "react-select";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { Helmet } from "react-helmet";
import useDataUser from "../../hooks/useUser/useDataUser";
const image_hosting_key = import.meta.env.VITE_image_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Signup = () => {
  const { successToast, errorToast, creatUres, updateUserProfile,loadUser } = useAuthantication();
  const [showPassword, setShowPassword] = useState(false);
  const [district, setDistrict] = useState();
  const [upazila, setupazila] = useState();
  const [error, setError] = useState("");
  const {userData,userDataLoader} = useDataUser()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // State for password visibility
  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();
  // Form data input

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
    // console.log(formData?.imgage)
    const imageFile = { image: formData?.image[0] };
    // console.log(imageFile)
    const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res)
    const img =res?.data?.data?.display_url;
    // console.log(img);
    // console.log(user)

    const newUser = {
      name: formData.name.toLowerCase(),
      email: formData.email,
      bloodGroup: formData.blood_group,
      district: formData.district,
      upazila: formData.upazila,
      profile: img,
      role: 'donor',
      status: 'active',
    }
    // console.log(newUser)
    if(formData.password.length < 6 ) {
        setError("Password must be 6 characters or more!")
        return;
    }
    else if(formData.password !== formData.confirmpassword){
      setError("Password dose not match!");
      return;
    }
    else if (!/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/.test(formData.password)) {
        setError("Password must need one uper case, one special character!")
        return;
    }else{
        // successToast();
        creatUres(formData.email, formData.password)
        .then((res)=>{
          loadUser();
          if(res.user){
            updateUserProfile(newUser.name,img)
            axiosPublic.post('/users', newUser)
            .then(() => {
              // console.log(res.data)
              loadUser();
            })
            .catch(err =>{
              console.log(err)
            })
              navigate(location?.state ? location.state : "/")
              successToast("Login successfull!");
          }
        })
        .catch(err => {
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                setError("This email already used!")
                return
            }
            else if (err.message === "Firebase: Error (auth/network-request-failed).") {
                errorToast("Network error!");
            }
            else{
                errorToast("Faild!");
            }
        })
    }
    userDataLoader();
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
      // marginTop: '-1rem',
      color: "",
    }),
  };

  return (
    <div className=" flex flex-col items-center pb-32">
      <Helmet>
        <title>Blood | Signup</title>
      </Helmet>
      <div className=" mt-10 bg-gradient-to-b from-[#850143] via-[#00a1ab] to-[#00a1ab]  p-5 text-b lg:w-8/12 w-full rounded-xl px-9 py-11">
        <h3 className=" text-3xl font-bold text-white text-center pb-5">
          Sign Up
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col lg:flex-row w-full gap-8 justify-between">
            {/* Name */}
            <div className=" flex flex-col gap-3 mt-3 text-white lg:w-1/2">
              <label htmlFor="name" className="text-xl pl-3 flex gap-3 items-center">
                Name
              <FaStarOfLife className=" text-xs text-red-600" />
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                {...register("name")}
                className=" w-full text-xl py-2 bg-gray-100 border-2 border-gray-500 rounded-lg pl-4 text-black"
              />
            </div>
            {/* Email */}
            <div className=" flex flex-col gap-3 mt-3 text-white lg:w-1/2">
              <label htmlFor="email" className="text-xl pl-3 flex gap-3 items-center">
                Email                
                <FaStarOfLife className=" text-xs text-red-600" />
              </label>
              <input
                type="email"
                name="email"
                {...register("email")}
                placeholder="Email"
                className=" w-full text-xl py-2 bg-gray-100 border-2 border-gray-500 rounded-lg pl-4 [#be006b] text-black"
              />
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row justify-between gap-8">
            {/* Blood group */}
            <div className=" w-full">
              <h4 className=" text-white text-lg font-semibold mt-6 mb-2 flex items-center gap-3">
                <MdBloodtype className=" text-xl text-black" /> Blood Goup{" "}
                <FaStarOfLife className=" text-xs text-red-600" />
              </h4>
              <Select
                name="blood_group"
                {...register("blood_group")}
                required
                options={bloodGroups}
                placeholder="Select Group"
                onChange={(selectedOption) =>
                  setValue("blood_group", selectedOption.value.toLowerCase())
                }
                styles={selectStyles}
              />
            </div>
            {/* District */}
            <div className=" w-full">
              <h4 className=" text-white text-lg font-semibold mt-6 mb-2 flex items-center gap-3">
                <FaLocationDot className=" text-xl text-black" /> District{" "}
                <FaStarOfLife className=" text-xs text-red-600" />
              </h4>
              <Select
                name="district"
                {...register("district")}
                options={districtList}
                placeholder="Select District"
                onChange={(selectedOption) => {
                  setValue("district", selectedOption.value);
                }}
                styles={selectStyles}
              />
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row gap-8">
            {/* Upazila */}
            <div className=" w-full">
              <h4 className=" text-white text-lg font-semibold mt-6 mb-2 flex items-center gap-3">
                <FaLocationDot className=" text-xl text-black" /> Upazila{" "}
                <FaStarOfLife className=" text-xs text-red-600" />
              </h4>
              <Select
                options={upozilaList}
                {...register("upazila")}
                name="upazila"
                placeholder="Select Upazila"
                onChange={(selectedOption) => {
                  setValue("upazila", selectedOption.value);
                }}
                styles={selectStyles}
              />
            </div>
            {/* Password */}
            <div className=" flex flex-col gap-3 mt-3 text-white w-full">
              <label htmlFor="password" className="text-xl pl-3 flex gap-3 items-center mt-2">
                Password
                <FaStarOfLife className=" text-xs text-red-600" />
              </label>
              <div className=" flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  {...register("password")}
                  className=" w-full text-xl py-2 bg-gray-100 border-2 border-gray-500 rounded-lg pl-4 [#be006b] text-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute right-14 md:right-[180px] lg:right-[370px]"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className=" text-xl text-black" />
                  ) : (
                    <AiFillEye className=" text-black text-xl" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className=" flex flex-col lg:flex-row gap-8">
          {/*confirm Password */}
          <div className=" flex flex-col gap-3 mt-3 text-white w-full">
            <label htmlFor="password" className="text-xl pl-3 flex gap-3 items-center">
             Confirm Password                 <FaStarOfLife className=" text-xs text-red-600" />
            </label>
            <div className=" flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="ConfirmPassword"
                placeholder="Confirm Password"
                {...register("confirmpassword")}
                className=" w-full text-xl py-2 bg-gray-100 border-2 border-gray-500 rounded-lg pl-4 [#be006b] text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=" absolute right-14 md:right-[180px] lg:right-[800px]"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className=" text-xl text-black" />
                ) : (
                  <AiFillEye className=" text-black text-xl" />
                )}
              </button>
            </div>
          </div>
          {/* upload profile */}
          <div className=" flex flex-col gap-2 mt-3 text-white w-full">
          <label htmlFor="photo" className="text-xl pl-3 flex gap-3 items-center text-white">
              Photo
            </label>
            <input
              {...register("image")}
              type="file"
              name="image"
              className="file-input text-black file-input-bordered w-full max-w-xs mt-1"
            />
          </div>
          </div>
          {/* Tarms & Condition */}
          <div className=" flex items-center gap-3 mt-3 px-3">
            <input type="checkbox" name="checkbox" className="" />
            <label htmlFor="checkbox" className="md:text-xl text-lg pl-3">
              Accept our Tarms & Conditions.
            </label>
          </div>
          {error && <p className=" text-sm text-red-700">{error}</p>}
          <div>
            <button
              type="submit"
              className="text-lg hover:opacity-70 active:opacity-25 text-white font-bold bg-gradient-to-r from-[#be006b] to-[#e33b54] via-[#e33b44] py-3 px-3 rounded-lg w-full mt-4"
            >
              Submit
            </button>
          </div>
          <div className=" mt-3 flex items-center justify-center">
            <p className="text-sm text-b font-medium">
              Already have account?{" "}
              <Link to="/login" className="text-[#be006b]">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
