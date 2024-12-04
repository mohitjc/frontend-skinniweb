import React from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import SelectDropdown from "../../components/common/SelectDropdown";
import datepipeModel from "../../models/datepipemodel";
import shared from "./shared";
import { useSelector } from "react-redux";
import DateRangePicker from "../../components/common/DateRangePicker";
import { FiPlus } from "react-icons/fi";
const Html = ({
  Authorization,
  me,
  eventTypes,
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
  uploadFile,upcomingEvents, eventCount
}) => {
  const history=useNavigate()
  const user = useSelector((state) => state.user);
  const columns = [
    {
      key: "start_time",
      name: "Start",
      sort: true,
      render: (row) => {
        return <span className="">{datepipeModel.datetime(row?.start_time)}</span>;
      },
    },
    {
      key: "end_time",
      name: "End",
      render: (row) => {
        return <span className="">{datepipeModel.datetime(row?.end_time)}</span>;
      },
    },
    {
      key: "name",
      name: "Name",
      render: (row) => {
        return <span className="capitalize">{row?.name}</span>;
      },
    },
  ];

  const EventColumns = [
    {
      key: "start_time",
      name: "Start",
      sort: true,
      render: (row) => {
        return <span className="">{datepipeModel.datetime(row?.start_time)}</span>;
      },
    },
    {
      key: "end_time",
      name: "End",
      render: (row) => {
        return <span className="">{datepipeModel.datetime(row?.end_time)}</span>;
      },
    },
    {
      key: "meetingType",
      name: "Meeting type",
      render: (row) => {
        return <span className="capitalize">{row?.location?.type}</span>;
      },
    },
    {
      key: "meetingPlace",
      name: "Location",
      render: (row) => {
        return <span className="">{row?.location?.value}</span>;
      },
    },
    {
      key: "name",
      name: "Name",
      render: (row) => {
        return <span className="capitalize">{row?.event_type?.name}</span>;
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

        <div className="flex">
          {isAllow(`add${shared.check}`)&&Authorization? (
            <Link
              className="bg-primary leading-10 ms-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2"
              to={`/${shared.url}/schedule?scheduling_url=${me?.scheduling_url}`}
            >
              <FiPlus className="text-xl text-white" /> Schedule a Meeting
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>

      {Authorization?<>
      
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
                // required
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
              placeholder="All Event Types"
              intialValue={filters.eventType}
              result={(e) => {
                filter({
                  eventType:e.value,
                })
              }}
              theme="search"
              options={eventTypes}
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
          
            {filters.status||filters.eventType||filters.startDate||filters.platform? (
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
      <div className="shadow-box w-full bg-white rounded-lg mt-6 ">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827] py-4 px-4">
            Upcoming Events
          </h3>
        </div>
        {!loaging ? (
          <>
          <div className="px-4 pb-4">

          
            <Table
              className=""
              data={upcomingEvents}
              columns={EventColumns}
              page={filters.page}
              count={filters.count}
              filters={filters}
              total={eventCount}
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
      </>:<>
      <div className="shadow-box p-4 w-full h-full flex items-center justify-center bg-white rounded-lg mt-6">
      <div className="text-center">

        <h3 className="text-[42px] font-[600] text-[#0065FF] ">Easy scheduling ahead</h3>
        <p className="text-[14px] font-[300] text-[#585555] mt-3">Calendly is your scheduling automation platform for eliminating the back-and- <br></br>
        forth emails to find the perfect time and so much more.</p>
        <p className="mb-2 mt-3 text-[13px] font-[300] text-[#585555]">You are not connected to Calendly</p>
        <button onClick={()=>history('/api?tab=scheduling')} className=" set-bg bg-primary justify-center border mt-2 gap-x-1.5 rounded-md  px-3 py-2.5 text-sm font-normal text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Connect Calendly</button>
      </div>
      </div>
    
      </>}

    </Layout>
  );
};

export default Html;
