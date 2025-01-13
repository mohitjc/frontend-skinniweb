import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Html from "./Html";
import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import ApiClient from "../../../methods/api/apiClient";
import { login_success, logout } from "../../../Pages/actions/user";

const Header = memo(function Header({ setIsOpen, isOpen ,t}) {
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

  const searchState = { data: "" };

  const Logout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:admin-app");
    localStorage.removeItem("token");
    history("/login");
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
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
  useEffect(() => {
    if (user?._id || user?.id) {
      ApiClient.get(`user/details`, { id: user?._id || user?.id }).then(
        (res) => {
          if (res.success) {
            dispatch(login_success({ ...user, ...res.data }));
          }
        }
      );
    }
  }, []);
  useEffect(() => {
    if (user?.status === "deactive") {
      Logout();
    }
  }, []);
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
      t={t}
      messageCount={messageCount}
    />
  );
});

export default Header;
