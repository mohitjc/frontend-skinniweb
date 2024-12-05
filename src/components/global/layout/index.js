import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import ApiClient from "../../../methods/api/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { login_success, logout } from "../../../Pages/actions/user";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { memo } from "react";
import { sitedetail_success } from "../../../Pages/actions/sitedetail";
import { subscription_success } from "../../../Pages/actions/subscription";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoClose, IoNotificationsOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";

import { MdEmail } from "react-icons/md";

const Layout = memo(function Layout({ children }) {
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  const [isOpen, setIsopen] = useState(false);
  const dispatch = useDispatch();
  let [isContactOpen, setIsContactOpen] = useState(false);
  const [showTitle, setShowTitle] = useState("");

  function open() {
    setIsContactOpen(true);
  }

  function close() {
    setIsContactOpen(false);
  }
  const updateUserProfile = () => {
    // if (!user.access_token) return;
    // ApiClient.get("user/profile").then(async (res) => {
    //   if (res.success) {
    //     let data = { ...user, ...res.data };
    //     dispatch(login_success(data));
    //     sessionStorage.setItem("browseload", true);
    //   }
    // });
  };

  const getActivePlan = () => {
    // if (!user.access_token) return;
    // ApiClient.get("subscription/active/subscription").then((res) => {
    //   if (res.success) {
    //     let data = res.data;
    //     dispatch(subscription_success(data));
    //   }
    // });
  };

  useEffect(() => {
    // if (!user.loggedIn) {
    //   history("/login");
    // } else {
    //   let permissions = user.roleDetail?.permissions?.[0];
    //   if (!permissionModel.urlAllow(permissions)) {
    //     // history("/profile")
    //   }
    let browseload = sessionStorage.getItem("browseload");
    if (!browseload) {
      updateUserProfile();
      getActivePlan();
    }
    // }
  }, []);

  const logowhite = () => {
    let value = "/assets/img/logo.png";
    return value;
  };

  const logos = () => {
    let value = "/assets/img/logo.png";
    return value;
  };

  const router = () => {
    let route = localStorage.getItem("route");
    history(route);
  };

  const [state, setstate] = useState(false);
  const getSiteDetails = () => {
    // ApiClient.allApi("site/detail").then((res) => {
    //   if (res.success) {
    //     let data = res.data;
    //     dispatch(sitedetail_success(data));
    //     sessionStorage.setItem("siteload", true);
    //   }
    // });
  };

  useEffect(() => {
    let siteload = sessionStorage.getItem("siteload");
    if (!siteload) getSiteDetails();
  }, []);

  useEffect(() => {
    setstate(localStorage.getItem("sidebar"));
  }, [localStorage.getItem("sidebar")]);

  const Logout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("gtoken");
    history("/login");
  };

  useEffect(() => {
    const navHead = sessionStorage.getItem("navvalue");
    setShowTitle(navHead);
  }, [showTitle]);
  return (
    <>
      <div id="logoutBtn" onClick={() => Logout()}></div>
      <div id="updateProfile" onClick={() => updateUserProfile()}></div>
      <div id="getActivePlan" onClick={() => getActivePlan()}></div>

      <div component="layout">
        <div onClick={(e) => router()} id="routerDiv"></div>
        {/* <Header isOpen={isOpen} setIsOpen={setIsopen} /> */}

        <div className={`main-wrapper flex ${isOpen ? "active-sidebar" : ""}`}>
          <div className="main-sidebar scrollbar transition-[width] duration-300 ">
            <div className="sidebar-brand text-center p-[9px] mb-4">
              <Link to="/dashboard">
                <div className="editLogo">
                  <img
                    src={logowhite()}
                    width=""
                    height="35"
                    className=" show-logo w-[100px] border-[1px solid #fff]"
                  />
                  <img src={logos()} className="hide-logo" height="35" />
                </div>
              </Link>
            </div>
          </div>
          <div className="main-sidebar  d-md-block">
            <Sidebar setShowTitle={setShowTitle} showTitle={showTitle} />
          </div>
          <main className="main">
            <div className="mainarea ">
              <div className="bg-white px-4 py-2">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">
                    {showTitle ? showTitle : "Dashboard"}
                  </h2>
                  <div className="flex gap-4 items-center lg:gap-6">
                    <div>
                      <FaRegCircleQuestion
                        onClick={open}
                        className="cursor-pointer text-xl text-gray-600 hover:text-gray-800"
                      />
                    </div>
                    <div>
                      <IoNotificationsOutline
                        onClick={open}
                        className="cursor-pointer text-2xl text-gray-600 hover:text-gray-800"
                      />
                    </div>
                    <div className="">
                      <div className="bg-gray-100 rounded-xl px-4 py-2 flex gap-2 items-center">
                        <BsChatDots />
                        <p>AI Chat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
      <Dialog
        open={isContactOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen bg-black/60 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center  p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white p-4 relative lg:p-10 lg:py-10 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="absolute right-6 top-6">
                <IoClose
                  onClick={close}
                  className="text-primary cursor-pointer text-2xl"
                />
              </div>

              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                <p className="text-3xl font-semibold"> Need help?</p>
                <p className="mt-2"> Feel free to contact us</p>
              </DialogTitle>

              <div className="grid grid-col-1 lg:grid-cols-2 gap-4 lg:gap-10 items-center mt-8 ">
                <div className="">
                  <p className="flex gap-3 items-center mb-2">
                    <MdEmail className="text-primary text-xl" /> Email
                  </p>
                  <p className="text-md text-neutral-700">
                    contact@automatees.com
                  </p>
                </div>
                <div className="">
                  <p className="flex gap-3 items-center mb-2">
                    <FaPhoneAlt className="text-primary text-xl" /> Phone
                  </p>
                  <p className="text-md text-neutral-700"> +61-412-345-678</p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
});
export default Layout;
