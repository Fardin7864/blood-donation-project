import { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios/useAxios";
import { Helmet } from "react-helmet";
import useAuthantication from "../../../../hooks/useAuthan/useAuthantication";

const AllUsers = () => {
  const axiosSecure = useAxios();
  const { successToast } = useAuthantication();
  const [filter, setfilter] = useState("");
  const [users, setusers] = useState();
  const [change, setchange] = useState(true);
  const [currentpage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const refetch = () => {
    setchange(!change);
  };

  useEffect(() => {
    axiosSecure
      .get(`/all-user?status=${filter}&page=${currentpage}&pageSize=5`)
      .then((res) => {
        setusers(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [filter, change, axiosSecure, currentpage]);


  const handleFilter = (e) => {
    setfilter(e.target.value);
    setCurrentPage(1)
    refetch();
  };

  const handleBlock = (id, state) => {
    axiosSecure
      .put(`/update-status/${id}?state=${state}`)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message) {
          successToast("Update successfull!");
        }
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleActive = (id, state) => {
    axiosSecure
      .put(`/update-status/${id}?state=${state}`)
      .then((res) => {
        if (res.data.message) {
          successToast("Update successfull!");
        }
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeVolunteer = (id) => {
    axiosSecure
      .put(`/update-status/${id}?role=volunteer`)
      .then((res) => {
        if (res.data.message) {
          successToast("Update to volunteer successfull!");
        }
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeAdmin = (id) => {
    axiosSecure
      .put(`/update-status/${id}?role=admin`)
      .then((res) => {
        if (res.data.message) {
          successToast("Update to volunteer successfull!");
        }
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeAdmin = (id) => {
    axiosSecure
      .put(`/update-status/${id}?role=donor`)
      .then((res) => {
        if (res.data.message) {
          successToast("Update to volunteer successfull!");
        }
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //pagination

  const handlePageChange = (newPage) => {
    // Make sure newPage is within valid range
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Helmet>
        <title>All Users</title>
      </Helmet>
      <h3 className=" text-3xl font-semibold text-p text-center underline">
        All Users
      </h3>
      <div>
        <div className=" w-full flex items-center">
          <h4 className=" text-p text-xl pr-3 font-semibold mt-4 mb-2 flex items-center gap-3">
            Filter By Status :{" "}
          </h4>
          <select
            onChange={handleFilter}
            name=""
            id=""
            className=" mt-3 border p-2"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="block">Block</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className=" hidden md:block">#</th>
              <th>Name</th>
              <th className=" hidden md:block">Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr key={index}>
                <td className=" hidden md:block">{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar hidden md:block">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.profile}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className=" hidden md:block">{user.role}</td>
                <td>{user.status}</td>
                <th>
                  <div className=" flex justify-center items-center">
                    <div className=" flex flex-col gap-2">
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleBlock(user._id, "block")}
                          className=" btn btn-xs"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActive(user._id, "active")}
                          className=" btn btn-xs btn-warning"
                        >
                          Active
                        </button>
                      )}
                      {user.role === "admin" ? (
                        <button
                          onClick={() => removeAdmin(user._id)}
                          className=" btn btn-xs  bg-p"
                        >
                          Remove Admin
                        </button>
                      ) : user.role === "donor" ? (
                        <button
                          onClick={() => makeVolunteer(user._id)}
                          className=" btn btn-xs  bg-p"
                        >
                          Make Volunteer
                        </button>
                      ) : (
                        <button
                          onClick={() => makeAdmin(user._id)}
                          className=" btn btn-xs  bg-p"
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default AllUsers;
