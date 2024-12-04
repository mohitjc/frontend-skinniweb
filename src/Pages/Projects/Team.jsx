import { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import DateRangePicker from "../../components/common/DateRangePicker";
import datepipeModel from "../../models/datepipemodel";
import LineChart from "../../components/common/LineChart";
import PieChart from "../../components/Charts/Piechart";

const TeamProductivity = () => {
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
    { name: "Employment Hero", id: "employment" },
    { name: "Calendly", id: "calendly" },
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
         
          <div className="col-span-12 md:col-span-12  p-4">
            <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
            <div className="">
            <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Time Allocation
            </h5>
          </div>
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
         
          <div className="col-span-12 md:col-span-12  p-4">
            <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
            <div className="">
            <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Task Completion Rates 
            </h5>
          </div>
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

export default TeamProductivity;
