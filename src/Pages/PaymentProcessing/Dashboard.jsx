import { useEffect, useState } from "react";
import Layout from "../../components/global/layout"
import SelectDropdown from "../../components/common/SelectDropdown";
import shared from "./shared";
import DateRangePicker from "../../components/common/DateRangePicker";
import pipeModel from "../../models/pipeModel";
import datepipeModel from "../../models/datepipemodel";
import LineChart from "../../components/common/LineChart";

const Badge = ({ label }) => {
    const isLifetimeData = label.toLowerCase()?.includes('life time');
  
    return (
      <div
        className="h-[26px] px-2.5 flex gap-1.5 justify-center items-center !rounded-large w-fit"
        style={{
          backgroundColor: isLifetimeData ? '#dff4d5' : '#DDE9FF', // Darker shade of blue for lifetime data
          border: `1px solid ${isLifetimeData ? 'rgba(57,124,246,0.10)' : 'rgba(57,124,246,0.10)'}`,
        }}
      >
        <div
          className="2xl:w-1.5 2xl:h-1.5 w-[5px] h-[5px] shrink-0"
          style={{ backgroundColor: isLifetimeData ? '#7cc15b' : '#397CF6' }} // Same shade of blue for the dot
        />
        <p className="text-typo text-sm font-normal line-clamp-1">{label}</p>
      </div>
    );
  };

  const StatsCount = ({ name, value}) => {
    return <>
      <div className="p-[16px] flex flex-col gap-8 rounded-md  bg-white shadow-box border !border-grey">
        <Badge label={name} />
        <div className="">
          <h2 className="text-typo text-2xl font-medium">
            {value}
          </h2>
        </div>
      </div>
    </>
  }

