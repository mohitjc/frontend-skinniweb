import { React, useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import styles from "./index.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { RiContactsLine, RiCoupon2Line, RiDiscountPercentLine, RiHome6Line, RiMoneyDollarCircleLine, RiUserSettingsLine } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { TbCategory2, TbCategoryPlus, TbReportMoney, TbUsers } from "react-icons/tb";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LuCalendarClock } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { PiKeyThin } from "react-icons/pi";
import { PiUserListLight } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";

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
      name: 'My Account',
      icon: <CiUser className="bg-white text-[#B7B7B7] w-[32px] h-[32px] p-[7px] rounded-full" />,
      url: "/dashboard",
      // key: "readDashboard",
    },
    {
      name: 'My Profile',
      icon:  <CiUser className="bg-white text-[#B7B7B7] w-[32px] h-[32px] p-[7px] rounded-full" />,
      url: "/myprofile",
      // key: "readcustomer",
    },
    {
      name: 'My Orders',
      icon: <PiKeyThin className="bg-white text-[#B7B7B7] w-[32px] h-[32px] p-[7px] rounded-full" />,
      url: "/myorders",
      // key: "readcustomer",
    },
    
    {
      name: "My Subscription",
      icon: <PiUserListLight className="bg-white text-[#B7B7B7] w-[32px] h-[32px] p-[7px] rounded-full" />,
      url: "/subscription",
      // key: "readstaff",
    },
    {
      name: "My Goals",
      icon: <GoGoal className="bg-white text-[#B7B7B7] w-[32px] h-[32px] p-[7px] rounded-full" />,
      url: "/plan",
      // key: "readplan",
    },
    {
      name: "Change Password",
      icon: <CiLock className="bg-white text-[#B7B7B7] w-[32px] h-[32px] p-[7px] rounded-full" />,
      url: "/documenttype",
      // key: "readdocumenttype",
    },
    {
      name: "Logout",
      icon: <IoLogOutOutline  className="bg-white text-[#B7B7B7] w-[32px] h-[32px] p-[7px] rounded-full" />,
      url: "/Workspaces",
      // key: "readworkspaces",
    },
     
  ];

  return (
    <>
      <div
        className={` ${isOpen && styles.sm_sidebar}`}
        component="siderbar"
      >
        <ul className="space-y-2">
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
                                    "p-2.5 rounded-l-full flex items-center gap-[12px] text-sm font-normal text-[#000] hover:text-[#000] hover:bg-[#00000014] !no-underline transition-all " +
                                    (location?.pathname === itm.url &&
                                      " rounded_div !text-[#FEE4D0] !bg-[#828282] hover:!text-[#FEE4D0] !font-medium")
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
