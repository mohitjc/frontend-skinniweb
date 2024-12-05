import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./style.scss";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

const Forgotpassword = () => {
  const history = useNavigate();
  const user=useSelector((state:any)=>state.user)

  useEffect(() => {
    if (user?.access_token) {
      history("/dashboard");
    }
  }, []);

  const [form, setForm] = useState({ email: "" });

  useEffect(() => {}, []);

  const hendleSubmit = (e: any) => {
    e.preventDefault();
    loader(true);

    ApiClient.post("user/forgot/password", form).then((res) => {
      if (res.success) {
        history("/login");
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
      <div className="layout_auth layout_auth_2">
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
            <IoIosArrowBack className="back_arrow" />
              <div className="main_heading mb-4">
                <h2>Forgot Password</h2>
                <p> No worries! Just enter your email and we’ll send you a reset
                password link.</p>
              </div>
              <form className="form_div">
                <div className="row">
                <div className="col-md-12 mb-3">
                    <input
                      type="email"
                      required
                      placeholder="E-Mail"
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-dark">Send Recovery Email</button>
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

export default Forgotpassword;
