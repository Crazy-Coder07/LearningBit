import React, { useState } from 'react'
import user from "./image/pic.png";
import cam from "./image/cam.png";
import bcg from "./image/reg.jpg"
import "./Register.css"

const Register = () => {

    const [formData, setFormData] = useState({
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
        image:''
    });

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

    const handleSubmit = () => {

        const newErrors = {};

        if (formData?.image==null || !formData.image.trim()) {
            newErrors.image = 'image is required';
            setErrors(newErrors);
            return;
        }

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            setErrors(newErrors);
            return;
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
            setErrors(newErrors);
            return;
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            setErrors(newErrors);
            return;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            setErrors(newErrors);
            return;
        }
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
            setErrors(newErrors);
            return;
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            setErrors(newErrors);
            return;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            setErrors(newErrors);
            return;
        }
        if (!formData.childhoodName.trim()) {
            newErrors.childhoodName = 'Childhood name is required';
            setErrors(newErrors);
            return;
        }

        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted successfully');
            console.log("Name", formData.name)
            console.log("Email", formData.email)
            console.log("Phone Number", formData.phoneNumber)
            console.log("Address", formData.address)
            console.log("Password", formData.password)
            console.log("ChildhoodName", formData.childhoodName)

        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({
                ...formData,
                image: reader.result
            });
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
                        Welcome To <span style={{color:"#6EE7B7"}}>Learning</span><span style={{color: "#EF4444"}}>Bit</span>
                    </div>
                    <div>
                        <div className='usericon'>
                            <img 
                                 className="userimg" 
                                 src={formData.image || user} 
                                 alt="not found" 
                                 style={{
                                    width: "100px",
                                    height: "120px",
                                    objectFit: "cover",
                                    borderRadius: formData.image ? "50%" : "0%",
                                    borderColor:"blue",
                                    borderWidth: "12px",
                                }}
                            />
                        </div>
                        <div className='camicon'>
                            <label htmlFor="fileInput">
                                <img className='camimg' src={cam} alt="not found" />
                            </label>
                            <input
                                id="fileInput"
                                type="file"
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
                                value={formData.name}
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
                                value={formData.phoneNumber}
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
                                value={formData.email}
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
                                value={formData.address}
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
                                value={formData.password}
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
                                value={formData.childhoodName}
                                onChange={handleChange}
                                placeholder='Enter childhood name'
                            />
                            {errors.childhoodName && <div className="error">{errors.childhoodName}</div>}
                        </div>
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