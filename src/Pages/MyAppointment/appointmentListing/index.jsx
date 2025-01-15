import { FaLongArrowAltDown } from "react-icons/fa";
import Layout from "../../../components/sidebarglobal/layout";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "react-pagination-js"; 
import "react-pagination-js/dist/styles.css";

const AppointmentListing = () => {
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
// Fetching the data from the new API
const getData = (p = {}) => {
loader(true);
let filter = { ...filters, ...p };
ApiClient.get("appointmentList", filter).then((res) => {
if (res.success) {
const { orders} = res.data;
setData(Array.isArray(orders) ? orders : []);
setTotal(res.data.pagination.totalRecords); 
} else {
setData([]);
setTotal(0); 
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
}, [sortBy, sortOrder]); // Trigger sorting after fetching and whenever sortBy or sortOrder changes
const handlePageSizeChange = (e) => {
const count = parseInt(e.target.value);
setFilter({ ...filters, count, page: 1 }); // Reset to page 1 when count changes
};
const handlePageChange = (newPage) => {
    setFilter({ ...filters, page: newPage });
  };

return (
<Layout>
<div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
<div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
<div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
<div>
<h1 className="text-[22px] font-bold mb-1">My Appointment</h1>
{/* <p className="text-sm text-[#828282]">{total} items</p> */}
</div>
</div>
<div className="flex justify-end flex-wrap gap-y-2 gap-x-2">
<div className="flex items-center">
<span className="text-gray-600 mr-2">Sort By</span>
<div className="relative bg-[#828282] rounded-[10px]">
<select
className="relative z-20 bg-transparent appearance-none text-white text-[14px] rounded-[10px] !pr-[35px] px-3 py-2 "
onChange={(e) => setSortBy(e.target.value)}
>
<option class="text-[#828282]" value="id">Ref#</option>
<option class="text-[#828282]" value="description">Description</option>
<option class="text-[#828282]" value="status">Status</option>
<option class="text-[#828282]" value="total">Subtotal</option>
</select>
<span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-white"></span>
</div>
<FaLongArrowAltDown className="text-[#828282]" />
</div>
<div className="flex items-center">
<span className="text-gray-600 mr-2">Order</span>
<div className="relative bg-[#828282] rounded-[10px]">
<select
className="relative z-20 bg-transparent appearance-none text-white text-[14px] rounded-[10px] !pr-[35px] px-3 py-2"
onChange={(e) => setSortOrder(e.target.value)}
>
<option class="text-[#828282]" value="asc">Ascending</option>
<option class="text-[#828282]" value="desc">Descending</option>
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
<thead className="">
<tr>
<th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Ref#</th>
<th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Description</th>
<th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Status</th>
<th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Frequency</th>
<th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Subtotal</th>
<th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Last Run</th>
<th className="w-[100px] px-3 pb-4">Action</th>
</tr>
</thead>
<tbody>
{data.map((appointment) => (
<tr key={appointment.id} className="bg-white border-t">
<td className="px-3 py-4 text-[12px]">{appointment.id}</td>
<td className="px-3 py-4 text-[12px]">{appointment.formId}</td>
<td className="px-3 py-4 text-[12px]">{appointment.email}</td>
<td className="px-3 py-4 text-[12px]">{appointment.date}</td>
<td className="px-3 py-4 text-[12px]">{appointment.duration} minutes</td>
<td className="px-3 py-4 text-[12px]">{appointment.status}</td>
<td className="px-3 py-4 text-[12px]">
{new Date(appointment.createdAt).toLocaleDateString()}
</td>
<td className="w-[100px] px-3 py-4 text-[12px]">
<button
className="bg-[#828282] text-white rounded-full hover:opacity-[90%] px-3 py-1"
onClick={() => history(`/myappointmentData/${appointment.id}`)}
>
View
</button>
</td>
</tr>
))}
</tbody>

</table>

</div>
{total > 0 && (
<div className="paginationdiv flex flex-wrap gap-x-5 gap-y-2 justify-between mt-4">
<div className="flex items-center">
<span className="text-sm text-gray-600 mr-2">Show</span>
<div className="relative bg-[#828282] rounded-[10px]">
<select
value={filters.count}
onChange={handlePageSizeChange}
className="relative z-20 bg-transparent appearance-none text-white text-[14px] rounded-[10px] !pr-[35px] px-3 py-1.5 ">
<option class="text-[#828282]" value="10">10</option>
<option class="text-[#828282]" value="20">20</option>
<option class="text-[#828282]" value="30">30</option>
<option class="text-[#828282]" value="50">50</option>
</select>
<span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-white"></span>
</div>
<span className="text-sm text-gray-600 ml-2">items per page</span>
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


export default AppointmentListing