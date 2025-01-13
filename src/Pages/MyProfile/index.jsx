
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import ApiClient from "../../methods/api/apiClient";
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


const MyProfile = () => {
  const user = useSelector((state) => state.user);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
  });

  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState(""); // Profile image URL
  const [loading, setLoading] = useState(false);

  // Fetch user profile data
  const fetchProfileData = () => {
    setLoading(true);
    ApiClient.get("profile")
      .then((res) => {
        if (res.success) {
          const { fullName, email, phone, address, dob, gender, image } = res.data;
          setForm({ fullName, email, phone, address, dob, gender });
          setImage(image);
        } else {
          toast.error("Failed to fetch profile data");
        }
      })
      .finally(() => setLoading(false));
  };

  // Handle profile update
  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.phone || !form.address || !form.dob || !form.gender) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      dob: form.dob,
      gender: form.gender,
      image: image,
    };

    setLoading(true);
    ApiClient.put("editUserProfile", payload)
      .then((res) => {
        if (res.success) {
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
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      ApiClient.postFormData("upload/image?modelName=user", formData)
        .then((res) => {
          if (res.success) {
            setImage(res.data.fullpath); 
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
    <div className="bg-white p-[2rem] rounded-[12px]">
        <div className="flex items-center justify-between mb-10">
          <div className="relative w-full flex items-center">
            <div className="min-w-[200px] w-[200px] h-[200px] rounded-full overflow-hidden rounded-full border-[10px] border-[#828282] absolute top-[0px] left-[0px] z-10">
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
                  
                  <LiaEdit className="bg-[#fff] rounded-full p-[6px] text-[30px] cursor-pointer absolute right-[28px] bottom-[4px] "/>
                </label>
                </div>
              )}
            </div>
            {!editable && <div className="grid grid-cols-2 gap-y-2 gap-x-[6rem] min-h-[174px] bg-[#FEE4D0] ml-[5rem] !pl-[10rem] mt-[12px] pr-[6rem] py-4 w-full rounded-r-full">
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 font-[600]"><FaUser className="text-[#828282] text-[22px]" />{form.fullName}</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm"><MdEmail className="text-[#828282] text-[22px]"/>{form.email}</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm"><FaCalendarAlt className="text-[#828282] text-[22px]"/>{form.dob}</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm"><FaPhoneAlt className="text-[#828282] text-[22px]"/>{form.phone} </span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm "><BsGenderMale className="text-[#828282] text-[22px]"/>{form.gender}</span>
              </div>
              <div className="flex items-center">
                <span className="flex items-center text-[18px] gap-2 text-sm"><FaLocationDot className="text-[#828282] text-[22px]"/>{form.address}</span>
              </div>
            </div>}

          {editable && <div className="grid grid-cols-2 gap-y-2 gap-x-[6rem] min-h-[174px] bg-[#FEE4D0] ml-[5rem] !pl-[10rem] mt-[12px] pr-[6rem] py-4 w-full rounded-r-full">
            <div className="flex items-center input-field">
              <label className="text-sm mb-0 min-w-[120px] ">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                disabled={!editable}
                className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
              />
            </div>

            <div className="flex items-center input-field">
              <label className="text-sm mb-0 min-w-[120px]">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!editable}
                className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
              />
            </div>
            <div className="flex items-center input-field">
              <label className="text-sm mb-0 min-w-[120px]">Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                disabled={!editable}
                className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
              />
            </div>
            <div className="flex items-center input-field">
              <label className="text-sm mb-0 min-w-[120px]">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!editable}
                className="bg-[#00000017] w-full rounded-[12px] text-sm px-3 py-2"
              />
            </div>
            <div className="flex items-center input-field">
              <label className="text-sm mb-0 min-w-[120px]">Gender</label>
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
            <div className="flex items-center input-field">
              <label className="text-sm mb-0 min-w-[120px]">Address</label>
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
            <IoChevronBackCircleSharp onClick={() => setEditable(false)} className="text-[26px] cursor-pointer absolute top-[35px] right-[50px]" />

              </>
            ) : (
           
              <LiaEdit onClick={() => setEditable(true)} className="text-[26px] cursor-pointer absolute top-[35px] right-[50px]" />
            )}
          </div>
          </div>
        </div>
        <div className="flex justify-end">
        {editable && <button onClick={handleSubmit} className="bg-[#828282] text-white rounded-full hover:opacity-[90%] px-3 py-2">
                Save Changes
              </button>}
              </div>

      
  
<div className="flex justify-between gap-x-5 gap-y-2 bg-[#FEE4D0] mt-10 px-4 py-3">
      <h2 className="">Address Book</h2>
      <p className="text-[#828282] text-sm flex items-center gap-1"><BiSolidBook className="text-[24px]"/>Manage Address</p>
      </div>
      <div className="bg-[#F7F7F7] px-[2rem] py-[3rem] grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-[3rem]">
        <div className="flex items-center gap-x-5">
        <img src="/assets/img/line_div.png" className="h-[130px]"/>
        <div className="relative w-full border !border-[#E0CCBD] bg-[#FEE4D0] p-4 rounded-[12px]">
          <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
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
        <div className="flex items-center gap-x-5">
        <img src="/assets/img/line_div.png" className="h-[130px]"/>
        <div className="w-full relative border !border-[#E0CCBD] bg-[#FEE4D0] p-4 rounded-[12px]">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
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
      <p className="text-[#828282] text-sm flex items-center gap-1"><FaEye className="text-[22px]"/>View All</p>
      </div>
      <div className="bg-[#F7F7F7] rounded-b-[12px]">
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead>
            <tr>
              <th scope="col" className="whitespace-nowrap px-3 py-4">
              Order#
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-4">
              Date
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-4">
              Ship to             
               </th>
              <th scope="col" className="whitespace-nowrap px-3 py-4">
              Order Total             
               </th>
               <th scope="col" className="whitespace-nowrap px-3 py-4">
               Status            
               </th>
               <th scope="col" className="whitespace-nowrap px-3 py-4">
               Action             
               </th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="border-t">
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm ">0000345</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm">12/12/25</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm ">Lawrance Nobel</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm ">$81.00</div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm ">Complete</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              <div className="">
                <button className="flex gap-1 text-sm items-center cursor-pointer"><FaEye className="text-[18px]"/>View Reorder</button>
                </div>
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                <div className="text-sm text-[#FF0000] flex items-center gap-1"><PiDotsSixVerticalBold className="text-[18px]" />Reorder</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
  </div>
    </Layout>
  );
}

export default MyProfile;