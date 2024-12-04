import React from "react";
import LineChart from "../../components/common/LineChart";

const Graph = () => {
  return (
    <div>
      <div className="shadow-box  w-full bg-white rounded-lg mt-6">
        <div className="">
          <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Revenue And Cash Flow
          </h5>
        </div>
        <div className="col-span-12 md:col-span-12  p-4">
          <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
            <LineChart
              // legends={[{ label: "Margin", key: "margin" }]}
              data={[
                // { count: 10, date: "2020-12-04" },
                // { count: 13, date: "2020-12-04" },
                // { count: 40, date: "2020-12-04" },
                // { count: 45, date: "2020-12-04" },
                // { count: 30, date: "2020-12-04" },
                // { count: 20, date: "2020-12-04" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
