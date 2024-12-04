import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./profile.scss";
import methodModel from "../../methods/methods";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const [data, setData]: any = useState("");
  const gallaryData = () => {
    loader(true);
    ApiClient.get(`user/profile`).then((res) => {
      if (res.success) {
        setData(res.data);
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (user.loggedIn) {
      gallaryData();
    }
  }, []);

  return (
    // <Layout>
    //   <div className="wrapper_section">
    //     <div className="flex items-center inner_part sm:mt-3 md:mt-3 p-3 shadow-box overflow-hidden rounded-lg bg-white    justify-between">
    //       <h3 className=" text-lg lg:text-1xl font-semibold text-[#111827]">
    //       </h3>
    //       <div className="flex gap-4 items-center">

        
    //       <Link
    //         to="/profile/change-password"
    //         className="px-2 lg:!px-4 text-sm font-normal bg-[#0065FF]  text-white h-10 flex items-center justify-center gap-2 !bg-primary rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed"
    //       >
    //         <svg
    //           stroke="currentColor"
    //           fill="currentColor"
    //           stroke-width="0"
    //           viewBox="0 0 24 24"
    //           height="1em"
    //           width="1em"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path fill="none" d="M0 0h24v24H0z"></path>
    //           <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
    //         </svg>
    //         Change Password
    //       </Link>
    //       <Link
    //         to="/profile/edit"
    //         className="px-2 lg:!px-4 text-sm font-normal   text-black hover:!bg-primary h-10 border border-primary flex items-center justify-center gap-2 !bg-white rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed"
    //       >
    //         <svg
    //           stroke="currentColor"
    //           fill="currentColor"
    //           stroke-width="0"
    //           viewBox="0 0 24 24"
    //           height="1em"
    //           width="1em"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path fill="none" d="M0 0h24v24H0z"></path>
    //           <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
    //         </svg>
    //         Edit Profile
    //       </Link>
    //       </div>
    //     </div>

    //     <div className="inner_part sm:mt-3 md:mt-3 p-6 shadow-box overflow-hidden rounded-lg bg-white   ">
    //      <h3 className="text-[16px] text-[#0065FF]  font-[600] mb-4">    Profile Information</h3>
    //       <div className="grid items-center grid-cols-12 gap-4 mb-5">
    //         <div className="col-span-12 md:col-span-12 lg:col-span-12">
    //           <div className="grid grid-cols-12 gap-4 shrink-0 items-center">
    //             <div className="col-span-12 md:col-span-3">
    //               <img
    //                 src={methodModel.userImg(data && data.image)}
    //                 className="h-[100px] w-[100px] border-2 border-white-500  rounded-full object-cover mx-auto"
    //               />
    //             </div>
    //             <div className="col-span-12 md:col-span-9">
    //             <div className="grid grid-cols-12 gap-4 sm:ml-4 w-full lg:border-l border-dashed border-gray-400 sm:pl-5">
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Name</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {" "}
    //                   {data && data.fullName}
    //                 </p>
    //               </div>
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Email</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {data && data.email}
    //                 </p>
    //               </div>

    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Phone Number</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {String(data.mobileNo ? "+" + data.mobileNo : "N/A")}
    //                 </p>
    //               </div>
    //             </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
       
    //     <div className="inner_part sm:mt-3 md:mt-3 p-6 shadow-box overflow-hidden rounded-lg bg-white   ">
    //     <h3 className=" text-[16px] text-[#0065FF]  font-[600] mb-4">
    //       Company Profile Information
    //     </h3>
    //       <div className="grid items-center grid-cols-12 gap-4 mb-5">
    //         <div className="col-span-12 md:col-span-12 lg:col-span-12">
    //           <div className="flex items-center gap-4 shrink-0">
    //             <div className="grid grid-cols-12 gap-4 w-full ">
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Company Name</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {data && data?.company ? data.company : "--"}
    //                 </p>
    //               </div>
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Business Type</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {data && data?.businessName?.name
    //                     ? data?.businessName?.name
    //                     : "--"}
    //                 </p>
    //               </div>
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Company Email</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {data && data?.CompanyEmail ? data?.CompanyEmail : "--"}
    //                 </p>
    //               </div>
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Phone Number</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {String(
    //                     data.companyMobileNo
    //                       ? "+" + data.companyMobileNo
    //                       : "N/A"
    //                   )}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

      
    //     <div className="inner_part sm:mt-3 md:mt-3 p-6 shadow-box overflow-hidden rounded-lg bg-white   ">
    //     <h3 className="text-[16px] text-[#0065FF]  font-[600] mb-4">
    //       Company Information
    //     </h3>
    //       <div className="grid items-center grid-cols-12 gap-4 mb-5">
    //         <div className="col-span-12 md:col-span-12 lg:col-span-12">
    //           <div className="flex items-center gap-4 shrink-0">
    //             <div className="grid grid-cols-12 gap-4 w-full">
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Company Address</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {" "}
    //                   {data && data?.companyAddress
    //                     ? data.companyAddress
    //                     : "--"}
    //                 </p>
    //               </div>
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Contact Name</label>
    //                 <p className="text-[12px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {data && data?.contactName ? data?.contactName : "--"}
    //                 </p>
    //               </div>
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Currency</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {data && data?.currency ? data?.currency : "--"}
    //                 </p>
    //               </div>
    //               <div className="col-span-12 md:col-span-6">
    //                 <label className="text-gray-600">Website URl</label>
    //                 <p className="text-[11px] text-gray-700  text-[#7e7d7d]  bg-[#0065FF1c] p-[6px_6px] rounded">
    //                   {data.websiteURL ?  data.websiteURL : "--"}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Layout>
    <div className="">
      <div className="container">
      
      </div>
    </div>
  );
};

export default Profile;
