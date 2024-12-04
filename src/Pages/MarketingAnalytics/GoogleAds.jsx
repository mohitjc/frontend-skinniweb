import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import FormControl from "../../components/common/FormControl";
import DateRangePicker from "../../components/common/DateRangePicker";
import PieChart from "../../components/Charts/Piechart";
import { HiOutlineSearch } from "react-icons/hi";
import Table from "../../components/Table";
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
const GoogleAds = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedproperty, setSelectedProperty] = useState();
  const [activeUser, setActiveUser] = useState(0);
  const [session, setSession] = useState(0);
  const [totalEvent, setTotalEvents] = useState(0);
  const [totalConversion, setTotalConversion] = useState(0);
  const [cities, setCities] = useState();
  const [total, setTotal] = useState(0);
  const [country, setCountry] = useState();
  const [devices, setDevices] = useState();
  const [platform, setPlatform] = useState();
  const [citiesData, setCitiesData] = useState();
  const [filters, setFilter] = useState({
    startDate: "",
    endDate: "",
    page: 1,
    count: 10,
  });
  const [data, setData] = useState([]);

  const getData = (p = {}, selectedValue) => {
    loader(true);
    let filter = { ...filters, ...p, platform: "google" };
    ApiClient.get("google/ads/list", filter).then((res) => {
      if (res.success) {
        setData(res?.data);
      }
      loader(false);
    });
  };

  useEffect(() => {}, []);
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

  const metricHeader = [
    {
      name: "Total Impression",
      value: totalEvent,
    },
    {
      name: "Total Clicks ",
      value: session,
    },
    {
      name: "Conversion",
      value: activeUser,
    },
    {
      name: "CTR",
      value: totalConversion,
    },
    {
      name: "Average CPC",
      value: totalConversion,
    },
    {
      name: "Average CPE",
      value: totalConversion,
    },
    {
      name: "Average Cost",
      value: totalConversion,
    },
    {
      name: "Average CPM",
      value: totalConversion,
    },
  ];

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

  const analyticsItem = user.connectionsDetails.find(
    (item) => item.type === "analytics"
  );
  const properties = analyticsItem ? analyticsItem.gPropertyIds : [];

  const formatedPlatform = data.map((platform) => ({
    name: platform.platform,
    id: platform.property,
  }));

  const handleProperty = (selectedValue) => {
    if (selectedValue) {
      setSelectedProperty(selectedValue);
      filter({ propertyId: selectedValue });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Layout>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-[#111827]">
              Ad Performance
            </h3>
            <p class="text-sm font-normal text-[#75757A]">
              Here you can see all about your Facebook Ad's
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
            // value={selectedproperty}
            className="reset-cross"
            theme="search"
            crossIcon={true}
            // options={formattedProperties}
            // onChange={(e) => handleProperty(e)}
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
        </div>
        <div className="shadow-box  w-full bg-white rounded-lg mt-6 ">
          <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Devices
          </h5>
          <div className="grid xl:grid-cols-1 gap-7 mb-6 p-4">
            <div className="shadow-box border border-grey bg-white rounded-large w-full">
              <PieChart
                legends={[{ label: "People taking action", key: "people" }]}
                data={[
                  { value: 31, name: "Mobile", date: "" },
                  { value: 13, name: "Dekstop", date: "" },
                  { value: 23, name: "Tablet", date: "" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Top Performing Campaigns
          </h5>
          <div className="flex justify-end gap-4  p-4 items-center">
            <form className="relative max-w-[250px] w-full">
              <HiOutlineSearch className="text-[#717275] text-xl shrink-0 absolute top-2.5 left-2" />
              <input
                className="w-full outline-none pl-9 p-0 placeholder:text-sm text-typo text-sm placeholder:font-light rounded-large h-10 flex items-center gap-2 px-2 focus:ring-primary focus:ring-2 shadow-box border !border-grey"
                placeholder="Search by name"
              />
            </form>
          </div>
          <div className="scrollbar px-4 pb-4  w-full overflow-auto">
            <Table
              className=""
              data={[]}
              columns={columns}
              page={1}
              count={10}
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
        </div>

        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <h1 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Top Performing Keywords
          </h1>
          <div className="flex justify-end gap-4  p-4 items-center">
            <form className="relative max-w-[250px] w-full">
              <HiOutlineSearch className="text-[#717275] text-xl shrink-0 absolute top-2.5 left-2" />
              <input
                className="w-full outline-none pl-9 p-0 placeholder:text-sm text-typo text-sm placeholder:font-light rounded-large h-10 flex items-center gap-2 px-2 focus:ring-primary focus:ring-2 shadow-box border !border-grey"
                placeholder="Search by name"
              />
            </form>
          </div>
          <div className="scrollbar px-4 pb-4  w-full overflow-auto">
            <Table
              className=""
              data={[]}
              columns={columns}
              page={1}
              count={10}
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
        </div>
      </Layout>
    </div>
  );
};

export default GoogleAds;
