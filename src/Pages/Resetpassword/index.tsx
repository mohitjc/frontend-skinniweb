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
        <form
          className="   bg-white border border-[#E4E7E9]  p-[24px] w-[500px] m-auto "
          onSubmit={hendleSubmit}
        >
          <div className=" mb-4">
            <h3 className="text-[22px] font-[600] ">
              New Password
            </h3>
            <span className="flex w-10 h-1 bg-[#0065FF] mt-1"></span>
            <p className="text-[14px] font-normal text-[grey] mt-2 mb-4">
              Please create a new password that you don’t use on any other site.
            </p>
          </div>

          <div className="mb-3">
          <div className="relative">
                <div className="absolute  z-[99] p-3 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                  <i className="fa fa-lock " aria-hidden="true"></i>
                </div>
                <input
                  type={eyes.newPassword ? "text" : "password"}
                  className="mb-5 relative  bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full pl-[55px]"
                  value={form.newPassword}
                  maxLength={16}
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                  placeholder="New Password"
                  required
                />
               {eyes.newPassword ? (
                    <FiEye
                      className="top-4 right-3 absolute text-[#333] cursor-pointer"
                      onClick={() =>
                        setEyes({ ...eyes, newPassword: !eyes.newPassword })
                      }
                    />
                  ) : (
                    <FiEyeOff
                      className="top-4 right-3 absolute text-[#333] cursor-pointer"
                      onClick={() =>
                        setEyes({ ...eyes, newPassword: !eyes.newPassword })
                      }
                    />
                  )}
              </div>

              {submitted && getError("newPassword").invalid ? (
                <div className="invalid-feedback d-block">
                  Min Length must be 8 characters long
                </div>
              ) : (
                <></>
              )}
            <div className="mb-3">
              <div className="relative">
              <div className="absolute  z-[99] p-3 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                  <i className="fa fa-lock " aria-hidden="true"></i>
                </div>
                <input
                  type={eyes.confirmPassword ? "text" : "password"}
                  className="mb-5 relative  bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full pl-[55px]"
                  value={form.confirmPassword}
                  maxLength={16}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm Password"
                  required
                />
                  {eyes.confirmPassword ? (
                    <FiEye
                      className="top-4 right-3 absolute text-[#333] cursor-pointer"
                      onClick={() =>
                        setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })
                      }
                    />
                  ) : (
                    <FiEyeOff
                      className="top-4 right-3 absolute text-[#333] cursor-pointer"
                      onClick={() =>
                        setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })
                      }
                    />
                  )}
              </div>
              {submitted && getError("confirmPassword").err.confirmMatch ? (
                <div className="invalid-feedback d-block">
                  Confirm Password is not matched with New Password
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className=" mt-6">
            <button
              type="submit"
              className="h-10 rounded-sm w-full  font-semibold text-center text-white   hover:opacity-80 transition-all "
            >
              Save
            </button>
          </div>

        </form>
      </AuthLayout>
    </>
  );
};

export default Resetpassword;
