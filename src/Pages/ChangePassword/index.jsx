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
        <div className="layout_auth layout_auth_2">
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
              <IoIosArrowBack
                onClick={() => history(-1)}
                className="back_arrow"
              />
              <div className="main_heading mb-4">
                <h2>Change Password</h2>
                <p> Enter a new password below to change your password</p>
              </div>
              <form onSubmit={handleSubmit} className="form_div">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="password_div">
                      <input
                        type={eyes.currentPassword ? "text" : "password"}
                        required
                        placeholder="Password"
                        className="form-control"
                        onChange={(e) => {
                          setForm({
                            ...form,
                            currentPassword: e?.target?.value,
                          });
                        }}
                      ></input>
                      <i
                        className={
                          eyes.currentPassword ? "fa fa-eye" : "fa fa-eye-slash"
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
                  <div className="col-md-6 mb-3">
                    <div className="password_div">
                      <input
                        type={eyes.newPassword ? "text" : "password"}
                        required
                        placeholder="New Password"
                        className="form-control"
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
                  <button className="btn btn-dark">Update</button>
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
