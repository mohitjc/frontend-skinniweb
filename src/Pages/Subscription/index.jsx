import Layout from "../../components/sidebarglobal/layout";
import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import datepipeModel from "../../models/datepipemodel";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";


const Subscription = () => {
  const { id } = useParams()
  const history = useNavigate()
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const breadcrumbItems = [
    { label: 'Home', link: '/', active: false },
    { label: 'Subscription Listing', link: '/subscription', active: false },
    { label: 'Subcription Detail', link: '', active: true },
  ];

  const getData = (p = {}) => {
    loader(true);
    let filter = { id: id };

    ApiClient.get("subscriptionDetail", filter).then((res) => {
      if (res.success) {
        setData(res.data);
        setTotal(res.total);
      }
      loader(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
    <Breadcrumb items={breadcrumbItems} />
    <div className="bg-white px-6 py-6 rounded-lg shadow-md">
        <div className="bg-[#FFF1E7] shadow-md px-4 py-4 rounded-lg mb-5">
          <h1 className="text-2xl font-bold mb-2">Subscription #{data?.id}</h1>
          <p className="text-sm text-gray-600 capitalize">Status: {data?.status}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">User:</span>
            <p className="text-sm">{data?.userId?.fullName} </p>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">Plan:</span>
            <p className="text-sm">{data?.planId?.name}</p>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">Amount:</span>
            <p className="text-sm">${data?.amount / 100}</p>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">Valid Until:</span>
            <p className="text-sm">{datepipeModel.date(data?.validUpto)}</p>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold text-sm text-gray-500">Created At:</p>
          <p className="text-sm">{datepipeModel.date(data?.createdAt)}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
