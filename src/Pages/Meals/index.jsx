import { useEffect, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import moment from "moment";
import { useSelector } from "react-redux";
import PieChart from "../../components/eCharts/PieChart";

const Goals = () => {
  const user = useSelector((state) => state.user);
  const [activeIndex, setActiveIndex] = useState(null);
  const [dietMeasures, setDietMeasures] = useState([""])
  const [dietPlan, setDietPlan] = useState([])
  const [dietInitialPlan, setDietInitialPlan] = useState([])
  const moderatelyActive = [
    { value: 1, text: "Sedentary" },
    { value: 2, text: "Lightly Active" },
    { value: 3, text: "Moderately Active" },
    { value: 4, text: "Very Active" },
    { value: 5, text: "Extra Active" },
  ]
  const [month, setMonth] = useState([])
  const [videos, setVideos] = useState([])
  const [currentDate, setCurrentDate] = useState(moment());

  console.log(dietInitialPlan, "dietInitialPlandietInitialPlan")

  const getDietPlan = (data, date) => {
    const fitnessGoalId = data?.caloriesInfo?.[0]?.id
    const calories = data?.caloriesInfo?.[0]?.calories
    const payload = {
      date: date,
      fitnessGoalId: String(fitnessGoalId),
      calories: String(calories)
    }
    ApiClient.get(`getFoodList`, payload).then(res => {
      if (res.success) {
        if (res?.data?.length > 0) {
          setDietPlan(res?.data)
          setDietMeasures(res?.data)
        } else {
          setDietPlan([res?.data])
          setDietMeasures([res?.data])
        }
      }
    })
  }

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

  const handleDateFilter = (date) => {
    generateCurrentMonth(date)
    getDietPlan(user, date)
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  const handlePrevYear = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'year'));
  };

  const handleNextYear = () => {
    setCurrentDate(currentDate.clone().add(1, 'year'))
  };

  useEffect(() => {
    if (user?.id || user?._id) {
      getDietPlan(user, moment().format("YYYY-MM-DD"))
      getInitialDietPlan(user)
    }
  }, [user])

  const getVideoId = (url) => {
    const regExp = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };

  const embedUrl = `https://www.youtube.com/embed/${getVideoId(videos?.[0]?.url)}`;

  const generateCurrentMonth = (selectedDate = "") => {
    const today = new Date();
    const currentMonth = currentDate.month();  // Using moment.js to get the month
    const currentYear = currentDate.year();  // Using moment.js to get the year
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startDay = firstDayOfMonth.getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysArray = [];
  
    // Get today's date in local format (YYYY-MM-DD)
    const todayFormatted = today.toLocaleDateString('en-CA'); // Using 'en-CA' gives us YYYY-MM-DD format
  
    // Use the provided selectedDate or today's date as the filter date
    const filterDate = selectedDate || todayFormatted;
  
    // Loop through the days of the month, including empty days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      const dayDate = new Date(currentYear, currentMonth, 1 - startDay + i);
      const formattedDate = dayDate.toLocaleDateString('en-CA');  // Format as YYYY-MM-DD
      daysArray.push({
        day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }),
        date: dayDate.getDate(),
        currentDate: formattedDate,
        filterDate: false  // These are empty spaces, so filterDate is false
      });
    }
  
    // Loop through each day of the current month
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const dayDate = new Date(currentYear, currentMonth, i);
      const day = dayDate.toLocaleDateString('en-US', { weekday: 'short' });
      const formattedDate = dayDate.toLocaleDateString('en-CA');  // Format as YYYY-MM-DD
  
      // Compare the formatted dates to set filterDate
      daysArray.push({
        day: day,
        date: i,
        currentDate: formattedDate,
        filterDate: formattedDate === filterDate  // Set filterDate true if this is the selected date
      });
    }
  
    setMonth(daysArray);  // Update the state with the new month days
  };

  useEffect(() => {
    generateCurrentMonth()
    // getDietPlan()
  }, [currentDate])

  return (
    <Layout>
      <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px] mx-auto">
        <div className="">
          <div className="flex items-center gap-2">
            <h2 className="text-[#FFBF8B] font-[600] text-[20px] whitespace-nowrap">Activity</h2>
            <div className="h-[1px] w-full bg-[#FFF0E5]"></div>
          </div>
          <div className="py-8">
            <div className="flex flex-wrap gap-5 sm:gap-20">
              <div className="flex gap-2 items-center">
                <img src="/assets/img/activity1.png" className="w-[70px] h-[70px] bg-[#828282] object-contain p-3 rounded-full"></img>
                <div className="">
                  <h2 className="text-[15px] font-[600] text-[#828282]">{user?.dietType || ""}</h2>
                  <p className="text-[12px] font-[400] text-[#828282]">Diet Type</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/assets/img/activity2.png" className="w-[70px] h-[70px] bg-[#FED6B6] object-contain p-3 rounded-full"></img>
                <div className="">
                  <h2 className="text-[15px] font-[600] text-[#828282]">{moderatelyActive?.find((item) => item?.value === user?.exercise)?.text || ""}</h2>
                  <p className="text-[12px] font-[400] text-[#828282]">How Active You Are?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-2 mb-2 max-sm:!grid max-sm:!grid-cols-2">
            <button onClick={handlePrevYear} className="font-bold border-2 border-[#fbd7b7] text-[12px] bg-[#fff] text-[#828282] p-[2px_15px] rounded-full hover:bg-[#fbd7b7]">
              &#10094; {` Year`}
            </button>
            <button onClick={handlePrevMonth} className="font-bold border-2 border-[#fbd7b7] text-[12px] bg-[#fff] text-[#828282] p-[2px_15px] rounded-full hover:bg-[#fbd7b7]">
              &#10094; {` Month`}
            </button>

            <h2 className="text-[#FFBF8B] max-sm:col-span-2 max-sm:text-center font-[600] text-[12px] whitespace-nowrap">
              {currentDate.format("MMMM YYYY")}
            </h2>

            <button onClick={handleNextMonth} className="font-bold border-2 border-[#fbd7b7] text-[12px] bg-[#fff] text-[#828282] p-[2px_15px] rounded-full hover:bg-[#fbd7b7]">
              {`Month `} &#10095;
            </button>
            <button onClick={handleNextYear} className="font-bold border-2 border-[#fbd7b7] text-[12px] bg-[#fff] text-[#828282] p-[2px_15px] rounded-full hover:bg-[#fbd7b7]">
              {`Year `} &#10095;
            </button>
          </div>
          <div className="h-[1px] w-full bg-[#FFF0E5]"></div>

          <div className="py-8">
            <div className="grid grid-cols-1 gap-5">
              <div className="grid grid-cols-7 gap-5">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
                  return (
                    <h3
                      key={index}
                      className="text-[14px] font-[600] text-center text-[#828282] w-[35px] h-[35px] rounded-full flex justify-center items-center mx-auto"
                    >
                      {day}
                    </h3>
                  );
                })}
              </div>
              <div className="grid grid-cols-7 gap-5">
                {month.map((item, index) => {
                  return (
                    <p
                      key={index}
                      onClick={(e) => handleDateFilter(item?.currentDate)}
                      className={`text-[14px] cursor-pointer font-[600] text-center text-[#828282] w-[35px] h-[35px] rounded-full flex justify-center items-center mx-auto ${item?.filterDate ? "bg-[#FFEBDC]" : ""}`}
                    >
                      {item ? item.date : ""}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-2">
            <h2 className="text-[#FFBF8B] font-[600] text-[18px] whitespace-nowrap">Your Diet Measures</h2>
            <div className="h-[1px] w-full bg-[#FFF0E5]"></div>
          </div>
          <div className="py-8">
            <PieChart
              data={dietMeasures?.[0]}
            />
          </div>
          <div className="">
            <div className="flex items-center gap-2">
              <h2 className="text-[#FFBF8B] font-[600] text-[18px] whitespace-nowrap">Diet Plan</h2>
              <div className="h-[1px] w-full bg-[#FFF0E5]"></div>
            </div>
            <div className="py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-[4rem]">
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3">
                  <div className="w-[90px] h-[90px] bg-[#828282] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img src="/assets/img/diet1.png" className="w-[70px] h-[70px] object-contain" />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">Breakfast</h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">{dietInitialPlan[0]?.calories}mg Cals</span> | <span className="">{dietInitialPlan[0]?.carbs}g Net Cards</span></p>
                    {dietPlan?.map((item, index) => {
                      return item?.breakfast?.map((itm, i) => {
                        return <div key={i} className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2">
                          <div className="">
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.foodname}</p>
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.qty}</p>
                          </div>
                          <div class="flex gap-2">
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Carbs</p>
                              <p className="text-[10px] text-[#FF0000] text-[400]">{itm?.carbs}g </p>
                            </div>
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Cals</p>
                              <p className="text-[10px] text-[#828282] text-[400]">{itm?.calories}</p>
                            </div>
                          </div>
                        </div>
                      })
                    })}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3">
                  <div className="w-[90px] h-[90px] bg-[#FED6B6] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img src="/assets/img/diet2.png" className="w-[70px] h-[70px] object-contain" />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">Lunch</h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">{dietInitialPlan[1]?.calories}mg Cals</span> | <span className="">{dietInitialPlan[1]?.carbs}g Net Cards</span></p>
                    {dietPlan?.map((item, index) => {
                      return item?.lunch?.map((itm, i) => {
                        return <div key={i} className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2">
                          <div className="">
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.foodname}</p>
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.qty}</p>
                          </div>
                          <div class="flex gap-2">
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Carbs</p>
                              <p className="text-[10px] text-[#FF0000] text-[400]">{itm?.carbs}g</p>
                            </div>
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Cals</p>
                              <p className="text-[10px] text-[#828282] text-[400]">{itm?.calories}</p>
                            </div>
                          </div>
                        </div>
                      })
                    })}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3">
                  <div className="w-[90px] h-[90px] bg-[#828282] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img src="/assets/img/diet3.png" className="w-[70px] h-[70px] object-contain" />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">Dinner</h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">{dietInitialPlan[2]?.calories}mg Cals</span> | <span className="">{dietInitialPlan[2]?.carbs}g Net Cards</span></p>
                    {dietPlan?.map((item, index) => {
                      return item?.dinner?.map((itm, i) => {
                        return <div key={i} className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2">
                          <div className="">
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.foodname}</p>
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.qty}</p>
                          </div>
                          <div class="flex gap-2">
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Carbs</p>
                              <p className="text-[10px] text-[#FF0000] text-[400]">{itm?.carbs}g</p>
                            </div>
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Cals</p>
                              <p className="text-[10px] text-[#828282] text-[400]">{itm?.calories}</p>
                            </div>
                          </div>
                        </div>
                      })
                    })}
                  </div>
                </div>

                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3 mt-12">
                  <div className="w-[90px] h-[90px] bg-[#828282] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img src="/assets/img/diet1.png" className="w-[70px] h-[70px] object-contain" />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">Snacks 1</h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">{dietInitialPlan[3]?.calories} Cals</span> | <span className="">{dietInitialPlan[3]?.carbs}g Net Cards</span></p>
                    {dietPlan?.map((item, index) => {
                      return item?.snacks1?.map((itm, i) => {
                        return <div key={i} className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2">
                          <div className="">
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.foodname}</p>
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.qty}</p>
                          </div>
                          <div class="flex gap-2">
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Carbs</p>
                              <p className="text-[10px] text-[#FF0000] text-[400]">{itm?.carbs}g </p>
                            </div>
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Cals</p>
                              <p className="text-[10px] text-[#828282] text-[400]">{itm?.calories}</p>
                            </div>
                          </div>
                        </div>
                      })
                    })}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3 mt-12">
                  <div className="w-[90px] h-[90px] bg-[#FED6B6] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img src="/assets/img/diet2.png" className="w-[70px] h-[70px] object-contain" />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">Snacks 2</h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">{dietInitialPlan[4]?.calories} Cals</span> | <span className="">{dietInitialPlan[4]?.carbs}g Net Cards</span></p>
                    {dietPlan?.map((item, index) => {
                      return item?.snacks2?.map((itm, i) => {
                        return <div key={i} className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2">
                          <div className="">
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.foodname}</p>
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.qty}</p>
                          </div>
                          <div class="flex gap-2">
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Carbs</p>
                              <p className="text-[10px] text-[#FF0000] text-[400]">{itm?.carbs}g</p>
                            </div>
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Cals</p>
                              <p className="text-[10px] text-[#828282] text-[400]">{itm?.calories}</p>
                            </div>
                          </div>
                        </div>
                      })
                    })}
                  </div>
                </div>
                <div className="bg-[#F7F7F7] rounded-[12px] mb-[4rem] lg:mb-[0rem] p-3 mt-12">
                  <div className="w-[90px] h-[90px] bg-[#828282] rounded-full mx-auto flex justify-center items-center p-3 mt-[-70px]">
                    <img src="/assets/img/diet3.png" className="w-[70px] h-[70px] object-contain" />
                  </div>
                  <div className="mt-3">
                    <h2 className="text-[15px] font-[600] text-[#828282] text-center">Snacks 3</h2>
                    <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">{dietInitialPlan[5]?.calories} Cals</span> | <span className="">{dietInitialPlan[5]?.carbs}g Net Cards</span></p>
                    {dietPlan?.map((item, index) => {
                      return item?.snacks3?.map((itm, i) => {
                        return <div key={i} className="bg-[#FED6B6] px-2 py-1 rounded-l-md flex gap-3 justify-between pr-4 border-r-[5px] border-[#FF0000] mt-2">
                          <div className="">
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.foodname}</p>
                            <p className="text-[10px] text-[#828282] text-[400]">{itm?.qty}</p>
                          </div>
                          <div class="flex gap-2">
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Carbs</p>
                              <p className="text-[10px] text-[#FF0000] text-[400]">{itm?.carbs}g</p>
                            </div>
                            <div className="">
                              <p className="text-[10px] text-[#828282] text-[400]">Cals</p>
                              <p className="text-[10px] text-[#828282] text-[400]">{itm?.calories}</p>
                            </div>
                          </div>
                        </div>
                      })
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-2">
            <h2 className="text-[#FFBF8B] font-[600] text-[18px] whitespace-nowrap">Video</h2>
            <div className="h-[1px] w-full bg-[#FFF0E5]"></div>
          </div>
          <div className="py-8">
            <div className="bg-[#EEEEEE] rounded-[15px] p-3 sm:p-[1.5rem]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="video_div bg-white rounded-[12px]">
                  <iframe
                    width="100%"
                    height="200"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {/* <video class="max-[480px]:h-[150px] h-[190px] bg-[#000] w-full rounded-t-[15px]" controls>
                                        <source
                                          src={videos?.[0]?.url}
                                          type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                      </video>
                                      <p className="text-[14px] sm:text-[16px] p-3 mb-4">Full Body Mobility Stretches</p> */}
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
