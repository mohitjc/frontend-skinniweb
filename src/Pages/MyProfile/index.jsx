import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/sidebarglobal/layout";
import { FaCog, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { BsGenderMale } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidBook } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { FaEye } from "react-icons/fa";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import environment from "../../environment";
import { login_success } from "../actions/user";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useNavigate } from "react-router-dom";
import FormControl from "../../components/common/FormControl";
import PhoneInput from "react-phone-input-2";

const MyProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    address: "",
    dob: "",
    gender: "male",
  });

  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState(""); // Profile image URL
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
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
  }, [sortBy, sortOrder, data]);

  // Fetch user profile data
  const fetchProfileData = () => {
    setLoading(true);
    ApiClient.get("profile")
      .then((res) => {
        if (res.success) {
          const { fullName, email, mobileNo, address, dob, gender, image } = res.data;
          setForm({ fullName, email, mobileNo, address, dob, gender });
          setImage(image);
        } else {
          toast.error("Failed to fetch profile data");
        }
      })
      .finally(() => setLoading(false));
  };

  // Handle profile update
  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.mobileNo || !form.address || !form.dob || !form.gender) {
      toast.error("All fields are required");
      return;
    }

    let payload = {
      fullName: form.fullName,
      email: form.email,
      mobileNo: form.mobileNo,
      address: form.address,
      dob: form.dob,
      gender: form.gender,
      image: image,
    };

    setLoading(true);
    ApiClient.put("editUserProfile", payload)
      .then((res) => {
        if (res.success) {
          let UserDetail = { ...user, ...res.data }
          dispatch(login_success(UserDetail));
          toast.success("Profile updated successfully");
          setEditable(false);
        } else {
          toast.error(res.message || "Failed to update profile");
        }
      })
      .finally(() => setLoading(false));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      ApiClient.postFormData("upload/image?modelName=user", { file: file })
        .then((res) => {
          if (res.success) {
            setImage(environment?.api + "images/user/" + res?.data?.fullpath);
            toast.success("Image uploaded successfully");
          } else {
            toast.error("Image upload failed");
          }
        })
        .catch(() => toast.error("Image upload failed"));
    }
  };

  useEffect(() => {
    if (user?._id || user?.id) {
      fetchProfileData(); // Fetch profile data when the component mounts
    }
  }, []);

  return (
    <Layout>
      <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
        <div className="flex items-center justify-between mb-10">
          <div className="relative w-full max-sm:flex-wrap flex items-center">
            <div className="relative min-w-[150px] md:min-w-[200px] w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full overflow-hidden rounded-full border-[10px] border-[#828282] sm:absolute top-[0px] left-[0px] z-10 mx-auto">
              <img
                src={image || "https://via.placeholder.com/150"}
                alt="Profile Picture"
                className="w-full h-full rounded-full border-[5px] border-[#FED6B6]"
              />
              {editable && (
                <div className="absolute bottom-0 right-0 cursor-pointer">
                  <label htmlFor="imageInput" className="relative">
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />

                    <LiaEdit className="bg-[#fff] rounded-full p-[6px] text-[30px] cursor-pointer absolute shadow-lg right-[13px] md:right-[28px] bottom-[4px] " />
                  </label>
                </div>
              )}
            </div>
            {!editable && <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-[2rem] 2xl:gap-x-[4rem] min-h-[174px] bg-[#FEE4D0] sm:ml-[5rem] !pl-[1.5rem] sm:!pl-[5.5rem] md:!pl-[9rem] 2xl:!pl-[10rem] mt-[12px] pr-[1.5rem] sm:pr-[4rem] xl:pr-[6rem] py-4 w-full rounded-[20px] rounded-r-[20px] lg:rounded-r-full">
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 font-[600]"><FaUser className="text-[#828282] text-[22px]" />{form.fullName}</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm"><MdEmail className="text-[#828282] text-[22px]" />{form.email}</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm"><FaCalendarAlt className="text-[#828282] text-[22px]" />{form.dob}</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm"><FaPhoneAlt className="text-[#828282] text-[22px]" />{form.mobileNo} </span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm "><BsGenderMale className="text-[#828282] text-[22px]" />{form.gender}</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm"><FaLocationDot className="text-[#828282] text-[22px]" />{form.address}</span>
              </div>
            </div>}

            {editable && <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-2 gap-x-[2rem] 2xl:gap-x-[4rem] min-h-[174px] bg-[#FEE4D0] sm:ml-[5rem] !pl-[1.5rem] sm:!pl-[5.5rem] md:!pl-[9rem] 2xl:!pl-[10rem] mt-[12px] pr-[1.5rem] sm:pr-[3rem] xl:pr-[6rem] py-4 w-full rounded-[20px] rounded-r-[20px] xl:rounded-r-full">
              <div className="flex max-md:flex-wrap items-center input-field">
                <label className="max-md:w-full text-sm mb-0 min-w-[95px] ">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  disabled={!editable}
                  className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
                />
              </div>

              <div className="flex max-md:flex-wrap items-center input-field">
                <label className="max-md:w-full text-sm mb-0 min-w-[95px]">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={!editable}
                  className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
                />
              </div>
              <div className="flex max-md:flex-wrap items-center input-field">
                <label className="max-md:w-full text-sm mb-0 min-w-[95px]">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  disabled={!editable}
                  className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
                />
              </div>
              <div className="flex max-md:flex-wrap items-center input-field">
                <label className="text-sm mb-0 min-w-[95px]">Phone</label>
                <PhoneInput
                className="input-set"
                  country="us"
                  value={form.number}
                  // placeholder="+44 0000000000"
                  enableSearch={true}
                  onChange={(value, data) => {
                    setForm({ ...form, number:value , mobileNo: value.slice(data.dialCode.length), code: data.dialCode || "1" })
                  }}
                  countryCodeEditable={true}
                />
              </div>
              <div className="flex max-md:flex-wrap items-center input-field">
                <label className="max-md:w-full text-sm mb-0 min-w-[95px]">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  disabled={!editable}
                  className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex max-md:flex-wrap items-center input-field">
                <label className="max-md:w-full text-sm mb-0 min-w-[95px]">Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  disabled={!editable}
                  className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
                />
              </div>
            </div>}
            <div className="">
              {editable ? (<>
                <IoChevronBackCircleSharp onClick={() => setEditable(false)} className="text-[26px] cursor-pointer absolute top-[0px] sm:top-[35px] right-[11px] xl:right-[50px]" />

              </>
              ) : (

                <LiaEdit onClick={() => setEditable(true)} className="text-[26px] cursor-pointer absolute top-[0px] sm:top-[35px] right-[32px] xl:right-[50px]" />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {editable && <button onClick={handleSubmit} className="bg-[#828282] text-white rounded-full hover:opacity-[90%] px-3 py-2">
            Save Changes
          </button>}
        </div>



        <div className="flex justify-between flex-wrap gap-x-5 gap-y-2 bg-[#FEE4D0] mt-10 px-4 py-3">
          <h2 className="">Address Book</h2>
          <p className="text-[#828282] text-sm flex items-center gap-1"><BiSolidBook className="text-[24px]" />Manage Address</p>
        </div>
        <div className="bg-[#F7F7F7] px-[1.5rem] sm:px-[2rem] py-[3rem] grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-[3rem]">
          <div className="flex items-center gap-x-3  sm:gap-x-5">
            <img src="/assets/img/line_div.png" className="h-[130px]" />
            <div className="relative w-full border !border-[#E0CCBD] bg-[#FEE4D0] p-4 rounded-[12px]">
              <h3 className="text-lg font-semibold pr-[2rem] mb-2">Billing Address</h3>
              <div className="">
                <p className="text-sm text-[#828282]">John Doe</p>
                <p className="text-sm text-[#828282]">123 Main Street</p>
                <p className="text-sm text-[#828282]">Cityville, NY 10001</p>
                <p className="text-sm text-[#828282]">United States</p>
                <p className="text-sm text-[#828282]">Phone: (555) 123-4567</p>
                <LiaEdit className="text-[24px] cursor-pointer absolute right-[22px] top-[22px]" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-3  sm:gap-x-5">
            <img src="/assets/img/line_div.png" className="h-[130px]" />
            <div className="w-full relative border !border-[#E0CCBD] bg-[#FEE4D0] p-4 rounded-[12px]">
              <h3 className="text-lg font-semibold pr-[2rem] mb-2">Shipping Address</h3>
              <p className="text-sm text-[#828282]">Jane Doe</p>
              <p className="text-sm text-[#828282]">456 Oak Avenue</p>
              <p className="text-sm text-[#828282]">Townsville, CA 90001</p>
              <p className="text-sm text-[#828282]">United States</p>
              <p className="text-sm text-[#828282]">Phone: (555) 987-6543</p>
              <LiaEdit className="text-[24px] cursor-pointer absolute right-[22px] top-[22px]" />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 mt-8"></h2>
        <div className="flex justify-between gap-x-5 gap-y-2 bg-[#FEE4D0] px-4 py-3">
          <h2 className="">Recent Orders</h2>
          <p className="text-[#828282] text-sm flex items-center gap-1 cursor-pointer" onClick={()=>history("/myorders")}><FaEye className="text-[22px]" />View All</p>
        </div>
        <div className="bg-[#F7F7F7] rounded-b-[12px] px-[1rem]">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th scope="col" className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 py-4">Order#</th>
                  <th scope="col" className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 py-4">Date</th>
                  <th scope="col" className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 py-4">Ship to</th>
                  <th scope="col" className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 py-4">Order Total</th>
                  <th scope="col" className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 py-4">Status</th>
                  <th scope="col" className="whitespace-nowrap text-[13px] xl:text-[14px] px-3 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.slice(0,3)?.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-3 py-4 text-[12px]">
                      <div className="text-sm">{order.id}</div>
                    </td>
                    <td className="px-3 py-4 text-[12px]">
                      <div className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-3 py-4 text-[12px]">
                      <div className="text-sm">{order.email}</div>
                    </td>
                    <td className="px-3 py-4 text-[12px]">
                      <div className="text-sm">${order.total}</div>
                    </td>
                    <td className="px-3 py-4 text-[12px]">
                      <div className="text-sm">{order.status === "active" ? "Complete" : "Pending"}</div>
                    </td>
                    <td className="px-3 py-4 text-[12px]">
                      <div>
                        <button className="flex gap-1 text-[12px] items-center cursor-pointer" onClick={()=>history(`myordersDetail/${order?.id}`)}>
                          <FaEye className="text-[18px]" />View
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="text-[12px] text-[#FF0000] flex items-center gap-1">
                        <PiDotsSixVerticalBold className="text-[18px]" />Reorder
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default MyProfile;