import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import shared from "./shared";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const Blogs = () => {
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
    let filter = { ...filters, ...p,  };


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

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0065FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.delete(shared.deleteApi, { id: id }).then((res) => {
          if (res.success) {
            clear();
          }
          loader(false);
        }); 
      }
    });
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    getData({ ...filters, count: e });
  };
 


  const view = (id) => {
    let url = `/${shared.url}/detail/${id}`;
    history(url);
  };

  const isAllow = (key = "") => {
    let permissions = user?.permissions?.[0];
    let value = permissions?.[key];
    if(user.role?.name=='Admin') value=true
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
        deleteItem={deleteItem}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        loaging={loaging}
        data={data}
        total={total}
        setData={setData}
        setLoader={setLoader}
      />
    </>
  );
};

export default Blogs;
