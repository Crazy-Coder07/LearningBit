import React, { useState } from 'react'
import bcg from "./image/bcg1.jpg"
import "./Login.css"
import { postData } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
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

    const handleSubmit = async() => {

        const newErrors = {};
      
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            setErrors(newErrors);
            return;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
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

        if (Object.keys(newErrors).length === 0) {
            console.log("Email", formData.email);
            console.log("Password", formData.password);

            const body = {
                    email:formData?.email,
                    password:formData?.password
                  };

            const response=await postData("user/registration/login",body,{});
            if(response?.data?.success){
                   
                    localStorage.setItem("accessToken", response?.data?.data?.accessToken);
                    localStorage.setItem("refreshToken", response?.data?.data?.refreshToken);
                    window.location.reload();
                    navigate("/home")
            }else{
                // here first response=error
                setErrormsg(response?.response?.data?.message);
            }
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

                    <div className='formelement'>
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
                            {errormsg && <div className="error">{errormsg}</div>}
                        </div>
                    </div>
                    <div className='dontaccount'>Don't have an account <span onClick={()=>navigate("/register")} className='signupbtn'>Sign Up</span></div>
                    <div
                        onClick={handleSubmit}
                        className='login'
                        style={{ cursor: "pointer" }}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login