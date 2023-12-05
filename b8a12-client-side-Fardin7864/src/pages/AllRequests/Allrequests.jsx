import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import useAxios from "../../hooks/useAxios/useAxios";
import RequestsTable from "../Dashboard/components/RequestsTable";
import useAuthantication from "../../hooks/useAuthan/useAuthantication";

const Allrequests = () => {
  const [requests, setrequests] = useState();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios();
  const [currentpage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(false);
  const {successToast,errorToast} = useAuthantication();


  const loadData = () => {
    axiosPublic
      .get(`/requests?status=pending&page=${currentpage}&pageSize=5`)
      .then((res) => {
        setrequests(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, [axiosPublic, currentpage, loader]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  // users controller buttons

  const handleUpdate = (id, request) => {
    axiosSecure
      .put(`/requests/${id}`, request)
      .then(() => successToast("Updated successfully!"))
      .catch((err) => console.error(err));
      loadData();
  };

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/requests/${id}`)
      .then(() => successToast("Delete successful."))
      .catch((err) => console.log(err));
      loadData();
    setLoader(!loader);
  };
  
  return (
    <div>
      <Helmet>
        <title>All Requests</title>
      </Helmet>
      <h1 className=" text-3xl font-semibold text-p text-center my-5 underline">
        All Blood Requests{" "}
      </h1>
      <RequestsTable
        loadData={loadData}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        requests={requests}
      />

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

export default Allrequests;
