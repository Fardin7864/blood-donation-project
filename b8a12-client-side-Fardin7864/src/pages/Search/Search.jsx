import bgimg from "../../assets/hero/book-bg.png";
import { FaInbox, FaStarOfLife } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { MdBloodtype } from "react-icons/md";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Donors from "../../common/Donors/Donors";

const Search = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [district, setDistrict] = useState();
  const [upazila, setupazila] = useState();
  const [searchResult, setsearchResult] = useState(false);
  const [donoeDetails, setdonoerDetails] = useState();
  const popUp = () => {
    Swal.fire({
      title: "Success!",
      text: "Successfully Booked a Test Drive!",
      icon: "success",
      confirmButtonText: "Okay",
    });
  };
  const bgColor = "bg-white";

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

  // Sample array of blood types
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

  const onSubmit = (data) => {
    setdonoerDetails(data);
    // popUp();
    setsearchResult(true);
  };

  return (
    <>
      <Helmet>
        <title>Search Blood</title>
      </Helmet>
      {!searchResult ? (
        <>
          <h1 className=" text-4xl text-p font-extrabold text-center my-3">
            Search Blood!
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" md:mt-48 lg:mt-0 flex justify-center mb-20"
          >
            <div
              className={`${bgColor} shadow-xl bg-cover bg-no-repeat z-50 px-4 lg:px-16 py-14 rounded-lg w-full`}
              style={{ backgroundImage: `url(${bgimg})` }}
            >
              <h1 className=" text-b text-2xl font-bold">Search For Blood</h1>
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
                <div>
                  <h4 className=" text-b text-lg font-semibold mt-6 mb-2 flex items-center gap-3">
                    <MdBloodtype className=" text-xl" /> Blood Goup{" "}
                    <FaStarOfLife className=" text-p text-xs" />
                  </h4>
                  <Select
                    name="blood_group"
                    {...register("blood_group")}
                    required
                    options={bloodGroups}
                    placeholder="Select Group"
                    onChange={(selectedOption) =>
                      setValue(
                        "blood_group",
                        selectedOption.value.toLowerCase()
                      )
                    }
                    // Additional styles can be applied here if needed
                  />
                </div>
                {/* District */}
                <div>
                  <h4 className=" text-b text-lg font-semibold mt-6 mb-2 flex items-center gap-3">
                    <FaLocationDot className=" text-xl" /> District{" "}
                    <FaStarOfLife className=" text-p text-xs" />
                  </h4>
                  <Select
                    name="district"
                    {...register("district")}
                    options={districtList}
                    placeholder="Select District"
                    onChange={(selectedOption) => {
                      setValue("district", selectedOption.value);
                    }}
                  />
                </div>
                {/* Upazila */}
                <div>
                  <h4 className=" text-b text-lg font-semibold mt-6 mb-2 flex items-center gap-3">
                    <FaLocationDot className=" text-xl" /> Upazila{" "}
                    <FaStarOfLife className=" text-p text-xs" />
                  </h4>
                  <Select
                    options={upozilaList}
                    {...register("upazila")}
                    name="upazila"
                    placeholder="Select Upazila"
                    onChange={(selectedOption) => {
                      setValue("upazila", selectedOption.value);
                    }}
                  />
                </div>
                {/* 2nd row */}
                <div className=" hidden">
                  <h4 className=" text-b text-lg font-semibold mb-2 flex items-center gap-3">
                    <FaInbox className=" text-xl" /> Email
                    <FaStarOfLife className=" text-p text-xs" />
                  </h4>
                  <input
                    required
                    type="email"
                    name="email"
                    {...register("email")}
                    id=""
                    placeholder="Email"
                    className="py-3 text-base pl-3 pr-40 rounded-md border border-gray-400 text-gray-500"
                  />
                </div>
                <div className=" mt-4 lg:mt-0">
                  <button
                    type="submit"
                    className=" bg-[#FA4226] hover:opacity-75 hover:shadow-xl active:opacity-60 text-base py-[14px] mt-9 text-white px-3 rounded-md w-full font-semibold"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <Donors donor={donoeDetails}></Donors>
      )}
    </>
  );
};

export default Search;
