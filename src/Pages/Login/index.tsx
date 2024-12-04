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
  const [username, setUsername] = useState("");
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
      setUsername(data.email);
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
    if (email) setUsername(email);
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
      email: username,
      password,
    };
    let url = "user/login";
    if (step == 2) {
      url = "api/two-factor/auth";
      data = {
        id: resp?._id,
        otp: otp,
      };
    }
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

  const [provider, setProvider] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);
  console.log(provider, "fdsfadfsdafdasfdasfdasfs", profile);

  function setToken() {
    document.cookie = "gtoken" + "=" + profile.access_token + ";"  + ";path=/";
}

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
        <div className=" bg-white border border-[#E4E7E9]  w-[500px] m-auto ">
          <div className="w-full ">
            <TabGroup selectedIndex={activeTab} onChange={setActiveTab}>
              <TabList className="flex gap-4">
                <Tab
                  key={"Sign In"}
                  className=" w-full  px-2 py-2 text-sm/6 font-semibold text- focus:outline-none data-[selected]:border-b-2 border-[#0065FF] /10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  {"Sign In"}
                </Tab>
                <Tab
                  key={"Sign Up"}
                  className=" w-full  px-2 py-2 text-sm/6 font-semibold text-black focus:outline-none data-[selected]:border-b-2 border-[#0065FF] 10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  {"Sign Up"}
                </Tab>
              </TabList>
              <TabPanels className="mt-3">
                <TabPanel key={"tab1"} className="rounded-xl bg-white/5 p-3">
                  <form onSubmit={hendleSubmit}>
                    <div className=" px-[20px]">
                      <div className="relative">
                        <label className="mb-2 block">Email Address</label>
                        <div className="absolute  z-[99] p-2 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                          <i className="fa fa-envelope " aria-hidden="true"></i>
                        </div>

                        <input
                          type="text"
                          className="mb-5 relative  bg-white w-full  rounded-lg h-10 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full pl-[55px]"
                          placeholder="Email"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>
                      <label className="mb-2 block">Password</label>
                      <div className="relative ">
                        <div className="absolute  z-[99] p-2 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                          <i className="fa fa-lock " aria-hidden="true"></i>
                        </div>
                        <input
                          type={eyes.password ? "text" : "password"}
                          className="mb-3 relative  bg-white w-full  rounded-lg h-10 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full pl-[55px]"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          maxLength={10}
                          required
                        />
                        {eyes.password ? (
                          <FiEye
                            className="top-3 right-3 absolute text-[#333] cursor-pointer"
                            onClick={() =>
                              setEyes({
                                ...eyes,
                                password: !eyes.password,
                              })
                            }
                          />
                        ) : (
                          <FiEyeOff
                            className="top-4 right-3 absolute text-[#333] cursor-pointer"
                            onClick={() =>
                              setEyes({
                                ...eyes,
                                password: !eyes.password,
                              })
                            }
                          />
                        )}
                      </div>
                    </div>

                    <div className="px-[20px]">
                      <div className="flex">
                        {/* <label className="flex items-center pointer">
                              <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="mr-2 h-4 w-4 cursor-pointer"
                                style={{ accentColor: "#0065FF" }}
                              />{" "}
                              <span className="text-[14px] font-normal text-[#333]">
                                Remember Me
                              </span>
                            </label> */}
                        <Link
                          className="font-semibold  text-[14px] ml-auto text-[#0065FF]"
                          to="/forgotpassword"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="mt-4 flex items-center justify-center">
                        <button
                          type="submit"
                          className="h-10 rounded-sm w-full flex items-center justify-center font-semibold text-center text-white   hover:opacity-80 transition-all "
                        >
                          Sign in <FaArrowRight className="ml-2" />
                        </button>
                      </div>

                      <div className="border border-[#E4E7E9] mt-[17px] h-[0px]">
                        <p className="text-center relative top-[-13px] bg-[#fff] w-[25px] m-auto">
                          or
                        </p>
                      </div>

                      <LoginSocialGoogle
                        client_id={process.env.REACT_APP_GG_APP_ID || ""}
                        onLoginStart={onLoginStart}
                        scope="openid profile email"
                        redirect_uri={
                          process.env.REACT_APP_REDIRECT_URI ||
                          "https://ac.jcsoftwaresolution.in/login"
                        }
                        onResolve={({ provider, data }: IResolveParams) => {
                          setProvider(provider);
                          setProfile(data);
                        }}
                        onReject={onLoginFailure}
                      >
                        <div className=" mt-7 flex items-center relative border border-[#E4E7E9] p-[5px_4px] justify-center">
                          <img
                            className="w-[25px] absolute left-[14px] h-[25px]"
                            src="assets/img/gogle.png"
                            alt=""
                          />
                          <span className="text-[15px] text-[#475156]">
                            Login with Google
                          </span>
                        </div>
                      </LoginSocialGoogle>
                      {/* <LoginSocialApple
                        client_id={process.env.REACT_APP_GG_APP_ID || ""}
                        scope={"name email"}
                        redirect_uri={
                          process.env.REACT_APP_REDIRECT_URI ||
                          "https://ac.jcsoftwaresolution.in/login"
                        }
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }: IResolveParams) => {
                          setProvider(provider);
                          setProfile(data);
                        }}
                        onReject={(err) => {
                          console.log(err);
                        }}
                      > */}
                      <div className=" mt-5 flex items-center relative border border-[#E4E7E9] p-[5px_4px] justify-center">
                        <img
                          className="w-[25px] absolute left-[14px] h-[25px]"
                          src="assets/img/Apple.png"
                          alt=""
                        />
                        <span className="text-[15px] text-[#475156]">
                          Login with Apple
                        </span>
                      </div>
                      {/* </LoginSocialApple> */}
                    </div>
                  </form>
                </TabPanel>
                <TabPanel key={"tab2"} className="rounded-xl bg-white/5 p-3">
                  <Signup setActiveTab={setActiveTab} />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
