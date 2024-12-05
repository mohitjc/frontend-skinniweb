import { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import { IoHandRightOutline } from "react-icons/io5";
import PieChart from "../../components/Charts/Piechart";
import ApiClient from "../../methods/api/apiClient";
import LineChart from "../../components/common/LineChart";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../components/common/BarChart";
import loader from "../../methods/loader";
import datepipeModel from "../../models/datepipemodel";
import { subscription_success } from "../actions/subscription";
import { useNavigate } from "react-router-dom";
import PermissionUtils from "../../components/permissionUtils";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  let current = datepipeModel.datetostring(new Date());
  let startDate = `${current.split("-")[0]}-${current.split("-")[1]}-01`;

  let month2 = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
  let endDate = datepipeModel.datetostring(month2);
  const [filters, setFilter] = useState({
    startDate: startDate,
    endDate: endDate,
  });
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const {isAllow}=PermissionUtils()

  const navigate = useNavigate()

  useEffect(() => {
    getData();
    getActivePlan()
  }, []);
  const getActivePlan = () => {
    // let param = { userId: user?.id };
    // ApiClient.get("subscription/active/subscription").then((res) => {
    //   if (res.success) {
    //     let data=res.data
    //     dispatch(subscription_success(data))
    //   }
    // });
  };
  const getData = (p = {}) => {
    loader(true);
    // let filter = { ...filters, ...p };
    // if (filter.startDate) filter.startDate = `${filter.startDate}`;
    // if (filter.endDate) filter.endDate = `${filter.endDate}`;

    // ApiClient.get("dashboard/cashflow", filter).then((res) => {
    //   if (res.success) {
    //     setData(
    //       res.data.map((itm) => {
    //         return itm;
    //       })
    //     );
    //   }
    //   loader(false);
    // });
    // ApiClient.get("dashboard/invoice-piechart", filter).then((res) => {
    //   if (res.success) {
    //     setPieData(
    //       res.data.map((itm) => {
    //         return itm;
    //       })
    //     );
    //   }
    //   loader(false);
    // });
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

  const userConnectionDetail = user.connectionsDetails?.length > 0
  
  return (
    <>
      <Layout>
        {userConnectionDetail ? (
          <>
        <h4 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <IoHandRightOutline className="text-3xl slow-shake text-[#0065FF]" />
          <span className="">Hi,</span> {user?.fullName}
        </h4>
        <div className="flex gap-2 mt-3">
        </div>
        <div className="shadow-box w-full bg-white rounded-lg mt-6 p-6">
          <div className="col-span-12 md:col-span-12">
            <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-xl">Revenue and Cash Flow</h5>
                <div className=""></div>
              </div>
              <LineChart
                legends={[
                  { label: "Revenue", key: "revenue" },
                  { label: "Cash Flow", key: "cash" },
                ]}
                data={
                  data && data?.length > 0
                    ? data?.map((item) => ({
                        revenue: item.revenue , 
                        cash: item.cash_flow, 
                        date: item.month, 
                      }))
                    : [{ revenue: "", cash: "", date: "" }]
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
                <div className="names_heads">
                  <h5 className="font-semibold text-xl">Profit Margins</h5>
                </div>
                <BarChart
                  // legends={[{ label: "Profit", key: "profit" }]}
                  // data={[{ profit: 10, cash: 3, date: "2020-12-04" }]}
                />
              </div>
            </div>
            <div className="">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
                <div className="names_heads">
                  <h5 className="font-semibold text-xl">Invoice Status</h5>
                </div>
                <PieChart
                  title="Invoice Status"
                  data={ pieData && pieData.length > 0 ?
                    pieData?.map((item) => ({
                    value: item.value ,
                    name: item.label,
                  }))
                  : ("")
                }
                />
              </div>
            </div>
            <div className="">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
                <div className="names_heads">
                  <h5 className="font-semibold text-xl">Resource Allocation</h5>
                </div>
                <BarChart
                  // legends={[
                  //   { label: "Project 1", key: "project1" },
                  //   { label: "Project 2", key: "project2" },
                  // ]}
                  // data={[
                  //   { project1: 10, project2: 3, date: "2020-12-04" },
                  //   { project1: 23, project2: 25, date: "2020-12-04" },
                  //   { project1: 12, project2: 43, date: "2020-12-04" },
                  //   { project1: 67, project2: 23, date: "2020-12-04" },
                  //   { project1: 65, project2: 27, date: "2020-12-04" },
                  // ]}
                  stack
                />
              </div>
            </div>
          </div>
        </div>
          </>
        ):(<>
        <div className="flex items-center justify-center h-full">
        <div className="inner_part sm:mt-3 md:mt-3 shadow-box overflow-hidden rounded-lg bg-white   p-6 text-center mx-auto w-[600px] font-[600] text-[22px]">
          <img src="assets/img/connect.png" className="w-[60px] mx-auto mb-4"/>        
          In order to view dashboard link APIs
       <div> 
        {isAllow('addapiIntegration')?<>
        <button className="text-white bg-[#0065FF] mt-3 mb-5  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center  mb-2 cursor-pointer" onClick={() => navigate("/api")} disabled={user?.activePlan === false}>Connect</button>
        </>:<></>}
       </div>
        </div>
        </div>
        </>) }
      </Layout>
    </>
  );
};

export default Dashboard;
