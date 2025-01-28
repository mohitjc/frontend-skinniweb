import { useEffect, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";

const Forums = () => {
  const searchState = { data: "" };
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "", date: "" });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const getData = (p = {}) => {
    loader(true);
    let filter = { ...filters, ...p, fitnessGoalId: "", calories: "" };

    ApiClient.get("getFoodList", filter).then((res) => {
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
        <div className="text-[#040415] text-[24px] font-[600]">
          <h3 className="">Recent Posts</h3>
        </div>
        <div className="grid grid-cols-2 mt-3 gap-10">
          <div className="">
            <div className="bg-[#FEE4D0] rounded-t-2xl">
              <div className="flex items-center p-3">
                <img className="w-[37px] h-[37px] rounded-full border-[#FFD6B6] border-2" src="assets/img/profile-image.jpg"></img>
                <p className="ml-3 text-[#000] font-[500] text-[13px]">Linh_Ipsum</p>
              </div>
              <div className="">
                <img className="w-full h-full" src="assets/img/food-1.png"></img>
              </div>

            </div>
            <div className="flex items-center mt-3 justify-between">
              <div className="flex items-center ">
                <div className="flex items-center"><FaHeart className="text-[#F44336] text-[25px]" />
                  <p className="ml-1 text-[#000] text-[12px] font-[400]">826</p>
                </div>
                <div className="ml-2 flex items-center">
                  <FaRegComment className="text-[25px]" />
                  <p className="ml-1 text-[#000] text-[12px] font-[400]">15</p>
                </div>
                <div className=" flex items-center ml-2">
                  <FiSend className="text-[25px]" />
                  <p className="ml-1 text-[#000] text-[12px] font-[400]">20</p>
                </div>
              </div>

              <div className="">
                <RiBookmarkLine className="text-[25px]" />
              </div>
            </div>

            <div className="flex items-center mt-3">
              <img className="w-[27px] h-[27px] rounded-full object-cover" src="assets/img/profile-image.jpg"></img>
              <img className="w-[27px] h-[27px] rounded-full object-cover relative left-[-7px]" src="assets/img/portrait-expressive-young-woman.jpg"></img>
              <img className="w-[27px] h-[27px] rounded-full object-cover relative left-[-7px]" src="assets/img/young-adult-enjoying-virtual-date.jpg"></img>
              <p className="ml-1 text-[12px] text-[#000] font-[400] ">Liked by<span className="font-[500]">_lorem_ispum___ </span>and <span className="font-[500]">others</span></p>
            </div>

            <div className="mt-2">
              <p className="text-[#000] text-[12px] font-[300]"><span className="font-[500]">Linh_Ipsum</span>"Fueling my body with goodness, one bite at a time. 🥑🍓
                "Fueling my body with goodness, one bite at a time. 🥑🍓Lorem Iopsum</p>
            </div>
            <div className="mt-2">
              <div className="relative">
                <input className="border rounded-full w-full p-1 bg-[#D9D9D97D]" type="text" id="fname" name="fname"></input>
                <FiSend className="text-[25px] absolute right-[13px] top-[9px] text-[#828282] !text-[17px]" />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-[#A0A0A0] text-[12px] font-[400]">View all comments</p>
              <div className="flex items-center">
                <p className="text-[#A0A0A0] text-[12px] font-[400]">20 mint ago.</p>
                <p className="text-[#4F4F4F] text-[11px] font-[400] ml-1">See Translation</p>
              </div>
            </div>

            <div className="bg-[#D9D9D97D] mt-2 p-3 rounded-xl">
              <div className="flex">
                <img className="w-[40px] h-[40px] rounded-full object-cover" src="assets/img/profile-image.jpg"></img>
                <div className=" ml-2">
                  <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center"><span className="text-[12px] font-[500] text-[#000] mr-1">Manny_Ipsum</span>20 mint ago. <FaHeart className="text-[#F44336] mr-1" /> by author</p>
                  <p className="text-[11px] font-[300] text-[#000]">"Fueling my body with goodness, one bite at a time. 🥑🍓Lorem Iopsum A little bit of healthy, a whole lot of delicious. 🥑🥒 #NourishYourBody"</p>
                  <div className="flex mt-2">
                    <p className="text-[10px] font-[400] text-[#A0A0A0]">Reply</p>
                    <p className="ml-3 text-[10px] font-[400] text-[#A0A0A0]">Hide</p>
                  </div>
                </div>
              </div>
              <div className="flex w-[84%] ml-auto mt-3">
                <img className="w-[40px] h-[40px] rounded-full object-cover" src="assets/img/profile-image.jpg"></img>
                <div className=" ml-2">
                  <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center"><span className="text-[12px] font-[500] text-[#000] mr-1">Linh_Ipsum</span>20 mint ago.author</p>
                  <p className="text-[10px] font-[300] text-[#000]">"Fueling my body with goodness, one bite at a time. 🥑🍓Lorem Iopsum A little bit of healthy, a whole lot of delicious. 🥑🥒 </p>

                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="bg-[#FEE4D0] rounded-t-2xl">
              <div className="flex items-center p-3">
                <img className="w-[37px] h-[37px] rounded-full border-[#FFD6B6] border-2" src="assets/img/profile-image.jpg"></img>
                <p className="ml-3 text-[#000] font-[500] text-[13px]">Linh_Ipsum</p>
              </div>
              <div className="">
                <img className="w-full h-full" src="assets/img/food-1.png"></img>
              </div>

            </div>
            <div className="flex items-center mt-3 justify-between">
              <div className="flex items-center ">
                <div className="flex items-center"><FaHeart className="text-[#F44336] text-[25px]" />
                  <p className="ml-1 text-[#000] text-[12px] font-[400]">826</p>
                </div>
                <div className="ml-2 flex items-center">
                  <FaRegComment className="text-[25px]" />
                  <p className="ml-1 text-[#000] text-[12px] font-[400]">15</p>
                </div>
                <div className=" flex items-center ml-2">
                  <FiSend className="text-[25px]" />
                  <p className="ml-1 text-[#000] text-[12px] font-[400]">20</p>
                </div>
              </div>

              <div className="">
                <RiBookmarkLine className="text-[25px]" />
              </div>
            </div>

            <div className="flex items-center mt-3">
              <img className="w-[27px] h-[27px] rounded-full object-cover" src="assets/img/profile-image.jpg"></img>
              <img className="w-[27px] h-[27px] rounded-full object-cover relative left-[-7px]" src="assets/img/portrait-expressive-young-woman.jpg"></img>
              <img className="w-[27px] h-[27px] rounded-full object-cover relative left-[-7px]" src="assets/img/young-adult-enjoying-virtual-date.jpg"></img>
              <p className="ml-1 text-[12px] text-[#000] font-[400] ">Liked by<span className="font-[500]">_lorem_ispum___ </span>and <span className="font-[500]">others</span></p>
            </div>

            <div className="mt-2">
              <p className="text-[#000] text-[12px] font-[300]"><span className="font-[500]">Linh_Ipsum</span>"Fueling my body with goodness, one bite at a time. 🥑🍓
                "Fueling my body with goodness, one bite at a time. 🥑🍓Lorem Iopsum</p>
            </div>
            <div className="mt-2">
              <div className="relative">
                <input className="border rounded-full w-full p-1 bg-[#D9D9D97D]" type="text" id="fname" name="fname"></input>
                <FiSend className="text-[25px] absolute right-[13px] top-[9px] text-[#828282] !text-[17px]" />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-[#A0A0A0] text-[12px] font-[400]">View all comments</p>
              <div className="flex items-center">
                <p className="text-[#A0A0A0] text-[12px] font-[400]">20 mint ago.</p>
                <p className="text-[#4F4F4F] text-[11px] font-[400] ml-1">See Translation</p>
              </div>
            </div>

            <div className="bg-[#D9D9D97D] mt-2 p-3 rounded-xl">
              <div className="flex">
                <img className="w-[40px] h-[40px] rounded-full object-cover" src="assets/img/profile-image.jpg"></img>
                <div className=" ml-2">
                  <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center"><span className="text-[12px] font-[500] text-[#000] mr-1">Manny_Ipsum</span>20 mint ago. <FaHeart className="text-[#F44336] mr-1" /> by author</p>
                  <p className="text-[11px] font-[300] text-[#000]">"Fueling my body with goodness, one bite at a time. 🥑🍓Lorem Iopsum A little bit of healthy, a whole lot of delicious. 🥑🥒 #NourishYourBody"</p>
                  <div className="flex mt-2">
                    <p className="text-[10px] font-[400] text-[#A0A0A0]">Reply</p>
                    <p className="ml-3 text-[10px] font-[400] text-[#A0A0A0]">Hide</p>
                  </div>
                </div>
              </div>
              <div className="flex w-[84%] ml-auto mt-3">
                <img className="w-[40px] h-[40px] rounded-full object-cover" src="assets/img/profile-image.jpg"></img>
                <div className=" ml-2">
                  <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center"><span className="text-[12px] font-[500] text-[#000] mr-1">Linh_Ipsum</span>20 mint ago.author</p>
                  <p className="text-[10px] font-[300] text-[#000]">"Fueling my body with goodness, one bite at a time. 🥑🍓Lorem Iopsum A little bit of healthy, a whole lot of delicious. 🥑🥒 </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forums;
