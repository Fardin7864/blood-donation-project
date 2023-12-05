import { useLoaderData, useNavigate } from "react-router-dom";
import useDataUser from "../../hooks/useUser/useDataUser";
import useAxios from "../../hooks/useAxios/useAxios";
import useAuthantication from "../../hooks/useAuthan/useAuthantication";

const RequestDetails = () => {
  const request = useLoaderData();
  const { userData } = useDataUser();
  const axiosSecure = useAxios();
  const {
    user,
    successToast,
    errorToast,
  } = useAuthantication();
  const navigate = useNavigate();

  // console.log(request)
  const handleDonate = () => { 
    const donor = {
        donorName:  user?.displayName,
        donorEmail: user?.email,
        requestStatus: 'inprogress',
    }

    axiosSecure.put(`/requests/${request._id}`,donor)
            .then(res => {
                // console.log(res.data.message)
                if(res.data.message === "updated"){
                    successToast("Succesfully updated the request!")
                    navigate('/donation-request')
                }
            })
            .catch(err => errorToast(err))
   }
  return (
    <div className="card bg-base-100 shadow-xl my-10">
      <div className="card-body flex lg:flex-row flex-col justify-center  lg:gap-44 my-20">
        <div>
          <h2 className="card-title">Recipient Informations</h2>
          <div className=" grow">
            <h5 className=" text-xs">
              <span className="text-sm">Name :</span>{" "}
              {request.recipientName.replace(/\b\w/g, (c) => c.toUpperCase())}
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
              {new Date(request.donationDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
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
                  : "12" + ":" + request.donationTime.split(":")[1] + " AM"
                : "12" + ":" + request.donationTime.split(":")[1] + " pm"}
            </h5>
            <div>
              {!request.requestStatus === "pending" && (
                <div className="">
                  <div>
                    <h5 className=" text-sm">
                      Donor Name:{" "}
                      <span className=" text-xs">{request.donorName} </span>
                    </h5>
                    <p>
                      Donor Email:{" "}
                      <span className=" text-xs">{request.donorEmail}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* requester information */}
        <div>
          <h2 className="card-title">Requester Informations</h2>
          <div className=" grow">
            <h5 className=" text-xs">
              <span className="text-sm">Name :</span>{" "}
              {request.requesterName.replace(/\b\w/g, (c) => c.toUpperCase())}
            </h5>
            <h5 className=" text-xs">
              <span className="text-sm">Email :</span> {request.requesterEmail}
            </h5>
          </div>
        </div>
        <div>
        <h2 className="card-title">Status</h2>
        <h5 className=" text-xs">
              <span className="text-sm">{request.requestStatus}</span>{" "}
        </h5>
        </div>
        {
          request.requestStatus === 'done' ?(<div className="card-actions justify-end">
          <button disabled className="btn bg-p">Donate</button>
        </div>): (<div className="card-actions justify-end">
          <button onClick={handleDonate} className="btn bg-p">Donate</button>
        </div>)
        }
        {/* <div className="card-actions justify-end">
          <button onClick={handleDonate} className="btn bg-p">Donate</button>
        </div> */}
      </div>
    </div>
  );
};

export default RequestDetails;
