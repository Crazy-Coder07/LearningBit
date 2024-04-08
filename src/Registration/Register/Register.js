import React, { useState } from 'react'
import user from "./image/pic.png";
import cam from "./image/cam.png";
import bcg from "./image/reg.jpg"
import "./Register.css"
import { useNavigate } from 'react-router-dom';
import { postData } from "../../config/config"
import axios from "axios";

const Register = () => {

    const navigate = useNavigate();
    const [errormsg, setErrormsg] = useState("");
    const [formDetails, setFormDetails] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: '',
        childhoodName: '',
        image: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: '',
        childhoodName: '',
        image: ''
    });
    const [image1, setImage1] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails({
            ...formDetails,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleSubmit = async () => {

        const newErrors = {};

        if (formDetails?.image == null || (typeof formDetails?.image === 'string' && !formDetails?.image.trim())) {
            newErrors.image = 'Image is required';
            setErrors(newErrors);
            return;
        }

        if (!formDetails.name.trim()) {
            newErrors.name = 'Name is required';
            setErrors(newErrors);
            return;
        }
        if (!formDetails.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
            setErrors(newErrors);
            return;
        }
        if (!formDetails.email.trim()) {
            newErrors.email = 'Email is required';
            setErrors(newErrors);
            return;
        } else if (!/\S+@\S+\.\S+/.test(formDetails.email)) {
            newErrors.email = 'Invalid email address';
            setErrors(newErrors);
            return;
        }
        if (!formDetails.address.trim()) {
            newErrors.address = 'Address is required';
            setErrors(newErrors);
            return;
        }
        if (!formDetails.password.trim()) {
            newErrors.password = 'Password is required';
            setErrors(newErrors);
            return;
        } else if (formDetails.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            setErrors(newErrors);
            return;
        }
        if (!formDetails.childhoodName.trim()) {
            newErrors.childhoodName = 'Childhood name is required';
            setErrors(newErrors);
            return;
        }

        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted successfully');
            console.log("Name", formDetails.name)
            console.log("Email", formDetails.email)
            console.log("Phone Number", formDetails.phoneNumber)
            console.log("Address", formDetails.address)
            console.log("Password", formDetails.password)
            console.log("ChildhoodName", formDetails.childhoodName)
            console.log("photo", formDetails.image)

            const formData = new FormData();
            formData.append('name', formDetails.name);
            formData.append('email', formDetails.email);
            formData.append('phone', formDetails.phoneNumber);
            formData.append('address', formDetails.address);
            formData.append('password', formDetails.password);
            formData.append('childhood_name', formDetails.childhoodName);
            formData.append('image', formDetails.image);

            const response = await postData("user/registration/register", formData, {});

            if (response?.data?.success) {
                navigate("/login");
            } else {
                console.log(response);
                setErrormsg(response?.response?.data?.message);
            }

        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        setFormDetails({
            ...formDetails,
            image: file
        });

        reader.onload = () => {
            setImage1(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div
                className='bgimg'
            >
                <div className='leftimgdiv'
                >
                    <img className="leftimg" src={bcg} alt="not found" />
                </div>

                <div className='bgregister'
                >
                    <div className='wel'>
                        Welcome To <span style={{ color: "#6EE7B7" }}>Learning</span><span style={{ color: "#EF4444" }}>Bit</span>
                    </div>
                    <div>
                        <div className='usericon'>
                            <img
                                className="userimg"
                                src={image1 || user}
                                alt="not found"
                                style={{
                                    width: "100px",
                                    height: "120px",
                                    objectFit: "cover",
                                    borderRadius: image1 ? "50%" : "0%",
                                    borderColor: "blue",
                                    borderWidth: "12px",
                                }}
                            />
                        </div>
                        <div className='camicon'>
                            <label htmlFor="fileInput">
                                <img className='camimg' src={cam} alt="not found" />
                            </label>
                            <input
                                id='fileInput'
                                type="file"
                                name='image'
                                style={{ display: "none" }}
                                onChange={handleImageUpload}
                            />
                            {errors.image && <div className="error">{errors.image}</div>}
                        </div>
                    </div>

                    <div className='formelement'>
                        <div>
                            <div>Name</div>
                            <input
                                className='input'
                                name='name'
                                value={formDetails.name}
                                onChange={handleChange}
                                placeholder='Enter your name'
                            />
                            {errors.name && <div className="error">{errors.name}</div>}
                        </div>
                        <div>
                            <div>Phone Number</div>
                            <input
                                className='input'
                                name='phoneNumber'
                                value={formDetails.phoneNumber}
                                onChange={handleChange}
                                placeholder='Enter phone number'
                            />
                            {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
                        </div>
                        <div>
                            <div>Email</div>
                            <input
                                className='input'
                                name='email'
                                value={formDetails.email}
                                onChange={handleChange}
                                placeholder='Enter email address'
                            />
                            {errors.email && <div className="error">{errors.email}</div>}
                        </div>
                        <div>
                            <div>Address</div>
                            <input
                                className='input'
                                name='address'
                                value={formDetails.address}
                                onChange={handleChange}
                                placeholder='Enter address'
                            />
                            {errors.address && <div className="error">{errors.address}</div>}
                        </div>
                        <div>
                            <div>Password</div>
                            <input
                                className='input'
                                name='password'
                                type='password'
                                value={formDetails.password}
                                onChange={handleChange}
                                placeholder='Enter password'
                            />
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>
                        <div>
                            <div>Childhood Name</div>
                            <input
                                className='input'
                                name='childhoodName'
                                value={formDetails.childhoodName}
                                onChange={handleChange}
                                placeholder='Enter childhood name'
                            />
                            {errors.childhoodName && <div className="error">{errors.childhoodName}</div>}
                            {errormsg && <div className='error'>{errormsg}</div>}
                        </div>
                    </div>
                    <div className='dontaccount'>
                        Already have an account <span className='signinbtn' onClick={() => navigate("/login")}>Sign In</span>
                    </div>
                    <div
                        onClick={handleSubmit}
                        className='signup'
                        style={{ cursor: "pointer" }}
                    >
                        Sign up
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register