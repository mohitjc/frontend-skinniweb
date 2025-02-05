import { useEffect, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";

const Goals = () => {
  const searchState = { data: "" };
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "", date: "" });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.user);
  const getData = () => {
    loader(true);
    // let filter = { ...filters, ...p, fitnessGoalId: "", calories: "" };
    const fitnessGoalId = user?.caloriesInfo?.[0]?.id
    const calories = user?.caloriesInfo?.[0]?.calories
    console.log(fitnessGoalId,"goal");
    console.log(calories,"data");

    
    const payload = {
      fitnessGoalId: String(fitnessGoalId),
      calories: String(calories)
    }
    ApiClient.get("getFoodList", payload).then((res) => {
      if (res.success) {
        setData(res.data);
        setTotal(res.total);
      }
      loader(false);
    });
  };

  // Function to handle date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilter((prev) => ({ ...prev, date: selectedDate }));
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilter({ page: 1, count: 10, search: "", date: "" });
  };

  useEffect(() => {
    getData();
  }, [filters]); // Re-fetch data when filters change

  const isFilterApplied = filters.date || filters.search; // Check if any filter is applied


  return (
    <Layout>
      <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
        <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
          <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
            <div className="">
              <h1 className="text-[22px] font-bold mb-1">My Goals</h1>
              {/* <p className="text-sm text-[#828282]">1 item</p> */}
            </div>
          </div>
          <div className="flex justify-end flex-wrap gap-y-2 gap-x-2">
            <div className="flex items-center">
              <label className="text-gray-600 mb-0 mr-2">Filter by Date</label>
              <input
                type="date"
                className="relative bg-white border text-[14px] rounded-[10px] px-3 py-2"
                value={filters.date}
                onChange={handleDateChange}
              />
            </div>

            {/* Conditionally render Reset button if a filter is applied */}
            {isFilterApplied && (
              <button
                className="bg-red-500 text-white px-3 py-2 rounded-[10px]"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        <div className="bg-[#FFF2E8] rounded-[12px]  p-[1.5rem]  sm:p-[2rem] ">
          <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px] ">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className=" ">
                <tr className="">
      {/* Table Header */}
      <th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Meal</th>
      <th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Fat (g)</th>
      <th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Protein (g)</th>
      <th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Carbs (g)</th>
      <th className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 pb-4">Calories</th>
    </tr>
                </thead>
                <tbody>
                  {data && (
                     <tr className="bg-white border-t">
                     <td className="px-3 py-4 text-[12px]">{data?.breakfast?.fat || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.breakfast?.protein || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.breakfast?.carbs || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.breakfast?.calories || 0}</td>
                   
                 
                     <td className="px-3 py-4 text-[12px]">{data?.lunch?.fat || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.lunch?.protein || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.lunch?.carbs || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.lunch?.calories || 0}</td>
                  
                     <td className="px-3 py-4 text-[12px]">{data?.dinner?.fat || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.dinner?.protein || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.dinner?.carbs || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.dinner?.calories || 0}</td>
                 
               
                       <td className="px-3 py-4 text-[12px]">{data?.snacks?.fat || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.snacks?.protein || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.snacks?.carbs || 0}</td>
                     <td className="px-3 py-4 text-[12px]">{data?.snacks?.calories || 0}</td>
                   </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
