import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./profile.scss";
import methodModel from "../../methods/methods";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { TbGenderBigender } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import ImageUpload from "../../components/common/ImageUpload";

const Profile = () => {
  const history = useNavigate()
  const user = useSelector((state) => state.user);
  const [data, setData]= useState("");
  const [editable, setEditable] = useState(false);
  const [images, setImages] = useState({ image: "" });
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    dob: "",
    gender: "",
  });
  const gallaryData = () => {
    loader(true);
    ApiClient.get(`profile`).then((res) => {
      if (res.success) {
        setForm({
          ...form,
          fullName: res?.data?.fullName,
          email: res?.data?.email,
          dob: res?.data?.dob,
          gender: res?.data?.gender,
        });
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (user.loggedIn) {
      gallaryData();
    }
  }, []);

  const imageResult = (e ,key) => {
    images[key] = e.value;
    setImages(images);
  };

   const handleSubmit=()=>{
     const payload ={
      fullName : form?.fullName,
       email : form?.email,
       dob : form?.dob,
       gender : form?.gender
     }

    
   }


  return (
    <div className="">
      <div className="bg_color_profile">
        <div className="container">
          <div className="bg_profile">
            <IoIosArrowBack onClick={()=>history(-1)} className="back_profile" />
            <div className="logo_profile">
              <img src="/assets/img/Skinnii-Logo.webp" />
            </div>
          </div>
          <div className="">
            <div className="profile_main">
              <div className="profile_upload">
                <img src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp" />
                <ImageUpload
                          model="users"
                          accept="image/*"
                          result={(e) => imageResult(e, "image")}
                          value={images.image || form.image}
                          multiple={false}
                        />
                <MdEdit className="edit_icon" />
              </div>

              <div className="my_profile">
                <div className="mb-5">
                  <div className="header_frofile mb-4">
                    <h2>MY PROFILE</h2>
                    {!editable ? (
                      <div
                        onClick={() => {
                          setEditable(true);
                        }}
                        className="edit_info"
                      >
                        <MdEdit /> Edit Info
                      </div>
                    ) : (
                      <div onClick={()=>{handleSubmit()}} className="edit_info">
                        <FaSave /> Save
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="card_input">
                        <input
                          required
                          className="form-control"
                          placeholder="Full Name"
                          onChange={(e) => {
                            setForm({ ...form, fullName: e?.target?.value });
                          }}
                          value={form?.fullName}
                          disabled={!editable}
                        ></input>
                        <FaUser />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card_input">
                        <input
                          className="form-control"
                          placeholder="E-Mail"
                          onChange={(e) => {
                            setForm({ ...form, email: e?.target?.value });
                          }}
                          value={form?.email}
                          disabled={!editable}
                        ></input>
                        <MdEmail />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card_input">
                        <input
                          type="date"
                          className="form-control"
                          placeholder="dd/mm/yyy"
                          onChange={(e) => {
                            setForm({ ...form, dob: e?.target?.value });
                          }}
                          value={form?.dob}
                          disabled={!editable}
                        ></input>
                        <FaCalendarAlt />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card_input">
                        <select
                          className="form-control"
                          onChange={(e) => {
                            setForm({ ...form, gender: e.target.value });
                          }}
                          value={form?.gender}
                          disabled={!editable}
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option> 
                        </select>

                        <TbGenderBigender />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="header_frofile mb-4">
                    <h2>MY GOALS</h2>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card_box">
                        <div className="card_text mb-2">
                          <img src="/assets/img/profileimg1.png" />
                          <h3>100 Pound</h3>
                        </div>
                        <p>Current Weight in Pound</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card_box">
                        <div className="card_text mb-2">
                          <img src="/assets/img/profileimg2.png" />
                          <h3>100 Pound</h3>
                        </div>
                        <p>Current Height in Pound</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card_box">
                        <div className="card_text mb-2">
                          <img src="/assets/img/profileimg3.png" />
                          <h3>60 Pound</h3>
                        </div>
                        <p>Goal Weight in Pound</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="header_frofile mb-4">
                    <h2>OTHER INFORMATION</h2>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card_box">
                        <div className="card_text mb-2">
                          <img src="/assets/img/profileimg4.png" />
                          <h3>Vegetarian</h3>
                        </div>
                        <p>Diet Type</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card_box">
                        <div className="card_text mb-2">
                          <img src="/assets/img/profileimg5.png" />
                          <h3>Moderatly Active</h3>
                        </div>
                        <p>How Active You Are?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
