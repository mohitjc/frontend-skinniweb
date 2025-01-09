import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./style.scss";
import { toast } from "react-toastify";
import methodModel from "../../methods/methods";
import { useSelector } from "react-redux";
import AuthLayout from "../../components/AuthLayout";

const Signup = ({ setActiveTab }: any) => {
  const history = useNavigate();
  const user = useSelector((state: any) => state.user);
  const surveyId:any = methodModel.getPrams("id")
  const [open, setOpen] = useState(false)

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
        surveyId: surveyId
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
    if (user && user?.loggedIn) {
      history("/");
    }

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
        <div className="sm:h-screen flex justify-center items-center max-w-[500px] mx-auto p-[4rem_0rem]">
          <div className="main_page w-full">
            <div className="main_auth bg-white p-[3rem_1.5rem] sm:p-[3rem_2rem] relative rounded-[20px] w-full">
            <img src="/assets/img/Skinnii-Logo.webp" className="w-[150px] sm:w-[180px] object-contain mx-auto mb-4" />
              <div className="main_heading mb-4">
                <h2 className="text-[15px] uppercase font-[500] text-center text-[#828282] mb-1">MEMBER REGISTER </h2>
                <p className="text-[14px] text-center text-[#000] leading-[16px]">Please fill in this form to create an account.</p>
              </div>
              <form className="form_div" onSubmit={hendleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-3 mb-3">
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">First Name</label>
                    <input
                      required
                      pattern="[A-Za-z]+"
                      type="text"
                      placeholder=""
                      className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      value={form.fullName}
                    ></input>
                  </div>
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Last Name</label>
                    <input
                      type="text"
                      placeholder=""
                      className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      value={form.lastName}
                    ></input>
                  </div>
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Email</label>
                    <input
                      value={form.email}
                      onChange={handleEmailChange}
                      type="email"
                      required
                      placeholder=""
                      className={`bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8 ${error && submitted ? "is-invalid" : ""
                        }`}
                    />
                    {error && submitted && (
                      <div className="invalid-feedback d-block">{error}</div>
                    )}
                  </div>
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Date Of Birth</label>
                    <input
                      required
                      type="date"
                      placeholder=""
                      className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
                      onChange={(e) =>
                        setForm({ ...form, dob: e.target.value })
                      }
                      value={form.dob}
                    ></input>
                  </div>
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Password</label>
                    <div className="relative">
                      <input
                        type={eyes.password ? "text" : "password"}
                        className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
                        placeholder=""
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
                          eyes.password ? "fa fa-eye absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer" : "fa fa-eye-slash absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer"
                        }
                        onClick={() =>
                          setEyes({ ...eyes, password: !eyes.password })
                        }
                      ></i>
                    </div>
                  </div>
                  <div className="">
                  <label className="text-[14px] text-[#000] mb-1 ml-3">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={eyes.confirmPassword ? "text" : "password"}
                        className="bg-[#E7E7E7] w-full rounded-full border-0 h-11 text-[12px] px-3 !pr-8"
                        placeholder=""
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmpassword}
                        minLength={8}
                        autoComplete="off"
                        required
                      />
                      <i
                        className={
                          eyes.confirmPassword ? "fa fa-eye absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer" : "fa fa-eye-slash absolute right-[15px] top-[16px] text-[14px] text-[#707780] cursor-pointer"
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
                <div className="mt-4">
                  <button className="border-0 bg-[#FED6B6] rounded-[8px] w-full text-[16px] font-[400] h-11 flex items-center justify-center text-[#000]" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="text-[#000] text-center mt-3">
                Already have an account?{" "}
                <a href="/login">
                  <span className="cursor-pointer font-[500] text-[#000]">Sign In</span>
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
