import React, { useEffect, useState } from "react";
import LineChart from "../../components/common/LineChart";
import DateRangePicker from "../../components/common/DateRangePicker";
import SelectDropdown from "../../components/common/SelectDropdown";
import Layout from "../../components/global/layout";
import BarChart from "../../components/common/BarChart";
const AccountsReceivable = () => {
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
          <div className="">
            <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Top Clients by Revenue 
            </h5>
          </div>
          <div className="col-span-12 md:col-span-12  p-4">
            <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
              <BarChart
                legends={[
                  { label: "Revenue", key: "revenue" },
                ]}
                data={[
                  { project1: 10, project2: 3, date: "2020-12-04" },
                  { project1: 23, project2: 25, date: "2020-12-04" },
                  { project1: 12, project2: 43, date: "2020-12-04" },
                  { project1: 67, project2: 23, date: "2020-12-04" },
                  { project1: 65, project2: 27, date: "2020-12-04" },
                ]}
                stack
              />
            </div>
          </div>
        </div>
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <div className="">
            <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
              Aging Report
            </h5>
          </div>
          <div className="col-span-12 md:col-span-12  p-4">
            <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
              <LineChart
                // legends={[{ label: "Margin", key: "margin" }]}
                data={[
                  { count: 10, date: "2020-12-04" },
                  { count: 13, date: "2020-12-04" },
                  { count: 40, date: "2020-12-04" },
                  { count: 45, date: "2020-12-04" },
                  { count: 30, date: "2020-12-04" },
                  { count: 20, date: "2020-12-04" },
                ]}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AccountsReceivable;
