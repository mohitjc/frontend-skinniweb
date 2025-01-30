import { useEffect, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'


const Forums = () => {
 
  return (
    <Layout>
      <div className="flex items-center mb-2"><p className="text-[12px] text-[#FEE4D0] font-[400]">Forum</p><IoIosArrowForward className="text-[12px] text-[#FEE4D0]" /><p className="text-[12px] font-[600] text-[#FEE4D0]">Profile</p></div>
      <div className="bg-white   rounded-[12px]">
        <div className="set-bg-images">

        </div>
        <div className="">
          <div className="text-center mb-5">
            <div className="w-[176px] h-[176px]  rounded-full  border-2 border-[#FDA660] mx-auto mt-[-96px]">
            <img className="rounded-full w-full h-full border-4 border-[#fff] object-cover" src="/assets/img/profile-image.jpg"></img>
            </div>
            <div className="mt-4">
              <p className="text-[14px] text-[#727477] font-[400]">Brooklyn, NY</p>
            </div>
            <div className="mt-3">
<p className="text-[14px] text-[#727477] font-[400]">Email: lorem@gmail.com</p>
<p className="text-[14px] text-[#727477] font-[400]">DOB: 01-12-2019</p>
<button className="border !border-[#828282] rounded-full mt-2  bg-[#FEE4D0] text-[12px] font-[400] text-center px-5 py-2 text-[#828282]">Send Message</button>
            </div>
          </div>
        </div>

<div className=" px-3 lg:px-10">
<div className="">
      <div className="">
        <TabGroup>
          <TabList className="flex gap-4 border-b-2 border-[#323436]">
              <Tab
                key={"Liked Posts"}
                className=" text-[12px] text-[#000] font-[500] focus:outline-none data-[selected]:border-b-4 border-[#FEE4D0]   data-[focus]:outline-1 data-[focus]:outline-black"
              >
                {"Liked Posts"}
              </Tab>
              <Tab
                key={"Saved"}
                className=" text-[12px] text-[#000] font-[500]   focus:outline-none data-[selected]:border-b-4 border-[#FEE4D0]   data-[focus]:outline-1 data-[focus]:outline-black"
              >
                {"Saved"}
              </Tab>
          </TabList>
          <TabPanels className="mt-3">
              <TabPanel key={"Liked Posts"} className="rounded-xl bg-white/5 px-3 pb-5">
            <div className="">
<div className="grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1 gap-3">
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-1.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-2.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-3.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-1.png"></img>
  </div>

  <div className="">
  <img className="w-full h-[190px] object-cover" src="/assets/img/food-2.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-2.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-3.png"></img>
  </div>
  <div className="">
  <img className="w-full h-[190px] object-cover" src="/assets/img/food-3.png"></img>
  </div>
</div>
            </div>
              </TabPanel>
              <TabPanel key={"Saved"} className="rounded-xl bg-white/5 px-3 pb-5">
              <div className="">
<div className="grid lg:grid-cols-4  grid-cols-2 gap-3">
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-1.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-2.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-3.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-1.png"></img>
  </div>

  <div className="">
  <img className="w-full h-[190px] object-cover" src="/assets/img/food-2.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-2.png"></img>
  </div>
  <div className="">
    <img className="w-full h-[190px] object-cover" src="/assets/img/food-3.png"></img>
  </div>
  <div className="">
  <img className="w-full h-[190px] object-cover" src="/assets/img/food-3.png"></img>
  </div>
</div>
            </div>
              </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
</div>


      </div>
    </Layout>
  );
};

export default Forums;
