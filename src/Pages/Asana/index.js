import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useSelector } from "react-redux";
const Asana = () => {
  const user = useSelector((state) => state.user);
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
  const [data, setData] = useState([]);
  const [loaging, setLoader] = useState(false);
  const [worksapceData, setWorkspaceData] = useState();

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
    let filter = {
      workspaceId: worksapceData[0]?.id,
    };
    if (filter.eventType) filter.event_type = filter.eventType;
    if (filter.sortBy) filter.sort = filter.sortBy.replace(" ", ":");
    if (filter.startDate) {
      filter.min_start_time = new Date(filter.startDate).toUTCString();
      filter.max_start_time = new Date(filter.endDate).toUTCString();
    }
    loader(true);
    let url = "asana/projects";
    ApiClient.get(url, filter).then((res) => {
      if (res?.success) {
        setData(res.data);
      }
      loader(false);
    });
  };

  const clear = () => {
    let f = {
      startDate: "",
      endDate: "",
      platform: "",
      search: "",
      status: "",
      eventType: "",
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

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };

  const isAllow = (key = "") => {
    let permissions = user?.permissions;
    let value = permissions?.[key];
    // if(user.role=='admin') value=true
    return value;
  };

  const worksapce = () => {
    loader(true);
    ApiClient.get("asana/workspaces").then((res) => {
      loader(false);
      if (res.success) {
        let data = res?.data?.map((item) => {
          return {
            ...item,
            id: item.gid,
          };
        });
        setWorkspaceData(data);
      }
    });
  };

  useEffect(() => {
    worksapce();
  }, []);

  useEffect(() => {
    if (worksapceData) {
      getData();
    }
  }, [worksapceData]);

  return (
    <>
      <Html
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
        worksapceData={worksapceData}
      />
    </>
  );
};

export default Asana;
