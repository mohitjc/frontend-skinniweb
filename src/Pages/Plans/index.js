import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import shared from "./shared";
import { useSelector } from "react-redux";

const Plans = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(true);
  const history = useNavigate();

  const getData = (p = {}) => {
    setLoader(true);
    let filter = { ...filters, ...p };

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
      groupId: "",
      search: "",
      status: "",
      page: 1,
      role: "",
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

  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };

  const edit = (id) => {
    history(`/${shared.url}/edit/${id}`);
  };

  const view = (id) => {
    let url = `/${shared.url}/detail/${id}`;
    history(url);
  };

  const isAllow = (key = "") => {
    let permissions = user?.permissions;
    let value = permissions?.[key];
    if (user.role == "admin") value = true;
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
        edit={edit}
        view={view}
        clear={clear}
        isAllow={isAllow}
        count={count}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        loaging={loaging}
        data={data}
        total={total}
        setData={setData}
        setTotal={setTotal}
      />
    </>
  );
};

export default Plans;
