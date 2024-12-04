import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import shared from "./shared";
import { useSelector } from "react-redux";
import { encryptUrlData } from "../../models/crptoUtils";
const Billing = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(true);
  const history = useNavigate();

  const sortClass = (key) => {
    let cls = "fa-sort";
    if (filters.key == key && filters.sorder == "asc") cls = "fa-sort-up";
    else if (filters.key == key && filters.sorder == "desc")
      cls = "fa-sort-down";
    return "fa " + cls;
  };

  const sorting = (key) => {
    let sorder = "asc";
    if (filters.key == key) {
      if (filters.sorder == "asc") {
        sorder = "desc";
      } else {
        sorder = "asc";
      }
    }

    let sortBy = `${key} ${sorder}`;
    setFilter({ ...filters, sortBy, key, sorder });
    getData({ sortBy, key, sorder });
  };

  const getData = (p = {}) => {
    setLoader(true);
    let filter = { userId: user.id, ...filters, ...p };
    ApiClient.get(shared.listApi, filter).then((res) => {
      if (res.success) {
        setData(
          res.data.map((itm) => {
            return itm;
          })
        );
        setTotal(res.total);
      }
      setLoader(false);
    });
  };

  const clear = () => {
    let f = {
      type: "",
      search: "",
      status: "",
      page: 1,
    };
    setFilter({ ...filters, ...f });
    getData({ ...f });
  };

  const filter = (p = {}) => {
    let f = {
      page: 1,
      ...p,
    };
    setFilter({ ...filters, ...f });
    getData({ ...f });
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };
  const changestatus = (e) => {
    setFilter({ ...filters, status: e, page: 1 });
    getData({ status: e, page: 1 });
  };

  const getRolesData = (id) => {
    setFilter({ ...filters, role: id, page: 1 });
    getData({ role: id, page: 1 });
  };

  const view = (id) => {
    const selectedItem = encryptUrlData(id)
    let url = `/${shared.url}/${selectedItem}`;
    history(url);
  };

  const isAllow = (key = "") => {
    let permissions = user?.permissions;
    let value = permissions?.[key];
    if (user.subRoleDetails?.id) value = true;
    return value;
  };

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data });
      getData({ search: searchState.data, page: 1 });
    }
  }, []);

  return (
    <>
      <Html
        view={view}
        clear={clear}
        sortClass={sortClass}
        sorting={sorting}
        isAllow={isAllow}
        count={count}
        pageChange={pageChange}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        loaging={loaging}
        data={data}
        total={total}
        changestatus={changestatus}
        getRolesData={getRolesData}
      />
    </>
  );
};

export default Billing;
