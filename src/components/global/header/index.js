import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Html from "./Html";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Pages/actions/user";

import { memo } from 'react';
import ApiClient from "../../../methods/api/apiClient";

const Header=memo(function Header ({ setIsOpen, isOpen }) {
  const user = useSelector((state) => state.user);
  const toggle = () => {
    setIsOpen(!isOpen);
    localStorage.setItem("sidebar", !isOpen);
  };
  const [isOpen1, setIsOpen1] = useState(false);
  let messagecount = localStorage.getItem("unreadMessages") || 0;
  const [messageCount, setUnreadMessagesCount] = useState(messagecount);
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loaging, setLoader] = useState(true);
  const [data, setData] = useState()

  const searchState = { data: "" };

  const Logout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:admin-app");
    localStorage.removeItem("token");
    // localStorage.removeItem("loginTime")
    history("/login");
  };


  useEffect(() => {
    window.scrollTo({ top: 0 });
    // if (searchState.data) {
    //   dispatch(search_success(''))
    // }
  }, []);

  useEffect(() => {
    setSearch(searchState.data);
  }, [searchState]);

  const [search, setSearch] = useState("");

  const searchHandle = (e) => {
    e.preventDefault();
    // dispatch(search_success(search))
  };

  const searchChange = (e) => {
    setSearch(e);
    if (!e) {
      // dispatch(search_success(''))
    }
  };

  const clear = () => {
    setSearch("");
    // dispatch(search_success(''))
  };

  const getData = (p = {}) => {
    setLoader(true);
    // let filter = { ...filters, ...p, email: user.email };

    ApiClient.allApi('site/detail', {id:1}).then((res) => {
      if (res.success) {
        // let data=res?.data?.map((itm) => {
        //   itm.id = itm._id;
        //   return itm;
        // })
        setData(res.data);
        // setTotal(res?.total||data.length);
      }
      setLoader(false);
    });
  };

  useEffect(() => {
getData()
  },[])
  return (
    <Html
      isOpen={isOpen}
      toggle={toggle}
      searchHandle={searchHandle}
      search={search}
      user={user}
      searchChange={searchChange}
      isOpen1={isOpen1}
      clear={clear}
      Logout={Logout}
      messageCount={messageCount}
      data={data}
    />
  );
});

export default Header;
