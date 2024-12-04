import React, { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import LineChart from "../../components/common/LineChart";
import methodModel from "../../methods/methods";
import ApiClient from "../../methods/api/apiClient";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loader from "../../methods/loader";
import DateRangePicker from "../../components/common/DateRangePicker";
import FormControl from "../../components/common/FormControl";
import moment from "moment";
import Table from "../../components/Table";

const Badge = ({ label }) => {
  const isLifetimeData = label?.toLowerCase()?.includes("life time");

  return (
    <div
      className="h-[26px] px-2.5 flex gap-1.5 justify-center items-center !rounded-large w-fit"
      style={{
        backgroundColor: isLifetimeData ? "#dff4d5" : "#DDE9FF", // Darker shade of blue for lifetime data
        border: `1px solid ${
          isLifetimeData ? "rgba(57,124,246,0.10)" : "rgba(57,124,246,0.10)"
        }`,
      }}
    >
      <div
        className="2xl:w-1.5 2xl:h-1.5 w-[5px] h-[5px] shrink-0"
        style={{ backgroundColor: isLifetimeData ? "#7cc15b" : "#397CF6" }} // Same shade of blue for the dot
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
const GoogleAnalytics = () => {
  const history = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedproperty, setSelectedProperty] = useState();
  const [activeUser, setActiveUser] = useState(0);
  const [session, setSession] = useState(0);
  const [totalEvent, setTotalEvents] = useState(0);
  const [totalConversion, setTotalConversion] = useState(0);
  const [cities, setCities] = useState();
  const [total, setTotal] = useState(0);
  const [totalCountry, setTotalCountry] = useState(0);
  const [totalWeb, SetTotalWeb] = useState(0);
  const [totalDevice, setTotaldevice] = useState(0);

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

  const getData = (p = {}) => {
    loader(true);
    let filter = { ...filters, ...p };

    ApiClient.get("analytics/get", filter).then((res) => {
      if (res.success) {
        setData(res?.data);
      }
      loader(false);
    });
  };

  useEffect(() => {
    let code = methodModel.getPrams("code");
    if (code) {
      // if(window.location.pathname.includes('marketing-analytics')){
      ApiClient.get("analytics/account", { authCode: code }).then((res) => {
        if (res.success) {
          document.getElementById("updateProfile")?.click();
          setTimeout(() => {
            history("/marketing-analytics");
          }, 1);
        }
      });
      return;
      // }
    }
  }, []);
  const filter = (p = {}) => {
    setFilter({ ...filters, ...p });
    getData(p);
  };

  const clear = () => {
    let p = {
      startDate: "",
      endDate: "",
      status: "",
      // propertyId:""
    };
    // setSelectedProperty('')
    filter(p);
  };

  const metricHeader = [
    {
      name: "Event Count",
      value: totalEvent,
    },
    {
      name: "Session ",
      value: session,
    },
    {
      name: "Active Users",
      value: activeUser,
    },
    {
      name: "Conversions",
      value: totalConversion,
    },
  ];

  const columns = [
    // {
    //   key: "date",
    //   name: "Month",
    //   sort: true,
    //   render: (row) => {
    //     return <span className="">{datepipeModel.date(row?.date)}</span>;
    //   },
    // },
    {
      key: "name",
      name: "Name",
      // sort: true,
      render: (row) => {
        return <span className="capitalize">{row?.name}</span>;
      },
    },
    {
      key: "user",
      name: "Users",
      // sort: true,
      render: (row) => {
        // const totalMetrics = row?.metrics.reduce((acc, metric) => acc + metric, 0);
        return <span>{row?.totalActiveUsers}</span>;
      },
    },
    {
      key: "percent",
      name: "%",
      // sort: true,
      render: (row) => {
        // const totalMetrics = row?.metrics.reduce((acc, metric) => acc + metric, 0);
        return <span>{row?.activeUserPercentage}</span>;
      },
    },
  ];

  const analyticsItem = user.connectionsDetails.find(
    (item) => item.type === "analytics"
  );
  const properties = analyticsItem ? analyticsItem.gPropertyIds : [];

  const formattedProperties = properties.map((property) => ({
    name: property.displayName,
    id: property.property,
  }));

  const handleProperty = (selectedValue) => {
    if (selectedValue) {
      setSelectedProperty(selectedValue);
      filter({ propertyId: selectedValue });
      // getData();
    }
  };

  useEffect(() => {
    if (selectedproperty) {
      getData();
    }
  }, [selectedproperty]);

  useEffect(() => {
    const activeUsers =
      data?.rows?.map((itm) => {
        const thirdMetricValue = itm?.metricValues?.[2]?.value;
        return thirdMetricValue ? parseInt(thirdMetricValue) : 0;
      }) || [];

    if (activeUsers.length > 0) {
      const total = activeUsers?.reduce(
        (total, activeUser) => total + activeUser,
        0
      );
      setActiveUser(total);
      // setTotal(activeUsers?.length)
    } else {
      setActiveUser(0);
    }
    const activeSessions =
      data?.rows?.map((itm) => {
        const thirdMetricValue = itm?.metricValues?.[1]?.value;
        return thirdMetricValue ? parseInt(thirdMetricValue) : 0;
      }) || [];
    if (activeSessions?.length > 0) {
      const total = activeSessions?.reduce(
        (total, activeUser) => total + activeUser,
        0
      );
      setSession(total);
      // setTotal(activeSessions?.length)
    } else {
      setSession(0);
    }
    const totalEvents =
      data?.rows?.map((itm) => {
        const thirdMetricValue = itm?.metricValues?.[0]?.value;
        return thirdMetricValue ? parseInt(thirdMetricValue) : 0;
      }) || [];
    if (totalEvents?.length > 0) {
      const total = totalEvents?.reduce(
        (total, activeUser) => total + activeUser,
        0
      );
      setTotalEvents(total);
      // setTotal(totalEvents?.length)
    } else {
      setTotalEvents(0);
    }
    const totalConversions =
      data?.rows?.map((itm) => {
        const thirdMetricValue = itm?.metricValues?.[3]?.value;
        return thirdMetricValue ? parseInt(thirdMetricValue) : 0;
      }) || [];
    if (totalConversions?.length > 0) {
      const total = totalConversions?.reduce(
        (total, activeUser) => total + activeUser,
        0
      );
      setTotalConversion(total);
      // setTotal(totalConversions?.length)
    } else {
      setTotalConversion(0);
    }

    const cityNames = data?.rows
      ?.map((itm) => itm?.dimensionValues?.[0]?.value)
      .filter(Boolean);
    const uniqueCities = [...new Set(cityNames)];
    setCities(uniqueCities);
    setTotal(uniqueCities?.length);

    const CountryName = data?.rows
      ?.map((itm) => itm?.dimensionValues?.[2]?.value)
      .filter(Boolean);
    const uniqueCountries = [...new Set(CountryName)];
    if (uniqueCountries) {
      setCountry(uniqueCountries);
      setTotalCountry(uniqueCountries?.length);
    }
    const Devices = data?.rows
      ?.map((itm) => itm?.dimensionValues?.[5]?.value)
      .filter(Boolean);
    const uniqueDevices = [...new Set(Devices)];
    if (uniqueDevices) {
      setDevices(uniqueDevices);
      setTotaldevice(uniqueDevices?.length);
    }
    const platforms = data?.rows
      ?.map((itm) => itm?.dimensionValues?.[8]?.value)
      .filter(Boolean);
    const uniquePlatforms = [...new Set(platforms)];
    if (uniquePlatforms) {
      setPlatform(uniquePlatforms);
      SetTotalWeb(uniquePlatforms?.length);
    }
  }, [data]);

  const getCityData = () => {
    const totalActiveUsersOverall = data?.rows?.reduce((total, row) => {
      const firstMetricValue = row?.metricValues?.[0]?.value;
      return total + (firstMetricValue ? parseInt(firstMetricValue) : 0);
    }, 0);
    return cities?.map((city) => {
      const filteredRows = data?.rows?.filter(
        (row) => row.dimensionValues?.[0]?.value === city
      );

      const totalActiveUsers = filteredRows?.reduce((total, row) => {
        const thirdMetricValue = row?.metricValues?.[0]?.value;
        return total + (thirdMetricValue ? parseInt(thirdMetricValue) : 0);
      }, 0);
      const activeUserPercentage =
        totalActiveUsersOverall > 0
          ? ((totalActiveUsers / totalActiveUsersOverall) * 100).toFixed(2)
          : 0;
      return {
        name: city,
        totalActiveUsers,
        activeUserPercentage: `${activeUserPercentage}%`,
      };
    });
  };

  const tableData = getCityData();
  // const getCityData = () => {
  //   return cities?.map((city) => ({
  //     name: city,
  //   }));
  // };
  const getCountryData = () => {
    const totalActiveUsersOverall = data?.rows?.reduce((total, row) => {
      const firstMetricValue = row?.metricValues?.[0]?.value;
      return total + (firstMetricValue ? parseInt(firstMetricValue) : 0);
    }, 0);
    return country?.map((countryName) => {
      const filteredRows = data?.rows?.filter(
        (row) => row.dimensionValues?.[2]?.value === countryName
      );

      const totalActiveUsers = filteredRows?.reduce((total, row) => {
        const firstMetricValue = row?.metricValues?.[0]?.value;
        return total + (firstMetricValue ? parseInt(firstMetricValue) : 0);
      }, 0);
      const activeUserPercentage =
        totalActiveUsersOverall > 0
          ? ((totalActiveUsers / totalActiveUsersOverall) * 100).toFixed(2)
          : 0;
      return {
        name: countryName,
        totalActiveUsers,
        activeUserPercentage: `${activeUserPercentage}%`,
      };
    });
  };

  const getCountryTable = getCountryData();
  // const getCountry = () => {
  //   return country?.map((count) => ({
  //     name:count
  //   }))
  // }

  // const mobileDevices = () => {
  //   return devices?.map((mobile) => ({
  //     name:mobile
  //   }))
  // }
  const getDeviceData = () => {
    const totalActiveUsersOverall = data?.rows?.reduce((total, row) => {
      const firstMetricValue = row?.metricValues?.[0]?.value;
      return total + (firstMetricValue ? parseInt(firstMetricValue) : 0);
    }, 0);
    return devices?.map((deviceName) => {
      const filteredRows = data?.rows?.filter(
        (row) => row.dimensionValues?.[5]?.value === deviceName
      );

      const totalActiveUsers = filteredRows?.reduce((total, row) => {
        const firstMetricValue = row?.metricValues?.[0]?.value;
        return total + (firstMetricValue ? parseInt(firstMetricValue) : 0);
      }, 0);
      const activeUserPercentage =
        totalActiveUsersOverall > 0
          ? ((totalActiveUsers / totalActiveUsersOverall) * 100).toFixed(2)
          : 0;
      return {
        name: deviceName,
        totalActiveUsers,
        activeUserPercentage: `${activeUserPercentage}%`,
      };
    });
  };

  const getDevicesTable = getDeviceData();
  // const platformGet = () => {
  //   return platform?.map((mobile) => ({
  //     name:mobile
  //   }))
  // }
  const getPlatformData = () => {
    const totalActiveUsersOverall = data?.rows?.reduce((total, row) => {
      const firstMetricValue = row?.metricValues?.[0]?.value;
      return total + (firstMetricValue ? parseInt(firstMetricValue) : 0);
    }, 0);
    return platform?.map((platformName) => {
      const filteredRows = data?.rows?.filter(
        (row) => row.dimensionValues?.[8]?.value === platformName
      );

      const totalActiveUsers = filteredRows?.reduce((total, row) => {
        const firstMetricValue = row?.metricValues?.[0]?.value;
        return total + (firstMetricValue ? parseInt(firstMetricValue) : 0);
      }, 0);
      const activeUserPercentage =
        totalActiveUsersOverall > 0
          ? ((totalActiveUsers / totalActiveUsersOverall) * 100).toFixed(2)
          : 0;
      return {
        name: platformName,
        totalActiveUsers,
        activeUserPercentage: `${activeUserPercentage}%`,
      };
    });
  };

  const getPlatform = getPlatformData();

  const calculateTotalUsersPerDate = (dateArray, data) => {
    let userCountMap = {};

    dateArray?.forEach((date) => {
      const matchingData = data.rows?.find(
        (item) => item.dimensionValues[4].value === date
      );

      if (matchingData) {
        const userCount = parseInt(matchingData.metricValues[0].value, 10);

        if (userCountMap[date]) {
          userCountMap[date] += userCount;
        } else {
          userCountMap[date] = userCount;
        }
      }
    });

    let totalUsersPerDate = Object.keys(userCountMap).map((date) => ({
      date,
      totalUsers: userCountMap[date],
    }));

    return totalUsersPerDate;
  };

  const graphDate = data?.rows?.map((itm) => itm.dimensionValues?.[4]?.value);

  const totalUsersPerDate = calculateTotalUsersPerDate(graphDate, data);

  return (
    <div>
      <Layout>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-[#111827]">
              Google Analytics Summary
            </h3>
            <p class="text-sm font-normal text-[#75757A]">
              Here you can see all about your Google Analytics Summary
            </p>
          </div>

          <a id="downloadFile"></a>
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <FormControl
            type="select"
            placeholder="select Property"
            value={selectedproperty}
            className="reset-cross"
            theme="search"
            crossIcon={false}
            options={formattedProperties}
            onChange={(e) => handleProperty(e)}
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
          <div className=" ">
            <h6 className="text-typo text-lg font-semibold"></h6>
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
        </div>
        {/* <div className="shadow-box border !border-grey flex flex-col bg-white rounded-large !my-6">
            <div className="flex justify-between items-center px-[20px] py-[18px] ">
              <h6 className="text-typo text-lg font-semibold"></h6>
            </div>
            <div className="!px-4 !pb-4">
              <div className="grid xl:grid-cols-4 grid-cols-2 !gap-4">
                {transactionCounts.map((item, index) => (
                  <StatsCount
                   name={item.name}
                   value={item.value}
                  />
                ))}
              </div>
            </div>
          </div> */}
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <div className="names_heads">
            <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
              Traffic Overview
            </h5>
          </div>
          <div className="grid grid-cols-12 gap-4 p-4 ">
            <div className="chatr_ones border border-gray-200  rounded-lg col-span-12">
              <LineChart
                legends={[{ label: "Users", key: "users" }]}
                // data={[
                //   {users: activeUser, date: moment(graphDate).format("YYYY-DD-MM")},
                // ]}
                data={
                  totalUsersPerDate && totalUsersPerDate.length > 0
                    ? totalUsersPerDate?.map((item) => ({
                        users: item.totalUsers ? item.totalUsers : 0,
                        date: item.date
                          ? moment(item.date).format("YYYY-DD-MM")
                          : 0,
                      }))
                    : [{ users: 0, date: "" }]
                }
                stack
              />
            </div>
            {/* <div className="chatr_ones border border-gray-200 p-6 rounded-lg col-span-4">
            <DoughnutChart
              data={[
                { value: 10, name: "Display" },
                { value: 23, name: "Paid search" },
                { value: 12, name: "Organic search" },
                { value: 67, name: "Social" },
                { value: 65, name: "Email" },
              ]}
              stack
            />
          </div> */}
          </div>
        </div>
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <div className="">
            <h6 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
              {" "}
              Countries
            </h6>
          </div>
          <div className=" grid grid-cols-12 gap-4 p-4 ">
            <div className="relative overflow-x-auto border border-[#eee] sm:rounded-lg col-span-12">
              <Table
                className=""
                data={getCountryTable}
                columns={columns}
                page={1}
                count={10}
                filters={filters}
                total={totalCountry}
                result={(e) => {}}
              />
            </div>
          </div>
        </div>
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <h5 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
            Cities
          </h5>
          <div className="grid grid-cols-12 gap-4 p-4 ">
            <div className="relative overflow-x-auto border border-[#eee] sm:rounded-lg col-span-12">
              <Table
                className=""
                data={tableData}
                columns={columns}
                page={1}
                count={10}
                filters={filters}
                total={total}
                result={(e) => {}}
              />
            </div>
          </div>
        </div>

        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <div className="">
            <h6 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
              {" "}
              Devices Types
            </h6>
          </div>

          <div className=" grid grid-cols-12 gap-4 p-4 ">
            <div className="relative overflow-x-auto border border-[#eee] sm:rounded-lg col-span-12">
              <Table
                className=""
                data={getDevicesTable}
                columns={columns}
                page={1}
                count={10}
                filters={filters}
                total={totalDevice}
                result={(e) => {}}
              />
            </div>
          </div>
        </div>
        <div className="shadow-box  w-full bg-white rounded-lg mt-6">
          <div className="">
            <h6 className="p-4 border-b font-[600] rounded-[5px] rounded-bl-[0] rounded-br-[0] flex items-center text-[#0065FF]">
              source of traffic
            </h6>
          </div>
          <div className=" grid grid-cols-12 gap-4 p-4 ">
            <div className="relative overflow-x-auto border border-[#eee] sm:rounded-lg col-span-12">
              <Table
                className=""
                data={getPlatform}
                columns={columns}
                page={1}
                count={10}
                filters={filters}
                total={totalWeb}
                result={(e) => {}}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default GoogleAnalytics;
