import React, { useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import AuthLayout from "../../components/AuthLayout";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const OTP = () => {
  const [otp, setOtp] = useState();
  const location = useLocation();
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const hendleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (otp == "") {
      toast?.error("Otp is required");
    } else {
      let url = "verifyOtp";
      let data = {
        otp: otp,
      };
      loader(true);
      ApiClient.post(url, data).then(async (res) => {
        if (res.success == true) {
          toast.success(res?.message);
          location?.state
            ? history("/resetpassword",{state : location?.state })
            : history("/login");

          loader(false);
        } else {
          loader(false);
        }
      });
    }
  }; 

  return (
    <AuthLayout>
      <div>
        <div className="layout_auth layout_auth_2">
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
              <IoIosArrowBack
                onClick={() => {
                  history(-1);
                }}
                className="back_arrow"
              />
              <div className="main_heading mb-4">
                <h2>Verification Code</h2>
                <p> We have sent the verification code to your email address</p>
              </div>
              <form onSubmit={hendleSubmit} className="form_div">
                <div className="otp_div mb-4">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-dark">
                    Confirm
                  </button>
                </div>
              </form>
{/* 
              <div className="more_info">
                <div className="font_icon">
                  <AiOutlineFileSearch />
                  view Prescription
                </div>
                <div className="font_icon">
                  <AiOutlineFileSearch />
                  view Prescription
                </div>
                <div className="font_icon">
                  <AiOutlineFileSearch />
                  view Prescription
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default OTP;
