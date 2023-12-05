import useAxios from "../../../hooks/useAxios/useAxios";
import { useEffect, useState } from "react";
import useDataUser from "../../../hooks/useUser/useDataUser";
import { Helmet } from "react-helmet";
import RequestsTable from "../components/RequestsTable";
import Select from "react-select";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";

const MyDonations = () => {
  const axiosSecure = useAxios();
  const axiosPublic = useAxiosPublic();
  const [filter, setFilter] = useState("");
  const { userData } = useDataUser();
  const [requests, setrequests] = useState();
  const [currentpage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setloader] = useState(false)

  useEffect(() => {
    axiosPublic
      .get(
        `/requests?email=${userData?.email}&status=${filter}&page=${currentpage}&pageSize=3`
      )
      .then((res) => {
        setrequests(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [axiosSecure, userData, filter, axiosPublic, currentpage,loader]);

  const status = [
    { value: "", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "Inprogress" },
    { value: "done", label: "Done" },
    { value: "canceled", label: "Canceled" },
  ];

  const selectStyles = {
    control: (provided) => ({
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

  //   pagination

  const handlePageChange = (newPage) => {
    // Make sure newPage is within valid range
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/requests/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      setloader(!loader)
  };

  return (
    <div>
      <Helmet>
        <title>My Requests</title>
      </Helmet>
      <h5 className=" text-3xl font-semibold text-p text-center my-5">
        My Donation Request
      </h5>
      <div>
        <div className=" w-full flex items-center">
          <h4 className=" text-p text-xl pr-3 font-semibold mt-4 mb-2 flex items-center gap-3">
            Filter By Status :{" "}
          </h4>
          <Select
            name="status"
            required
            options={status}
            placeholder="Filter"
            onChange={(selectedOption) => {
              setFilter(selectedOption.value);
              setCurrentPage(0);
            }}
            styles={selectStyles}
          />
        </div>
      </div>
      <RequestsTable handleDelete={handleDelete} requests={requests} />

      {/* Render pagination controls */}
      <div className=" flex justify-center my-5 items-center gap-8">
        <button
          className=" btn btn-sm btn-warning"
          onClick={() => handlePageChange(currentpage - 1)}
          disabled={currentpage === 1}
        >
          Previous
        </button>
        <span>
          <span className=" text-lg text-p font-medium">Page:</span>{" "}
          {currentpage} of {totalPages}
        </span>
        <button
          className=" btn btn-sm btn-warning"
          onClick={() => handlePageChange(currentpage + 1)}
          disabled={currentpage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonations;
