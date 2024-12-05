import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import "./style.scss";
import AuthLayout from "../../components/AuthLayout";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { decryptData } from "../../models/crptoUtils";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";


const Resetpassword = () => {
  const history = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    if (user?.access_token) {
      history("/");
    }
  }, []);

  const formValidation = [
    {
      key: "confirmPassword",
      minLength: 8,
      confirmMatch: ["confirmPassword", "newPassword"],
    },
    { key: "newPassword", minLength: 8 },
  ];

  const [form, setForm]: any = useState({
    confirmPassword: "",
    newPassword: "",
    code: "",
    id: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [eyes, setEyes] = useState({ newPassword: false, confirmPassword: false });

  const getError = (key: any) => {
    return methodModel.getError(key, form, formValidation);
  };

  useEffect(() => {
    let prm = {
      // email: methodModel.getPrams('email'),
      id: decryptData(methodModel.getPrams("id")),
      code: decryptData(methodModel.getPrams("code")),
    };

    setForm({ ...form, ...prm });
  }, []);

  const hendleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;
    loader(true);
    let payload = {
      password: form.newPassword,
      verificationCode: String(form.code),
      id: form.id,
    };
    ApiClient.put("user/reset/user-password", payload).then((res) => {
      if (res.success) {
        setTimeout(() => {
          toast.success(res.message);
        }, 100);

        history(`/login`);
      }
      loader(false);
    });
  };

  return (
    <>
      <AuthLayout>
      <div className="layout_auth layout_auth_2">
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
            <IoIosArrowBack className="back_arrow" />
              <div className="main_heading mb-4">
                <h2>Reset Password</h2>
                <p>  Please create a new password that you don’t use on any other site.</p>
              </div>
              <form className="form_div">
                <div className="row">
                <div className="col-md-6 mb-3">
                <div className="password_div">
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      className="form-control"
                    ></input>
                      <i
                      className={eyes.confirmPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                      onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}
                    ></i>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="password_div">
                    <input
                      type="password"
                      required
                      placeholder="Confirm Password"
                      className="form-control"
                    ></input>
                      <i
                      className={eyes.confirmPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                      onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}
                    ></i>
                  </div>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-dark">Save</button>
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
      </AuthLayout>
    </>
  );
};

export default Resetpassword;
