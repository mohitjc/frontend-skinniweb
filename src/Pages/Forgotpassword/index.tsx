import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./style.scss";
import AuthLayout from "../../components/AuthLayout";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

const Forgotpassword = () => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    if (user?.access_token) {
      history("/");
    }
  }, []);

  const [form, setForm] = useState({ email: "" });

  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    setForm({ ...form, email: e.target.value });
    if (!email) {
      setError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };
  

  const hendleSubmit = (e: any) => { 
    e.preventDefault();
    setSubmitted(true);
    if (!form?.email || error) {
      return;
    }
    loader(true);

    ApiClient.post("forgotPassword", form).then((res) => {
      if (res.success) {
        history("/otp",{state : form?.email});
        setTimeout(() => {
          toast.success(res.message);
        }, 100);
      }
      loader(false);
    });
  };

  return (
    <>
      <AuthLayout>
        <div className="sm:h-screen flex justify-center items-center max-w-[500px] mx-auto p-[4rem_0rem]">
          <div className="main_page w-full">
            <div className="main_auth bg-white p-[3rem_2rem] sm:p-[3rem_3rem] relative rounded-[20px] w-full">
              <IoIosArrowBack onClick={()=>{history(-1)}} className="bg-[#ebebeb] h-[28px] w-[28px] rounded-full p-[5px] absolute left-[2rem] top-[1rem] cursor-pointer" />
              <img src="/assets/img/Skinnii-Logo.webp" className="w-[150px] sm:w-[180px] object-contain mx-auto mb-4" />
              <div className="main_heading mb-4">
                <h2 className="text-[15px] uppercase font-[500] text-center text-[#828282] mb-1">Forgot Password</h2>
                <p className="text-[14px] text-center text-[#000] leading-[16px] max-w-[335px] mx-auto">
                  {" "}
                  No worries! Just enter your email and we’ll send you a reset
                  password link.
                </p>
              </div>
              <form onSubmit={hendleSubmit} className="form_div">
                <div className="grid grid-cols-1 gap-y-4 gap-x-3 mb-3">
                    <div className="col-span-2">
                    <label className="text-[14px] text-[#000] mb-1 ml-3">Email<span className="text-[#FF0028]">*</span></label>
                    <input
                      value={form.email}
                      onChange={handleEmailChange}
                      type="email"
                      required
                      placeholder=""
                      className={`bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8 ${
                        error && submitted ? "is-invalid" : ""
                      }`}
                    />
                    {error && submitted && (
                      <div className="invalid-feedback d-block">{error}</div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <button type="submit" className="border-0 bg-[#FED6B6] rounded-[8px] w-full text-[16px] font-[400] h-11 flex items-center justify-center text-[#000]">Send Recovery Email</button>
                </div>
              </form> 
              {/* <div className="more_info">
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
      </AuthLayout>
    </>
  );
};

export default Forgotpassword;
