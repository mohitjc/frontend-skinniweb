import React, { useEffect, useState } from "react";
import LineChart from "../../components/common/LineChart";
import DateRangePicker from "../../components/common/DateRangePicker";
import SelectDropdown from "../../components/common/SelectDropdown";
import Layout from "../../components/global/layout";
import HeatMap from "../../components/Charts/HeatMap";
import Table from "../../components/Table";
import datepipeModel from "../../models/datepipemodel";

const ClientProfile = () => {
  const [filters, setFilter] = useState({});
  const [total, seTotal] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  const getData = () => {};

  const clear = () => {
    let f = {
      startDate: "",
      endDate: "",
      platform: "",
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

  const Category = [
    { name: "XERO", id: "xero" },
    { name: "Quickbooks", id: "quickbooks" },
    { name: "MYOB", id: "myob" },
    { name: "Stripe", id: "stripe" },
    { name: "Paypal", id: "Paypal" },
  ];
  const columns = [
    {
      key: "date",
      name: "Month",
      sort: true,
      render: (row) => {
        return <span className="">{datepipeModel.date(row?.date)}</span>;
      },
    },
    {
      key: "amount",
      name: "Amount",
      sort: true,
      render: (row) => {
        return <span className="">{datepipeModel.date(row?.date)}</span>;
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Layout>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
         

          <a id="downloadFile"></a>

          <div className="flex"></div>
        </div>

        <div className="flex gap-2 mt-3">
          <SelectDropdown
            displayValue="name"
            className="ml-auto"
            placeholder="All Platform"
            intialValue={filters.platform}
            result={(e) => {
              filter({ platform: e.value });
            }}
            theme="search"
            options={Category}
          />
          <SelectDropdown
            id="statusDropdown"
            displayValue="name"
            placeholder="All Status"
            intialValue={filters.status}
            result={(e) => {
              filter({ status: e.value });
            }}
            theme="search"
            // options={shared.status}
          />
          <DateRangePicker
            value={{
              startDate: filters.startDate,
              endDate: filters.endDate,
            }}
            onChange={(e) => {
              filter({
                startDate: e.startDate,
                endDate: e.endDate,
              });
            }}
          />

          {filters.status || filters.startDate || filters.platform ? (
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
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
          client information
          </h5>
          {!loading ? (
            <>
              <div className="">
                <Table
                  className=""
                  data={data}
                  columns={columns}
                  page={filters.page}
                  count={filters.count}
                  filters={filters}
                  total={total}
                  result={(e) => {
                    // if (e.event == "page") pageChange(e.value);
                    // if (e.event == "sort") {
                    //   sorting(e.value);
                    //   sortClass(e.value);
                    // }
                    // if (e.event == "count") count(e.value);
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {loading ? (
            <div className="text-center py-4">
              <img src="/assets/img/loader.gif" className="pageLoader" />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
          Interaction history
          </h5>
          {!loading ? (
            <>
              <div className="">
                <Table
                  className=""
                  data={data}
                  columns={columns}
                  page={filters.page}
                  count={filters.count}
                  filters={filters}
                  total={total}
                  result={(e) => {
                    // if (e.event == "page") pageChange(e.value);
                    // if (e.event == "sort") {
                    //   sorting(e.value);
                    //   sortClass(e.value);
                    // }
                    // if (e.event == "count") count(e.value);
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {loading ? (
            <div className="text-center py-4">
              <img src="/assets/img/loader.gif" className="pageLoader" />
            </div>
          ) : (
            <></>
          )}
        </div>
    
      </Layout>
    </>
  );
};

export default ClientProfile;
