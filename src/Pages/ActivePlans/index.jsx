import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import moment from "moment";

const ActivePlans = () => {
  const user = useSelector((state) => state.user);
  const [activePlan, setActivePlan] = useState("");
  const [interval, setInterval] = useState(1);

  const getActivePlan = () => {
    loader(true);
    ApiClient.get("subscription/active/subscription").then((res) => {
      if (res.success) {
        setActivePlan(res.data);
        const countInterval = activePlan.planData?.pricing?.map(
          (item) => item?.interval_count
        );
        if (countInterval) {
          setInterval(countInterval);
        }
      } else {
        setActivePlan(null);
      }
      loader(false);
    });
  };
  useEffect(() => {
    getActivePlan();
  }, []);
  return (
    <div>
      <div className="wrapper_section mt-5">
        {activePlan?.status === "active" ? (
          <>
            <div className="inner_part sm:mt-3 md:mt-3  overflow-hidden rounded-lg    ">
              <div className="grid grid-cols-12 shadow-box bg-white">
                <div className="col-span-7 xl:col-span-8 py-8 p-5">
                  <h2 className="flex gap-x-2 text-[28px] font-[600] mb-6">
                    {activePlan.planData?.internalName}
                    <span className="">
                      {activePlan.intervalCount === 1 && "(Monthly)"}
                    </span>
                    <span className="">
                      {activePlan.intervalCount === 3 && "(Quaterly)"}
                    </span>
                    <span className="">
                      {activePlan.intervalCount === 6 && "(Half Yearly)"}
                    </span>
                    <span className="">
                      {activePlan.intervalCount === 12 && "(Yearly)"}
                    </span>
                  </h2>
                  <div className="flex gap-5 items-center">
                    <h3 className="text-[#167523] text-[14px] font-[500] whitespace-nowrap">
                      YOUR PLAN INCLUDES
                    </h3>
                    <span className="h-[1px] bg-[#e2e2e2] w-full"></span>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-8">
                    {activePlan.feature &&
                      activePlan.feature?.map((item) => (
                        <>
                          <div className=" flex ">
                            <div>
                              <IoIosCheckmarkCircle className="text-[#0065FF] mr-3  text-[20px]" />
                            </div>
                            <div className="">
                              <p className="text-[14px] font-[600]">
                                {item.name}
                              </p>
                              <p className="text-[14px] text-[grey]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
                <div className="col-span-5 xl:col-span-4 bg-[#f8f9fa] py-8 p-5">
                  <p className="text-center text-[22px] font-[500] leading-[25px]">
                    Next Payment occurs after
                  </p>
                  <p className="text-center text-[22px] font-[500]">
                    {activePlan.validUntil
                      ? moment(activePlan.validUntil).format("DD-MM-YYYY")
                      : moment(activePlan.trialPeriodEndDate).format(
                          "DD-MM-YYYY"
                        )}
                  </p>
                  <div className="text-[34px] font-[800] text-center mt-8">
                    AUD {(activePlan.amount / 100).toFixed(0)}
                    <span className="text-[#8a8a8a] text-[20px] font-[500]">
                      {activePlan.intervalCount === 1 && "/Monthly"}
                    </span>
                    <span className="text-[#8a8a8a] text-[20px] font-[500]">
                      {activePlan.intervalCount === 3 && "/Quaterly"}
                    </span>
                    <span className="text-[#8a8a8a] text-[20px] font-[500]">
                      {activePlan.intervalCount === 6 && "/Half Yearly"}
                    </span>
                    <span className="text-[#8a8a8a] text-[20px] font-[500]">
                      {activePlan.intervalCount === 12 && "/Yearly"}
                    </span>
                  </div>
                  <Link to="/plan">
                    <button className="text-white bg-[#0065FF] px-5 py-2 w-full rounded-lg hover:opacity-[90%] mt-8">
                      Change Plan
                    </button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
                <div className="p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Payment Method
                  </h2>
                  <div className="rounded-lg mb-4">
                    <p className="text-sm font-medium text-gray-600">
                      Card Information
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-800 font-medium">MasterCard</p>
                        <p className="text-gray-500">•••• •••• ••••</p>
                        <p className="text-gray-800 font-semibold">4252</p>
                      </div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                        alt="MasterCard Logo"
                        className="w-10 h-6"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg">
                    <p className="text-sm font-medium text-gray-600">
                      Expiry Date
                    </p>
                    <p className="text-gray-800 font-semibold mt-1">12/27</p>
                  </div>
                </div>

                <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Billing Details
                  </h2>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Next billing date</p>
                    <p className="text-sm font-medium text-gray-800 mt-2">
                    {activePlan.validUntil
                      ? moment(activePlan.validUntil).format("DD-MM-YYYY")
                      : moment(activePlan.trialPeriodEndDate).format(
                          "DD-MM-YYYY"
                        )}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Billing address</p>
                    <p className="text-sm font-medium text-gray-800 mt-2">
                      {user?.companyAddress ? user?.companyAddress : "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="h-[500px] flex items-center justify-center">
              No Active Plan
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivePlans;
