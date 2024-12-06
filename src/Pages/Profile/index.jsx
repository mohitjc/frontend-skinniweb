import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./profile.scss";
import methodModel from "../../methods/methods";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { TbGenderBigender } from "react-icons/tb";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { login_success, logout } from "../actions/user";
import { Accordion, Card, Button } from 'react-bootstrap';
import environment from "../../environment";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'

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

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
   
  useEffect(() => {
    if (user.loggedIn) {
      gallaryData();
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
        setForm({
          ...form,
          fullName: res?.data?.fullName,
          email: res?.data?.email,
          dob: res?.data?.dob,
          gender: res?.data?.gender,
        });
        setImage(res?.data?.image);
        handleSurvayData(res?.data?.surveyData);
        // setSurwayData(formatData(res?.data?.surveyCompleteData));
        // setSurwayData(res?.data?.surveyCompleteData
        // )
      }
      loader(false);
    });
  };

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
           else if (item.answer == "phoneNumber"){
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
    })?.filter((itm)=> itm?.answer != "" && itm?.answer != "No answer available"   );
  
    // Update the state with the mapped data
    setSurwayData(mappedData);
  };
  
  

  const handleSubmit = () => {
    if (
      !form?.fullName ||
      !form?.email ||
      !form?.gender ||
      !form?.dob ||
      !image
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

 
  

  return (
    <div className="">
      <div className="bg_color_profile">
        <div className="container ">
          <div className="bg_profile">
            <div className="logo_profile">
              <img src="/assets/img/Skinnii-Logo.webp" />
            </div>
        
            <div className="text_logout w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md text-sm/6 font-semibold text-[#000] shadow-inner shadow-white/10 focus:outline-none ">
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
                handleLogout();
              }} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 whitespace-nowrap">
              Logout
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button onClick={() => {
                  history("/changepassword");
                }} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 whitespace-nowrap">
              Change Password
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
          </div>
          <div className="">
            <div className="profile_main">
              <div
                className="profile_upload"
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={
                    image ||
                    "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp"
                  }
                  alt="Profile"
                  style={{
                    width: 150,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
                <MdEdit
                  disabled={!editable}
                  className="edit_icon"
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

              <div className="my_profile">
                <div className="mb-5">
                  {/* <div className="header_frofile mb-3">
                    <h2>MY GOALS</h2>
                  </div> */}
                  <div className="row_div">
                    <div className="card_box">
                      <div className="card_text mb-1">
                        <img src="/assets/img/profileimg1.png" />
                        <div className="">
                          <h3>100 Pound</h3>
                          <p>Current Weight in Pound</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box">
                      <div className="card_text mb-1">
                        <img src="/assets/img/profileimg2.png" />
                        <div className="">
                          <h3>100 Pound</h3>
                          <p>Current Height in Pound</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box">
                      <div className="card_text mb-1">
                        <img src="/assets/img/profileimg3.png" />
                        <div className="">
                          <h3>60 Pound</h3>
                          <p>Goal Weight in Pound</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box">
                      <div className="card_text mb-1">
                        <img src="/assets/img/profileimg4.png" />
                        <div className="">
                          <h3>Vegetarian</h3>
                          <p>Diet Type</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box">
                      <div className="card_text mb-1">
                        <img src="/assets/img/profileimg5.png" />
                        <div className="">
                          <h3>Moderatly Active</h3>
                          <p>How Active You Are?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="header_frofile mb-3">
                    <h2>MY PROFILE</h2>
                    {!editable ? (
                      <div
                        onClick={() => {
                          setEditable(true);
                        }}
                        className="edit_info"
                      >
                        <MdEdit /> Edit Info
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          handleSubmit();
                        }}
                        className="edit_info"
                      >
                        <FaSave /> Save
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="card_input">
                        <input
                          required
                          className="form-control"
                          placeholder="Full Name"
                          onChange={(e) => {
                            setForm({ ...form, fullName: e?.target?.value });
                          }}
                          value={form?.fullName}
                          disabled={!editable}
                        ></input>
                        <FaUser />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card_input">
                        <input
                          className="form-control"
                          placeholder="E-Mail"
                          onChange={(e) => {
                            setForm({ ...form, email: e?.target?.value });
                          }}
                          value={form?.email}
                          disabled={!editable}
                        ></input>
                        <MdEmail />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card_input">
                        <input
                          type="date"
                          className="form-control"
                          placeholder="dd/mm/yyy"
                          onChange={(e) => {
                            setForm({ ...form, dob: e?.target?.value });
                          }}
                          value={form?.dob}
                          disabled={!editable}
                        ></input>
                        <FaCalendarAlt />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card_input">
                        <select
                          className="form-control"
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

                        <TbGenderBigender />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max_width">
                  <div className="header_frofile mb-3">
                <h2 className="mb-3">SURVAY DATA</h2>
                </div>
                    <div class="">
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


                            {/* <div class="card_data">
                                <div class="card-header" id="dataHeading-2">
                                    <div class="mb-0">
                                        <h5 class="data-title" data-toggle="text_data collapse" data-target="#dataCollapse-2" data-aria-expanded="false" data-aria-controls="dataCollapse-2">
                                            <span class="badge mr-2">2</span> Where does it come from?
                                        </h5>
                                    </div>
                                </div>
                                <div id="dataCollapse-2" class="collapse" aria-labelledby="dataHeading-2" data-parent="#accordion">
                                    <div class="card-body">
                                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                                    </div>
                                </div>
                            </div> */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
