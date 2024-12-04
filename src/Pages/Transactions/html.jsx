import React  from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import { Link } from "react-router-dom";
import {FiPlus } from "react-icons/fi";
import Table from "../../components/Table";
import SelectDropdown from "../../components/common/SelectDropdown";
import datepipeModel from "../../models/datepipemodel";
import shared from "./shared";
import pipeModel from "../../models/pipeModel";
import DateRangePicker from "../../components/common/DateRangePicker";
const Html = ({
  sorting,
  filter,
  edit,
  view,
  statusChange,
  pageChange,
  count,
  deleteItem,
  clear,
  filters,
  setFilter,
  loaging,
  data,
  changestatus,
  isAllow,
  total = { total },
  sortClass,
  getRolesData,
  uploadFile,
}) => {
  const columns = [
    {
      key: "dateString",
      name: "Date",
      sort: true,
      render: (row) => {
        return <span className="">{datepipeModel.date(row?.dateString)}</span>;
      },
    },
    {
      key: "contact",
      name: "Contact Name",
      // sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.contact?.Name}</span>;
      },
    },
    {
      key: "date",
      name: "Description",
      // sort: true,
      render: (row) => {
        return <span className="">{row?.lineItems?.[0]?.Description || "--"}</span>;
      },
    },
    {
      key: "reference",
      name: "Invoice Number",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.reference}</span>;
      },
    },
    {
      key: "bankAccountName",
      name: "Account",
      // sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.bankAccount?.Name||row?.bankAccountName}</span>;
      },
    },
    {
      key: "total",
      name: "Spend",
      sort: true,
      render: (row) => {
        return <span className="">
           {row?.type == "SPEND" ? pipeModel.currency(row?.total) : "--"}
        </span>;
      },
    },
    {
      key: "total",
      name: "Received",
      sort: true,
      render: (row) => {
        return <span className="">
          {row?.type == "RECEIVE" ? pipeModel.currency(row?.total) : "--"}
        </span>;
      },
    },
    {
      key: "totalTax",
      name: "Tax",
      sort: true,
      render: (row) => {
        return <span className="">{pipeModel.currency(row?.totalTax)}</span>;
      },
    },
    // {
    //   key: "date",
    //   name: "Balance",
    //   sort: true,
    //   render: (row) => {
    //     return <span className="capitalize">{row?.name}</span>;
    //   },
    // },
    {
      key: "date",
      name: "Status",
      sort: true,
      render: (row) => {
        return <span className="">
          <div onClick={() => statusChange(row)}>
            {row.status === "AUTHORISED" ? (
              <span className="bg-[#ECF4EF] w-fit text-xs !px-3 h-[30px] flex items-center justify-center border !border-[#94D5AE] text-[#11A74D] !rounded-large">
                {row.status}
              </span>
            ) : (
              <>
                {row.status === "DELETED" ? (
                  <sapn className="bg-[#FDE9EA] w-fit text-xs !px-3 h-[30px] flex items-center justify-center border !border-[#E9253129] text-[#E92531] !rounded-large">
                    {row.status}
                  </sapn>
                ) : (
                  <>
                    <span className="bg-primary/20 w-fit text-xs !px-3 h-[30px] flex items-center justify-center border !border-primary/40 !text-primary !rounded-large">
                      {row.status}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </span>;
      },
    },
  ];
const platforms=[
  {name:'XERO',id:'xero'},
  {name:'Quickbooks',id:'quickbooks'}
]

  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">
            {" "}
            {shared.title}
          </h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your {shared.title}
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
              startDate:filters.startDate,
              endDate:filters.endDate,
            }}
            onChange={e=>{
              filter({
                startDate:e.startDate,
                endDate:e.endDate,
              })
            }}
            />
          
            {filters.status||filters.startDate||filters.platform? (
              <>
                <button
                  className="bg-primary leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg"
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

export default Html;
