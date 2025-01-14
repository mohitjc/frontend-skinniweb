import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";
import permissionModel from "../../../models/permisstion.model";
import methodModel from "../../../methods/methods";
import { useSelector } from "react-redux";
import { memo } from "react";

const Layout = memo(function Layout({ children,t }) {
  const user = useSelector((state) => state.user);
  const history = useNavigate();
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    if (!user.loggedIn) {
      history("/login");
    } else {
      let permissions = user.roleDetail?.permissions?.[0];
      if (!permissionModel.urlAllow(permissions)) {
      }
    }
  }, []);

  const logowhite = () => {
    let value = "/assets/img/new-logo.png";
    return value;
  };

  const logos = () => {
    let value = "/assets/img/favicon.jpeg";
    return value;
  };

  const router = () => {
    let route = localStorage.getItem("route");
    history(route);
  };

  const [state, setstate] = useState(false);

  useEffect(() => {
    setstate(localStorage.getItem("sidebar"));
  }, [localStorage.getItem("sidebar")]);

  return (
    <>
      <div component="layout">
        <div onClick={(e) => router()} id="routerDiv"></div>
        <Header isOpen={isOpen} setIsOpen={setIsopen} t={t} />

        <div className={`main-wrapper flex ${isOpen ? "active-sidebar" : ""}`}>
          <div className="hide_show main-sidebar bg-[#FEE4D0] transition-[width] duration-300 !pt-[3rem] fixed duration-300 transition-all">
            <div className="min_sidbar !pl-[3rem] h-full relative duration-300 transition-all">
            <div className="">
              <div className="sidebar-brand">
                <Link to="/">
                  <div className="editLogo pt-3">
                    <img
                      src="/assets/img/skinnii_logo.png"
                      className=" show-logo w-[140px] object-contain "
                    />
                  </div>
                </Link>
              </div>
            
            </div>
            <div className="relative z-10">
              <Sidebar isOpen={isOpen} t={t} />
            </div>
            <img src="/assets/img/sidebar_img.png" className="absolute bottom-[0px] left-[0px]"/>
          </div>
          </div>
          <main className="main max-[1199px]:w-[calc(100%-0px)] w-[calc(100%-280px)] ml-auto mt-[80px] bg-[#828282] p-[1rem] sm:p-[2.5rem] duration-300 transition-all">
            <div className="mainarea ">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
});
export default Layout;