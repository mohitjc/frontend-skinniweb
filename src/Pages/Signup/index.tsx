import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./style.scss";
import environment from "../../environment";
import { toast } from "react-toastify";
import methodModel from "../../methods/methods";
import { useSelector } from "react-redux";

const Signup = ({setActiveTab}: any) => {
  const history = useNavigate();
  const user = useSelector((state: any) => state.user);

  const [form, setForm]: any = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
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
        <form
          className=" bg-white w-full "
          onSubmit={hendleSubmit}
          autoComplete="off"
        >
         
       <div className="px-[20px]">
          <input
            type="text"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            value={form.firstName}
            className="mb-5 relative  bg-white w-full  rounded-lg h-10 flex items-center overflow-hidden  mb-0 bginput w-full p-2"
            placeholder="First Name"
            autoComplete="off"
            required
          />
          <input
            type="text"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            value={form.lastName}
            className="mb-5 relative  bg-white w-full  rounded-lg h-10 flex items-center overflow-hidden  mb-0 bginput w-full p-2"
            placeholder="Last Name"
            autoComplete="off"
            required
          />
          <input
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            className="mb-5 relative  bg-white w-full  rounded-lg h-10 flex items-center overflow-hidden  mb-0 bginput w-full p-2"
            placeholder="Email address"
            autoComplete="off"
            required
          />
          <div className="relative mb-3">
            <input
              type={eyes.password ? "text" : "password"}
              className="mb-5 relative  bg-white w-full  rounded-lg h-10 flex items-center overflow-hidden  mb-0 bginput w-full p-2"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
              minLength={8}
              autoComplete="off"
              required
            />

            <div className="absolute right-2 inset-y-0 flex items-center text-gray-500 text-sm">
              <i
                className={eyes.password ? "fa fa-eye" : "fa fa-eye-slash"}
                onClick={() => setEyes({ ...eyes, password: !eyes.password })}
              ></i>
            </div>
          </div>


          <div className="flex">
            <label className="flex items-center pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="mr-2 h-4 w-4"
              />{" "}
              <span className="text-xs text-gray-600">
                By clicking Create account, I agree that I have read and
                accepted the Terms of Use and Privacy Policy.
              </span>
            </label>
          </div>

          {submitted && !remember ? (
            <>
              <div className="text-[#0065FF] text-sm capitalize mt-3">
                Please agree our Terms Of Use And Privacy Policy
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="mt-5 flex items-center justify-center">
            <button
              type="submit"
              className="h-10 rounded-sm w-full font-semibold text-center text-white   hover:opacity-80 transition-all "
            >
              Sign Up
            </button>
          </div>
          <div className="border border-[#E4E7E9] mt-[17px] h-[0px]">
              <p className="text-center relative top-[-13px] bg-[#fff] w-[25px] m-auto">or</p>
            </div>
            <div className=" mt-7 flex items-center relative border border-[#E4E7E9] p-[5px_4px] justify-center">
              <img className="w-[25px] absolute left-[14px] h-[25px]" src="assets/img/gogle.png"></img>
              <span className="text-[15px] text-[#475156]">Login with Google</span>
            </div>
            <div className=" mt-5 flex items-center relative border border-[#E4E7E9] p-[5px_4px] justify-center">
              <img className="w-[25px] absolute left-[14px] h-[25px]" src="assets/img/Apple.png"></img>
              <span className="text-[15px] text-[#475156]">Login with Apple</span>
            </div>
          </div>
        </form>
    </>
  );
};

export default Signup;
