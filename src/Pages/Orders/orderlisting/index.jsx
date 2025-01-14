import { FaLongArrowAltDown } from "react-icons/fa";
import Layout from "../../../components/sidebarglobal/layout";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const OrderListing = () => {
  const history = useNavigate();
  const user = useSelector((state) => state.user);
  const [filters, setFilter] = useState({
    page: 1,
    email: user?.email,
    count: 10,
    search: "",
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("id"); // Default sort by Ref#
  const [sortOrder, setSortOrder] = useState("asc"); // Default order: ascending

  // Fetching the data from API
  const getData = (p = {}) => {
    loader(true);
    let filter = { ...filters, ...p };

    ApiClient.get("orderList", filter).then((res) => {
      if (res.success) {
        setData(res.data.orders);  // Set data to orders
        setTotal(res.data.total);   // Update total
      }
      loader(false);
    });
  };

  // Sorting logic
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
    getData();
  }, [filters]);

  useEffect(() => {
    // Sort the data when it's first loaded
    if (data.length > 0) {
      setData((prevData) => sortData([...prevData])); // Sorting a copy of the data
    }
  }, [sortBy, sortOrder, data]); // Trigger sorting after fetching and whenever sortBy or sortOrder changes

  return (
    <Layout>
      <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
        <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
          <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
            <div>
              <h1 className="text-[22px] font-bold mb-1">My Orders</h1>
              <p className="text-sm text-[#828282]">1 item</p>
            </div>
          </div>
          <div className="flex justify-end flex-wrap gap-y-2 gap-x-1">
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Sort By</span>
              <select
                className="bg-[#828282] text-white rounded-[10px] px-3 py-2"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id">Ref#</option>
                <option value="description">Description</option>
                <option value="status">Status</option>
                <option value="total">Subtotal</option>
              </select>
              <FaLongArrowAltDown className="text-[#828282]" />
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Order</span>
              <select
                className="bg-[#828282] text-white rounded-[10px] px-3 py-2"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF2E8] rounded-[12px] p-[1.5rem] sm:p-[2rem]">
          <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="uppercase">
                  <tr>
                    <th className="whitespace-nowrap px-3 pb-4">Ref#</th>
                    <th className="whitespace-nowrap px-3 pb-4">Description</th>
                    <th className="whitespace-nowrap px-3 pb-4">Status</th>
                    <th className="whitespace-nowrap px-3 pb-4">Frequency</th>
                    <th className="whitespace-nowrap px-3 pb-4">Subtotal</th>
                    <th className="whitespace-nowrap px-3 pb-4">Last Run</th>
                    {/* <th className="whitespace-nowrap px-3 pb-4">Next Run</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((order) => (
                    <tr key={order.id} className="bg-white border-t">
                      <td className="px-6 py-4">{order.id}</td>
                      <td className="px-6 py-4">
                        {order.products
                          .map((product) => product.productName)
                          .join(", ")}
                      </td>
                      <td className="px-6 py-4">{order.status}</td>
                      <td className="px-6 py-4">Every Month</td>
                      <td className="px-6 py-4">
                        {order.total.toFixed(2)} USD
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      {/* <td className="px-6 py-4">
                        {new Date(order.createdAt)
                          .setFullYear(new Date(order.createdAt).getFullYear() + 1)
                          .toLocaleDateString()}
                      </td> */}
                      <td className="w-[100px] px-6 py-4">
                        <button
                          className="bg-[#828282] text-white rounded-full hover:opacity-[90%] px-3 py-1"
                          onClick={() => history(`/myordersDetail/${order.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderListing;
