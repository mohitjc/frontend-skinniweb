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
  const[open,setOpen] = useState(false)

  const [form, setForm]: any = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
  });

  const hendleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    if (!form?.email || error) {
      return;
    } else if (form?.password != confirmpassword && confirmpassword != "") {
      return;
    } else {
      const birthDate = new Date(form?.dob);
      const today = new Date();
      let newAge = today.getFullYear() - birthDate.getFullYear();
      let fullName = form?.firstName + " " + form?.lastName;
      let url = "webRegister";
      let data: any = {
        ...form,
        fullName: fullName,
        age: newAge,
        role: "user",
      };

      loader(true);
      ApiClient.post(url, data).then(async (res) => {
        if (res.success) {
          let url = "/otp";
          setTimeout(() => {
            toast.success(`Please check your email account,We've sent a code to ${form?.email}`);
          }, 400);
          history(url);
          loader(false);
        }
      });
    }
  };

  useEffect(() => {
    let email = methodModel.getPrams("email");
    // if (user && user?.loggedIn) {
    //   history("/dashboard");
    // }

    if (email) {
      setForm({
        ...form,
        email: email,
        fullName: methodModel.getPrams("name"),
      });
    }
  }, []);

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

  return (
    <>
      <AuthLayout>
        <div className="layout_auth layout_auth_2">
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
              <div className="main_heading mb-4">
                <h2>MEMBER REGISTER </h2>
                <p>Please fill in this form to create an account.</p>
              </div>
              <form className="form_div" onSubmit={hendleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      required
                      pattern="[A-Za-z]+"
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      value={form.fullName}
                    ></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      placeholder="last Name"
                      className="form-control"
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      value={form.lastName}
                    ></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      value={form.email}
                      onChange={handleEmailChange}
                      type="email"
                      required
                      placeholder="Email"
                      className={`form-control ${
                        error && submitted ? "is-invalid" : ""
                      }`}
                    />
                    {error && submitted && (
                      <div className="invalid-feedback d-block">{error}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      required
                      type="date"
                      placeholder="Dob"
                      className="form-control"
                      onChange={(e) =>
                        setForm({ ...form, dob: e.target.value })
                      }
                      value={form.dob}
                    ></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="password_div">
                      <input
                        type={eyes.password ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        value={form.password}
                        minLength={8}
                        autoComplete="off"
                        required
                      />
                      <i
                        className={
                          eyes.password ? "fa fa-eye" : "fa fa-eye-slash"
                        }
                        onClick={() =>
                          setEyes({ ...eyes, password: !eyes.password })
                        }
                      ></i>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="password_div">
                      <input
                        type={eyes.confirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmpassword}
                        minLength={8}
                        autoComplete="off"
                        required
                      />
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
                    form?.password != confirmpassword &&
                    confirmpassword != "" ? (
                      <div className="text-red-500 text-[13px] mt-1">
                        Confirm Password is not matched with Password
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-dark" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="text_signin mt-2">
                Already have an account?{" "}
                <a href="/login">
                  <span className="">Sign In</span>
                </a>
              </p>
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

{/* <button onClick={()=>{setOpen(true)}} type="button" className="btn btn-primary" >
  Launch static backdrop modal
</button>

{open ? 
<div   data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-body">
        <div className="modal_login">
          <div className="check_img">
            <img src="/assets/img/check.png"></img>
          </div>
          <div className="mt-4 mb-4">
        <p>Please check your email account,</p>
        <p>We've sent a code to puja@yopmail.com</p>
        </div>
        <div className="d-flex justify-content-center mt-4">
        <button className="btn_modal"data-bs-dismiss="modal" aria-label="Close">Got it, thanks!</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
 : ""} */}
      </AuthLayout>
    </>
  );
};

export default Signup;
