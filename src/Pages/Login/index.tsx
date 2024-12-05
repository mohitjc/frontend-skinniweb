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
      history("/profile");
    }
  }, []);

  useEffect(() => {
    if (user && user?.loggedIn) {
      history("/profile");
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
    let url = "/profile";
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
        <div className="layout_auth layout_auth_2">
          <div className="main_page">
            <img src="/assets/img/Skinnii-Logo.webp" className="logo_img" />
            <div className="main_auth">
              <div className="main_heading mb-4">
                <h2>Member Login</h2>
                <p>Access your account.</p>
              </div>
              <form onSubmit={hendleSubmit} className="form_div">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      value={email}
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
                    <div className="password_div">
                      <input
                        type={eyes.password ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e?.target?.value);
                        }}
                        required
                        placeholder="Password"
                        className="form-control"
                      ></input>
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
                </div>
                <p onClick={()=>{history("/forgotpassword")}} className="text_right">Forgot Password</p>
                <div className="mt-3">
                  <button className="btn btn-dark">Login</button>
                </div>
              </form>
              <p className="text_signin mt-2">
                Don't have an account?{" "}
                <a href="/signup">
                  <span className="">Sign up</span>
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
      </AuthLayout>
    </>
  );
};

export default Login;
