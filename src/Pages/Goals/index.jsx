import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";

const Goals = () => {
  return (
    <Layout>
       <div className="bg-white p-[2rem] rounded-[12px] mb-8">
        <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] p-[2rem] rounded-[12px] mb-[3rem]">
          <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
          <div className="">
        <h1 className="text-[22px] font-bold mb-1">My Goals</h1>
          <p className="text-sm text-[#828282]">1 item</p>
        </div>
        </div>
        <div className="flex justify-end flex-wrap gap-y-2 gap-x-1">
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">Sort By</span>
          <select className="bg-[#828282] text-white rounded-[10px] px-3 py-2">
            <option value="ref">Ref</option>
            <option value="description">Description</option>
            <option value="status">Status</option>
            <option value="frequency">Frequency</option>
            <option value="subtotal">Subtotal</option>
            <option value="lastRun">Last Run</option>
            <option value="nextRun">Next Run</option>
          </select>
          <FaLongArrowAltDown className="text-[#828282]" />
        </div>
        </div>
        </div>

        <div className="bg-[#FFF2E8] rounded-[12px] p-[2rem] ">
        <div className="bg-white p-[2rem] rounded-[12px] mb-8">
        <table className="w-full text-sm text-left">
        <thead className="uppercase ">
          <tr className="">
            <th className="whitespace-nowrap px-3 pb-4">Ref#</th>
            <th className="whitespace-nowrap px-3 pb-4">Description</th>
            <th className="whitespace-nowrap px-3 pb-4">Status</th>
            <th className="whitespace-nowrap px-3 pb-4">Frequency</th>
            <th className="whitespace-nowrap px-3 pb-4">Subtotal</th>
            <th className="whitespace-nowrap px-3 pb-4">Last Run</th>
            <th className="whitespace-nowrap px-3 pb-4">Next Run</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-t">
            <td className="px-6 py-4">1000001737</td>
            <td className="px-6 py-4">Landing Page</td>
            <td className="px-6 py-4">Active</td>
            <td className="px-6 py-4">Every Month</td>
            <td className="px-6 py- 4">890.00</td>
            <td className="px-6 py-4">12/25/24</td>
            <td className="px-6 py-4">1/25/25</td>
            <td className="w-[100px] px-6 py-4">
              <button className="bg-[#828282] text-white rounded-full hover:opacity-[90%] px-3 py-1">View</button>
            </td>
          </tr>
        </tbody>
      </table>
        </div>
        <p className="bg-[#F1E9E2] text-[#828282] text-sm text-center rounded-[12px] p-3">
        Note: Subtotals do not include shipping, tax, or other possible surcharges. Actual order totals may vary over time.
      </p>
        </div>
        </div>

    </Layout>
  );
};

export default Goals;