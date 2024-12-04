import React from "react";
import Layout from "../../components/global/layout";
import "./style.scss";
import {  Tooltip } from "antd";
import Table from "../../components/Table";
import shared from "./shared";
import { PiEyeLight } from "react-icons/pi";
import moment from "moment";
import pipeModel from "../../models/pipeModel";
import ActivePlans from "../ActivePlans";
const Html = ({
  sorting,
  view,
  pageChange,
  count,
  filters,
  loaging,
  data,
  isAllow,
  total = { total },
  sortClass,
}) => {
  const columns = [
    {
      key: "invoice",
      name: "Invoice Number",
      render: (row) => {
        return <span className="capitalize">{row?.invoiceNumber}</span>;
      },
    },
    {
      key: "plan",
      name: "Plan Name",
      render: (row) => {
        return <span className="capitalize">{row?.plansDetail?.internalName}</span>;
      },
    },
    {
      key: "amount",
      name: "Amount (AUD)",
      render: (row) => {
        return <span className="capitalize">{pipeModel.currency((row?.amount / 100).toFixed(0))}</span>;
      },
    },
    {
      key: "date",
      name: "Paid Date",
      render: (row) => {
        return <span className="capitalize">{moment(row?.paidDate).format("DD-MM-YYYY")}</span>;
      },
    },

    {
      key: "action",
      name: "Actions",
      render: (itm) => {
        return (
          <>
            <div className="flex items-center justify-start gap-1.5">
              {!isAllow(`read${shared.check}`) ? (
                <Tooltip placement="top" title="View">
                  <a
                    className="border cursor-pointer  hover:opacity-70 rounded-lg bg-[#0065FF14] w-10 h-10 !text-primary flex items-center justify-center text-lg"
                    onClick={(e) => view(itm.id)}
                  >
                    <PiEyeLight />
                  </a>
                </Tooltip>
             ) : (
                <></>
              )}
            </div>
          </>
        );
      },
    },
  ];

  return (
    <Layout>

      <div className="flex flex-wrap justify-between items-center gap-y-4">
     

        <a id="downloadFile"></a>

      </div>
      <ActivePlans/>
      <div className="shadow-box py-4 w-full bg-white rounded-lg mt-6">
        {!loaging ? (
          <>
          <div className="px-4 pb-4">

          
            <Table
              className=""
              data={data}
              columns={columns}
              page={filters.page}
              count={filters.count}
              filters={filters}
              total={total}
              result={(e) => {
                if (e.event == "page") pageChange(e.value);
                if (e.event == "sort") {
                  sorting(e.value);
                  sortClass(e.value);
                }
                if (e.event == "count") count(e.value);
              }}
            />
            </div>
          </>
        ) : (
          <></>
        )}

        {loaging ? (
          <div className="text-center py-4">
            <img src="/assets/img/loader.gif" className="pageLoader" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
};

export default Html;
