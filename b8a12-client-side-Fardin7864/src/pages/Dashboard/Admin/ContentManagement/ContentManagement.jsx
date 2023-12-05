import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios/useAxios";
import { useState } from "react";
import useAuthantication from "../../../../hooks/useAuthan/useAuthantication";
import useDataUser from "../../../../hooks/useUser/useDataUser";
import Swal from "sweetalert2";

const ContentManagement = () => {
  const axiosSecure = useAxios();
  const {userData} = useDataUser();
  const {successToast,user, errorToast} = useAuthantication();
  const [filter, setfilter] = useState("");


  const { data: blogs, refetch } = useQuery({
    queryKey: ["blogList",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?state=${filter}`);
      return res.data;
    },
  });

  const handlePublish = (id,status) => { 
            axiosSecure.put(`/blog/${id}`,{status: status})
            .then(() => {
                successToast(`Successfully ${status} the blog!`)
                refetch();
            })
            .catch((err)=> console.log(err))
            refetch();
   }        
//   console.log(blogs);
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
      axiosSecure.delete(`/blog/${id}`)
      .then(() => {
        successToast("Delete successfull!")
        refetch()
      })
      .catch(err => errorToast(err.message))
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });

 }


 const handleFilter = (e) => {
  setfilter(e.target.value);
  // setCurrentPage(1)
  refetch();
};


  return (
    <div>
      <Helmet>
        <title>Content Management</title>
      </Helmet>
      <div className="flex justify-end">
        <Link to="/dashboard/content-management/add-blog" className=" btn bg-p">
          Add Blog
        </Link>
      </div>
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
            <option value="draft">Draft</option>
            <option value="publish">Published</option>
          </select>
        </div>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 my-5">
        {blogs?.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-xl">
            <figure className="">
              <img
                src={blog.img}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{blog.title?.toUpperCase()}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
              <p className="text-base font-medium">Status: <span className=" text-sm">{blog?.status}</span></p>
              <div className="card-actions justify-end">
                {userData?.role === 'admin' ? (<button onClick={() => handleDelete(blog._id)} className=" btn btn-warning">Delete</button>) : (<button disabled className=" btn btn-warning">Delete</button>)}
                {
                  userData?.role === 'admin' ? 
                  (<>
                    {blog?.status === 'draft' ? (<button onClick={() => handlePublish(blog._id,'publish')} className="btn bg-p">Publish</button>) : (<button onClick={() => handlePublish(blog._id,'draft')} className="btn bg-p">UnPublish</button>)}
                    </>)
                  :
                  (<>
                    {blog?.status === 'draft' ? (<button disabled className="btn bg-p">Publish</button>) : (<button disabled className="btn bg-p">UnPublish</button>)}
                    </>)
                }

                <button className=" btn bg-p">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
