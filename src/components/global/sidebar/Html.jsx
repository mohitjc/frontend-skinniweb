import { Disclosure, Transition } from "@headlessui/react";
import styles from "./index.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { CgInsights } from "react-icons/cg";
import { GrTransaction } from "react-icons/gr";
import { FaPaypal } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { SiCalendly, SiCivicrm, SiCoinmarketcap } from "react-icons/si";
import { FaHubspot } from "react-icons/fa";
import { SiZoho } from "react-icons/si";
import { LuArrowUpWideNarrow, LuUser2 } from "react-icons/lu";
import { VscFeedback } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrSquare } from "react-icons/gr";
import { SlSettings } from "react-icons/sl";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GoProjectRoadmap } from "react-icons/go";
import methodModel from "../../../methods/methods";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Pages/actions/user";
import { BsFileEarmarkText } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";

const Html = ({
  ListItemLink,
  tabclass,
  isAllow,
  route,
  isOpen,
  user,
  subscription
}) => {
  const location = useLocation();
  const sitedetail = useSelector((state) => state.sitedetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("gtoken");
    sessionStorage.removeItem('navvalue')
    navigate("/login");
  };
  const menus = [

    {
      name: "Dashboard",
      icon: (
        <LuLayoutDashboard className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <LuLayoutDashboard className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      url: "/dashboard",
      key: "readDashboard",
      isActive: subscription ? true : true,
    }, {
      name: "Business Forecast",
      icon: (
        <LuLayoutDashboard className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <LuLayoutDashboard className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      url: "/businessforcast",
      key: "readDashboard",
      isActive: subscription?.status === "active",
    },
  
    {
      name: "Financials",
      icon: (
        <CiMoneyCheck1 className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <CiMoneyCheck1 className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      key: "readfinancials",
      isActive: subscription?.status === "active",
      menu: [
        {
          name: "Revenue & Cash Flow",
          icon: (
            <CgInsights className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/revenuecashflow",
          key: "readfinancials",
        },
        {
          name: "Profit & Loss (P&L)",
          icon: (
            <GrTransaction className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/profit/loss",
          key: "readfinancials",
        },
        {
          name: "Accounts Receivable",
          icon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/accountreceivavble",
          key: "readfinancials",
        },
        {
          name: "Paypal Transactions",
          icon: (
            <FaPaypal className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/paypalTransaction",
          key: "readfinancials",
          detail: "paypal",
        },
        {
          name: "Square Transactions",
          icon: (
            <GrSquare className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/squareTransaction",
          key: "readfinancials",
          detail: "square",
        },
        {
          name: "XERO Transactions",
          icon: (
            <GrTransaction className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/transactions",
          key: "readfinancials",
          detail: "xero",
        },
        {
          name: "XERO Invoices",
          icon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          activeIcon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/invoice",
          key: "readfinancials",
          isActive: subscription?.status === "active",
          detail: "xero",
        },
        {
          name: "Quickbook Invoices",
          icon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          activeIcon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/quickbookinvoices",
          key: "readfinancials",
          isActive: subscription?.status === "active",
          detail: "qbo",
        },
      ],
    },
    {
      name: "Sales & CRM",
      icon: (
        <SiCivicrm className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <SiCivicrm className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      key: "readcrm",
      isActive: subscription?.status === "active",
      menu: [
        {
          name: "Sales Pipeline",
          icon: (
            <CgInsights className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/salespipeline",
          // key: "readaccounting",
        },
        {
          name: " Sales Team Performance",
          icon: (
            <GrTransaction className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/performance",
          // key: "readaccounting",
        },
        {
          name: "Client Engagement",
          icon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/clientengagement",
          // key: "readaccounting",
        },
        {
          name: "Calendly",
          icon: (
            <SiCalendly className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/calendly",
          key: "readscheduling",
          detail: "calendly",
        },
        {
          name: "Timely",
          icon: (
            <LuArrowUpWideNarrow className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/timely",
          key: "readscheduling",
          detail: "timely",
        },
        {
          name: "Hubspot",
          icon: (
            <FaHubspot className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/hubspot",
          key: "readcrm",
          detail: "hubspot",
        },
        {
          name: "Zoho",
          icon: (
            <SiZoho className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/zoho",
          key: "readcrm",
          detail: "zoho",
        },
      ],
    },
    {
      name: "Marketing",
      icon: (
        <SiCoinmarketcap className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <SiCoinmarketcap className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      key: "readmarketing",
      isActive: subscription?.status === "active",
      menu: [
        {
          name: "Marketing Performance",
          icon: (
            <CgInsights className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/marketingperformance",
          key: "readmarketing",
        },
        {
          name: " Customer Acquisition Cost (CAC)",
          icon: (
            <GrTransaction className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/customer-ac",
          key: "readmarketing",
        },
        {
          name: "Conversion Funnel",
          icon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/conversionfunnel",
          key: "readmarketing",
        },
        {
          name: "Google Analytics",
          icon: (
            <FaHubspot className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/marketing-analytics",
          key: "readmarketing",
          detail: "analytics",
        },
        {
          name: "Google Ad",
          icon: (
            <FaHubspot className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/googleAd",
          key: "readmarketing",
          // detail: "analytics",
        },
      ],
    },
    {
      name: "Projects & Productivity",
      icon: (
        <GoProjectRoadmap className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <GoProjectRoadmap className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      key: "readproductivity",
      isActive: subscription?.status === "active",
      menu: [
        {
          name: "Project Management",
          icon: (
            <CgInsights className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/management",
          key: "readproductivity",
        },
        {
          name: "Team Productivity",
          icon: (
            <GrTransaction className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/teamproductivity",
          key: "readproductivity",
        },
        {
          name: "Conversion Funnel",
          icon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/conversionfunnel",
          key: "readproductivity",
        },
        {
          name: "Asana",
          icon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/asana",
          key: "readproductivity",
        },
      ],
    },
    {
      name: "Clients & Engagement",
      icon: (
        <VscFeedback className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <VscFeedback className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      key: "readclient",
      isActive: subscription?.status === "active",
      menu: [
        {
          name: "Client Profiles",
          icon: (
            <CgInsights className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/clientprofile",
          key: "readclient",
        },
        {
          name: "Customer Feedback",
          icon: (
            <GrTransaction className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/customerfeedback",
          key: "readclient",
        },
        {
          name: "Engagement Metrics",
          icon: (
            <LiaFileInvoiceSolid className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/engagementmetrics",
          key: "readclient",
        },
      ],
    },
    {
      name: "Settings & Integrations",
      icon: (
        <SlSettings className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <SlSettings className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      key: "readintegration",
      isActive: subscription?.status === "active",
      menu: [
        {
          name: "User Roles",
          icon: (
            <FaRegUser className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/userroles",
          key: "readusersRole",
        },
        {
          name: "Users",
          icon: (
            <TbUsersGroup className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
          ),
          url: "/users",
          key: "readusers",
        },
        {
          name: "API Integration",
          icon: (
            <img
              src="/assets/img/dashboard.svg"
              alt=""
              className="w-[35px] h-[35px] rounded-full bg-white p-[6px]"
            />
          ),
          url: "/api",
          key: "readapiIntegration",
        },
      ],
    },
  ];
  const menusBottom = [
    {
      name: "Billing",
      icon: (
        <BsFileEarmarkText className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <BsFileEarmarkText className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      url: "/activeplan",
      key: "readbilling",
      isActive: subscription?.status === "active",
    },
    {
      name: "Profile",
      icon: (
        <LuUser2 className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <LuUser2 className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      url: "/profile",
      isActive: subscription ? true : true,
    },
    {
      name: "Logout",
      icon: (
        <IoLogOutOutline className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      activeIcon: (
        <IoLogOutOutline className="w-[35px] h-[35px] rounded-full bg-white p-[6px]" />
      ),
      onClick: Logout,
    },
  ];

  const handleClick = (menuitem) => {
  sessionStorage.setItem('navvalue', menuitem)
  }

  return (
    <>
      <div
        className={` h-full sidebar-padding ${
          isOpen && styles.sm_sidebar
        }`}
        component="siderbar"
      >
        <div className="flex flex-col justify-between gap-2 h-full">
          <div className="flex flex-col gap-6">

       
          <Link to="/" className="flex items-center px-4 pt-2">
            <img src={methodModel.noImg(sitedetail?.logo)} className="h-14 object-contain" />
          </Link>
          <ul className="space-y-1 ">
            {menus.map((itm) => {                               
              return (
                <>
                  {itm.icon ? (
                    <>
                      <li >
                        {user && user?.subRoleDetails?.id ? (
                          <>
                            {itm.menu ? (

                              <>
                                {isAllow(
                                  itm.menu.map((itm) => itm.key).toString()
                                ) ? (
                                  <>
                                    <Disclosure
                                      as="div"
                                      defaultOpen={tabclass(
                                        itm.menu
                                          .map((itm) => itm.url)
                                          .filter((itm) => itm)
                                      )}

                                    >
                                      {({ open }) => (
                                        <>
                                          <tooltip
                                            placement="right"
                                            title={itm.name}
                                          >
                                            <Disclosure.Button
                                              className={(isActive) =>
                                                "px-4 py-2 gap-4 rounded-md flex items-center border-bottom-[1px_solid_#80808024] w-full justify-between  text-sm font-normal text-[#333] hover:!text-[#0065FF] hover:bg-[#e5edfa] !no-underline transition-all " +
                                                (location?.pathname.includes(
                                                  itm.url
                                                ) &&
                                                  " !text-[#0065FF] !bg-[#e5edfa] !font-medium")
                                              }
                                            >
                                              <span className="text-sm fow-full  rounded-md flex items-center justify-between gap-[12px] transition-all duration-300nt-normal text-inherit flex items-center gap-[12px] crm ">
                                                {!open ? (
                                                  <>{itm?.icon}</>
                                                ) : (
                                                  <>{itm?.activeIcon}</>
                                                )}
                                                <span className="text-inherit text-nowrap	 leading-none sidebar_text">
                                                  {itm.name}
                                                </span>
                                              </span>
                                              <TiArrowSortedDown
                                                className={`${
                                                  open
                                                    ? ""
                                                    : "-rotate-90 transform"
                                                } h-3 w-3 transition-all duration-500`}
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
                                            <Disclosure.Panel className=" mt-[4px] ">
                                              <ul className="space-y-1">
                                                {itm.menu?.map((sitm) => {
                                                  return (
                                                    <>
                                                      {isAllow(
                                                        sitm.key,
                                                        sitm.detail
                                                      ) ? (
                                                        <li className="">
                                                          <NavLink
                                                            className={(
                                                              isActive
                                                            ) =>
                                                              "p-4 rounded-md block text-sm font-normal hover:!text-[#0065FF] hover:bg-[#e5edfa]  text-[#333] cursor-pointer !no-underline transition-all " +
                                                              (location?.pathname.includes(
                                                                sitm.url
                                                              ) &&
                                                                " !text-[#0065FF] !bg-[#e5edfa]  !font-medium")
                                                            }
                                                            to={sitm.url} onClick={() => handleClick(itm.name)}
                                                          >
                                                            <div className="flex items-center relative ">
                                                              {/* <span className="w-[7px] h-[7px] bg-[#596b77] rounded-full block absolute -left-[4px]"></span> */}
                                                              {sitm.icon}
                                                              <span
                                                                className="text-inherit leading-none sidebar_text ps-5"
                                                                title={
                                                                  sitm.name
                                                                }
                                                              >
                                                                {sitm.name}
                                                              </span>
                                                            </div>
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
                                      color="#0065FF"
                                      title={itm.name}
                                    >
                                      <NavLink
                                        to={itm.url} onClick={() => handleClick(itm.name)}
                                        className={(isActive) =>
                                          "px-4 py-2 gap-4 rounded-md flex items-center border-bottom-[1px_solid_#80808024] gap-[12px] text-sm font-normal text-[#333] hover:!text-[#0065FF] hover:bg-[#e5edfa] !no-underline transition-all " +
                                          (location?.pathname.includes(
                                            itm.url
                                          ) &&
                                            " !text-[#0065FF] !bg-[#e5edfa] !font-medium")
                                        }
                                      >
                                        {!location?.pathname.includes(
                                          itm.url
                                        ) ? (
                                          <>{itm.icon}</>
                                        ) : (
                                          <>{itm?.activeIcon}</>
                                        )}

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
                          </>
                        ) : (
                          <>
                            {itm.isActive === true && (
                              <>
                                {itm.menu ? (
                                  <>
                                    {isAllow(
                                      itm.menu.map((itm) => itm.key).toString()
                                    ) ? (
                                      <>
                                        <Disclosure
                                          as="div"
                                          defaultOpen={tabclass(
                                            itm.menu
                                              .map((itm) => itm.url)
                                              .filter((itm) => itm)
                                          )}
                                        >
                                          {({ open }) => (
                                            <>
                                              <tooltip
                                                placement="right"
                                                title={itm.name}
                                              >
                                                <Disclosure.Button
                                                  className={(isActive) =>
                                                    "px-4 py-2 rounded-md flex items-center w-full justify-between border-bottom-[1px_solid_#80808024]  text-sm font-normal text-[#333] hover:!text-[#0065FF] hover:bg-[#e5edfa] !no-underline transition-all " +
                                                    (location?.pathname.includes(
                                                      itm.url
                                                    ) &&
                                                      " !text-[#0065FF] !bg-[#e5edfa] !font-medium")
                                                  }
                                                >
                                                  <span className="text-sm fow-full  rounded-md flex items-center justify-between gap-[12px] transition-all duration-300nt-normal text-inherit flex items-center gap-[12px] crm ">
                                                    {!open ? (
                                                      <>{itm?.icon}</>
                                                    ) : (
                                                      <>{itm?.activeIcon}</>
                                                    )}
                                                    <span className="text-inherit text-nowrap	 leading-none sidebar_text">
                                                      {itm.name}
                                                    </span>
                                                  </span>
                                                  <TiArrowSortedDown
                                                    className={`${
                                                      open
                                                        ? ""
                                                        : "-rotate-90 transform"
                                                    } h-3 w-3 transition-all duration-500`}
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
                                                <Disclosure.Panel className=" mt-[4px] ">
                                                  <ul className="space-y-1">
                                                    {itm.menu?.map((sitm) => {
                                                    
                                                      return (
                                                        <>
                                                          {isAllow(
                                                            sitm.key,
                                                            sitm.detail
                                                          ) ? (
                                                            <li className="">
                                                              <NavLink   
                                                                className={(
                                                                  isActive
                                                                ) =>
                                                                  "p-4 rounded-md block text-sm hover:!text-[#0065FF] hover:bg-[#e5edfa] font-normal text-[#333] cursor-pointer !no-underline transition-all " +
                                                                  (location?.pathname.includes(
                                                                    sitm.url
                                                                  ) &&
                                                                    " !text-[#0065FF] !bg-[#e5edfa]  !font-medium")
                                                                }
                                                                to={sitm.url} onClick={() => handleClick(sitm.name)}
                                                              >
                                                                <div className="flex items-center relative " >
                                                                  {sitm.icon}
                                                                  <span
                                                                    className="text-[12px] leading-none  sidebar_text ps-5"
                                                                    title={
                                                                      sitm.name
                                                                    }
                                                                  >
                                                                    {sitm.name}
                                                                  </span>
                                                                </div>
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
                                          color="#0065FF"
                                          title={itm.name}
                                        >
                                          <NavLink 
                                            to={itm.url} onClick={() => handleClick(itm.name)}
                                            className={(isActive) =>
                                              "px-4 py-2 rounded-md flex items-center border-bottom-[1px_solid_#80808024] gap-[12px] text-sm font-normal text-[#333] hover:!text-[#0065FF] hover:bg-[#e5edfa] !no-underline transition-all " +
                                              (location?.pathname.includes(
                                                itm.url
                                              ) &&
                                                " !text-[#0065FF] !bg-[#e5edfa] !font-medium")
                                            }
                                          >
                                            {!location?.pathname.includes(
                                              itm.url
                                            ) ? (
                                              <>{itm.icon}</>
                                            ) : (
                                              <>{itm?.activeIcon}</>
                                            )}

                                            <span className="text-inherit leading-none sidebar_text" >
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
                              </>
                            )}
                          </>
                        )}
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <h6
                          className={`${
                            isOpen ? "py-[12px] " : "p-[12px]  text-md"
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
          <ul className="space-y-1 ">
            {menusBottom.map((itm) => {
              return (
                <>
                  {itm.name === "Logout" ? (
                    <li onClick={itm.onClick} className="cursor-pointer">
                      <tooltip placement="top" color="#0065FF" title={itm.name}>
                        <div className="px-4 py-2 gap-4 rounded-md flex items-center w-full text-sm font-normal text-[#333] hover:!text-[#0065FF] hover:bg-[#e5edfa] transition-all">
                          {itm.icon}
                          <span className="text-inherit leading-none sidebar_text">
                            {itm.name}
                          </span>
                        </div>
                      </tooltip>
                    </li>
                  ) : ( itm.isActive === true && (  
                    <li onClick={() => handleClick(itm.name)}>
                      <NavLink
                        to={itm.url} 
                        className={(isActive) =>
                          "px-4 py-2 gap-4 rounded-md flex items-center w-full text-sm font-normal text-[#333] hover:!text-[#0065FF] hover:bg-[#e5edfa] transition-all " +
                          (location?.pathname.includes(itm.url) &&
                            " !text-[#0065FF] !bg-[#e5edfa] !font-medium")
                        }
                      >
                        {!location?.pathname.includes(itm.url)
                          ? itm.icon
                          : itm.activeIcon}
                        <span className="text-inherit leading-none sidebar_text">
                          {itm.name}
                        </span>
                      </NavLink>
                    </li>
                  )
                  )}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Html;
