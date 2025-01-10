import { React, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import styles from "./index.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { RiContactsLine, RiCoupon2Line, RiDiscountPercentLine, RiHome6Line, RiMoneyDollarCircleLine, RiUserSettingsLine } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { TbCategory2, TbCategoryPlus, TbReportMoney, TbUsers } from "react-icons/tb";
import { BiCartAdd } from "react-icons/bi";
import { PiBellSimpleLight, PiNewspaper } from "react-icons/pi";
import { GrUserSettings } from "react-icons/gr";
import { VscSymbolMisc } from "react-icons/vsc";
import { GoCodeReview, GoFileMedia } from "react-icons/go";
import { TfiLayoutMediaCenterAlt } from "react-icons/tfi";
import { MdOutlineAssignment } from "react-icons/md";
import { RiContractLine } from "react-icons/ri";
import { FaQuestion } from "react-icons/fa6";
import { MdOutlineQuestionMark } from "react-icons/md";
import { FaTags } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IconName } from "react-icons/fi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RxFileText } from "react-icons/rx";


import {
  MdContentPaste,
  MdOutlineGroups,
} from "react-icons/md";

import environment from "../../../environment";
import ApiClient from "../../../methods/api/apiClient";
import { FiUsers } from "react-icons/fi";
import { LiaBlogSolid } from "react-icons/lia";
import { BsFiletypeDoc } from "react-icons/bs";
import { LuCalendarClock } from "react-icons/lu";

