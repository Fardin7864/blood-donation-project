import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios/useAxios";
import useAuthantication from "../../../hooks/useAuthan/useAuthantication";

const RequestsTable = ({ requests, handleDelete,loadData }) => {
  const location = useLocation();
  const axiosSecure = useAxios();
  const { user, successToast, errorToast } = useAuthantication();
  const navigate = useNavigate();
  // Check if requests is not an array
  if (!Array.isArray(requests)) {
    // Handle the case where requests is not an array
    return <p>No requests available.</p>;
  }
  const deleteRequest = (id) => {
    handleDelete(id);
  };

  //reloade page
 const  handleReload = () => {
    window.location.reload();
  };
// const location = useLocation();

  
  // const handleReload = () => {
  //   loadData(); // Call the callback function to reload data
  // };
  
  const handleStatus = (status, id) => {
    const donor = {
      requestStatus: status,
    };

    axiosSecure
      .put(`/requests/${id}`, donor)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "updated") {
          successToast("Succesfully updated the request!");
          handleReload();
          // navigate(location.pathname? location.pathname : '/donation-request');
        }
      })
      .catch((err) => errorToast(err));
  };


  return (
    <div className="overflow-x-auto border rounded-md lg:px-32 py-5 w-full">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Information</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {requests?.map((request, index) => (
            <tr key={index}>
              <td>
                <div className=" grow">
                  <h5 className=" text-xs">
                    <span className="text-sm">Name :</span>{" "}
                    {request.recipientName.replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                  </h5>
                  <h5 className=" text-xs">
                    <span className="text-sm">Address :</span>{" "}
                    {request.recipientDistrict.replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                    ,
                    {request.recipientUpazila.replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}
                  </h5>
                  <h5 className=" text-xs">
                    <span className="text-sm">Date : </span>
                    {new Date(request.donationDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}{" "}
                    ,{" "}
                  </h5>
                  <h5 className=" text-xs">
                    <span className="text-sm">Time : </span>
                    {parseInt(request.donationTime.split(":")[0]) !== 12
                      ? parseInt(request.donationTime.split(":")[0]) !== 0
                        ? (parseInt(request.donationTime.split(":")[0]) > 11 &&
                            parseInt(request.donationTime.split(":")[0]) -
                              12 +
                              ":" +
                              request.donationTime.split(":")[1] +
                              " PM") ||
                          request.donationTime + " AM"
                        : "12" +
                          ":" +
                          request.donationTime.split(":")[1] +
                          " AM"
                      : "12" + ":" + request.donationTime.split(":")[1] + " pm"}
                  </h5>
                  <div>
                    {/* {request.requestStatus === "pending" && ( */}
                    <div>
                      {request.donorName && (
                        <h5 className=" text-sm">
                          Donor Name:{" "}
                          <span className=" text-xs">{request.donorName} </span>
                        </h5>
                      )}
                      {request.donorEmail && (
                        <p>
                          Donor Email:{" "}
                          <span className=" text-xs">{request.donorEmail}</span>
                        </p>
                      )}
                    </div>
                    {/* )} */}
                  </div>
                </div>
              </td>
              {/* row 2 */}
              <td>
                <div className=" flex flex-col gap-3">
                  <h2 className=" text-sm flex-col">
                    <span className="text-md text-p font-medium">
                      Status <br />
                    </span>
                  </h2>
                  <h2 className=" text-sm flex-col">{request.requestStatus}</h2>
                  {request.requestStatus === "inprogress" && (
                    <div className=" flex gap-3 my-1">
                      <button onClick={() => handleStatus('done',request._id)} className="btn btn-xs btn-outline">Done</button>
                      <button onClick={() => handleStatus('cancelled',request._id)} className="btn btn-warning btn-xs">Cancel</button>
                    </div>
                  )}
                </div>
              </td>

              <td>
                <div className=" flex">
                  <div className=" flex flex-col gap-2">
                    {location.pathname === "/donation-request" ? (
                      <Link
                        to={`/donation-details/${request._id}`}
                        className=" btn btn-xs btn-outline text-cyan-500 "
                      >
                        View
                      </Link>
                    ) : (
                      <>
                        <Link to={`/dashboard/update-request/${request._id}`}>
                          <button
                            // onClick={() => handleUpdate(request._id)}
                            className=" btn btn-xs"
                          >
                            <FaEdit className=" " />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteRequest(request._id)}
                          className=" btn btn-xs btn-warning"
                        >
                          <MdDelete className="" />
                        </button>
                        <Link
                          to={`/donation-details/${request._id}`}
                          className=" btn btn-xs btn-outline text-cyan-500 "
                        >
                          View
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
