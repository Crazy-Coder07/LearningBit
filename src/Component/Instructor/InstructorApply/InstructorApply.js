import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postData } from '../../../config/config';
import { useNavigate } from 'react-router-dom';

const InstructorApply = () => {

    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name:"",
        phone:"",
        email: '',
        address:"",
        alternatephone:"",
        bio:"",
        subjects:"",
        experience:"",
        qualifications:"",
        adharfront:null,
        adharback:null,
        highestdegree:null,
        profilephoto:null
    });

    const [errors, setErrors] = useState({
        name:"",
        phone:"",
        email: '',
        address:"",
        alternatephone:"",
        bio:"",
        subjects:"",
        experience:"",
        qualifications:"",
        adharfront:"",
        adharback:"",
        highestdegree:"",
        profilephoto:""
    });
    const [errormsg,setErrormsg]=useState("");

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
    
    const handleFileInputChange = (e, fileType) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (validateFileType(file)) {
                setFormData({
                    ...formData,
                    [fileType]: file,
                });
            } else {
                setErrors({
                    ...errors,
                    [fileType]: "Invalid file format. Please upload files of type jpg, png, pdf, webp, or jpeg.",
                });
            }
        }
    };
    

    const handleSubmit = async() => {

        const newErrors = {};
      
        if (!formData?.name.trim()) {
            newErrors.name = 'Name is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.email.trim()) {
            newErrors.email = 'Email is required';
            setErrors(newErrors);
            return;
        } else if (!/\S+@\S+\.\S+/.test(formData?.email)) {
            newErrors.email = 'Invalid email address';
            setErrors(newErrors);
            return;
        }
        if (!formData?.phone.trim()) {
            newErrors.phone = 'Phone is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.address.trim()) {
            newErrors.address = 'address is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.alternatephone.trim()) {
            newErrors.alternatephone = 'alternatephone is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.bio.trim()) {
            newErrors.bio = 'bio is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.subjects.trim()) {
            newErrors.subjects = 'subjects is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.experience.trim()) {
            newErrors.experience = 'experience is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.qualifications.trim()) {
            newErrors.qualifications = 'qualifications is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.adharfront) {
            newErrors.adharfront = 'adharfront is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.adharback) {
            newErrors.adharback = 'adharback is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.highestdegree) {
            newErrors.highestdegree = 'highestdegree is required';
            setErrors(newErrors);
            return;
        }
        if (!formData?.profilephoto) {
            newErrors.profilephoto = 'profilephoto is required';
            setErrors(newErrors);
            return;
        }

        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted successfully');
            console.log("Name", formData?.name)
            console.log("email", formData?.email)
            console.log("phone", formData?.phone)
            console.log("address", formData?.address)
            console.log("alternate_phone", formData?.alternatephone)
            console.log("bio", formData?.bio)
            console.log("subjects", formData?.subjects)
            console.log("experience", formData?.experience)
            console.log("qualifications", formData?.qualifications)
            console.log("Aadhar_Front", formData?.adharfront)
            console.log("Aadhar_Back", formData?.adharback)
            console.log("Highest_Degree", formData?.highestdegree)
            console.log("profile_photo", formData?.profilephoto)




            const formDatanew = new FormData();
            formDatanew.append('name', formData?.name);
            formDatanew.append('phone', formData?.phone);
            formDatanew.append('email', formData?.email);
            formDatanew.append('address', formData?.address);
            formDatanew.append('alternate_phone', formData?.alternatephone);
            formDatanew.append('bio', formData?.bio);
            formDatanew.append('subjects', formData?.subjects);
            formDatanew.append('experience', formData?.experience);
            formDatanew.append('qualifications', formData?.qualifications);
            formDatanew.append('Aadhar_Front', formData?.adharfront);
            formDatanew.append('Aadhar_Back', formData?.adharback);
            formDatanew.append('Highest_Degree', formData?.highestdegree);
            formDatanew.append('profile_photo', formData?.profilephoto);


            const response = await postData("user/auth/instructor/ins-register", formDatanew, {});

            if (response?.data?.success) {
                toast.success("Successfully Applied for the Instructor")
                console.log("Successfully Applied for the Instructor");
                window.location.reload();
                navigate("/home/instructor-intro");

            } else {
                console.log("Getting Error");
                console.log(response);
                setErrormsg(response?.response?.data?.message);
                toast.error(response?.response?.data?.message);
            }

        }
    };

    return (
        <div className=' bg-red-100'>
            <ToastContainer />
            <div className="max-w-md mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-center pt-10">Fill the instructor form</h1>
                <div className='flex flex-col'>
                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div className="block text-sm font-semibold mb-3">
                            Name:
                        </div>
                        <input
                            name='name'
                            value={formData?.name}
                            onChange={handleChange}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your name"
                        />
                            {errors.name && <div className="error">{errors.name}</div>}

                    </div>

                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div className="block text-sm font-semibold mb-3">
                            Email:
                        </div>
                        <input
                            name='email'
                            value={formData?.email}
                            onChange={handleChange}
                            placeholder='Enter email address'
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                        />
                            {errors.email && <div className="error">{errors.email}</div>}

                    </div>
                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div className="block text-sm font-semibold mb-3">
                            Phone:
                        </div>
                        <input
                           name='phone'
                           value={formData?.phone}
                           onChange={handleChange}
                           placeholder='Enter email address'
                           className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                    
                        />
                            {errors.phone && <div className="error">{errors.phone}</div>}

                    </div>
                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div  className="block text-sm font-semibold mb-3">
                            Address:
                        </div>
                        <input
                            name='address'
                            value={formData?.address}
                            onChange={handleChange}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your address"
                        />
                            {errors.address && <div className="error">{errors.address}</div>}
                        
                    </div>

                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div  className="block text-sm font-semibold mb-3">
                            Alternate Phone No.
                        </div>
                        <input
                            name='alternatephone'
                            value={formData?.alternatephone}
                            onChange={handleChange}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your address"
                        />
                            {errors.alternatephone && <div className="error">{errors.alternatephone}</div>}

                    </div>

                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div  className="block text-sm font-semibold mb-3">
                            Bio:
                        </div>
                        <input
                            name='bio'
                            value={formData?.bio}
                            onChange={handleChange}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Tell us about yourself"
                        />
                            {errors.bio && <div className="error">{errors.bio}</div>}

                    </div>
                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div  className="block text-sm font-semibold mb-3">
                            Subjects of Interest:
                        </div>
                        <input
                            name='subjects'
                            value={formData?.subjects}
                            onChange={handleChange}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your subjects of interest"
                        />
                            {errors.subjects && <div className="error">{errors.subjects}</div>}

                    </div>
                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div className="block text-sm font-semibold mb-3">
                            Experience in years:
                        </div>
                        <input
                            name='experience'
                            value={formData?.experience}
                            onChange={handleChange}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your experience"
                        />
                            {errors.experience && <div className="error">{errors.experience}</div>}

                    </div>
                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div  className="block text-sm font-semibold mb-3">
                            Highest Qualifications:
                        </div>
                        <input
                            name='qualifications'
                            value={formData?.qualifications}
                            onChange={handleChange}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your qualifications"
                        />
                            {errors.qualifications && <div className="error">{errors.qualifications}</div>}

                    </div>

                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div className="block text-sm font-semibold mb-3">
                            Adhar Front
                        </div>
                        <input
                            type="file"
                            name="adharfront"
                            onChange={(e) => handleFileInputChange(e, "adharfront")}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your Adhar Front"
                        />
                            {errors.adharfront && <div className="error">{errors.adharfront}</div>}

                    </div>

                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div className="block text-sm font-semibold mb-3">
                            Adhar Back
                        </div>
                        <input
                            type="file"
                            name='adharback'
                            onChange={(e) => handleFileInputChange(e, "adharback")}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your Adhar back"
                        />
                            {errors.adharback && <div className="error">{errors.adharback}</div>}

                    </div>

                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div className="block text-sm font-semibold mb-3">
                            Highest Degree
                        </div>
                        <input
                            type="file"
                            name='highestdegree'
                            onChange={(e) => handleFileInputChange(e, "highestdegree")}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your Highest degree"
                        />
                            {errors.highestdegree && <div className="error">{errors.highestdegree}</div>}

                    </div>

                    <div className="mb-4 bg-white py-8 px-5 rounded-lg">
                        <div className="block text-sm font-semibold mb-3">
                            Profile Photo
                        </div>
                        <input
                            type="file"
                            name='profilephoto'
                            onChange={(e) => handleFileInputChange(e, "profilephoto")}
                            className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your Profile photo"
                        />
                            {errors.profilephoto && <div className="error">{errors.profilephoto}</div>}
                            {errormsg && <div className="error">{errormsg}</div>}
                            
                    </div>
                    <div className="text-center">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-500 text-white w-30% py-2 px-4 rounded-lg hover:bg-blue-600 mb-8"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorApply;


