import React, { useState, useEffect } from 'react';
import ApiClient from '../../methods/api/apiClient';
import {
  FaUsers,
  FaMoneyBillWave,
  FaChartLine,
  FaRegCheckCircle,
  FaTimesCircle,
  FaClipboardList,
  FaClipboardCheck,
} from 'react-icons/fa';
import './style.scss'
const UserDashboard = () => {
  const [data, setData] = useState({});
  const [loaderTrue, setLoaderTrue] = useState(false);
  const getData = () => {
    ApiClient.get("dash/subscription/count").then((res) => {
      setLoaderTrue(true)
      if (res.success) {
        setData(res?.data);   
        setLoaderTrue(false)
      }
    });
  };

  useEffect(() => {
    getData();  
  }, []);
  const dataKeys = [
    { label: 'Total Active Subscription', key: 'totalActiveSubscription', icon: <FaRegCheckCircle /> },
    { label: 'Total Inactive Subscription', key: 'totalInActiveSubscription', icon: <FaTimesCircle /> },
    { label: 'Total Cancled Subscription', key: 'totalCancelSubscription', icon: <FaTimesCircle /> },
    { label: 'Total Subscription', key: 'totalSubscription', icon: <FaClipboardList /> },
    { label: 'Total Transactions', key: 'totalTransaction', icon: <FaMoneyBillWave /> },
    { label: 'Total Plans', key: 'totalPlans', icon: <FaChartLine /> },
    { label: 'Total Active Plans', key: 'totalActivePlans', icon: <FaClipboardCheck /> },
    { label: 'Total Inactive Plans', key: 'totalInactivePlans', icon: <FaTimesCircle /> },
    { label: 'Total Users', key: 'totalUsers', icon: <FaUsers /> },
    { label: 'Total Transaction Amount', key: 'totalTransactionAmount', icon: <FaMoneyBillWave /> },
  ];

  return (
<div className="py-6">
  <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {dataKeys.map((item) => (
      <div
        key={item.key}
        className="flex items-center p-4 bg-white shadow-md rounded-lg"
      >
        <div className="text-4xl text-primary drop-shadow-sm mr-4">{item.icon}</div>
        <div>
          <h3 className="text-xl font-medium text-gray-500">{item.label}</h3>
          <p className="text-md font-semibold text-gray-900">
            {data[item.key] !== undefined && loaderTrue === false ? data[item.key] :  <div className="flex items-center justify-center h-10">
                   
                    <div className="loader_doted"></div>
                  </div>}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};
export default UserDashboard;
