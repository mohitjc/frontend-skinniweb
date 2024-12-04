import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import Table from "../../components/Table";
import SelectDropdown from "../../components/common/SelectDropdown";
import datepipeModel from "../../models/datepipemodel";
import shared from "./shared";
import ApiClient from "../../methods/api/apiClient";
import { useSelector } from "react-redux";
import pipeModel from "../../models/pipeModel";
import DateRangePicker from "../../components/common/DateRangePicker";
import Swal from "sweetalert2";
import loader from "../../methods/loader";
const QuickTransaction = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };


  const [filters, setFilter] = useState({ page: 1, count: 10, search: '',  start_date: "",
    end_date: ""});
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(true);
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
    const accessToken = user.connectionsDetails.filter((item) => (item.type === "quickbook"||item.type === "quickbooks"||item.type=='qbo')&&item.connected).map((item) => item.accessToken).pop();
    let filter = {token: accessToken, ...filters,...p, startposition:1 , company:user.quickBookCompanyId};  

    setLoader(true);
    ApiClient.post('quickbook/invoicelist', filter).then((res) => {
      if (res.success) {
        setData(
          res.data?.transaction_details?.map((itm) => {  
            return itm;
          })
        );
        setTotal(res.data?.total_items);
      } 
      setLoader(false);
    });
  };

  const clear = () => {
    let f = {
      start_date: "",
      end_date: "",
      platform: "",
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

  const statusChange = (itm) => {
    if (!isAllow(`edit${shared.check}`)) return;
    let status = "active";
    if (itm.status == "active") status = "deactive";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${
        status == "active" ? "Activate" : "Inactivate"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0065FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        loader(true);
        ApiClient.put(shared.statusApi, { id: itm.id, status }).then((res) => {
          if (res.success) {
            getData();
          }
          loader(false);
        });
      }
    });
  };

  const isAllow = (key = "") => {
    let permissions = user?.permissions;
    let value = permissions?.[key];
    if (user.role == "admin") value = true;
    return value;
  };

  useEffect(() => {
    if (user && user.loggedIn ) {
      setFilter({ ...filters, search: searchState.data });
      getData({ search: searchState.data, page: 1 });
    }
  }, []);



  const columns = [
    {
      key: "dateString",
      name: "Date",
      render: (row) => {
        return <span className="">{datepipeModel.date(row?.transaction_info?.transaction_updated_date)}</span>;
      },
    },
    {
      key: "subject",
      name: "Transaction Subject",
      render: (row) => {
        return <span className="capitalize">{row?.transaction_info?.transaction_subject || "--"}</span>;
      },
    },
    {
      key: "name",
      name: "payer Name",
      render: (row) => {
        return (
          <span className="">{row?.payer_info?.payer_name?.alternate_full_name || "--"}</span>
        );
      },
    },

    {
      key: "total",
      name: "Spend",
      render: (row) => {
        return (
          <span className="">
            { pipeModel.currency(row?.transaction_info?.transaction_amount?.value)}
          </span>
        );
      },
    },
    {
      key: "total",
      name: "Available Balance",
      render: (row) => {
        return (
          <span className="">
            { pipeModel.currency(row?.transaction_info?.available_balance?.value)}
          </span>
        );
      },
    },
    {
      key: "total",
      name: "Ending Balance",
      render: (row) => {
        return (
          <span className="">
            { pipeModel.currency(row?.transaction_info?.ending_balance?.value)}
          </span>
        );
      },
    },
    {
      key: "total",
      name: "Reference ID ",
      render: (row) => {
        return (
          <span className="">
            {(row?.transaction_info?.paypal_reference_id) || "--"}
          </span>
        );
      },
    },
    {
      key: "date",
      name: "Status",
      render: (row) => {
        return (
          <span className="">
            <div onClick={() => statusChange(row)}>
              {row.status === "AUTHORISED" ? (
                <span className="bg-[#ECF4EF] w-fit text-xs !px-3 h-[30px] flex items-center justify-center border !border-[#94D5AE] text-[#11A74D] !rounded-large">
                  {row.transaction_info?.transaction_status}
                </span>
              ) : (
                <>
                  {row.status === "DELETED" ? (
                    <sapn className="bg-[#FDE9EA] w-fit text-xs !px-3 h-[30px] flex items-center justify-center border !border-[#E9253129] text-[#E92531] !rounded-large">
                      {row.transaction_info?.transaction_status}
                    </sapn>
                  ) : (
                    <>
                      <span className="bg-primary/20 w-fit text-xs !px-3 h-[30px] flex items-center justify-center border !border-primary/40 !text-primary !rounded-large">
                        {row.transaction_info?.transaction_status}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </span>
        );
      },
    },
  ];


  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">
            Invoices
          </h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your Invoices
          </p>
        </div>

        <a id="downloadFile"></a>

        <div className="flex">
          {isAllow(`add${shared.check}`) ? (
            <Link
              className="bg-primary leading-10 ms-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
              to={`/${shared.url}/add`}
            >
              <FiPlus className="text-xl text-white" /> Add {shared.addTitle}
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="shadow-box w-full bg-white rounded-lg mt-6">
        <div className="flex p-4 items-center flex-wrap">
          <form
            class="flex items-center max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              filter();
            }}
          >
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <input
                type="text"
                id="simple-search"
                value={filters.search}
                onChange={(e) => {
                  setFilter({ ...filters, search: e.target.value });
                }}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-[#0065FF]block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 pr-10"
                placeholder="Search"
              />
              {filters?.search && (
                <i
                  className="fa fa-times absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                  aria-hidden="true"
                  onClick={(e) => clear()}
                ></i>
              )}
            </div>
            <button
              type="submit"
              class="p-2.5 m-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-[#0065FF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search</span>
            </button>
          </form>

          <div className="flex gap-2 ml-auto">
            <SelectDropdown
              id="statusDropdown"
              displayValue="name"
              placeholder="All Status"
              intialValue={filters.status}
              result={(e) => {
                changestatus(e.value);
              }}
              theme="search"
              options={shared.status}
            />
            <DateRangePicker
              value={{
                startDate: filters.start_date,
                endDate: filters.end_date,
              }}
              onChange={(e) => {
                filter({
                  start_date: e.startDate,
                  end_date: e.endDate,
                });
              }}
            />

            {filters.status || filters.start_date || filters.platform ? (
              <>
                <button
                  className="bg-[#8080808a] leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg"
                  onClick={() => clear()}
                >
                  Reset
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {!loaging ? (
          <>
            <div className="px-4 pb-4">
              <Table
                className=""
                data={data}
                columns={columns}
                page={filters.page}
                count={filters.count}
                filters={filters}
                total={total}
                result={(e) => {
                  if (e.event == "page") pageChange(e.value);
                  if (e.event == "sort") {
                    sorting(e.value);
                    sortClass(e.value);
                  }
                  if (e.event == "count") count(e.value);
                }}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {loaging ? (
          <div className="text-center py-4">
            <img src="/assets/img/loader.gif" className="pageLoader" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default QuickTransaction;
