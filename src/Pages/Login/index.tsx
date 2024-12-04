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
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Signup from "../Signup";
import { LoginSocialGoogle, IResolveParams } from "reactjs-social-login";
import { AiOutlineFileSearch } from "react-icons/ai";

const Login = () => {
  const [activeTab, setActiveTab]: any = useState(0);
  const history = useNavigate();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.loggedIn) {
      history("/plan");
    }
  }, []);

  const [ip, setIp] = useState("");
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState("");
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });
  const [step, setStep] = useState(1);
  const [otp, setOTP] = useState("");
  const [resp, setRes]: any = useState();
  useEffect(() => {
    let r = localStorage.getItem("remember");
    if (r) {
      let data = JSON.parse(r);
      setEmail(data.email);
      setPassword(data.password);
      setRemember(true);
    }

    // fetch("https://api.ipify.org?format=json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     let ip = data.ip;
    //     localStorage.setItem("IP", ip);
    //     setIp(ip);
    //   })
    //   .catch((error) => console.error("Error fetching IP address:", error));

    let email = methodModel.getPrams("email");
    if (email) setEmail(email);
  }, []);

  const setLogin = async (data: any) => {
    let url = "/plan";
    dispatch(login_success(data));
    setTimeout(() => {
      if (data?.subRoleDetails?.id) {
        history("/dashboard");
      } else if (data?.activePlan === true) {
        history("/dashboard");
      } else if (data?.connectionsDetails?.length < 0) {
        history("/profile");
      } else {
        history(url);
      }
    }, 100);
  };

  const hendleSubmit = (e: any) => {
    e.preventDefault();
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
        if (res.data.two_factor_email_sent || step == 1) {
          let rdata = res.data;
          rdata._id = rdata.id;
          setStep(2);
          setRes(rdata);
          setLogin(rdata);
        }
        const loginTime = new Date();
        localStorage.setItem("loginTime", loginTime.toISOString());
      }
      loader(false);
    });
  }; 
  const [profile, setProfile] = useState<any>(null); 

 

  useEffect(() => {
    if (profile) {
      sessionStorage.setItem("gtoken", profile?.access_token)
      // setToken()
    }
  }, [profile]);
  const onLoginStart = useCallback(() => {
    console.log("Google login started");
  }, []);

  const onLoginFailure = useCallback((err: any) => {
    console.error("Google login failed", err);
  }, []);
  return (
    <>
      <AuthLayout>
         <div className="layout_auth layout_auth_2">
          <div className="main_page">
         <img src="/assets/img/Skinnii-Logo.webp" className="logo_img"/>
            <div className="main_auth">
              <div className="main_heading mb-4">
              <h2>Member Login</h2>
              <p>Access your account.</p>
              </div>
              <form   onSubmit={hendleSubmit} className="form_div">
                <div className="row">
                <div className="col-md-6 mb-3">
                <input value={email} onChange={(e)=>{setEmail(e?.target?.value)}} type="email" required placeholder="Email" className="form-control"></input>
                </div>
                <div className="col-md-6 mb-3">
                <input type="password" value={password} onChange={(e)=>{setPassword(e?.target?.value)}} required placeholder="Password" className="form-control"></input>
                </div>
                </div>
                <div className="mt-3">
                <button className="btn btn-dark">Login</button>
                </div>
              </form>
              <p className="text_signin mt-2">Don't have an account? <a href=""><span className="">Sign up</span></a></p>
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

export default Login;
