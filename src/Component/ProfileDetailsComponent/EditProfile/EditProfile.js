import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { getData, patchData } from "../../../config/config";
import { BsFillPencilFill } from "react-icons/bs";
import { baseURL } from '../../../config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [childhoodName, setChildhoodName] = useState('');
  const [photo, setPhoto] = useState('');
  const [photowithouturl, setPhotowithouturl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [image1, setImage1] = useState("");
  const [newimage, setNewimage] = useState("");
  const [updated,setUpdated]=useState(false);


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
          setPhotowithouturl(userData?.photo)
          setPhoto(`${baseURL}/${userData?.photo}`);
          console.log("Photo URL:", photo);
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
  }, [updated]);

  const handleupdateprofile = async() => {
     const formData=new FormData();
     formData.append("name",name);
     formData.append("phone",mobile);
     formData.append("address",address);
     if(newimage){
       formData.append("image",newimage);
     }
     else{
       formData.append("image",photowithouturl);
     }

     console.log(formData);

     const response=await patchData("user/auth/profile/edit-profile",formData,{});
     if(response?.data?.success){
        setUpdated(true);
        setIsEditing(!isEditing);
        toast.success("profile updated successfully")
        console.log("Profile updated successfully");
     }else{
        toast.error("error updating profile")
        console.log(response?.response?.data?.success);
     }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    setNewimage(file);

    reader.onload = () => {
      setImage1(reader.result);
    };
    console.log(image1)

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card">
      <ToastContainer />
      <div className="left-container">
        <img src={image1 || photo} alt="not found" />

        <label htmlFor="fileInput">
                
          <div 
              className="gradienttext" 
              style={{cursor:"pointer",backgroundColor:"#4CBB17",padding:"10px"}} 
              onClick={() => setIsEditing(!isEditing)}
          >Upload Photo</div>
        </label>
        <input
          id='fileInput'
          type="file"
          name='image'
          style={{ display: "none" }}
          onChange={handleImageUpload}
          disabled={!isEditing}
        />
      </div>

      <div className="right-container">
        <h3 className="gradienttext">Profile Details</h3>
        <div className="details-container">
          <div className="field">
            <label>Name </label>
            <div className='editparent'>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
              />
              <div
                style={{ marginLeft: "-30px", marginTop: "8px", cursor: "pointer" }}
                onClick={() => setIsEditing(!isEditing)}
              >
                <BsFillPencilFill />
              </div>
            </div>
          </div>

          <div className="field">
            <label>Mobile </label>
            <div className='editparent'>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={!isEditing}
              />
              <div
                style={{ marginLeft: "-30px", marginTop: "8px", cursor: "pointer" }}
                onClick={() => setIsEditing(!isEditing)}
              >
                <BsFillPencilFill />
              </div>
            </div>
          </div>

          <div className="field">
            <label>Email </label>
            <div className='editparent'>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
          </div>

          <div className="field">
            <label>Address </label>
            <div className='editparent'>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
              />
              <div
                style={{ marginLeft: "-30px", marginTop: "8px", cursor: "pointer" }}
                onClick={() => setIsEditing(!isEditing)}
              >
                <BsFillPencilFill />
              </div>
            </div>
          </div>

          <div className="field">
            <label>Childhood Name </label>
            <div className='editparent'>
              <input
                type="text"
                value={childhoodName}
                onChange={(e) => setChildhoodName(e.target.value)}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleupdateprofile}
        style={{ cursor: "pointer", padding: "10px", backgroundColor: "#4CBB17", border: "none", borderRadius: "5px" }}
        disabled={!isEditing}
      >
        Update Profile
      </button>
    </div>
  );
}

export default EditProfile;