const TransactionDashboard=()=>{
    const [filters, setFilter] = useState({  });
    const [total, seTotal] = useState(0)
    const [data, setData] = useState([])


    const getData=()=>{
    }

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

      const platforms=[
        {name:'XERO',id:'xero'},
        {name:'Quickbooks',id:'quickbooks'}
      ]


    const invoiceCounts = [
        {
            name: "Invoice Raised",
            value: pipeModel.currency(0),
        },
        {
            name: "Invoice Paid",
            value:pipeModel.currency(0),
        },
        {
            name: "Balance Owing",
            value: pipeModel.currency(0),
        },
    ]

    const transactionCounts = [
      {
          name: "Voided",
          value: pipeModel.currency(0),
      },
      {
          name: "Paid",
          value:pipeModel.currency(0),
      },
      {
          name: "Authorized",
          value: pipeModel.currency(0),
      },
      {
        name: "Deleted",
        value: pipeModel.currency(0),
    },
  ]


    const revenueCount=[
        {
         name: "Sales",
         value: pipeModel.currency(0),
        },
        {
          name: "Bookings",
          value: pipeModel.currency(0),
        },
        {
          name: "AOV",
          value: pipeModel.currency(0),
        },
        {
          name: "Commissions Paid",
          value: pipeModel.currency(0),
        },
        {
          name: "Ops Costs",
          value: pipeModel.currency(0),
        },
        {
          name: "Total Costs",
          value: pipeModel.currency(0),
        },
        {
          name: "Profit/Loss",
          value: pipeModel.currency(0),
        },
        {
          name: "% of tours - Profit",
          value: pipeModel.currency(0),
        },
        {
          name: "% of tours - Breakeven",
          value: pipeModel.currency(0),
        },
        {
          name: "% of tours - Loss",
          value: pipeModel.currency(0),
        },
        {
          name: "Cost of Acquisition (Agent) ",
          value: pipeModel.currency(0),
        },
        {
          name: "Cost of Acquisition (Direct)",
          value: pipeModel.currency(0),
        },
        {
          name: "Cost of Acquisition - Affiliate ",
          value: pipeModel.currency(0),
        },
        {
          name: "Direct v/s Agent Bookings (%)",
          value: pipeModel.currency(0),
        },
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
          key: "booking",
          name: "Booking",
          // sort: true,
          render: (row) => {
            return <span className="capitalize">{pipeModel.number(row?.booking)}</span>;
          },
        },
        {
          key: "sales",
          name: "Sales",
          // sort: true,
          render: (row) => {
            return <span className="">{pipeModel.currency(row?.sales)}</span>;
          },
        },
        {
            key: "commission",
            name: "Commission",
            // sort: true,
            render: (row) => {
              return <span className="">{pipeModel.currency(row?.commission)}</span>;
            },
          },
          {
            key: "costs",
            name: "Costs",
            // sort: true,
            render: (row) => {
              return <span className="">{pipeModel.currency(row?.costs)}</span>;
            },
          },
          {
            key: "total_costs",
            name: "Total Costs",
            // sort: true,
            render: (row) => {
              return <span className="">{pipeModel.currency(row?.total_costs)}</span>;
            },
          },
          {
            key: "profit_loss",
            name: "Profit/Loss",
            // sort: true,
            render: (row) => {
              return <span className="">{pipeModel.number(row?.profit_loss)}</span>;
            },
          },
          {
            key: "label",
            name: "Label",
            // sort: true,
            render: (row) => {
              return <span className="">{row?.label}</span>;
            },
          },
      ];

      
    useEffect(() => {
      getData()
    },[])
    return <>
        <Layout>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">
            {" "}
            Transaction Insights
          </h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your Transaction Insights
          </p>
        </div>

        <a id="downloadFile"></a>

        <div className="flex">
        </div>
      </div>

      <div className="flex gap-2 mt-3">
          <SelectDropdown
              displayValue="name"
              className="ml-auto"
              placeholder="All Platform"
              intialValue={filters.platform}
              result={(e) => {
                filter({platform:e.value})
              }}
              theme="search"
              options={platforms}
            />
            <SelectDropdown
              id="statusDropdown"
              displayValue="name"
              placeholder="All Status"
              intialValue={filters.status}
              result={(e) => {
                filter({status:e.value})
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

          <div className="shadow-box  w-full bg-white rounded-lg mt-6">
            <div className=" ">
              <h6 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">Invoices</h6>
            </div>
            <div className="p-4">
              <div className="grid xl:grid-cols-4 grid-cols-2 !gap-4">
                {invoiceCounts.map((item, index) => (
                  <StatsCount
                   name={item.name}
                   value={item.value}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="shadow-box  w-full bg-white rounded-lg mt-6">
            <div className=" ">
              <h6 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">Transactions</h6>
            </div>
            <div className="p-4">
              <div className="grid xl:grid-cols-4 grid-cols-2 !gap-4">
                {transactionCounts.map((item, index) => (
                  <StatsCount
                   name={item.name}
                   value={item.value}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <div className="">
                  <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">Transactions</h5>
                
                </div>
          <div className="col-span-12 md:col-span-12  p-4">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
              
                 <LineChart
                  legends={[
                    {label:'Transactions',key:'count'},
                    // {label:'Total Amount',key:'totalAmount'},
                  ]}
                  data={[
                    {count:10,date:'2020-12-04'},
                    {count:13,date:'2020-12-04'},
                    {count:40,date:'2020-12-04'},
                    {count:45,date:'2020-12-04'},
                    {count:30,date:'2020-12-04'},
                    {count:20,date:'2020-12-04'},
                  ]}
                />
              </div>
            </div>
          </div>
         <div className="shadow-box  w-full bg-white rounded-lg mt-6">
         <div className="">
                  <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">Transaction Amount</h5>
                
                </div>
         <div className="col-span-12 md:col-span-12  p-4">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
              
                 <LineChart
                  legends={[
                    {label:'Transaction Amount',key:'count'},
                    // {label:'Total Amount',key:'totalAmount'},
                  ]}
                  data={[
                    {count:10,date:'2020-12-04'},
                    {count:13,date:'2020-12-04'},
                    {count:40,date:'2020-12-04'},
                    {count:45,date:'2020-12-04'},
                    {count:30,date:'2020-12-04'},
                    {count:20,date:'2020-12-04'},
                  ]}
                />
              </div>
            </div>
         </div>
           
        </Layout>
    </>
}

export default TransactionDashboard