import React, { useEffect, useState } from "react";
import LineChart from "../../components/common/LineChart";
import DateRangePicker from "../../components/common/DateRangePicker";
import SelectDropdown from "../../components/common/SelectDropdown";
import Layout from "../../components/global/layout";
import HeatMap from "../../components/Charts/HeatMap";
import PieChart from "../../components/Charts/Piechart";
const Badge = ({ label }) => {
  const isLifetimeData = label?.toLowerCase()?.includes("life time");

  return (
    <div
      className="h-[26px] px-2.5 flex gap-1.5 justify-center items-center !rounded-large w-fit"
      style={{
        backgroundColor: isLifetimeData ? "#dff4d5" : "#DDE9FF", 
        border: `1px solid ${
          isLifetimeData ? "rgba(57,124,246,0.10)" : "rgba(57,124,246,0.10)"
        }`,
      }}
    >
      <div
        className="2xl:w-1.5 2xl:h-1.5 w-[5px] h-[5px] shrink-0"
        style={{ backgroundColor: isLifetimeData ? "#7cc15b" : "#397CF6" }} 
      />
      <p className="text-typo text-sm font-normal line-clamp-1">{label}</p>
    </div>
  );
};

const StatsCount = ({ name, value }) => {
  return (
    <>
      <div className="p-[16px] flex flex-col gap-8 rounded-md  bg-white shadow-box border !border-grey">
        <Badge label={name} />
        <div className="">
          <h2 className="text-typo text-2xl font-medium">{value}</h2>
        </div>
      </div>
    </>
  );
};
const MarketingPerformace = () => {
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
  const metricHeader = [
    {
      name: "Impressions ",
      value: 0,
    },
    {
      name: "Clicks",
      value: 0,
    },
    {
      name: "Conversions",
      value: 0,
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

        <div className="p-4">
            <div className="grid xl:grid-cols-4 grid-cols-2 !gap-4">
              {metricHeader?.map((item, index) => (
                <StatsCount
                  name={item.name}
                  value={item.value ? item.value : 0}
                />
              ))}
            </div>
          </div>
          <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <div className="">
            <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Traffic Sources
            </h5>
          </div>
          <div className="col-span-12 md:col-span-12  p-4">
            <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
            <PieChart
                  title="Invoice Status"
                //   data={ pieData && pieData.length > 0 ?
                //     pieData?.map((item) => ({
                //     value: item.value ,
                //     name: item.label,
                //   }))
                //   : ("")
                // }
                />
            </div>
          </div>
        </div>
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <div className="">
            <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            ROI Analysis
            </h5>
          </div>
          <div className="col-span-12 md:col-span-12  p-4">
            <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
              <LineChart
                legends={[{ label: "Response Times", key: "time" }]}
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

export default MarketingPerformace;
