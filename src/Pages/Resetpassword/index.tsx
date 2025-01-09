import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import "./style.scss";
import AuthLayout from "../../components/AuthLayout";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { decryptData } from "../../models/crptoUtils";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

const Resetpassword = () => {
  const history = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);

  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    if (user?.access_token) {
      history("/");
    }
  }, []);

  const [form, setForm]: any = useState({
    confirmPassword: "",
    newPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [eyes, setEyes] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  

  const hendleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    if (form?.newPassword != form.confirmPassword && form.confirmPassword != "") {
      return;
    }
     else {
      loader(true);
      let payload = {
        password: form.newPassword,
        confirmPassword: form?.confirmPassword,
        email: location?.state,
      };
      ApiClient.put("resetPassword", payload).then((res) => {
        if (res.success) {
          setTimeout(() => {
            toast.success(res.message);
          }, 100);
  
          history(`/login`);
        }
        loader(false);
      });
     }
  
  };

  return (
    <>
      <AuthLayout>
        <div className="h-screen flex justify-center items-center max-w-[500px] mx-auto p-[4rem_0rem]">
          <div className="main_page w-full">
            <div className="main_auth bg-white p-[3rem_1rem] sm:p-[3rem_2rem] relative rounded-[20px] w-full">
              <IoIosArrowBack onClick={()=>{history(-1)}} className="bg-[#ebebeb] h-[28px] w-[28px] rounded-full p-[5px] absolute left-[2rem] top-[1rem] cursor-pointer" />
              <img src="/assets/img/Skinnii-Logo.webp" className="w-[150px] sm:w-[180px] object-contain mx-auto mb-4" />
              <div className="main_heading mb-4">
                <h2 className="text-[15px] uppercase font-[500] text-center text-[#828282] mb-1">Reset Password</h2>
                <p className="text-[14px] text-center text-[#000] leading-[16px] max-w-[335px] mx-auto">
                  {" "}
                  Please create a new password that you don’t use on any other
                  site.
                </p>
              </div>
              <form onSubmit={hendleSubmit} className="form_div">
                <div className="grid grid-cols-1 gap-y-4 gap-x-3 mb-3">
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Password</label>
                    <div className="relative">
                      <input
                         type={eyes.newPassword ? "text" : "password"}
                        required
                        placeholder=""
                        className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
                        value={form?.newPassword}
                        onChange={(e) => {
                          setForm({ ...form, newPassword: e?.target?.value });
                        }}
                      ></input>
                      <i
                        className={
                          eyes.newPassword ? "fa fa-eye absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer" : "fa fa-eye-slash absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer"
                        }
                        onClick={() =>
                          setEyes({ ...eyes, newPassword: !eyes.newPassword })
                        }
                      ></i>
                    </div>
                  </div>
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={eyes.confirmPassword ? "text" : "password"}
                        required
                        placeholder=""
                        className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
                        value={form?.confirmPassword}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            confirmPassword: e?.target?.value,
                          });
                        }}
                      ></input>
                      <i
                        className={
                          eyes.confirmPassword ? "fa fa-eye absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer" : "fa fa-eye-slash absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer"
                        }
                        onClick={() =>
                          setEyes({
                            ...eyes,
                            confirmPassword: !eyes.confirmPassword,
                          })
                        }
                      ></i>
                    </div>
                    {submitted &&
                    form.newPassword != form?.confirmPassword &&
                    form.confirmPassword != "" ? (
                      <div className="text-red-500 text-[13px] mt-1">
                        Confirm Password is not matched with Password
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-4">
                  <button className="border-0 bg-[#FED6B6] rounded-[8px] w-full text-[16px] font-[400] h-11 flex items-center justify-center text-[#000]">Save</button>
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

export default Resetpassword;
