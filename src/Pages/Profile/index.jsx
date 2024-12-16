import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { TbGenderBigender } from "react-icons/tb";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { login_success, logout } from "../actions/user";
import environment from "../../environment";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import PieChart from "../../components/eCharts/PieChart";
import moment from "moment";

const Profile = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [editable, setEditable] = useState(false);
  const [surwayData, setSurwayData] = useState();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    dob: "",
    gender: "",
  });
  const [image, setImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [dietMeasures, setDietMeasures] = useState([""])
  const [dietPlan, setDietPlan] = useState([])
  const [videos, setVideos] = useState([])

  const [month, setMonth] = useState([])

  const moderatelyActive = [
    { value: 1, text: "Sedentary" },
    { value: 2, text: "Lightly Active" },
    { value: 3, text: "Moderately Active" },
    { value: 4, text: "Very Active" },
    { value: 5, text: "Extra Active" },
  ]

  const getVideoId = (url) => {
    const regExp = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/))([a-zA-Z0-9_-]{11})/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };

  const embedUrl = `https://www.youtube.com/embed/${getVideoId(videos?.[0]?.url)}`;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    generateCurrentMonth()
    if (user.loggedIn) {
      gallaryData();
      getVideos()
    } else {
      history("/login");
    }
  }, []);

  const data = [
    { question: "How Much Weight Do You Want To Lose?", answer: "typeA" },
    { question: "What are your weight management goals?", answer: "whatAre" },
    {
      question: "What compounded management medication do you have in mind?",
      answer: "whatCompounded",
    },
    { question: "Contact Details", answer: "contactDetails" },
    { question: "Email", answer: "email" },
    { question: "Phone Number", answer: "phoneNumber" },
    { question: "Sex Assigned At Birth", answer: "sexAssigned" },
    { question: "Preferred Gender Pronouns", answer: "preferredGender" },
    { question: "Terms & Conditions", answer: "httpsskiniicomlegal-notice" },
    {
      question:
        "I consent to receive marketing and SMS communications on offers from Skinii Corp.",
      answer: "iConsent",
    },
    { question: "General Health Questionnaire", answer: "generalHealth" },
    { question: "BMI Calculator", answer: "bmiCalculator" },
    {
      question: "Do you currently have a government insurance plan?",
      answer: "doYou",
    },
    {
      question: "Which type of health insurance do you have?",
      answer: "whichType",
    },
    {
      question:
        "Have you seen your primary care provider in the past 12 months?",
      answer: "haveYou",
    },
    {
      question: "Are you currently pregnant or trying to become pregnant?",
      answer: "areYou",
    },
    { question: "Are you currently breastfeeding?", answer: "areYou54" },
    {
      question:
        "Do you currently have, or have you ever been diagnosed with, any of the following heart or heart-related conditions?",
      answer: "doYou35",
    },
    {
      question:
        "Do you currently have, or have you ever been diagnosed with, any of these hormones, kidney, or liver conditions?",
      answer: "doYou36",
    },
    {
      question:
        "Do you currently have or have you ever been diagnosed with type 2 diabetes?",
      answer: "doYou37",
    },
    {
      question:
        "Do you currently have or have you ever been diagnosed with diabetic retinopathy?",
      answer: "doYou38 ",
    },
    {
      question:
        "Do you currently have, or have a history of, any of these gastrointestinal conditions or procedures?",
      answer: "doYou39",
    },
    {
      question:
        "Do you currently have, or have you ever been diagnosed with, any of these additional following conditions?",
      answer: "doYou40",
    },
    { question: "Do you have any allergies?", answer: "doYou41" },
    { question: "List any allergies below", answer: "listAny" },
    {
      question: "Do you have an allergy to GLP-1 agonist medications?",
      answer: "doYou44",
    },
    {
      question: "Do you currently take any of the following medications?",
      answer: "doYou45",
    },
    {
      question:
        "List any medications, vitamins, dietary supplements, and topical creams you are currently taking or using.",
      answer: "listAny46",
    },
    {
      question: "How would you describe yourself? Select all that apply.",
      answer: "whatAre",
    },
    { question: "What are your weight management goals?", answer: "howWould" },
    {
      question:
        "Is there anything else you want your health care provider to know about your health?",
      answer: "isThere",
    },
    {
      question: "Checkout Your Preferred Membership Tier",
      answer: "checkoutYour",
    },
    { question: "What state do you live in?", answer: "whatState" },
    { question: "Provide your shipping address", answer: "address" },
    { question: "Appointment", answer: "appointment" },
  ];

  const uploadImage = async (e) => {
    const url = "upload/image?modelName=user";
    loader(true);
    let file = e;
    const res = await ApiClient.postFormData(url, { file: file });
    if (res.success == true || res?.code == 200) {
      toast?.success(res?.message);
      setImage(environment?.api + "images/user/" + res?.data?.fullpath);
    }
    loader(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };
  const gallaryData = () => {
    loader(true);
    ApiClient.get(`profile`).then((res) => {
      if (res.success) {
        getDietPlan(res?.data,moment().format("YYYY-MM-DD"))
        setForm({
          ...form,
          fullName: res?.data?.fullName,
          email: res?.data?.email,
          dob: res?.data?.dob,
          gender: res?.data?.gender,
        });
        setImage(res?.data?.image);
        handleSurvayData(res?.data?.surveyData ? res?.data?.surveyData : "");
      }
      loader(false);
    });
  };

  const getDietPlan = (data,date) => {
    const fitnessGoalId = data?.caloriesInfo?.map((item) => item?.id)
    const calories = data?.caloriesInfo?.map((item) => item?.calories)
    const payload = {
      date: date,
      fitnessGoalId: String(fitnessGoalId),
      calories: String(calories)
    }
    ApiClient.get(`getFoodList`, payload).then(res => {
      if (res.success) {
        if(res?.data?.length > 0){
          setDietPlan(res?.data)
          setDietMeasures(res?.data)
        }else{
          setDietPlan([res?.data])
          setDietMeasures([res?.data])
        }
      }
    })
  }

  const getVideos = () => {
    ApiClient.get(`getExerciseVideo?goalType=${"Loss Weight"}`).then(res => {
      if (res.success) {
        setVideos(res?.data)
      }
    })
  }

  const formatData = (rawData) => {
    const keyValuePairs = rawData.split(",").map((item) => item.split(":"));
    const structuredData = keyValuePairs.map(([question, answer]) => {
      if (answer?.startsWith("[") && answer?.endsWith("]")) {
        answer = JSON.parse(answer);
      }
      return {
        question: question?.trim(),
        answer: answer?.trim(),
      };
    });

    return structuredData;
  };

  const handleSurvayData = (apiData) => {
    if (apiData == "") {
      setSurwayData([])
    }
    else {
      const mappedData = data?.map((item) => {
        const contactDetailsKey = Object?.keys(apiData)?.find((key) =>
          key?.includes(item?.answer)
        );

        if (contactDetailsKey) {
          let answer = apiData[contactDetailsKey];
          if (Array.isArray(answer)) {
            answer = answer.join(", ");
          }
          else if (typeof answer === "object" && answer !== null) {
            if (item.answer === "generalHealth") {
              const { field_5, field_6, field_7, field_4 } = answer;
              answer = `Height: ${field_5}, Weight: ${field_6}, Age: ${field_7}, Date of Birth: ${field_4}`;
            }
            else if (item.answer === "checkoutYour") {
              try {
                if (answer.special_1000 && answer.special_1000.item_0) {
                  answer = `Special Offer= ${answer.special_1000.item_0}`;
                } else {
                  answer = "No special offer details available";
                }
              } catch (e) {
                answer = "Invalid data for checkoutYour";
              }
            }
            else if (item.answer == "phoneNumber") {
              answer = `${answer?.full}`
            }
            else if (answer.first && answer.last) {
              answer = `${answer.first} ${answer.last}`;
            }
            else if (answer.addr_line1) {
              answer = `${answer.addr_line1}, ${answer.addr_line2}, ${answer.city}, ${answer.state}, ${answer.postal}`;
            }
            else if (answer.date) {
              answer = new Date(answer.date).toLocaleString();
            }
            else {
              answer = JSON.stringify(answer);
            }
          }
          else if (item.answer === "bmiCalculator" && typeof answer === "string") {
            try {
              const bmiData = JSON.parse(answer);

              if (Array.isArray(bmiData) && bmiData.length > 0) {
                let bmiResults = bmiData.map((itm) => {
                  return `BMI: ${itm.bmi}, Weight(Lbs): ${itm["weight(Lbs)"]}, Height(feet/inches): ${itm["height(feet/inches)"]},Weight(KGs) : ${itm["weight(KGs)"]}, Height(cm) : ${itm["height(cm)"]}`;
                });
                answer = bmiResults.join("\n");
              } else {
                answer = "No BMI data available";
              }
            } catch (e) {
              answer = "Invalid BMI data";
            }
          }
          else if (typeof answer === "string" || typeof answer === "number") {
            answer = answer.toString();
          }

          return { question: item.question, answer };
        }

        else {
          return { question: item.question, answer: "No answer available" };
        }
      })?.filter((itm) => itm?.answer != "" && itm?.answer != "No answer available");

      // Update the state with the mapped data
      setSurwayData(mappedData);
    }

  };

  const handleSubmit = () => {
    if (
      !form?.fullName ||
      !form?.email ||
      !form?.gender ||
      !form?.dob
      // !image
    ) {
      toast?.error("All Fields are required");
      return;
    } else {
      const payload = {
        fullName: form?.fullName,
        email: form?.email,
        dob: form?.dob,
        gender: form?.gender,
        image: image,
      };
      loader(true);
      ApiClient.put("editUserProfile", payload).then((res) => {
        if (res.success == true || res?.code == 200) {
          let uUser = { ...user, ...payload };
          dispatch(login_success(uUser));
          setEditable(false);
          toast?.success(res?.message);
          loader(false);
        } else {
          toast?.error(res?.message);
          loader(false);
        }
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    history("/login");
  };

  const generateCurrentMonth = (selectedDate = "") => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
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
    setMonth(daysArray)
  };
  
  const handleDateFilter=(date)=>{
    generateCurrentMonth(date)
    getDietPlan(user,date)
  }

  return (
    <div className="">
      <div className="bg-[#ffeadc] pb-[2rem]">
        <div className="max-[575px]:pl-0 max-[575px]:pr-0 container xl:!max-w-[1280px]">
          <div className="bg_profile bg-cover bg-no-repeat max-[575px]:h-[140px] h-[115px] sm:h-[138px] md:h-[167px] lg:h-[225px] xl:h-[283px] bg-center flex justify-center items-center relative">
            <div className="logo_profile">
              <img src="/assets/img/Skinnii-Logo.webp" className="w-[100px] lg:w-[150px] object-contain" />
            </div>
            <div className="absolute top-[10px] right-[1rem] sm:right-[2rem] font-[600] cursor-pointer text-right">
              <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md text-sm/6 font-semibold text-[#000] shadow-inner shadow-white/10 focus:outline-none bg-[#ffffff4f] px-2">
                  My Account
                  <ChevronDownIcon className="size-4" />
                </MenuButton>
                <MenuItems
                  transition
                  anchor="bottom end"
                  className="w-fit origin-top-right rounded-xl border border-white/5 bg-[#000] p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <MenuItem>
                    <button onClick={() => {
                      history("/changepassword");
                    }} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 whitespace-nowrap">
                      Change Password
                    </button>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <button onClick={() => {
                      handleLogout();
                    }} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 whitespace-nowrap">
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
        <div className="container xl:!max-w-[1280px]">
          <div className="">
            <div className="max-md:mt-8 md:mt-[-90px] lg:mt-[-145px] xl:mt-[-200px] md:p-[0rem_5rem]">
              <div className="relative w-fit max-md:mx-auto">
                <img
                  src={
                    image ||
                    "https://d2v5dzhdg4zhx3.cloudfont.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp"
                  }
                  alt="Profile"
                  className="w-[120px] lg:w-[150px] xl:w-[200px] h-[120px] lg:h-[150px] xl:h-[200px] object-cover rounded-full border-[3px] border-[#FED6B6] shadow-[0px_0px_0px_10px_#828282] lg:shadow-[0px_0px_0px_15px_#828282]"
                />
                <MdEdit
                  disabled={!editable}
                  className="w-[40px] h-[40px] border-[1px] border-[#828282] p-[10px] rounded-full bg-[#D9D9D9] text-[#828282] absolute bottom-[-5px] xl:bottom-[0px] right-[0px] xl:right-[8px] cursor-pointer flex justify-center items-center text-[20px]"
                  onClick={() => document.getElementById("fileInput").click()} // Trigger file input on edit icon click
                  style={{}}
                />
                <input
                  disabled={!editable}
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="my_profile mt-[3rem] md:mt-[4rem] xl:mt-[6rem]">
                <div className="mb-5">
                  <div className="max-[480px]:!grid-cols-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    <div className="card_box">
                      <div className="flex items-center gap-2">
                        <img src="/assets/img/profileimg1.png" className="h-[35px] w-[35px] object-contain" />
                        <div className="w-full">
                          <h3 className="text-[14px] font-[600] text-center text-[#828282]">100 Pound</h3>
                          <p className="text-[12px] text-[#828282]">Current Weight in Pound</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box">
                      <div className="flex items-center gap-2">
                        <img src="/assets/img/profileimg2.png" className="h-[35px] w-[35px] object-contain" />
                        <div className="w-full">
                          <h3 className="text-[14px] font-[600] text-center text-[#828282]">100 Pound</h3>
                          <p className="text-[12px] text-[#828282]">Current Height in Pound</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box">
                      <div className="flex items-center gap-2">
                        <img src="/assets/img/profileimg3.png" className="h-[35px] w-[35px] object-contain" />
                        <div className="w-full">
                          <h3 className="text-[14px] font-[600] text-center text-[#828282]">60 Pound</h3>
                          <p className="text-[12px] text-[#828282]">Goal Weight in Pound</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box">
                      <div className="flex items-center gap-2">
                        <img src="/assets/img/profileimg4.png" className="h-[35px] w-[35px] object-contain" />
                        <div className="w-full">
                          <h3 className="text-[14px] font-[600] text-center text-[#828282]">Vegetarian</h3>
                          <p className="text-[12px] text-[#828282]">Diet Type</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box">
                      <div className="flex items-center gap-2">
                        <img src="/assets/img/profileimg5.png" className="h-[35px] w-[35px] object-contain" />
                        <div className="w-full">
                          <h3 className="text-[14px] font-[600] text-center text-[#828282]">Moderatly Active</h3>
                          <p className="text-[12px] text-[#828282]">How Active You Are?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex justify-between gap-5 items-center mb-3">
                    <h2 className="text-[20px] text-[#828282] font-[600]">MY PROFILE</h2>
                    {!editable ? (
                      <div
                        onClick={() => {
                          setEditable(true);
                        }}
                        className="flex items-center gap-2 text-[#828282] text-[14px] cursor-pointer hover:text-[#252525]"
                      >
                        <MdEdit className="relative top-[-1px]" /> Edit Info
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          handleSubmit();
                        }}
                        className="flex items-center gap-2 text-[#828282] text-[14px] cursor-pointer hover:text-[#252525]"
                      >
                        <FaSave className="relative top-[-1px]" /> Save
                      </div>
                    )}
                  </div>
                  <div className="grid max-[480px]:!grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="">
                      <div className="relative">
                        <input
                          required
                          className="w-full border-[1px] border-[#c1c1c1] bg-[#ede2db] h-[40px] pr-3 pl-[40px] text-[12px] font-[600] rounded-[8px]"
                          placeholder="Full Name"
                          onChange={(e) => {
                            setForm({ ...form, fullName: e?.target?.value });
                          }}
                          value={form?.fullName}
                          disabled={!editable}
                        ></input>
                        <FaUser className="absolute top-[0px] left-[0px] w-[40px] h-[40px] p-[10px] text-[#828282]" />
                      </div>
                    </div>
                    <div className="">
                      <div className="relative">
                        <input
                          className="w-full border-[1px] border-[#c1c1c1] bg-[#ede2db] h-[40px] pr-3 pl-[40px] text-[12px] font-[600] rounded-[8px]"
                          placeholder="E-Mail"
                          onChange={(e) => {
                            setForm({ ...form, email: e?.target?.value });
                          }}
                          value={form?.email}
                          disabled={!editable}
                        ></input>
                        <MdEmail className="absolute top-[0px] left-[0px] w-[40px] h-[40px] p-[10px] text-[#828282]" />
                      </div>
                    </div>
                    <div className="">
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full border-[1px] border-[#c1c1c1] bg-[#ede2db] h-[40px] pr-3 pl-[40px] text-[12px] font-[600] rounded-[8px]"
                          placeholder="dd/mm/yyy"
                          onChange={(e) => {
                            setForm({ ...form, dob: e?.target?.value });
                          }}
                          value={form?.dob}
                          disabled={!editable}
                        ></input>
                        <FaCalendarAlt className="absolute top-[0px] left-[0px] w-[40px] h-[40px] p-[10px] text-[#828282]" />
                      </div>
                    </div>
                    <div className="">
                      <div className="relative">
                        <select
                          className="w-full border-[1px] border-[#c1c1c1] bg-[#ede2db] h-[40px] pr-3 pl-[40px] text-[12px] font-[600] rounded-[8px]"
                          onChange={(e) => {
                            setForm({ ...form, gender: e.target.value });
                          }}
                          value={form?.gender}
                          disabled={!editable}
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <TbGenderBigender className="absolute top-[0px] left-[0px] w-[40px] h-[40px] p-[10px] text-[#828282]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <TabGroup>
                      <TabList className="flex justify-center gap-4">
                        <Tab
                          key={"tab_1"}
                          className="rounded-full focus:outline-none bg-[#fff] data-[selected]:bg-[#FED6B6] data-[hover]:bg-[#FED6B6] rounded-full w-[100px] h-[100px] flex justify-center items-center p-3"
                        >
                          {""}<img src="/assets/img/tab_select.png" className="w-[60px] h-[60px] object-contain" />
                        </Tab>
                        <Tab
                          key={"tab_2"}
                          className="rounded-full focus:outline-none bg-[#fff] data-[selected]:bg-[#FED6B6] data-[hover]:bg-[#FED6B6] w-[100px] h-[100px] rounded-full flex justify-center items-center p-3 "
                        >
                          {""}<img src="/assets/img/tab_select2.png" className="w-[60px] h-[60px] object-contain" />
                        </Tab>
                      </TabList>
                      <TabPanels className="mt-3">
                        <TabPanel key={"tab_1"} className="rounded-xl bg-white/5 p-3">
                          <div className="bg-white px-[1rem] sm:px-[2rem] py-[2rem] rounded-[10px] max-w-[800px] mx-auto">
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
                              <div className="flex items-center gap-2">
                                <h2 className="text-[#FFBF8B] font-[600] text-[18px] whitespace-nowrap">
                                  {moment().format("MMMM YYYY")}
                                </h2>
                                <div className="h-[1px] w-full bg-[#FFF0E5]"></div>
                              </div>
                              <div className="py-8">
                                <div className="grid grid-cols-1 gap-5">
                                  <div className="grid grid-cols-7 gap-5">
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => {
                                      return (
                                        <h3 key={index} className="text-[14px] font-[600] text-center text-[#828282] w-[35px] h-[35px] rounded-full flex justify-center items-center mx-auto">
                                          {day}
                                        </h3>
                                      );
                                    })}
                                  </div>
                                  <div className="grid grid-cols-7 gap-5">
                                    {month?.map((item, index) => {
                                      return (
                                        <p
                                          key={index}
                                          onClick={e=>handleDateFilter(item.currentDate)}
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
                                        <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">132 Cals</span> | <span className="">2g Net Cards</span></p>
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
                                        <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">132 Cals</span> | <span className="">2g Net Cards</span></p>
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
                                        <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">132 Cals</span> | <span className="">2g Net Cards</span></p>
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
                                        <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">132 Cals</span> | <span className="">2g Net Cards</span></p>
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
                                        <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">132 Cals</span> | <span className="">2g Net Cards</span></p>
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
                                        <p className="text-[10px] text-center text-[#828282] text-[400]">Recommended: <span className="">132 Cals</span> | <span className="">2g Net Cards</span></p>
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
                                <div className="bg-[#EEEEEE] rounded-[15px] p-[1.5rem]">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                    <div className="bg-white rounded-[12px]">
                                      <iframe
                                        width="560"
                                        height="315"
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
                        </TabPanel>
                        <TabPanel key={"tab_2"} className="rounded-xl bg-white/5 p-3">
                          <div className="bg-[#00000008] px-[1rem] sm:px-[1rem] py-[2rem] rounded-[10px] max-w-[800px] mx-auto">
                            <h2 className="text-center text-[18px] text-[#828282] font-[600] mb-3">SURVAY DATA</h2>
                            {/* <div class="">
                              <div class="data_div" id="accordion">
                                <div className="accordion">
                                  {surwayData?.map((item, index) => (
                                    <div className="card_data" key={index}>
                                      <div className="" onClick={() => toggleAccordion(index)}>
                                        <h5 className="data-title">
                                          <span className="badge mr-2">{index + 1}</span>{item?.question}
                                        </h5>
                                      </div>
                                      {activeIndex === index && (
                                        <div className="text_data">
                                          <p>{item?.answer}</p>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div> */}
                            <div className="max-w-[600px] mx-auto">
                              <div className="grid grid-cols-1 gap-3">
                                {surwayData?.map((item, index) => (<Disclosure as="div" className="border !border-[#c1c1c1] rounded-[8px]" defaultOpen={false}>
                                  <DisclosureButton className="bg-[#ede2db] group flex w-full justify-between rounded-[8px] p-3" >
                                    <span className="text-sm text-left font-medium">
                                      {item?.question}
                                    </span>
                                    <ChevronDownIcon className="size-5 group-data-[open]:rotate-180" />
                                  </DisclosureButton>
                                  <DisclosurePanel className="border-t !border-[#c1c1c1] bg-[#efe9e4] text-sm rounded-b-[8px] p-3">
                                    {item?.answer}
                                  </DisclosurePanel>
                                </Disclosure>))}
                              </div>
                            </div>
                            <ul>
                              {/* {surwayData?.map((item, index) => (
                                <li key={index}>
                                  <strong>{item?.question}</strong>: {item?.answer}
                                </li>
                              ))} */}
                            </ul>
                          </div>
                        </TabPanel>
                      </TabPanels>
                    </TabGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
