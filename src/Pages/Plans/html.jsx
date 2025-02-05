import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import moment from "moment";
import { Dialog } from "@headlessui/react";
import { IoCloseSharp } from "react-icons/io5";
import loader from "../../methods/loader";
import PageLayout from "../../components/sidebarglobal/layout";

const Html = ({
 
  filters,

  total = { total },
  
  setTotal,
}) => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loaging, setLoader] = useState(true);
  const [activePlan, setActivePlan] = useState();
  const [interval, setInterval] = useState(1);
  const [activeTrial, setActiveTrial] = useState({});

  const [isOpenPlan, setIsOpenPlan] = useState(false);
  const history = useNavigate();
  

  const getActivePlan = () => {
    document.getElementById("getActivePlan")?.click()
    ApiClient.get("subscription/active/subscription").then((res) => {
      if (res.success) {
        setActivePlan(res.data);
        
      } else {
        loader(false);
        setActivePlan();

      }
    });
  };
  const handleOK = () => {
    history("/login");
  };

  const getData = (p = {}) => {
   
    let filter = { ...filters, ...p, isDeleted: false, status: "active" };
    ApiClient.get("plan/listing", filter).then((res) => {
      if (res.success) {
        setData(res?.data);
        setTotal(res.total);
      }
      loader(false);
      setLoader(false);
    });
  };


  const getPrice = (pricing = [], selectedItem) => {
    if (selectedItem?.discountOption === "yes") {
      const ext = pricing?.find((itm) => itm.interval_count == interval);
      return ext?.discount_amount || 0;
    } else {
      const ext = pricing?.find((itm) => itm.interval_count == interval);
      return ext?.unit_amount || 0;
    }
  };


  const closeaPlanPopup = () => {
    setIsOpenPlan(false);
  };
  

  const getButton = (item) => {
    if (!activePlan && item?.trialPeriod) {
      return {
        text: activeTrial[item.id]
          ? "Cancel Your Trial Period"
          : "Start Your Trial Period",
        disabled: false,
      };
    }
    if (!activePlan) return { text: "Join as a Starter", disabled: false };

    const activePlanPricing = activePlan?.planData?.pricing?.find(
      (itm) => itm?.isActive
    );
    const currentPlanPrice = activePlanPricing
      ? activePlanPricing.discountOption === "yes"
        ? activePlanPricing.discount_amount
        : activePlanPricing.unit_amount
      : 0;

    const planPricing = item?.pricing?.find(
      (itm) => itm?.interval_count === interval
    );
    const planPrice = planPricing
      ? planPricing.discountOption === "yes"
        ? planPricing.discount_amount
        : planPricing.unit_amount
      : 0;

    let buttonText = "Join as a Starter";
    let isDisabled = false;

    if (item?.id === activePlan?.planData?.id) {
      if (
        activePlan?.planData?.pricing?.some(
          (itm) => itm?.interval_count === interval && itm?.isActive
        )
      ) {
        buttonText = "Cancel Plan";
      } else {
        buttonText = currentPlanPrice >= planPrice ? "Buy Now" : "Upgrade Plan";
        isDisabled = currentPlanPrice >= planPrice;
      }
    } else {
      buttonText = currentPlanPrice >= planPrice ? "Buy Now" : "Upgrade Plan";
      isDisabled = currentPlanPrice >= planPrice;
    }

    if (buttonText === "Buy Now"){
      isDisabled = true;
    }

    return { text: buttonText, disabled: isDisabled };
  };

  const loadTrialsFromLocalStorage = () => {
    const trials = localStorage.getItem('activeTrial');
    return trials ? JSON.parse(trials) : {};
  };

 
  const subscribeNow = (selectedItem, text) => {

    const amount = getPrice(selectedItem.pricing, selectedItem);
    if (text === "Cancel Plan") {
      loader(true);
      ApiClient.delete(
        `subscription/cancel?userId=${user?._id || user?.id}&planId=${
          selectedItem._id || selectedItem?.id
        }`
      ).then((res) => {
        if (res.success) {
          getActivePlan();
        }
        loader(false);
      });
    } else if (text === "Buy Now") {
      let payload = {
        planId: selectedItem.id,
        amount: amount,
        intervalCount: interval,
        interval: "month",
        type: "buy",
      };
      loader(true);
      ApiClient.post("subscription/pay", payload).then((res) => {
        if (res.success) {
          toast.success(res?.message);
          getActivePlan();
          window.location.assign(res?.data?.url);
        }
        loader(false);
      });
    } else if (text === "Upgrade Plan") {
      let paylod = {
        planId: selectedItem.id,
        intervalCount: interval,
      };
      loader(true);
      ApiClient.put("subscription/update", paylod).then((res) => {
        if (res.success) {
         
          getActivePlan();
        }
        loader(false);
      });
    } else if (text === "Start Your Trial Period") {
      let payload = {
        planId: selectedItem.id,
        amount: amount,
        intervalCount: interval,
        interval: "month",
        type: "buy",
      };
      loader(true);
      ApiClient.post("subscription/pay", payload).then((res) => {
        if (res.success) {
          toast.success(res?.message);
          getActivePlan();
          window.location.assign(res?.data?.url);
        }
        loader(false);
      });
    } else if (text === "Cancel Your Trial Period") {
      loader(true);
      ApiClient.delete(
        `subscription/cancel?userId=${user?._id || user?.id}&planId=${
          selectedItem._id || selectedItem?.id
        }`
      ).then((res) => {
        if (res.success) {
          getActivePlan();
        }
        loader(false);
      });
    } else {
      let payload = {
        planId: selectedItem.id,
        amount: amount,
        intervalCount: interval,
        interval: "month",
        type: "buy",
      };
      loader(true);
      ApiClient.post("subscription/pay", payload).then((res) => {
        if (res.success) {
          window.location.assign(res?.data?.url);
          toast.success(res?.message);
          getActivePlan();
        }
        loader(false);
      });
    }
  };
  useEffect(() => {
    const trials = loadTrialsFromLocalStorage();
    setActiveTrial(trials);
  }, []);

  

  const activeMonth =
    activePlan?.planData?.pricing?.find((itm) => itm?.isActive)
      ?.interval_count || 0;

  useEffect(() => {
    getActivePlan();
    getData();

    if (activeMonth === 12) {
      setInterval(12);
    } else if (activeMonth === 3) {
      setInterval(3);
    } else if (activeMonth === 6) {
      setInterval(6);
    } else {
      setInterval(1);
    }
  }, [activeMonth]);

  const renderDiscounts = (pricing, selectedItem) => {
    if (selectedItem?.discountOption === "yes") {
      const ext = pricing?.find((itm) => itm.interval_count == interval);
      return ext?.unit_amount || 0;
    }
  };

  return (
    <PageLayout>

{/* <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
<div className="bg-[#FFF2E861] py-5 px-5 ">
<div className="">
  <h3>Choose Plan That’s Right For You</h3>
  <div className="grid grid-cols-3 mt-4">
    <div className="rounded-[12px] bg-[#fff] shadow-[0px_3.301px_11.553px_0px_rgba(28,_66,_161,_0.04)] px-4 py-10 border-t-2 border-[#828282]">
      <div className="">
        <div className="">
        <h3 className="text-[23px] font-[700] text-[#575451]">Basic</h3>
        <p className="text-[#8690AB] text-[13px] font-[400]">Starting at</p>
        </div>
<div className="mt-3">
<h2><span>$</span>19,500 <span>/year</span></h2>
<p>Annual Subscription</p>
</div>

<button>Get Price Estimate</button>
      </div>
    </div>
  </div>
</div>
</div>
</div> */}


      {/* <div className=" p-10">
        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8 mb-10">
          <div className="mx-auto max-w-2xl lg:max-w-4xl mb-8">
            <h2 className="text-[28px] font-[600] leading-8 text-[#0065FF] dark:text-teal-400 mb-3">
              Pricing
            </h2>
            <p className="text-gray-500">
              Lorem ipsum has been the industry's standard dummy text ever since
              , when an unknown <br /> printer took a galley of type and
              scrambled.
            </p>
         
          </div>
          <div>
            <h1></h1>
          </div>
          <div className="flex gap-2 justify-center mt-4">
            <button
              className={`px-[13px] py-[4px] text-[13px] rounded ${
                interval == 1 ? "bg-[#0065FF] text-white" : "bg-gray-200"
              }`}
              onClick={() => setInterval(1)}
            >
              Monthly
            </button>
            <button
              className={`px-[13px] py-[4px] text-[13px] rounded ${
                interval == 3 ? "bg-[#0065FF] text-white" : "bg-gray-200"
              }`}
              onClick={() => setInterval(3)}
            >
              Quaterly
            </button>
            <button
              className={`px-[13px] py-[4px] text-[13px] rounded ${
                interval == 6 ? "bg-[#0065FF] text-white" : "bg-gray-200"
              }`}
              onClick={() => setInterval(6)}
            >
              Half Yearly
            </button>
            <button
              className={`px-[13px] py-[4px] text-[13px] rounded ${
                interval == 12 ? "bg-[#0065FF] text-white" : "bg-gray-200"
              }`}
              onClick={() => setInterval(12)}
            >
              Yearly
            </button>
          </div>
        </div>
        {loaging ? (
          <>
            <div className="text-center">
              Loading... <i className="fa fa-spinner fa-spin"></i>
            </div>
          </>
        ) : (
          <>
          <div className="container">
            <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto 2xl:grid-cols-4 ">
              {data.map((item) => {
                const startDate = item.start_date
                  ? moment(item.start_date)
                  : null;
                const endDate = item.end_date ? moment(item.end_date) : null;
                const today = moment();

                const shouldDisplay =
                  (!startDate && !endDate) ||
                  (startDate &&
                    endDate &&
                    (startDate.isSame(today, "day") ||
                      today.isAfter(startDate)) &&
                    endDate.isAfter(today)) ||
                  (startDate && startDate.isSame(today, "day"));

                if (!shouldDisplay) return null;

                const buttonInfo = getButton(item);

                return (
                  <Fragment key={item._id}>
                    <div
                      className={`border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200 ${
                        buttonInfo.text === "Cancel Plan" ||
                        activeTrial[item.id]
                          ? "scale-105 border-[#0065FF]"
                          : ""
                      } transform transition-transform duration-300 hover:border-[#0065FF] hover:scale-105`}
                    >
                      <div className="p-6 flex flex-col">
                        <h2
                          className={`text-xl leading-6 flex-grow font-bold text-slate-900 md:h-20 xl:h-14 capitalize`}
                        >
                          {item.internalName}
                        </h2>
                        <p
                          className={`mt-2 text-[14px] text-slate-700 leading-tight`}
                        >
                          For new makers who want to fine-tune and test an idea.
                        </p>
                        <div className="mt-3">
                          {activePlan?.status !== "active" &&
                          item.trialPeriod ? (
                            <>
                              <p>Trail Period</p>
                              <p>{item.trialPeriod} Days</p>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <p className="mt-3">
                          <span
                            className={`flex gap-1 text-3xl font-bold text-slate-900 tracking-tighter`}
                          >
                            <span> AUD </span>{" "}
                            {renderDiscounts(item.pricing, item) ? (
                              <p className="text-[18px] font-[300] text-slate-500 line-through">
                                {renderDiscounts(item.pricing, item)}
                              </p>
                            ) : (
                              <></>
                            )}{" "}
                            <span className="text-[#0065FF]">
                              {getPrice(item.pricing, item)}
                            </span>
                            <span
                              className={`text-[14px] font-medium text-slate-500`}
                            >
                              /
                              {(interval === 12 && "Year") ||
                                (interval === 1 && "Month") ||
                                (interval === 6 && "Half year")}{" "}
                              {interval === 3 && "Quater"}
                            </span>
                          </span>
                        </p>

                        <button
                          className={`mt-2 block w-full rounded-md py-2 text-sm font-semibold text-center ${
                            buttonInfo.text === "Cancel Plan" ||
                            buttonInfo.text === "Cancel Your Trial Period"
                              ? "bg-red-600 text-white"
                              : "bg-[#0065FF] text-white"
                          }`}
                          onClick={() => subscribeNow(item, buttonInfo.text)}
                          disabled={buttonInfo.disabled}
                        >
                          {buttonInfo.text}
                        </button>

                        {buttonInfo.text === "Cancel Plan" && (
                          <div
                            className={`text-center my-2 ${
                              buttonInfo.text === "Cancel Plan"
                                ? "text-[#454242]"
                                : "text-white"
                            }`}
                          >
                            Valid Upto:{" "}
                            {moment(activePlan?.validUntil ? activePlan?.validUntil : activePlan?.trialPeriodEndDate).format(
                              "DD MMM, YYYY"
                            )}
                          </div>
                        )}
                      </div>
                      <div className="pt-6 pb-8 px-6">
                        <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                          What's included
                        </h3>
                        <ul
                          role="list"
                          className="mt-4 space-y-3 scrolling_data h-72 pr-2 overflow-y-auto"
                        >
                          {item.features.map((itm) => (
                            <>
                              <li className="flex space-x-3" key={itm}>
                                <FaCheck
                                  className={`text-md shrink-0 mt-1 ${
                                    getButton(item) === "Cancel Plan"
                                      ? "text-gray-800"
                                      : "text-primary"
                                  }`}
                                />
                                <span className={``}>{itm.name}</span>
                              </li>
                              <p className="text-[14px] text-slate-700">
                                {itm.description}
                              </p>
                            </>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            </div>
            {data?.length === 0 && <div className="text-center">No Plans</div>}
          </>
        )}
      </div>
      <Dialog
        open={isOpenPlan}
        onClose={() => closeaPlanPopup()}
        as={Fragment}
        className="relative z-10"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6">
              <h3 className="text-lg flex justify-end font-medium text-gray-900">
                <IoCloseSharp
                  className="cursor-pointer"
                  onClick={() => closeaPlanPopup()}
                />
              </h3>

              <div className="gap-4">
                <div className="imgs_dats shrink-0 ">
                  <img
                    src="assets/img/logins.png"
                    alt=""
                    className="h-24 mb-4 object-contain mx-auto"
                  />
                </div>
                <div className="text-center">
                  <p className="text-lg px-6 font-semibold text-center">
                    Please log in to your account to purchase a plan.
                  </p>
                  <div className="mt-6 flex items-center justify-center">
                    <button
                      onClick={handleOK}
                      className="w-full !w-20 rounded-md bg-[#0065FF] px-4 py-2 text-[#0065FF] hover:opacity-80"
                    >
                      Ok
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm">
                      If you don’t have an account, don’t worry! Please{" "}
                      <Link to="/register" className="font-medium">
                        sign up
                      </Link>{" "}
                      here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog> */}
    </PageLayout>
  );
};

export default Html;
