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
        <div className="layout_auth layout_auth_2">
          <div className="main_page w-full">
            <img src="/assets/img/Skinnii-Logo.webp" className="w-[150px] object-contain mx-auto mb-3" />
            <div className="main_auth bg-[#ffffffad] p-[3rem_2rem] relative rounded-[20px] w-full">
              <IoIosArrowBack onClick={()=>{history(-1)}} className="bg-[#ffffffad] h-[28px] w-[28px] rounded-full p-[5px] absolute left-[2rem] top-[1rem] cursor-pointer" />
              <div className="main_heading mb-4">
                <h2 className="text-[32px] uppercase w-[900] text-center color-[#fff]">Reset Password</h2>
                <p className="text-[16px] text-center">
                  {" "}
                  Please create a new password that you don’t use on any other
                  site.
                </p>
              </div>
              <form onSubmit={hendleSubmit} className="form_div">
                <div className="grid grid-cols-2 gap-5 mb-3">
                  <div className="">
                    <div className="relative">
                      <input
                         type={eyes.newPassword ? "text" : "password"}
                        required
                        placeholder="Password"
                        className="w-full rounded-[8px] border-0 h-[42px] text-[12px] px-3 !pr-8"
                        value={form?.newPassword}
                        onChange={(e) => {
                          setForm({ ...form, newPassword: e?.target?.value });
                        }}
                      ></input>
                      <i
                        className={
                          eyes.newPassword ? "fa fa-eye absolute right-[12px] top-[15px] text-[14px] text-[#707780] cursor-pointer" : "fa fa-eye-slash absolute right-[12px] top-[15px] text-[14px] text-[#707780] cursor-pointer"
                        }
                        onClick={() =>
                          setEyes({ ...eyes, newPassword: !eyes.newPassword })
                        }
                      ></i>
                    </div>
                  </div>
                  <div className="">
                    <div className="relative">
                      <input
                        type={eyes.confirmPassword ? "text" : "password"}
                        required
                        placeholder="Confirm Password"
                        className="w-full rounded-[8px] border-0 h-[42px] text-[12px] px-3 !pr-8"
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
                          eyes.confirmPassword ? "fa fa-eye absolute right-[12px] top-[15px] text-[14px] text-[#707780] cursor-pointer" : "fa fa-eye-slash absolute right-[12px] top-[15px] text-[14px] text-[#707780] cursor-pointer"
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
                <div className="mt-3">
                  <button className="border-0 bg-[#343a40] rounded-[8px] w-full text-[16px] font-[400] h-[42px] flex items-center justify-center text-white mt-4">Save</button>
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
