import React from 'react'
import Table from '../../components/Table';

const Timeline = ({filters}) => {
  const columns = [
    {
      key: "task",
      name: "Task",
      render: (row) => {
        return <span className="capitalize">{row?.name}</span>;
      },
    },
    {
      key: "status",
      name: "Status",
      render: (row) => {
        return <span>{row?.totalActiveUsers}</span>;
      },
    },
    {
      key: "impact",
      name: "Business Impact",  
      render: (row) => {
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

export default Timeline
