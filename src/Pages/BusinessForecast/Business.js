import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import DateRangePicker from "../../components/common/DateRangePicker";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Graph from "./Graph";
import Timeline from "./Timeline";
import TableBusiness from "./Table";
import { FaDollarSign, FaArrowDown, FaArrowUp } from 'react-icons/fa';


const BusinessForecast = () => {
  const [filters, setFilter] = useState({});
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

  useEffect(() => {
    getData();
  }, []);

  const tabs = ["Graph", "Table", "Timeline"];



  return (
    <div>
      <Layout>
       
        <TabGroup>
          <TabList className=" w-full flex gap-4 items-center justify-between">
            <div className=" flex gap-6 items-center border-b-2 border-gray-200">
            {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              ` focus:outline-none py-2  ${
                selected
                  ? "border-b-2 border-primary font-medium"
                  : " text-gray-700"
              }`
            }
          >
            {tab}
          </Tab>
        ))}
              
                {/* <Tab className="">Graph</Tab>
                <Tab className="">Table</Tab>
                <Tab className="">Timeline</Tab> */}
            </div>


            <div className="flex gap-2 items-center ">
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


          </TabList>
          <div className="mt-5">
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
   <div className="border border-gray-200 bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300 ease-in-out">
     <div className="flex items-center space-x-4">
       <div className="p-3 bg-green-100 rounded-full">
         <FaDollarSign className="text-3xl text-green-500" />
       </div>
       <div>
         <span className="block text-2xl font-semibold">Revenue</span>
         <div className="flex text-sm font-medium text-gray-500">
           <span>last 14 days</span>
         </div>
       </div>
     </div>
   </div>

   <div className="border border-gray-200 bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300 ease-in-out">
     <div className="flex items-center space-x-4">
       <div className="p-3 bg-red-100 rounded-full">
         <FaArrowDown className="text-3xl text-red-500" />
       </div>
       <div>
         <span className="block text-2xl font-semibold">Expenses</span>
         <div className="flex text-sm font-medium text-gray-500">
           <span>last 14 days</span>
         </div>
       </div>
     </div>
   </div>

   <div className="border border-gray-200 bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300 ease-in-out">
     <div className="flex items-center space-x-4">
       <div className="p-3 bg-blue-100 rounded-full">
         <FaArrowUp className="text-3xl text-blue-500" />
       </div>
       <div>
         <span className="block text-2xl font-semibold">Profit</span>
         <div className="flex text-sm font-medium text-gray-500">
           <span>last 14 days</span>
         </div>
       </div>
     </div>
   </div>
 </div>
         </div>
          <TabPanels className="mt-6">
            <TabPanel>


           


              <Graph />
            </TabPanel>
            <TabPanel>
              <TableBusiness filters={filters}/>
            </TabPanel>
            <TabPanel>
              <Timeline filters={filters}/>
            </TabPanel>
          </TabPanels>
          
        </TabGroup>
      </Layout>
    </div>
  );
};

export default BusinessForecast;
