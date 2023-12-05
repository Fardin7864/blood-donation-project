// Import necessary libraries
import axios from 'axios';
import React, { useState } from 'react';
import { FaStarOfLife } from 'react-icons/fa6';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAxios from '../../../hooks/useAxios/useAxios';
import useAuthantication from '../../../hooks/useAuthan/useAuthantication';
import { useNavigate } from 'react-router-dom';
const image_hosting_key = import.meta.env.VITE_image_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const TextEditor = () => {
  // State to manage the content of the text editor
  const [content, setContent] = useState('');
  const [imgfile, setimgfile] = useState();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const {user,successToast} = useAuthantication();
  const handleImageChange = (e) => {
    setimgfile(e.target.files[0]);
  };

  // Function to handle changes in the text editor content
  const handleEditorChange = (value) => {
    setContent(value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.name.value;
// console.log(imgfile)
    const imageFile = { image: imgfile };
    // console.log(imageFile)
    const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    //   // console.log(res)
    const img =res?.data?.data?.display_url;

    const blog ={
        name: user.displayName,
        email: user.email,
        title: title,
        img: img,
        content: content,
        status: 'draft',
    }

      axiosSecure.post('/blog',blog)
      .then(() => {
        successToast("Your blog is added!")
        setContent('')
      })
      .catch((err) => console.log(err))
      event.target.reset();
      // navigate('/dashboard/content-management');
    // Add your logic to save the blog content to your database or perform other actions
    console.log('Blog content submitted:',title, content,img);
  };

  return (
    <div>
      <h1 className=' text-xl font-medium'>Create a Blog</h1>
      <form onSubmit={handleSubmit} className=' my-5'>
                    {/* Name */}
                    <div className=" flex flex-col my-1 gap-3 mt-3 text-p">
              <label htmlFor="name" className="text-xl flex gap-3 items-center">
                Blog Title
              <FaStarOfLife className=" text-xs text-red-600" />
              </label>
              <input
                type="text"
                required
                name="name"
                placeholder="Name"
                className=" w-full text-xl py-2 bg-gray-100 border-2 border-gray-500 rounded-lg pl-4 text-black"
              />
            </div>
      <div className=" flex flex-col gap-2 mb-1 text-p w-full">
          <label htmlFor="photo" className="text-xl flex gap-3 items-center text-p">
              Thamnel Image <FaStarOfLife className=" text-xs text-red-600" />
            </label>
            <input
              type="file"
              required
              name="image"
              onChange={handleImageChange}
              className="file-input text-black file-input-bordered w-full max-w-xs mt-1"
            />
          </div>
        <div>
          {/* ReactQuill component for the text editor */}
          <ReactQuill
            id="blogContent"
            value={content}
            onChange={handleEditorChange}
            placeholder="Write your blog here..."
          />
        </div>
        <div className=' my-5'>
          <button className=' btn bg-p' type="submit">Publish Blog</button>
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
