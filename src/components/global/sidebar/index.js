import React from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import Html from "./Html";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen}) => {
  const user = useSelector((state) => state.user);
  const subscription = useSelector((state) => state?.subscription);
  const history = useNavigate();

  const ListItemLink = ({ to, type = "link", disabled = false, ...rest  }) => {
    let url = window.location.href;
    const host = window.location.host;
    url = url.split(host)[1];
    return (
      <>
        {type == "link" ? (
          <li
            className={`nav-item ${url.includes(to) ? "active" : ""} ${
              disabled ? "disabled" : ""
            }`}
          >
            <Link to={to} {...rest} className=""/>
          </li>
        ) : (
          <li
            className={`nav-item main ${url.includes(to) ? "active" : ""}`}
            {...rest}
          ></li>
        )}
      </>
    );
  };

  const tabclass = (tab) => {
    let url = window.location.href;
    let value = false;
    tab?.map((itm) => {
      if (url.includes(itm)) value = true;
    });
    return value;
  };


  const isAllow = (url = "", url2 = "") => {
    const permissions = user?.subRoleDetails?.permissions || {};
    let value = true; 
  
    if (user?.subRoleDetails?.id) {
      if (url) {
        let arr = url.split(",").map(item => item.trim());
        for (let itm of arr) {
          if (permissions[itm] === false) {
            value = false;  
            break;  
          }
        }
      }
    } else {
      value = true; 
    }
  
    if (value !== false && url2) {
      const hasConnection = user?.connectionsDetails?.some(
        (detail) => detail.type === url2 && detail.connected === true
      );
      if (!hasConnection) {
        value = false;
      }
    }
  
    return value;
  };
  
  

  const route = (p) => {
    history(p);
  };


  return (
    <>
      <Html
        user={user}
        subscription={subscription}
        route={route}
        tabclass={tabclass}
        isAllow={isAllow}
        ListItemLink={ListItemLink}
        isOpen={isOpen}
      />
    </>
  );
};

export default Sidebar;
