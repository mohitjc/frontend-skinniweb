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

  });
  console.log(form,"formm")
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
  });


  const hendleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    const birthDate = new Date(form?.dob); // Convert DOB to a Date object
    const today = new Date(); // Get current date
    let newAge = today.getFullYear() - birthDate.getFullYear();
    let fullName=form?.firstName + " " + form?.lastName;
    let url = "webRegister";
    // if (!remember) return;
    let data: any = {

      ...form,
      fullName:fullName,
      age:newAge,
      role: "user",
    };

    loader(true);
    ApiClient.post(url, data).then(async (res) => {
      if (res.success) {
        let url = "/login";
        setTimeout(() => {
          toast.success("Please verify your email");
        }, 400);
        history(url);
        loader(false);
        // setActiveTab(0)
      }

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
              <form className="form_div" onSubmit={hendleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" placeholder="First Name" className="form-control"
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      value={form.fullName}
                    ></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" placeholder="last Name" className="form-control"
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      value={form.lastName}
                    ></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="email" placeholder="E-Mail" className="form-control"
                      onChange={(e) =>
                       setForm({ ...form, email: e.target.value })

                      }
                      value={form.email}
                    ></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="date" placeholder="dd/mm/yyyy" className="form-control"
                     onChange={(e) => setForm({ ...form, dob: e.target.value })

                    }
                     value={form.dob}
                    ></input>
                  </div>

                  {/* <div className="col-md-6 mb-3">
                    <select className="form-select" aria-label="Default select example"
                    >
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
                  </div> */}
                  {/* <div className="col-md-6 mb-3">
                    <input type="text" placeholder="Current weight in pound" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" placeholder="Current height in pound" className="form-control"></input>
                  </div> */}
                  {/* <div className="col-md-6 mb-3">
                    <input type="text" placeholder="Goal Weight in pound" className="form-control"></input>
                  </div>
                  <div className="col-md-6 mb-3">
                    <select className="form-select" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div> */}
                  <input
                    type={eyes.password ? "text" : "password"}
                    className="mb-5  bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full px-2"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    value={form.password}
                    minLength={8}
                    autoComplete="off"
                    required
                  />
                  <div className="right-2 inset-y-0 flex items-center text-gray-500 text-sm">
                    <i
                      className={eyes.password ? "fa fa-eye" : "fa fa-eye-slash"}
                      onClick={() => setEyes({ ...eyes, password: !eyes.password })}
                    ></i>
                  </div>
                  <input
                    type={eyes.confirmPassword ? "text" : "password"}
                    className="mb-5   bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full px-2"
                    placeholder="Confirm Password"
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    value={form.confirmPassword}
                    minLength={8}
                    autoComplete="off"
                    required
                  />
                  <div className="right-2 inset-y-0 flex items-center text-gray-500 text-sm">
                    <i
                      className={eyes.confirmPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                      onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}
                    ></i>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-dark" type="submit">Sign Up</button>
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
