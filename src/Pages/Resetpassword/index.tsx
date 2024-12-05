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
  // useEffect(() => {
  //   if (user?.access_token) {
  //     history("/");
  //   }
  // }, []);

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
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
              <IoIosArrowBack onClick={()=>{history(-1)}} className="back_arrow" />
              <div className="main_heading mb-4">
                <h2>Reset Password</h2>
                <p>
                  {" "}
                  Please create a new password that you don’t use on any other
                  site.
                </p>
              </div>
              <form onSubmit={hendleSubmit} className="form_div">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="password_div">
                      <input
                         type={eyes.newPassword ? "text" : "password"}
                        required
                        placeholder="Password"
                        className="form-control"
                        value={form?.newPassword}
                        onChange={(e) => {
                          setForm({ ...form, newPassword: e?.target?.value });
                        }}
                      ></input>
                      <i
                        className={
                          eyes.newPassword ? "fa fa-eye" : "fa fa-eye-slash"
                        }
                        onClick={() =>
                          setEyes({ ...eyes, newPassword: !eyes.newPassword })
                        }
                      ></i>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="password_div">
                      <input
                        type={eyes.confirmPassword ? "text" : "password"}
                        required
                        placeholder="Confirm Password"
                        className="form-control"
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
                          eyes.confirmPassword ? "fa fa-eye" : "fa fa-eye-slash"
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
                  <button className="btn btn-dark">Save</button>
                </div>
              </form>
           
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
      </AuthLayout>
    </>
  );
};

export default Resetpassword;
