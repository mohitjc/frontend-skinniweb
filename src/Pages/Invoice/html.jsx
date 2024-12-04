import React from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import Table from "../../components/Table";
import SelectDropdown from "../../components/common/SelectDropdown";
import shared from "./shared";
import moment from "moment";
import pipeModel from "../../models/pipeModel";
import DateRangePicker from "../../components/common/DateRangePicker";
const Html = ({
  sorting,
  filter,
  statusChange,
  pageChange,
  count,
  clear,
  filters,
  setFilter,
  loaging,
  data,
  changestatus,
  total = { total },
  sortClass,
}) => {
  const columns = [
    {
      key: "invoiceNumber",
      name: "Invoice Number",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.invoiceNumber}</span>;
      },
    },
    {
      key: "contact",
      name: "Contact",
      render: (row) => {
        return <span className="capitalize">{row?.contact?.Name}</span>;
      },
    },
    {
      key: "amountPaid",
      name: "Amount Paid",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{pipeModel.currency(row?.amountPaid)}</span>;
      },
    },
    {
      key: "amountDue",
      name: "Amount Due",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{pipeModel.currency(row?.amountDue)}</span>;
      },  
    },
    {
      key: "totalTax",
      name: "Total Tax",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{pipeModel.currency(row?.totalTax)}</span>;
      },
    },
    {
      key: "total",
      name: "Total Amount",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{pipeModel.currency(row?.total)}</span>;
      },
    },
    {
      key: "description",
      name: "Description",
      render: (row) => {
        return <span className="capitalize">{row?.lineItems?.[0]?.Description}</span>;
      },
    },
    {
      key: "dueDate",
      name: "Due Date",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{moment(row?.dueDate).format("DD-MM-YYYY")}</span>;
      },
    },
    {
      key: "paidDate",
      name: "Paid Date",
      sort: true,
      render: (row) => {
        return <span className="capitalize">{moment(row?.paidDate).format("DD-MM-YYYY")}</span>;
      },
    },
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

  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">
            {shared.title}
          </h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your {shared.title}
          </p>
        </div>

        <a id="downloadFile"></a>

       
      </div>

      <div className="shadow-box p-4 w-full bg-white rounded-lg mt-6">
        <div className="flex mb-3 p-4 items-center flex-wrap">
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
                startDate: filters.startDate,
                endDate: filters.endDate,
              }}
              onChange={e => {
                filter({
                  startDate: e.startDate,
                  endDate: e.endDate,
                })
              }}
            />
          
            {filters.status||filters.startDate||filters.search? (
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
