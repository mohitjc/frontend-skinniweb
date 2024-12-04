import { useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import loader from "../../methods/loader";
import { Tooltip } from "antd";
import { IoIosInformationCircle } from "react-icons/io";
import { decryptData, encryptUrlData2 } from "../../models/crptoUtils";

const View = () => {

  const [data, setData] = useState();

  const history = useNavigate();
  const { id } = useParams();
  const ucidata = encryptUrlData2(id)
  const uci = decryptData(ucidata)
  const getDetail = () => {
    loader(true);
    ApiClient.get(shared.detailApi, { id: uci }).then((res) => {
      loader(false);
      if (res.success) {
        let data=res.data
        setData(data);
      }
    });

  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      <Layout>
        <div className="wrapper_section">
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <span
                onClick={() => history(-1)}
                className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#0065FF] text-white hover:text-black"
              >
                <i className="fa fa-angle-left text-lg"></i>
              </span>
            </Tooltip>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                {shared.addTitle} Details
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="  shadow-box overflow-hidden rounded-lg bg-white  gap-4 shrink-0 ">
              <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
                  <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
                    <IoIosInformationCircle className="text-[#0065FF]" />
                  </div>
                  <h3 className="text-[16px] font-[500] text-[#0065FF]">
                    Basic Information
                  </h3>
                </div>
               <div className="grid grid-cols-12 p-4">
               <div className="col-span-6 flex flex-col mb-5">
                  <label className="text-[14px] text-[#0000009c] tracking-wider mb-1 ">Invoce Number:</label>
                  <p className="text-[14px] text-black font-medium capitalize">
                    {data && data.invoiceNumber ? data.invoiceNumber : "--"}
                  </p>
                </div>
                <div className="col-span-6 flex flex-col mb-5">
                  <label className="text-[14px] text-[#0000009c] tracking-wider mb-1 ">Transaction Status:</label>
                  <p className="text-[14px] text-black font-medium capitalize">
                    {data && data.transactionStatus ? data && data.transactionStatus : "--" }
                  </p>
                </div>
                <div className="col-span-6 flex flex-col mb-5">
                  <label className="text-[14px] text-[#0000009c] tracking-wider mb-1 ">Currency:</label>
                  <p className="text-[14px] text-black font-medium capitalize">
                    {data && data.currency ? data && data.currency.toUpperCase() : "--" }
                  </p>
                </div>
                <div className="col-span-6 flex flex-col mb-5">
                  <label className="text-[14px] text-[#0000009c] tracking-wider mb-1 ">Amount:</label>
                  <p className="text-[14px] text-black font-medium capitalize">
                    {data && data.amount ? (data.amount /100).toFixed(2) : "--" }
                  </p>
                </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default View;
