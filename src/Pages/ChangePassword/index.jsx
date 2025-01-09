import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader"; 
import "./style.scss";
import AuthLayout from "../../components/AuthLayout";
import { toast } from "react-toastify"; 
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const history = useNavigate();
  const user = useSelector((state) => state.user); 
  const [form, setForm] = useState({
    confirmPassword: "",
    newPassword: "",
    currentPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [eyes, setEyes] = useState({
    newPassword: false,
    confirmPassword: false,
    currentPassword: false,
  });

  // useEffect(() => {
  //   if (user && user?.loggedIn) {
  //     history("/");
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      form?.newPassword != form.confirmPassword &&
      form.confirmPassword != ""
    ) {
      return;
    } else {
      loader(true);
      let payload = {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form?.confirmPassword,
      };
      ApiClient.put("change/password", payload).then((res) => {
        if (res.success) {
          loader(false);
          history("/login");
          toast.success(res.message);
        }
      });
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="sm:h-screen flex justify-center items-center max-w-[500px] mx-auto p-[4rem_0rem]">
          <div className="main_page w-full">
      
            <div className="main_auth bg-white p-[3rem_2rem] sm:p-[3rem_3rem] relative rounded-[20px] w-full">
              <IoIosArrowBack
                onClick={() => history(-1)}
                className="bg-[#ebebeb] h-[28px] w-[28px] rounded-full p-[5px] absolute left-[2rem] top-[1rem] cursor-pointer"
              />
                    <img src="/assets/img/Skinnii-Logo.webp" className="w-[150px] sm:w-[180px] object-contain mx-auto mb-4" />
              <div className="main_heading mb-4">
                <h2 className="text-[15px] uppercase font-[500] text-center text-[#828282] mb-1">Change Password</h2>
                <p className="text-[14px] text-center text-[#000] leading-[16px] max-w-[300px] mx-auto"> Enter a new password below to change your password</p>
              </div>
              <form onSubmit={handleSubmit} className="form_div">
                <div className="grid grid-cols-1 gap-y-4 gap-x-3 mb-3">
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Password</label>
                    <div className="relative">
                      <input
                        type={eyes.currentPassword ? "text" : "password"}
                        required
                        placeholder=""
                        className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
                        onChange={(e) => {
                          setForm({
                            ...form,
                            currentPassword: e?.target?.value,
                          });
                        }}
                      ></input>
                      <i
                        className={
                          eyes.currentPassword ? "fa fa-eye absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer" : "fa fa-eye-slash absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer"
                        }
                        onClick={() =>
                          setEyes({
                            ...eyes,
                            currentPassword: !eyes.currentPassword,
                          })
                        }
                      ></i>
                    </div>
                  </div>
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">New Password</label>
                    <div className="relative">
                      <input
                        type={eyes.newPassword ? "text" : "password"}
                        required
                        placeholder=""
                        className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
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
                  <button className="border-0 bg-[#FED6B6] rounded-[8px] w-full text-[16px] font-[400] h-11 flex items-center justify-center text-[#000]">Update</button>
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
      </AuthLayout>
    </>
  );
};

export default ChangePassword;
