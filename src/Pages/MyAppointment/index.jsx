import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import Layout from "../../components/sidebarglobal/layout";
import datepipeModel from "../../models/datepipemodel";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";

const Appointment = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const breadcrumbItems = [
    { label: 'Home', link: '/', active: false },
    { label: 'Appointment Listing', link: '/myappointment', active: false },
    { label: 'Appointment Detail', link: '', active: true },
  ];

  const getData = () => {
    loader(true);
    let filter = { id: id };
    ApiClient.get("appointmentData", filter).then((res) => {
      if (res.success) {
        setData(res.data);
      }
      loader(false);
    });
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Layout>
    <Breadcrumb items={breadcrumbItems} />
      <div className="bg-white px-6 py-6 rounded-lg shadow-md">
        {/* Appointment Header */}
        <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem]  sm:p-[2rem] rounded-[12px] mb-[1.5rem] mb-5">
          <h1 className="text-2xl font-bold mb-2">Appointment #{data?.id}</h1>
          <p className="text-sm text-gray-600 capitalize">Status: {data?.status}</p>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">Email:</span>
            <p className="text-sm">{data?.email}</p>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">Form ID:</span>
            <p className="text-sm">{data?.formId}</p>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">Date:</span>
            <p className="text-sm">{datepipeModel.date(data?.date)}</p>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">Duration:</span>
            <p className="text-sm">{data?.duration} minutes</p>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-500">Timezone:</span>
            <p className="text-sm">{data?.timezone}</p>
          </div>
        </div>

        {/* Appointment Creation Info */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold text-sm text-gray-500">Created At:</p>
          <p className="text-sm">{datepipeModel.date(data?.createdAt)}</p>
        </div>

        
      </div>
    </Layout>
  );
};

export default Appointment;
