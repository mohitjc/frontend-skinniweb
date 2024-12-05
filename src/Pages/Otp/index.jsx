import React, { useState } from "react"
import { AiOutlineFileSearch } from "react-icons/ai";
import AuthLayout from "../../components/AuthLayout";
import OtpInput from "react-otp-input";
 
 const OTP =()=>{
    const[otp,setOtp] = useState()
    return (
        <AuthLayout>
        <div>
                <div className="layout_auth layout_auth_2">
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
              <div className="main_heading mb-4">
                <h2>Verification Code</h2>
                <p> We have sent the verification code to your email address</p>
              </div>
              <form className="form_div">
                <div className="otp_div mb-4">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        renderInput={(props) => <input {...props} />}
                      />
                    </div>
                <div className="mt-3">
                  <button className="btn btn-dark">Confirm</button>
                </div>
              </form>
              <p className="text_signin mt-2">Just Remember?  <a href=""><span className="">Sign In</span></a></p>
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
              </div>
            </div>
          </div>
        </div>
        </div>
        </AuthLayout>
    )
 }

  export default OTP ; 