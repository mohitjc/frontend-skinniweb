import { useEffect, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from "react-redux";
import moment from "moment";

const Goals = () => {
  const searchState = { data: "" };
  const [filters, setFilter] = useState({
    page: 1,
    count: 10,
    search: "",
    date: "",
  });
  const user = useSelector((state) => state.user);
  const [dietPlan, setDietPlan] = useState([]);
  const [dietInitialPlan, setDietInitialPlan] = useState([]);
  

  const getDietPlan = (data, date) => {
    const fitnessGoalId = data?.caloriesInfo?.[0]?.id;
    const calories = data?.caloriesInfo?.[0]?.calories;
    if (!fitnessGoalId || !calories) {
      console.error("Missing fitnessGoalId or calories");
      return; 
    }
    const payload = {
      date:date,
      fitnessGoalId: String(fitnessGoalId),
      calories: String(calories),
    };
    ApiClient.get(`getFoodList`, payload).then((res) => {
      if (res.success) {
        if (res?.data?.length > 0) {
          setDietPlan(res?.data);
  
        } else {
          setDietPlan([res?.data]);
        }
      }
    });
  };
  const getInitialDietPlan = (data) => {
    // const fitnessGoalId = data?.caloriesInfo?.[0]?.id
    const calories = data?.caloriesInfo?.[0]?.calories
    const payload = {
      calories: String(calories)
    }
    ApiClient.get(`caloriesInMeal`, payload).then(res => {
      if (res.success) {
        setDietInitialPlan(res?.meals)
      }
    })
  }
  useEffect(()=>{
    if(user?.id || user?._id){
      getDietPlan(user, moment().format("YYYY-MM-DD"))
      getInitialDietPlan(user)
    }
  },[user]) 
  // Function to handle date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFilter((prev) => ({ ...prev, date: selectedDate }));
    if(user?.id || user?._id){
      getDietPlan(user, selectedDate)
    }
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilter({ page: 1, count: 10, search: "", date: "" });
      getDietPlan(user, moment().format("YYYY-MM-DD"))
     
    
  };

  useEffect(() => {
    getDietPlan();
  }, [filters]); 

  const isFilterApplied = filters.date || filters.search; 
 

  return (
    <Layout>
      <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
        <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
          <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
            <div className="">
              <h1 className="text-[22px] font-bold mb-1">My Goals</h1>
             
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

        <div className="">
          <div className="">
            <div className="flex items-center gap-2">
              <h2 className="text-[#FFBF8B] font-[600] text-[18px] whitespace-nowrap">
                Diet Plan
              </h2>
              <div className="h-[1px] w-full bg-[#FFF0E5]"></div>
            </div>
            <div className="py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-[4rem]">
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3">
                  <div className="w-[90px] h-[90px] bg-[#828282] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img
                      src="/assets/img/diet1.png"
                      className="w-[70px] h-[70px] object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">
                      Breakfast
                    </h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">
                      Recommended:{" "}
                      <span className="">
                        {dietInitialPlan[0]?.calories}mg Cals
                      </span>{" "}
                      |{" "}
                      <span className="">
                        {dietInitialPlan[0]?.carbs}g Net Cards
                      </span>
                    </p>
                    {dietPlan?.map((item, index) => {
                      return item?.breakfast?.map((itm, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2"
                          >
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.foodname}
                              </p>
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.qty}
                              </p>
                            </div>
                            <div class="flex gap-2">
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Carbs
                                </p>
                                <p className="text-[10px] text-[#FF0000] text-[400]">
                                  {itm?.carbs}g{" "}
                                </p>
                              </div>
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Cals
                                </p>
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  {itm?.calories}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3">
                  <div className="w-[90px] h-[90px] bg-[#FED6B6] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img
                      src="/assets/img/diet2.png"
                      className="w-[70px] h-[70px] object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">
                      Lunch
                    </h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">
                      Recommended:{" "}
                      <span className="">
                        {dietInitialPlan[1]?.calories}mg Cals
                      </span>{" "}
                      |{" "}
                      <span className="">
                        {dietInitialPlan[1]?.carbs}g Net Cards
                      </span>
                    </p>
                    {dietPlan?.map((item, index) => {
                      return item?.lunch?.map((itm, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2"
                          >
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.foodname}
                              </p>
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.qty}
                              </p>
                            </div>
                            <div class="flex gap-2">
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Carbs
                                </p>
                                <p className="text-[10px] text-[#FF0000] text-[400]">
                                  {itm?.carbs}g
                                </p>
                              </div>
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Cals
                                </p>
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  {itm?.calories}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3">
                  <div className="w-[90px] h-[90px] bg-[#828282] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img
                      src="/assets/img/diet3.png"
                      className="w-[70px] h-[70px] object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">
                      Dinner
                    </h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">
                      Recommended:{" "}
                      <span className="">
                        {dietInitialPlan[2]?.calories}mg Cals
                      </span>{" "}
                      |{" "}
                      <span className="">
                        {dietInitialPlan[2]?.carbs}g Net Cards
                      </span>
                    </p>
                    {dietPlan?.map((item, index) => {
                      return item?.dinner?.map((itm, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2"
                          >
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.foodname}
                              </p>
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.qty}
                              </p>
                            </div>
                            <div class="flex gap-2">
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Carbs
                                </p>
                                <p className="text-[10px] text-[#FF0000] text-[400]">
                                  {itm?.carbs}g
                                </p>
                              </div>
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Cals
                                </p>
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  {itm?.calories}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>

                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3 mt-12">
                  <div className="w-[90px] h-[90px] bg-[#828282] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img
                      src="/assets/img/diet1.png"
                      className="w-[70px] h-[70px] object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">
                      Snacks 1
                    </h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">
                      Recommended:{" "}
                      <span className="">
                        {dietInitialPlan[3]?.calories} Cals
                      </span>{" "}
                      |{" "}
                      <span className="">
                        {dietInitialPlan[3]?.carbs}g Net Cards
                      </span>
                    </p>
                    {dietPlan?.map((item, index) => {
                      return item?.snacks1?.map((itm, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2"
                          >
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.foodname}
                              </p>
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.qty}
                              </p>
                            </div>
                            <div class="flex gap-2">
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Carbs
                                </p>
                                <p className="text-[10px] text-[#FF0000] text-[400]">
                                  {itm?.carbs}g{" "}
                                </p>
                              </div>
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Cals
                                </p>
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  {itm?.calories}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3 mt-12">
                  <div className="w-[90px] h-[90px] bg-[#FED6B6] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img
                      src="/assets/img/diet2.png"
                      className="w-[70px] h-[70px] object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">
                      Snacks 2
                    </h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">
                      Recommended:{" "}
                      <span className="">
                        {dietInitialPlan[4]?.calories} Cals
                      </span>{" "}
                      |{" "}
                      <span className="">
                        {dietInitialPlan[4]?.carbs}g Net Cards
                      </span>
                    </p>
                    {dietPlan?.map((item, index) => {
                      return item?.snacks2?.map((itm, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2"
                          >
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.foodname}
                              </p>
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.qty}
                              </p>
                            </div>
                            <div class="flex gap-2">
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Carbs
                                </p>
                                <p className="text-[10px] text-[#FF0000] text-[400]">
                                  {itm?.carbs}g
                                </p>
                              </div>
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Cals
                                </p>
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  {itm?.calories}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3 mt-12">
                  <div className="w-[90px] h-[90px] bg-[#828282] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img
                      src="/assets/img/diet3.png"
                      className="w-[70px] h-[70px] object-contain"
                    />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">
                      Snacks 3
                    </h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">
                      Recommended:{" "}
                      <span className="">
                        {dietInitialPlan[5]?.calories} Cals
                      </span>{" "}
                      |{" "}
                      <span className="">
                        {dietInitialPlan[5]?.carbs}g Net Cards
                      </span>
                    </p>
                    {dietPlan?.map((item, index) => {
                      return item?.snacks3?.map((itm, i) => {
                        return (
                          <div
                            key={i}
                            className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2"
                          >
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.foodname}
                              </p>
                              <p className="text-[10px] text-[#828282] text-[400]">
                                {itm?.qty}
                              </p>
                            </div>
                            <div class="flex gap-2">
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Carbs
                                </p>
                                <p className="text-[10px] text-[#FF0000] text-[400]">
                                  {itm?.carbs}g
                                </p>
                              </div>
                              <div className="">
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  Cals
                                </p>
                                <p className="text-[10px] text-[#828282] text-[400]">
                                  {itm?.calories}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
