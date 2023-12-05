import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import ShareButtons from "../../common/SharBtn/ShareButtons";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blogs?status=publish`);
      return res.data;
    },
  });

  const blogPostUrl = window.location.href;

  console.log(blogs);
  return (
    <div className=" grid grid-cols-1 gap-8 my-10">
      {blogs?.map((blog) => (
        <div key={blog._id} className="card bg-base-100 shadow-xl">
          <figure>
            <img src={blog.img} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-center w-full">{blog.title?.toUpperCase()}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
          </div>
          <ShareButtons title={blog.title} url={blogPostUrl} />
        </div>
      ))}
    </div>
  );
};

export default Blog;
