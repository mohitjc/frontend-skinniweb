import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";

const Payments = () => {
  return (
    <Layout>
   <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
    <div className="grid grid-cols-12 gap-5">
    <div className="col-span-5">
    <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem]  sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
             <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
               <div className="">
                 <h1 className="text-[22px] font-bold mb-1">My Payment Options</h1>
                 <p className="text-sm text-[#828282]">Credit Card / Add DISCOUNT CODE at bottom of page if applicable.</p>
               </div>
             </div>
           </div>
           <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem]  sm:p-[2rem] rounded-[12px]">
              <div className="grid grid-cols-1 gap-5">
              <div className="bg-white rounded-[12px] p-4">
                <div className="">
                  <img src=""/>
              <h3 className="border-b pb-2 mb-2"><span className="text-[13px] text-[#AE0505]">XXXX-5800</span><span className="text-[10px]">(Expires: 05/202*)</span></h3>
              <p className="text-[12px] text-[#AE0505]">Lawrence....</p>
              <p className="text-[12px] text-[#AE0505]">Apple tree Cir</p>
              <p className="text-[12px] text-[#AE0505]">Orlando, Florida, 32819</p>
              <p className="text-[12px] text-[#AE0505]">United states</p>
              <p className="text-[12px] text-[#AE0505]">T:</p>
              <div className="flex gap-2 mt-4">
                <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity:-[90%] px-3 py-[3px]">Edit</button>
                <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity:-[90%] px-3 py-[3px]">Delete</button>
              </div>
              </div>
              </div>
              <div className="bg-white rounded-[12px] p-4">
                <div className="">
                  <img src=""/>
              <h3 className="border-b pb-2 mb-2"><span className="text-[13px] text-[#AE0505]">XXXX-5800</span><span className="text-[10px]">(Expires: 05/202*)</span></h3>
              <p className="text-[12px] text-[#AE0505]">Lawrence....</p>
              <p className="text-[12px] text-[#AE0505]">Apple tree Cir</p>
              <p className="text-[12px] text-[#AE0505]">Orlando, Florida, 32819</p>
              <p className="text-[12px] text-[#AE0505]">United states</p>
              <p className="text-[12px] text-[#AE0505]">T:</p>
              <div className="flex gap-2 mt-4">
                <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity:-[90%] px-3 py-[3px]">Edit</button>
                <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity:-[90%] px-3 py-[3px]">Delete</button>
              </div>
              </div>
              </div>
              </div>
            </div>
           </div>

           <div className="col-span-7">
           <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] p-[1.5rem] rounded-[12px]">
           <div className="bg-white p-[1.5rem] rounded-[12px]">
            <h2 className="border-b font-[600] text-[18px] pb-2 mb-5">Add A Credit Card</h2>

            <div>
            <h3 className="border-b pb-2 mb-4">Cardholder Information</h3>
               
            </div>

           </div>
           </div>
           </div>
           </div>
   </div>
   </Layout>
  )
}

export default Payments