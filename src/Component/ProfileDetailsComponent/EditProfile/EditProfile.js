import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { getData } from "../../../config/config";
import { BsFillPencilFill } from "react-icons/bs";

const EditProfile = () => {
  const [apidata, setApidata] = useState({});
  const [name, setName] = useState('');  
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [childhoodName, setChildhoodName] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const fetchdata = async () => {

      const response = await getData("user/auth/profile/get-profile", {});
      if (response?.data?.success) {
        const userData = response?.data?.data?.userData;
        setName(userData?.name);
        setMobile(userData?.phone);
        setEmail(userData?.email);
        setAddress(userData?.address);
        setChildhoodName(userData?.childhood_name);
        if (userData?.photo) {
          setPhoto(userData?.photo);
        } else {
          setPhoto("https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358__480.jpg");
        }
        console.log(userData?.photo);
      } else {
        // actually this response is error response
        console.log(response);
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="card">
      <div className="left-container">
        <img src={photo} alt="not found" />
        <h2 className="gradienttext">{name}</h2>
      </div>

      <div className="right-container">
        <h3 className="gradienttext">Profile Details</h3>
        <div className="details-container">
          <div className="field">
            <label>Name </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <div><BsFillPencilFill /></div>
          </div>

          <div className="field">
            <label>Mobile </label>
            <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>
          <div className="field">
            <label>Email </label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Address </label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="field">
            <label>Childhood Name </label>
            <input type="text" value={childhoodName} onChange={(e) => setChildhoodName(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
