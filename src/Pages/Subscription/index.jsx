import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";

const Subscription = () => {
  return (
    <Layout>
       <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
        <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem]  sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
          <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
          <div className="">
        <h1 className="text-[22px] font-bold mb-1">My Subscriptions</h1>
          <p className="text-sm text-[#828282]">1 item</p>
        </div>
        </div>
        <div className="flex justify-end flex-wrap gap-y-2 gap-x-1">
        <div className="flex items-center">
          <span className="text-gray-600 mb-0 mr-2">Sort By</span>
          <div className="relative bg-[#828282] rounded-[10px]">
          <select className="relative z-20 bg-transparent appearance-none text-white text-[14px] rounded-[10px] !pr-[35px] px-3 py-2">
            <option className="text-[#828282]" value="ref">Ref</option>
            <option className="text-[#828282]" value="description">Description</option>
            <option className="text-[#828282]" value="status">Status</option>
            <option className="text-[#828282]" value="frequency">Frequency</option>
            <option className="text-[#828282]" value="subtotal">Subtotal</option>
            <option className="text-[#828282]" value="lastRun">Last Run</option>
            <option className="text-[#828282]" value="nextRun">Next Run</option>
          </select>
          <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-white"></span>
          </div>
          <FaLongArrowAltDown className="text-[#828282]" />
        </div>
        </div>
        </div>

        <div className="bg-[#FFF2E8] rounded-[12px]  p-[1.5rem]  sm:p-[2rem] ">
        <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
          <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
        <thead className="uppercase ">
          <tr className="">
            <th className="whitespace-nowrap text-[13px] px-3 pb-4">Ref#</th>
            <th className="whitespace-nowrap text-[13px] px-3 pb-4">Description</th>
            <th className="whitespace-nowrap text-[13px] px-3 pb-4">Status</th>
            <th className="whitespace-nowrap text-[13px] px-3 pb-4">Frequency</th>
            <th className="whitespace-nowrap text-[13px] px-3 pb-4">Subtotal</th>
            <th className="whitespace-nowrap text-[13px] px-3 pb-4">Last Run</th>
            <th className="whitespace-nowrap text-[13px] px-3 pb-4">Next Run</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-t">
            <td className="px-3 py-4 text-[12px]">1000001737</td>
            <td className="px-3 py-4 text-[12px]">Landing Page</td>
            <td className="px-3 py-4 text-[12px]">Active</td>
            <td className="px-3 py-4 text-[12px]">Every Month</td>
            <td className="px-6 py-4 text-[12px]">890.00</td>
            <td className="px-3 py-4 text-[12px]">12/25/24</td>
            <td className="px-3 py-4 text-[12px]">1/25/25</td>
            <td className="w-[100px] px-3 py-4 text-[12px]">
              <button className="bg-[#828282] text-white rounded-full hover:opacity-[90%] text-[12px] font-[500] px-3 py-1">View</button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
        </div>
        <p className="bg-[#F1E9E2] text-[#828282] text-sm text-center rounded-[12px] mt-8 p-3">
        Note: Subtotals do not include shipping, tax, or other possible surcharges. Actual order totals may vary over time.
      </p>
        </div>
        </div>

    </Layout>
  );
};

export default Subscription;