import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { Link } from "react-router-dom";
import "./style.scss";
import AuthLayout from "../../components/AuthLayout";
import methodModel from "../../methods/methods";
import { useDispatch, useSelector } from "react-redux";
import { login_success } from "../actions/user";

import { AiOutlineFileSearch } from "react-icons/ai";

const Login = () => {
  const [error, setError] = useState("");
  const history = useNavigate();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user?.loggedIn) {
      history("/");
    }
  }, []);

  useEffect(() => {
    if (user && user?.loggedIn) {
      history("/");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });

  useEffect(() => {
    let r = localStorage.getItem("remember");
    if (r) {
      let data = JSON.parse(r);
      setEmail(data.email);
      setPassword(data.password);
      setRemember(true);
    }

    let email = methodModel.getPrams("email");
    if (email) setEmail(email);
  }, []);

  const setLogin = async (data: any) => {
    let url = data?.isVerified == "Y" ? "/" : "/otp";
    dispatch(login_success(data));
    history(url);
  };

  const hendleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    if (!email || error) {
      return;
    }

    let data: any = {
      email: email,
      password,
    };

    let url = "user/signin";
    loader(true);

    ApiClient.post(url, data).then(async (res) => {
      if (res.success == true) {
        if (remember) {
          localStorage.setItem("remember", JSON.stringify(data));
        } else {
          localStorage.removeItem("remember");
        }
        setLogin(res?.data);
      }
      loader(false);
    });
  };
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (profile) {
      sessionStorage.setItem("gtoken", profile?.access_token);
    }
  }, [profile]);

  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    setEmail(email);
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
        <div className="sm:h-screen flex justify-center items-center max-w-[500px] mx-auto p-[4rem_0rem] px-3 py-[6rem]">
          <div className="main_page w-full w-full">
            <div className="main_auth bg-white p-[3rem_2rem] sm:p-[3rem_3rem] relative rounded-[20px] w-full">
            <img src="/assets/img/Skinnii-Logo.webp" className="w-[140px] sm:w-[160px] object-contain mx-auto mb-4" />
              <div className="main_heading mb-4">
                <h2 className="text-[15px] uppercase font-[500] text-center text-[#828282] mb-1">Member Login</h2>
                <p className="text-[14px] text-center text-[#000] leading-[16px]">Access your account.</p>
              </div>
              <form onSubmit={hendleSubmit} className="form_div">
                <div className="grid grid-cols-1 gap-y-4 gap-x-3 mb-2">
                  <div className="">
                    <label className="text-[14px] text-[#000] mb-1 ml-3">Email Id<span className="text-[#FF0028]">*</span></label>
                    <input
                      value={email}
                      onChange={handleEmailChange}
                      type="email"
                      required
                      placeholder=""
                      className={`bg-[#E7E7E7] w-full rounded-full border-0 h-10 text-[13px] px-3 !pr-8${
                        error && submitted ? "is-invalid" : ""
                      }`}
                    />
                    {error && submitted && (
                      <div className="invalid-feedback d-block">{error}</div>
                    )}
                  </div>
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Password<span className="text-[#FF0028]">*</span></label>
                    <div className="relative">
                      <input
                        type={eyes.password ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e?.target?.value);
                        }}
                        required
                        placeholder=""
                        className="bg-[#E7E7E7] w-full rounded-full border-0 h-10 text-[13px] px-3 !pr-8"
                      ></input>
                      <i
                        className={
                          eyes.password ? "fa fa-eye absolute right-[15px] top-[14px] text-[14px] text-[#707780] cursor-pointer" : "fa fa-eye-slash absolute right-[15px] top-[14px] text-[14px] text-[#707780] cursor-pointer"
                        }
                        onClick={() =>
                          setEyes({ ...eyes, password: !eyes.password })
                        }
                      ></i>
                    </div>
                  </div>
                </div>
                <p onClick={()=>{history("/forgotpassword")}} className=" text-right cursor-pointer hover:underline mr-3">Forgot Password?</p>
                <div className="mt-4">
                  <button className="border-0 bg-[#FED6B6] rounded-[8px] w-full text-[16px] font-[400] h-10 flex items-center justify-center text-[#000]">Sign In</button>
                </div>
              </form>
              <p className="text-[#000] text-center mt-3">
                Don't have an account?{" "}
                <a href="/signup">
                  <span className="cursor-pointer font-[500] text-[#000]">Sign up</span>
                </a>
              </p>
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

export default Login;