const Html = ({ ListItemLink, tabclass, isAllow, route, isOpen, user }) => {
  // const [activeplan, setActiveplan] = useState();
  // const role = user?.customerRole?.name === "Group Leader";
  // const getactivePlan = () => {
  //   let filter = {};
  //   if (user?.subRole?.id == environment.SubRolePartner) {
  //     filter = { id: user.id || user?._id };
  //   } else {
  //     filter = {};
  //   }
  //   ApiClient.get("api/getMyPlan", filter).then((res) => {
  //     if (res.success) {
  //       setActiveplan(res?.data);
  //     }
  //   });
  // };

  const location = useLocation();
  // useEffect(() => {
  //   if (user?.customerRole?.name === "Group Leader") {
  //     // getactivePlan();
  //   }
  // }, []);

  const menus = [
    {
      name: "Compliance With Deadline Reminders",
    },
    {
      name: 'dashboard',
      icon: <RiHome6Line className="text-inherit shrink-0 text-lg" />,
      url: "/dashboard",
      // key: "readDashboard",
    },
    // {
    //   name: "Manager Management",
    //   icon: <RiContractLine className="text-inherit shrink-0 text-lg" />,
    //   url: "/manager",
    //   key: "managerstaff",
    // },


    // { 
    //   name: "Users",
    //   icon: <FiUsers className="text-inherit shrink-0 text-lg" />,
    //   url: "/user",
    //   key: "",
    // },  
    {
      name: 'users',
      icon: <AiOutlineUsergroupAdd className="text-inherit shrink-0 text-lg" />,
      url: "/customers",
      // key: "readcustomer",
    },
    {
      name: "staffManager",
      icon: <TbUsers className="text-inherit shrink-0 text-lg" />,
      url: "/staffManger",
      // key: "readstaff",
    },
    {
      name: "Plans",
      icon: <RiMoneyDollarCircleLine className="text-inherit shrink-0 text-lg" />,
      url: "/plan",
      // key: "readplan",
    },
    {
      name: "ReminderTypes",
      icon: <LuCalendarClock className="text-inherit shrink-0 text-lg" />,
      url: "/documenttype",
      // key: "readdocumenttype",
    },
    {
      name: "Workspaces",
      icon: <VscWorkspaceTrusted  className="text-inherit shrink-0 text-lg" />,
      url: "/Workspaces",
      // key: "readworkspaces",
    },
    // {
    //   name: "Roles and Permissions",
    //   icon: <GrUserSettings className="text-inherit shrink-0 text-lg" />,
    //   url: "/roles",
    //   // key: "readroles",
    // },
    {
      name: "EmailTemplates",
      icon: <MdOutlineEmail className="text-inherit shrink-0 text-lg" />,
      url: "/email-template",
      // key: "reademail",
    },
    {
      name: "ExpirationItems",
      icon: <CgNotes className="text-inherit shrink-0 text-lg" />,
      url: "/expirationitem",
      // key: "readsetting",
    },
    {
      name: "Tags",
      icon: <RiDiscountPercentLine className="text-inherit shrink-0 text-lg" />,
      url: "/tags",
      // key: "readtags",
    },

    {
      name: "Blogs",
      icon: <LiaBlogSolid className="text-inherit shrink-0 text-lg" />,
      url: "/blogs",
      // key: "readblogs",
    },
    {
      name: 'Transactions',
      icon: <RiMoneyDollarCircleLine className="text-inherit shrink-0 text-lg" />,
      url: '/transactions',
      // key: 'readTransactions',
    },
    {
      name: 'Testimonials',
      icon: <GoCodeReview className="text-inherit shrink-0 text-lg" />,
      url: '/testimonials',
      // key: 'readTransactions',
    },
    {
      name: 'Promotions',
      icon: <RiCoupon2Line className="text-inherit shrink-0 text-lg" />,
      url: '/promotions',
      // key: 'readTransactions',
    },
    {
      name: "Category",
      icon: <TbCategory2 className="text-inherit shrink-0 text-lg" />,
      url: "/category",
      // key: "readsetting",
    },
    {
      name: 'Content',
      icon: <RxFileText className="text-inherit shrink-0 text-lg" />,
      url: '/content',
      // key: 'readTransactions',
    },
    {
      name: 'ContactUs',
      icon: <RiContactsLine className="text-inherit shrink-0 text-lg" />,
      url: '/contact',
      // key: 'readTransactions',
    },
    {
      name: 'Our Team',
      icon: <RiContactsLine className="text-inherit shrink-0 text-lg" />,
      url: '/team',
      // key: 'readTransactions',
    },
    {
      name: "FAQ",
      icon: <FaQuestion className="text-inherit shrink-0 text-lg font-normal" />,
      url: "/faqs",
      // key: "readsetting",
    },
    
    {
      name: "Settings",
      icon: <FiSettings className="text-inherit shrink-0 text-lg" />,
      url: "/setting",
      // key: "readsetting",
    },  
     
  ];

  return (
    <>
      <div
        className={`px-[8px] ${isOpen && styles.sm_sidebar}`}
        component="siderbar"
      >
        <ul className="space-y-2 px-2">
          {menus.map((itm) => {
            return (
              <>
                {itm.icon ? (
                  <>
                    <li>
                      {itm.menu ? (
                        <>
                          {isAllow(
                            itm.menu.map((itm) => itm.key).toString()
                          ) ? (
                            <>
                              <Disclosure
                                as="div"
                                defaultOpen={tabclass(itm.tab)}
                              >
                                {({ open }) => (
                                  <>
                                    <tooltip placement="right" title={itm.name}>
                                      <Disclosure.Button className="w-full p-2.5 rounded-md flex items-center justify-between text-[#fff]  hover:!text-[#fff] gap-[12px] hover:bg-[#26ddd3] transition-all duration-300">
                                        <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                                          {itm.icon}
                                          <span className=" text-inherit leading-none sidebar_text">
                                            {itm.name}
                                          </span>
                                        </span>
                                        <TiArrowSortedDown
                                          className={`${open ? "" : "-rotate-90 transform"
                                            } h-4 w-4 transition-all duration-500  text-[#fff]`}
                                        />
                                      </Disclosure.Button>
                                    </tooltip>
                                    <Transition
                                      enter="transition duration-300 ease-in-out"
                                      enterFrom="transform scale-95 opacity-0"
                                      enterTo="transform scale-300 opacity-300"
                                      leave="transition duration-300 ease-in-out"
                                      leaveFrom="transform scale-300 opacity-300"
                                      leaveTo="transform scale-95 opacity-0"
                                    >
                                      <Disclosure.Panel className="pl-[30px] mt-[4px] ">
                                        <ul className="space-y-2">
                                          {itm.menu?.map((sitm) => {
                                            return (
                                              <>
                                                {isAllow(sitm.key) ? (
                                                  <li>
                                                    {" "}
                                                    <NavLink
                                                      className={(isActive) =>
                                                        "p-2.5 rounded-md block text-sm font-normal text-[#d6d6d6] hover:text-[#fff] cursor-pointer  hover:bg-[#26ddd3] !no-underline transition-all " +
                                                        (location?.pathname ==
                                                          sitm.url &&
                                                          " !text-[#fff] !font-medium")
                                                      }
                                                      to={sitm.url}
                                                    >
                                                      <span
                                                        className="text-inherit leading-none sidebar_text"
                                                        title={sitm.name}
                                                      >
                                                        {sitm.name}
                                                      </span>
                                                    </NavLink>
                                                  </li>
                                                ) : null}
                                              </>
                                            );
                                          })}
                                        </ul>
                                      </Disclosure.Panel>
                                    </Transition>
                                  </>
                                )}
                              </Disclosure>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <>
                          {isAllow(itm.key) ? (
                            <>
                              <tooltip
                                placement="top"
                                color="#26ddd3"
                                title={itm.name}
                              >
                                <NavLink
                                  to={itm.url}
                                  className={(isActive) =>
                                    "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#454242] hover:!text-[#454242] hover:bg-[#26ddd3] !no-underline transition-all " +
                                    (location?.pathname === itm.url &&
                                      " !text-[#454242] !bg-[#26ddd3] !font-medium")
                                  }
                                >
                                  {itm.icon}
                                  <span className="text-inherit leading-none sidebar_text">
                                    {itm.name}
                                  </span>
                                </NavLink>
                              </tooltip>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <h6
                        className={`${isOpen
                          ? "py-[12px] text-center"
                          : "p-[12px] text-center text-md"
                          } text-xs font-medium text-[#7E8B99] mt-[12px]`}
                      >
                        <span className=" sidebar_text text-center">
                          {" "}
                          {itm.name}{" "}
                        </span>
                      </h6>
                    </li>
                  </>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Html;
