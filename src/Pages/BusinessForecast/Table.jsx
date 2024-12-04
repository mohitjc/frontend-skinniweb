import React, { useState } from 'react'
import Table from "../../components/Table";
const TableBusiness = ({filters}) => {
const [laoding, setLoading] = useState(false)
    const columns = [
        {
          key: "name",
          name: "Jan",
          // sort: true,
          render: (row) => {
            return <span className="capitalize">{row?.name}</span>;
          },
        },
        {
          key: "user",
          name: "Feb",
          // sort: true,
          render: (row) => {
            // const totalMetrics = row?.metrics.reduce((acc, metric) => acc + metric, 0);
            return <span>{row?.totalActiveUsers}</span>;
          },
        },
        {
          key: "percent",
          name: "mar",
          // sort: true,
          render: (row) => {
            // const totalMetrics = row?.metrics.reduce((acc, metric) => acc + metric, 0);
            return <span>{row?.activeUserPercentage}</span>;
          },
        },
        {
            key: "percent",
            name: "Apr",
            // sort: true,
            render: (row) => {
              // const totalMetrics = row?.metrics.reduce((acc, metric) => acc + metric, 0);
              return <span>{row?.activeUserPercentage}</span>;
            },
          },
          {
            key: "percent",
            name: "May",
            // sort: true,
            render: (row) => {
              // const totalMetrics = row?.metrics.reduce((acc, metric) => acc + metric, 0);
              return <span>{row?.activeUserPercentage}</span>;
            },
          },
      ];
  return (
    <div>
      <div className="shadow-box  w-full bg-white rounded-lg mt-6">
         
              <div className="">
                <Table
                  className=""
                  data={[]}
                  columns={columns}
                  page={1}
                  count={filters.count}
                  filters={filters}
                  total={0}
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
        </div>
    </div>
  )
}

export default TableBusiness
