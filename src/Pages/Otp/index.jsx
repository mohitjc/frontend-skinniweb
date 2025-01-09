import React, { useEffect, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import AuthLayout from "../../components/AuthLayout";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

const OTP = () => {
    const user = useSelector((state) => state.user); 
  const [otp, setOtp] = useState();
  const location = useLocation();
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user && user?.loggedIn) {
      history("/");
    }
  }, []);
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
        <div className="sm:h-screen flex justify-center items-center max-w-[500px] mx-auto p-[4rem_0rem]">
          <div className="main_page w-full">
            <img src="/assets/img/Skinnii-Logo.webp" className="w-[150px] object-contain mx-auto mb-3" />
            <div className="main_auth bg-[#ffffffad] p-[3rem_1rem] sm:p-[3rem_2rem] relative rounded-[20px] w-full">
              <IoIosArrowBack
                onClick={() => {
                  history(-1);
                }}
                className="bg-[#ffffffad] h-[28px] w-[28px] rounded-full p-[5px] absolute left-[2rem] top-[1rem] cursor-pointer"
              />
              <div className="main_heading mb-4">
                <h2 className="text-[32px] uppercase font-[900] text-center text-[#fff]">Verification Code</h2>
                <p className="text-[16px] text-center"> We have sent the verification code to your email address</p>
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
                <div className="mt-4">
                  <button type="submit" className="border-0 bg-[#343a40] rounded-[8px] w-full text-[16px] font-[400] h-[42px] flex items-center justify-center text-white">
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
