import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./style.scss";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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
        <form
          className=" bg-white border border-[#E4E7E9]  p-[24px] w-[500px] m-auto "
          onSubmit={hendleSubmit}
        >
          <div className="">
            <h1 className="text-[22px] font-[600]">
              Forgot Password
            </h1>
            <span className="flex w-10 h-1 bg-[#0065FF] mt-1"></span>
          </div>
          <p className="text-[14px] font-normal text-[grey] mt-2 mb-4">
            {" "}
            No worries! Just enter your email and we’ll send you a reset
            password link.
          </p>
          <div className=" mt-5">
            <div className="relative">
              <div className="absolute  z-[99] p-3 px-4 bg-[#00358512] text-[#0035859c] rounded-tl-[7px] rounded-bl-[7px]">
                <i className="fa fa-envelope " aria-hidden="true"></i>
              </div>
              <input
                type="email"
                className="mb-5 relative  bg-white w-full  rounded-lg h-12 flex items-center gap-2 overflow-hidden  mb-0 bginput w-full pl-[55px]"
                placeholder="Email*"
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-6">
            <button
              type="submit"
              className="h-10 rounded-sm w-full  font-semibold text-center text-white   hover:opacity-80 transition-all "
            >
              Send Recovery Email
            </button>
          </div>

          <p className="text-[#333] text-center font-normal text-[14px] mt-4">
            {" "}
            Just Remember?
            <Link
              className="text-[#0065FF] text-[14px] !font-semibold"
              to="/login"
            >
              {" "}
              Sign In
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
};

export default Forgotpassword;
