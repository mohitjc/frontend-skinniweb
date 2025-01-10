import { useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import { IoHandRightOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdDashboard, MdPerson } from "react-icons/md";


const Dashboard = () => {
  const user = useSelector((state) => state.user);

  // State to track the active dashboard
  const [activeDashboard, setActiveDashboard] = useState("exp");

  const handleDashboardSwitch = (dashboard) => {
    setActiveDashboard(dashboard);
  };

  return (
    <Layout>
      <div className="md:flex items-center justify-between gap-2">
      <h4 className="text-2xl font-bold mb-3 flex items-center gap-2">
        <IoHandRightOutline className="text-3xl slow-shake text-[#26ddd3]" />
        <span className="capitalize">Hi,</span>{" "}
        {user?.fullName
          ?.split(" ")
          ?.map((word, index) =>
            index === 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word
          )
          .join(" ")}
      </h4>
      
      {/* Buttons to switch between dashboards */}
      <div className="flex justify-center space-x-4 p-4 bg-gray-100 rounded-md shadow-md">
  <button
    onClick={() => handleDashboardSwitch("exp")}
    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
      activeDashboard === "exp"
        ? "bg-primary text-[#454242] shadow-lg"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`}
    aria-pressed={activeDashboard === "exp"}
  >
    <MdDashboard className="text-lg" />
    <span>Exp</span>
  </button>
  <button
    onClick={() => handleDashboardSwitch("user")}
    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
      activeDashboard === "user"
        ? "bg-primary text-[#454242] shadow-lg"
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    }`}
    aria-pressed={activeDashboard === "user"}
  >
    <MdPerson className="text-lg" />
    <span>User</span>
  </button>
</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
