import React, { useEffect, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ApiClient from "../../methods/api/apiClient";

const Subscription = () => {
  const { id } = useParams();
  const history = useNavigate();
  const user = useSelector((state) => state.user);
  const [subscriptions, setSubscriptions] = useState([]);
  const [filters, setFilter] = useState({ page: 1, count: 10 });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await ApiClient.get(
        `mySubscriptions?userId=${
          user?.id || id
        }&status=active&sortBy=createdAt asc&page=${filters.page}&count=${
          filters.count
        }`
      );
      console.log(response, "res");

      setSubscriptions(response?.data?.subscriptions || []);
      setTotal(response?.data?.total);
    };

    fetchSubscriptions();
  }, [user, id]);

  const handlePageChange = (newPage) => {
    setFilter({ ...filters, page: newPage });
  };

  return (
    <Layout>
      <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
        <div className="bg-[#FFF1E7] shadow-md px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
          <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
            <div>
              <h1 className="text-[22px] font-bold mb-1">My Subscriptions</h1>
              <p className="text-sm text-[#828282]">
                {subscriptions?.length} items
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF2E8] rounded-[12px] p-[1.5rem] sm:p-[2rem]">
          <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="px-3 pb-4">Ref#</th>
                    <th className="px-3 pb-4">Description</th>
                    <th className="px-3 pb-4">Status</th>
                    <th className="px-3 pb-4">Frequency</th>
                    <th className="px-3 pb-4">Subtotal</th>
                    <th className="px-3 pb-4">Last Run</th>
                    <th className="px-3 pb-4">Next Run</th>
                    <th className="px-3 pb-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions?.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-4 text-gray-500"
                      >
                        No active subscriptions found.
                      </td>
                    </tr>
                  ) : (
                    subscriptions.map((sub) => (
                      <tr key={sub?.id} className="border-t">
                        <td className="px-3 py-4 text-[12px]">{sub?.id}</td>
                        <td className="px-3 py-4 text-[12px]">
                          {sub?.planId?.name || "N/A"}
                        </td>
                        <td className="px-3 py-4 text-[12px]">
                          {sub?.status || "N/A"}
                        </td>
                        <td className="px-3 py-4 text-[12px]">
                          {sub?.intervalCount} month(s)
                        </td>
                        <td className="px-3 py-4 text-[12px]">
                          ${(sub?.amount / 100).toFixed(2)}
                        </td>
                        <td className="px-3 py-4 text-[12px]">
                          {new Date(sub?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-4 text-[12px]">
                          {sub?.validUpto
                            ? new Date(sub.validUpto).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-3 py-4 text-[12px]">
                          <button className="bg-[#828282] text-white rounded-full hover:opacity-[90%] px-3 py-1">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="bg-[#F1E9E2] text-[#828282] text-sm text-center rounded-[12px] mt-8 p-3">
            Note: Subtotals do not include shipping, tax, or other possible
            surcharges. Actual order totals may vary over time.
          </p>
        </div>
        <Pagination
          currentPage={filters.page}
          totalSize={total}
          sizePerPage={filters.count}
          changeCurrentPage={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default Subscription;
