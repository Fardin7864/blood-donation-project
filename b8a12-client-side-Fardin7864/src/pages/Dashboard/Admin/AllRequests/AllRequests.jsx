import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxiosPublic";
import RequestsTable from "../../components/RequestsTable";
import Select from "react-select";
import useAxios from "../../../../hooks/useAxios/useAxios";
import useAuthantication from "../../../../hooks/useAuthan/useAuthantication";
import Swal from "sweetalert2";

const AllRequests = () => {
  const [filter, setFilter] = useState("");
  const [requests, setrequests] = useState();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios();
  const [currentpage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(false);
  const {successToast} = useAuthantication();

  useEffect(() => {
    axiosPublic
      .get(`/requests?status=${filter}&page=${currentpage}&pageSize=5`)
      .then((res) => {
        setrequests(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [axiosPublic, currentpage, filter, loader]);
  // console.log(totalPages)

  const handlePageChange = (newPage) => {
    // Make sure newPage is within valid range
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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

  // users controller buttons

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
        .delete(`/requests/${id}`)
        .then((res) => successToast("Deleted"))
        .catch((err) => console.log(err));
      setLoader(!loader);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  };

  return (
    <div>
      <Helmet>
        <title>All Requests</title>
      </Helmet>
      <h1 className=" text-3xl font-semibold text-p text-center my-5 underline">
        All Blood Requests{" "}
      </h1>
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
              setCurrentPage(1);
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

export default AllRequests;
