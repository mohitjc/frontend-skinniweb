import React from "react";
import { Link } from "react-router-dom";
import methodModel from "../../../methods/methods";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Sidebar from "../sidebar";
import { FiMenu, FiX } from "react-icons/fi";
import { LuLogOut, LuUser } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import {IoSettingsOutline } from "react-icons/io5";
import { GoLock } from "react-icons/go";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Html = ({
  isOpen,
  toggle,
  searchHandle,
  search,
  user,
  isOpen1,
  searchChange,
  clear,
  Logout,data, 
  messageCount,
}) => {
  return (
    <nav
      component="header"
      className={`${
        isOpen ? "min-sidebar w-[calc(100%-80px)]" : "w-100 "
      } shadow-btn py-1.5 bg-[#f8f9fa] border-b  fixed transition-[width] duration-300 ml-auto right-0 z-10 flex items-center !px-5
      `}
    >
      <div id="logoutBtn"
                      onClick={() => Logout()}></div>
      <button
        onClick={toggle}
        className="h-9 w-9 shrink-0 shadow-btn hover:shadow-none p-1 rounded-lg border border-gray-100 !text-primary"
      >
        {!isOpen ? (
          <FiMenu className="w-full h-full" />
        ) : (
          <FiX className="w-full h-full" />
        )}
      </button>

      <div className="flex items-center gap-4 ml-auto">
      {/* {data && data.logo && (
              <img src={methodModel.noImg(data?.logo)} width="120" />
            )} */}
        <Menu as="div" className="relative">
          <div>
            {/* <div>{data.logo}</div> */}
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 ">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                    alt="image"
                    src={methodModel.userImg(user.image)}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-2 text-left">
                    <b className="capitalize">{user.fullName}</b>
                    <p className="grayCls mb-0 text-capitalize">
                      {user.role?.name}
                    </p>
                  </div>
                </div>
                <i
                  className="fa fa-angle-down top-1 relative h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm flex items-center gap-2"
                      )}
                    >
                      <LuUser /> Profile
                    </Link>
                  )}
                </Menu.Item>
                {/* <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/dashboard"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm flex align-center flex items-center gap-2"
                      )}
                    >
                      <RxDashboard /> Dashboard
                    </Link>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile/change-password"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm flex items-center gap-2"
                      )}
                    >
                      <GoLock />

                      Change Password
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item className="divide-y-1 divide-gray-800 pt-1  mt-2">
                  <p className="border-t"></p>
                </Menu.Item>

                <Menu.Item className="">
                  {({ active }) => (
                    <span
                      onClick={() => Logout()}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm ancortag flex items-center gap-2 cursor-pointer"
                      )}
                    >
                      <LuLogOut /> Logout
                    </span>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      {isOpen1 ? (
        <div className="w-100 mobi-dropdown">
          <Sidebar />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Html;
