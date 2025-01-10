
import { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt, FaVenus, FaCog, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import ApiClient from "../../methods/api/apiClient";
import Layout from "../../components/sidebarglobal/layout";

const MyProfile = () => {
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
    fetchProfileData(); // Fetch profile data when the component mounts
  }, []);

  return (
    <Layout>
    <div className="container mx-auto p-4">
    <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden mr-4">
              <img
                src={image || "https://via.placeholder.com/150"}
                alt="Profile Picture"
                className="w-20 h-20"
              />
              {editable && (
                <label htmlFor="imageInput" className="absolute bottom-0 right-0 cursor-pointer">
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <span className="bg-gray-500 p-1 text-white rounded-full">Edit</span>
                </label>
              )}
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-semibold">{form.fullName}</span>
              </div>
              <div className="text-sm text-gray-500">
                <span>{form.dob}</span> | <span>{form.gender}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="input-field">
              <label>Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                disabled={!editable}
              />
            </div>

            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!editable}
              />
            </div>

            <div className="input-field">
              <label>Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={!editable}
              />
            </div>

            <div className="input-field">
              <label>Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                disabled={!editable}
              />
            </div>

            <div className="input-field">
              <label>Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                disabled={!editable}
              />
            </div>

            <div className="input-field">
              <label>Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                disabled={!editable}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            {editable ? (
              <button onClick={handleSubmit} className="btn-save">
                Save Changes
              </button>
            ) : (
              <button onClick={() => setEditable(true)} className="btn-edit">
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Address Book</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
          <p className="text-sm text-gray-700">John Doe</p>
          <p className="text-sm text-gray-700">123 Main Street</p>
          <p className="text-sm text-gray-700">Cityville, NY 10001</p>
          <p className="text-sm text-gray-700">United States</p>
          <p className="text-sm text-gray-700">Phone: (555) 123-4567</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-blue-500 cursor-pointer">
              <FaCog className="inline mr-1" />
              Manage Address
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <p className="text-sm text-gray-700">Jane Doe</p>
          <p className="text-sm text-gray-700">456 Oak Avenue</p>
          <p className="text-sm text-gray-700">Townsville, CA 90001</p>
          <p className="text-sm text-gray-700">United States</p>
          <p className="text-sm text-gray-700">Phone: (555) 987-6543</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-blue-500 cursor-pointer">
              <FaCog className="inline mr-1" />
              Manage Address
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-8">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Total
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">#123</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">12/12/25</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$100.00</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded">View</button>
                <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded ml-2">Reorder</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                < div className="text-sm text-gray-900">#124</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">13/12/25</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$150.00</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded">View</button>
                <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded ml-2">Reorder</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">#125</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">14/12/25</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$200.00</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded">View</button>
                <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded ml-2">Reorder</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
}

export default MyProfile;