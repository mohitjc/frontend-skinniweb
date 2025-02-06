import React, { useEffect, useState } from "react";
import Layout from "../../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";

const SubscriptionListing = () => {
  const { id } = useParams();
  const history = useNavigate();
  const user = useSelector((state) => state.user);
  const [subscriptions, setSubscriptions] = useState([]);
  const [filters, setFilter] = useState({ page: 1, count: 10 });
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const fetchSubscriptions = async () => {
    if (!user?.id && id) return;
    loader(true);
    const response = await ApiClient.get(
      `mySubscriptions?userId=${
        user?.id || id
      }&status=active&sortBy=createdAt asc&page=${filters.page}&count=${
        filters.count
      }`
    );
    setSubscriptions(response?.data || []);
    setTotal(response?.data?.pagination?.total || 0);
  };
  loader(false);
  useEffect(() => {
    fetchSubscriptions();
  }, [user.id, id, filters.page, filters.count]);

  const handlePageChange = (newPage) => {
    setFilter({ ...filters, page: newPage });
  };
  const handleCountChange = (newCount) => {
    setFilter({ ...filters, count: newCount, page: 1 });
  };

  const sortData = (data) => {
    return data.sort((a, b) => {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];

      if (sortOrder === "asc") {
        return fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
      } else {
        return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
      }
    });
  };


  useEffect(() => {
    if (subscriptions.length > 0) {
      setSubscriptions((prevData) => sortData([...prevData]));
    }
  }, [sortBy, sortOrder]);

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
          <div className="flex justify-end flex-wrap gap-y-2 gap-x-2">
            <div className="flex items-center">
              <span className="text-gray-600 mb-0 mr-2">Sort By</span>
              <div className="relative bg-[#828282] rounded-[10px]">
                <select
                  className="relative z-20 bg-transparent appearance-none text-white text-[14px] rounded-[10px] !pr-[35px] px-3 py-2 "
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option className="text-[#828282]" value="id">
                    Ref#
                  </option>
                  <option className="text-[#828282]" value="description">
                    Description
                  </option>
                  <option className="text-[#828282]" value="status">
                    Status
                  </option>
                  <option className="text-[#828282]" value="total">
                    Subtotal
                  </option>
                </select>
                <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-white"></span>
              </div>
              <FaLongArrowAltDown className="text-[#828282]" />
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mb-0 mr-2">Order</span>
              <div className="relative bg-[#828282] rounded-[10px]">
                <select
                  className="relative z-20 bg-transparent appearance-none text-white text-[14px] rounded-[10px] !pr-[35px] px-3 py-2"
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option className="text-[#828282]" value="asc">
                    Ascending
                  </option>
                  <option className="text-[#828282]" value="desc">
                    Descending
                  </option>
                </select>
                <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-white"></span>
              </div>
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
                    <th className="px-3 pb-4">Name</th>
                    <th className="px-3 pb-4">Status</th>
                    <th className="px-3 pb-4">Frequency</th>
                    <th className="px-3 pb-4">Subtotal</th>
                    {/* <th className="px-3 pb-4">Last Run</th> */}
                    {/* <th className="px-3 pb-4">Next Run</th> */}
                    <th className="px-3 pb-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions?.length == 0 ? (
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
                        {/* <td className="px-3 py-4 text-[12px]">
                          {new Date(sub?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-4 text-[12px]">
                          {sub?.validUpto
                            ? new Date(sub.validUpto).toLocaleDateString()
                            : "N/A"}
                        </td> */}
                        <td className="px-3 py-4 text-[12px]">
                          <button
                            className="bg-[#828282] text-white rounded-full hover:opacity-[90%] text-[12px] font-[500] px-3 py-1"
                            onClick={() =>
                              history(`/subscription/${sub?.id}`)
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {subscriptions > 0 && (
              <div className="paginationdiv flex flex-wrap gap-x-5 gap-y-2 justify-between mt-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Show</span>
                  <div className="relative bg-[#828282] rounded-[10px]">
                    <select
                      value={filters.count}
                      onChange={(e) =>
                        handleCountChange(parseInt(e.target.value))
                      } // Call handleCountChange here
                      className="relative z-20 bg-transparent appearance-none text-white text-[14px] rounded-[10px] !pr-[35px] px-3 py-1.5 "
                    >
                      <option class="text-[#828282]" value="10">
                        10
                      </option>
                      <option class="text-[#828282]" value="20">
                        20
                      </option>
                      <option class="text-[#828282]" value="30">
                        30
                      </option>
                      <option class="text-[#828282]" value="50">
                        50
                      </option>
                    </select>
                    <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-white"></span>
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    items per page
                  </span>
                </div>

                <Pagination
                  currentPage={filters.page}
                  totalSize={total}
                  sizePerPage={filters.count}
                  changeCurrentPage={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionListing;
