
import React, {  useState } from 'react'
import Layout from '../../components/global/layout'
import { HiOutlineSearch } from 'react-icons/hi'
import FormControl from '../../components/common/FormControl'
import {useSelector } from 'react-redux'
import loader from '../../methods/loader'
import ApiClient from '../../methods/api/apiClient'
import LineChart from '../../components/common/LineChart'
import PieChart from '../../components/Charts/Piechart'
import BarChart from '../../components/common/BarChart'
import HorizontalLineGraph from '../../components/Charts/HorizontalChart'
import Table from '../../components/Table'
const Badge = ({ label }) => {
  const isLifetimeData = label?.toLowerCase()?.includes('life time');

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
        style={{ backgroundColor: isLifetimeData ? '#7cc15b' : '#397CF6' }} 
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
const FacebookAds = () => {
  const user = useSelector((state) => state.user);


  const [filters, setFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [data, setData] = useState([]);

  const getData = (p = {}, selectedValue) => {
    loader(true);
    let filter = { ...filters, ...p};  
    ApiClient.get("", filter).then((res) => {
      if (res.success) {
        setData(
         res?.data
        );
      }
      loader(false);
    });
  };

 
  const filter = (p = {}) => {
    setFilter({ ...filters, ...p });
    getData(p);
  };

  const clear = () => {
    let p = {
      startDate: "",
      endDate: "",
      status: "",
    };
    filter(p);
  };


 
  const columns = [
    {
      key: "name",
      name: "Name",
      render: (row) => {
        return <span className="capitalize">{row?.name}</span>;
      },
    },
    {
      key: "user",
      name: "Users",
      render: (row) => {
        return <span>{row?.totalActiveUsers}</span>;
      },
    },
    {
      key: "percent",
      name: "%",
      render: (row) => {
        return <span>{row?.activeUserPercentage}</span>;
      },
    },
    
  ];



 
  return (
    <div>
      <Layout>
      <div className="flex flex-wrap justify-between items-center gap-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#111827]">
 
            Ad Performance
          </h3>
          <p class="text-sm font-normal text-[#75757A]">
            Here you can see all about your  Facebook Ad's
          </p>
        </div>

        <a id="downloadFile"></a>

        <div className="flex">
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-3">
      <FormControl
                type="select"
               placeholder="select"
                className="reset-cross"
                theme="search"
                crossIcon={true}
                
              />
          
       
          
          </div>
          <div className="shadow-box  w-full bg-white rounded-lg mt-6">
            <div className="flex justify-between items-center px-[20px] py-[18px] ">
              <h6 className="text-typo text-lg font-semibold"></h6>
            </div>
            <div className="!px-4 !pb-4">
              <div className="grid xl:grid-cols-4 grid-cols-2 !gap-4">
             
                
           

              </div>
            </div>
          </div>
        <div className="shadow-box border border-grey bg-white rounded-large w-full mb-6">
          <div className="flex justify-between gap-4 items-center p-5">
            <div className="">
              <h1 className="text-typo text-lg font-semibold">
                Account Overview
              </h1>
              <div className="flex gap-2 items-center">
              
                <p className="text-sm font-medium text-[#6B7280]">
                </p>
              </div>
            </div>
           
          </div>
          <LineChart
          legends={[{ label: "People taking action", key: "people" }]}
          data={[
            { people: 10,  date: "Feb 1" } ,
            { people: 7,  date: "Feb 3" }  , 
            { people: 3,  date: "Feb 6" } ,               
            { people: 7,  date: "Feb 8" }  , 
            { people: 4,  date: "Feb 15" }  , 
            { people: 8,  date: "Feb 22" }   ,
            { people: 5,  date: "Feb 21" } ,  { people: 9,  date: "Feb 27" }   
          ]}
          stack />
        </div>
        <div className="grid xl:grid-cols-2 gap-7 mb-6">
          <div className="shadow-box border border-grey bg-white rounded-large w-full">
            <div className="flex justify-between gap-4 items-center p-5">
              <h1 className="text-typo text-lg font-semibold">Gender</h1>
            </div>
            <PieChart
                  data={ [{ value: 3, name: "Male", date: "" }, { value: 3, name: "Female", date: "" }]
                }
                />
          </div>
          <div className="shadow-box border border-grey bg-white rounded-large w-full">
            <h1 className="text-typo text-lg font-semibold p-4">Age</h1>
            <LineChart
          legends={[{ label: "Age", key: "age" }]}
          data={[
            { age: 10,  date: "Feb 1" } ,
            { age: 7,  date: "Feb 3" }  , 
         
          ]}
          stack />
          </div>
        </div>
        <div className="grid xl:grid-cols-2 gap-7 mb-6">
          <div className="shadow-box border border-grey bg-white rounded-large w-full">
            <div className="flex justify-between gap-4 items-center p-5">
              <h1 className="text-typo text-lg font-semibold">
                Followers by Country
              </h1>
            </div>
            <BarChart
                  legends={[
                    { label: "Australia", key: "australia" },
                    { label: "India", key: "india" },
                  ]}
                  data={[
                    { australia: 10, india: 3, date: "2020-12-04" },
                    { australia: 23, india: 25, date: "2020-12-04" },
                    { australia: 12, india: 43, date: "2020-12-04" },
                    { australia: 67, india: 23, date: "2020-12-04" },
                  ]}
                  stack
                />
          </div>
          <div className="shadow-box border border-grey bg-white rounded-large w-full">
            <div className="flex justify-between gap-4 items-center p-5">
              <h1 className="text-typo text-lg font-semibold">
                Followers by City
              </h1>
              
            </div>{" "}
            <HorizontalLineGraph />
          </div>
        </div>
        <div className="shadow-box border border-grey bg-white rounded-large mb-6">
          <div className="flex justify-between gap-4 px-5 pt-6 pb-4 items-center">
            <h1 className="text-typo text-lg font-bold">
              Top Performing Keywords
            </h1>
       
          </div>
          <div className="scrollbar w-full overflow-auto">
          <Table
              className=""
              data={[]}
              columns={columns}
              page={1}
              count={10}
              filters={filters}
            
            />
          </div>
        </div>
        <div className="shadow-box border border-grey bg-white rounded-large mb-6">
          <div className="flex justify-between gap-4 px-5 pt-6 pb-4 items-center">
            <h1 className="text-typo text-lg font-bold">
              Top-5 Ad creative performance
            </h1>
            <div>
              <div className="flex gap-4">
                <form className="relative max-w-[250px] w-full">
                  <HiOutlineSearch className="text-[#717275] text-xl shrink-0 absolute top-2.5 left-2" />
                  <input
                    className="w-full outline-none pl-9 p-0 placeholder:text-sm text-typo text-sm placeholder:font-light rounded-large h-10 flex items-center gap-2 px-2 focus:ring-primary focus:ring-2 shadow-box border !border-grey"
                    placeholder="Search by name"
                  />
                </form>
                
              </div>
            </div>
          </div>
          <div className="scrollbar w-full overflow-auto">
          <Table
              className=""
              data={[]}
              columns={columns}
              page={1}
              count={10}
              filters={filters}
              
            />
          </div>
        </div>
        <div className="shadow-box border border-grey bg-white rounded-large mb-6">
          <div className="flex justify-between gap-4 px-5 pt-6 pb-4 items-center">
            <h1 className="text-typo text-lg font-bold">Ad Set performance</h1>
            <div>
              <div className="flex gap-4">
                <form className="relative max-w-[250px] w-full">
                  <HiOutlineSearch className="text-[#717275] text-xl shrink-0 absolute top-2.5 left-2" />
                  <input
                    className="w-full outline-none pl-9 p-0 placeholder:text-sm text-typo text-sm placeholder:font-light rounded-large h-10 flex items-center gap-2 px-2 focus:ring-primary focus:ring-2 shadow-box border !border-grey"
                    placeholder="Search by name"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="scrollbar w-full overflow-auto">
          <Table
              className=""
              data={[]}
              columns={columns}
              page={1}
              count={10}
              filters={filters}
              
            />
          </div>
        </div>
        <div className="shadow-box border border-grey bg-white rounded-large mb-6">
          <div className="flex justify-between gap-4 px-5 pt-6 pb-4 items-center">
            <h1 className="text-typo text-lg font-bold">
              Placement Performance
            </h1>
            <div>
              <div className="flex gap-4">
                <form className="relative max-w-[250px] w-full">
                  <HiOutlineSearch className="text-[#717275] text-xl shrink-0 absolute top-2.5 left-2" />
                  <input
                    className="w-full outline-none pl-9 p-0 placeholder:text-sm text-typo text-sm placeholder:font-light rounded-large h-10 flex items-center gap-2 px-2 focus:ring-primary focus:ring-2 shadow-box border !border-grey"
                    placeholder="Search by name"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="scrollbar w-full overflow-auto">
          <Table
              className=""
              data={[]}
              columns={columns}
              page={1}
              count={10}
              filters={filters}
            />
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default FacebookAds
