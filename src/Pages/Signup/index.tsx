import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./style.scss";
import { toast } from "react-toastify";
import methodModel from "../../methods/methods";
import { useSelector } from "react-redux";
import environment from "../../environment";
import AuthLayout from "../../components/AuthLayout";
import { AiOutlineFileSearch } from "react-icons/ai";

const Signup = ({ setActiveTab }: any) => {
  const history = useNavigate();
  const user = useSelector((state: any) => state.user);

  const [form, setForm]: any = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    dietType: "",
    weight: "",
    height: "",

  });
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });


  const hendleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    let url = "user/register";

    if (!remember) return;

    let data: any = {
      role: environment.userRoleId,
      ...form,
    };

    loader(true);
    ApiClient.post(url, data).then(async (res) => {
      if (res.success) {
        let url = "/login";
        setTimeout(() => {
          toast.success("Please verify your email");
        }, 400);
        history(url);
        setActiveTab(0)
      }
      loader(false);
    });
  };

  useEffect(() => {
    let email = methodModel.getPrams("email");
    if (user && user?.loggedIn) {
      history("/dashboard");
    }

    if (email) {
      setForm({
        ...form,
        email: email,
        fullName: methodModel.getPrams("name"),
      });
    }

  }, []);

  return (
    <>
      <AuthLayout>
        <div className="layout_auth">
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
              <div className="main_heading mb-4">
                <h2>MEMBER REGISTER </h2>
                <p>Please fill in this form to create an account.</p>
              </div>
              <form className="form_div">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" placeholder="First Name" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" placeholder="last Name" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="email" placeholder="E-Mail" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="date" placeholder="dd/mm/yyyy" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" placeholder="Current weight in pound" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" placeholder="Current height in pound" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" placeholder="Goal Weight in pound" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="password" placeholder="Password" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="password" placeholder="Confirm Password" className="form-control"></input>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-dark">Sign Up</button>
                </div>
                <p className="text_signin mt-2">Already have an account? <a href=""><span className="">Sign In</span></a></p>
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

export default Signup;
