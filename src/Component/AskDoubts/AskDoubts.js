import React, { useState } from 'react';
import { postData } from '../../config/config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AskDoubt = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    whatTryWhatGet: '',
    details: ""
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    whatTryWhatGet: '',
    details: ""
  });
  const [errormsg, setErrormsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateFileType = (file) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];
    return allowedFileTypes.includes(file.type);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFileType(file)) {
      setFormData({
        ...formData,
        image: file,
      });
      setErrors({
        ...errors,
        image: '',
      });
    } else {
      setErrors({
        ...errors,
        image: "Invalid file format. Please upload files of type jpg, png, pdf, webp, or jpeg.",
      });
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      setErrors(newErrors);
      return;
    }
    if (!formData.whatTryWhatGet.trim()) {
      newErrors.whatTryWhatGet = 'What you tried and what you got is required';
      setErrors(newErrors);
      return;
    }
    if (!formData.details.trim()) {
      newErrors.details = 'Details are required';
      setErrors(newErrors);
      return;
    }
    if (!formData.image) {
      newErrors.image = 'Image is required';
      setErrors(newErrors);
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDatanew = new FormData();
    formDatanew.append('title', formData.title);
    formDatanew.append('image', formData.image);
    formDatanew.append('what_try_what_get', formData.whatTryWhatGet);
    formDatanew.append('Detail_Problems', formData.details);

    try {
      const response = await postData('user/auth/doubt/create-doubt', formDatanew, {});
      if (response?.data?.success) {
        toast.success("Successfully Doubt Posted");
        navigate("/home/doubt");
      } else {
        setErrormsg(response?.response?.data?.message || 'An error occurred');
        toast.error(response?.response?.data?.message || 'An error occurred');
      }
    } catch (error) {
      setErrormsg('An error occurred');
      toast.error('An error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-[-2%]">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-2/3">
        <h1 className="text-2xl mb-4 text-center">Ask Doubts</h1>
        <div className="flex flex-col gap-5">
          <div>
            <div className="block text-gray-700">Title</div>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Enter your doubt title"
            />
            {errors.title && <div className="text-red-500">{errors.title}</div>}
          </div>
          <div>
            <div className="block text-gray-700">Image</div>
            <input
              name="image"
              type="file"
              onChange={handleFileInputChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
            {errors.image && <div className="text-red-500">{errors.image}</div>}
          </div>
          <div>
            <div className="block text-gray-700">What You Tried and What You Got</div>
            <textarea
              name="whatTryWhatGet"
              value={formData.whatTryWhatGet}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Enter what you tried and what you got"
            />
            {errors.whatTryWhatGet && <div className="text-red-500">{errors.whatTryWhatGet}</div>}
          </div>
          <div>
            <div className="block text-gray-700">Details of the Problem</div>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Enter the details concerning the problem"
            />
            {errors.details && <div className="text-red-500">{errors.details}</div>}
            {errormsg && <div className="text-red-500">{errormsg}</div>}
          </div>
          <button
            className="bg-blue-500 text-white p-2 rounded-lg w-full"
            onClick={handleSubmit}
          >
            Submit Doubt
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskDoubt;
