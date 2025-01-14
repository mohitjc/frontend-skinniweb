import Layout from "../../components/sidebarglobal/layout";
import { FaLongArrowAltDown } from "react-icons/fa";
import { BsQuestionCircleFill } from "react-icons/bs";


const Payments = () => {
  return (
    <Layout>
   <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
    <div className="grid grid-cols-12 gap-5">
    <div className="col-span-12 lg:col-span-5">
    <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem]  sm:p-[2rem] rounded-[12px] mb-[1.5rem]">
             <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
               <div className="">
                 <h1 className="text-[22px] font-bold mb-1">My Payment Options</h1>
                 <p className="text-sm text-[#828282]">Credit Card / Add DISCOUNT CODE at bottom of page if applicable.</p>
               </div>
             </div>
           </div>
           <div className="bg-[#FFF1E7] px-[1rem] py-[1.5rem]  sm:p-[2rem] rounded-[12px]">
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
                <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity-[90%] px-3 py-[4.5px] font-[500]">Edit</button>
                <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity-[90%] px-3 py-[4.5px] font-[500]">Delete</button>
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
                <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity-[90%] px-3 py-[4.5px] font-[500]">Edit</button>
                <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity-[90%] px-3 py-[4.5px] font-[500]">Delete</button>
              </div>
              </div>
              </div>
              </div>
            </div>
           </div>

           <div className="col-span-12 lg:col-span-7">
           <div className="bg-[#FFF1E7] p-[1.5rem] rounded-[12px]">
           <div className="bg-white p-[1.5rem] rounded-[12px]">
            <h2 className="border-b font-[600] text-[18px] pb-2 mb-5">Add A Credit Card</h2>
            <div className="mb-5">
            <h3 className="border-b text-[18px] pb-2 mb-4">Cardholder Information</h3>
               <div className="mb-3">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">First Name<span class="text-[#FF0028]">*</span></label>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               </div>
               <div className="mb-3">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Last Name<span class="text-[#FF0028]">*</span></label>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               </div>
               <div className="mb-3">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Company</label>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               </div>
               <div>
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Phone Number<span class="text-[#FF0028]">*</span></label>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               </div>
            </div>

            <div>
            <h3 className="border-b text-[18px] pb-2 mb-4">Cardholder Information</h3>
               <div className="mb-3">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Street<span class="text-[#FF0028]">*</span></label>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mt-2"/>
               </div>
               <div className="mb-3">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">City<span class="text-[#FF0028]">*</span></label>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               </div>
               <div className="mb-3">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">State/Province<span class="text-[#FF0028]">*</span></label>
               <div class="relative z-20">
            <select class="relative bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white appearance-none">
               <option value="" class="dark:bg-dark-2">Option</option>
               <option value="" class="dark:bg-dark-2">Option</option>
               <option value="" class="dark:bg-dark-2">Option</option>
            </select>
            <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-[#969696]">
            </span>
         </div>
               </div>
               <div className="mb-3">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Zip/Postal Code<span class="text-[#FF0028]">*</span></label>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               </div>
               <div className="mb-3">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Country<span class="text-[#FF0028]">*</span></label>
               <div class="relative z-20">
            <select class="relative bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white appearance-none">
               <option value="" class="dark:bg-dark-2">Option</option>
               <option value="" class="dark:bg-dark-2">Option</option>
               <option value="" class="dark:bg-dark-2">Option</option>
            </select>
            <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-[#969696]">
            </span>
         </div>
               </div>
               <div className="flex gap-2 flex-wrap mb-3">
                  <img src="/assets/img/card_img1.png"className="w-fit h-[28px] object-contain"/>
                  <img src="/assets/img/card_img2.png"className="w-fit h-[28px] object-contain"/>
                  <img src="/assets/img/card_img3.png"className="w-fit h-[28px] object-contain"/>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">
               <div className="">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">CC Number<span class="text-[#FF0028]">*</span></label>
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               </div>
               <div className="">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">CCV<span class="text-[#FF0028]">*</span></label>
              <div className="relative">
               <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
               <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 ">
               <BsQuestionCircleFill className="text-[#828282]" />
               </span>
              </div>
               </div>
               </div>
               <div className="">
               <label class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white">Expiration<span class="text-[#FF0028]">*</span></label>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div class="relative z-20">
            <select class="relative bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white appearance-none">
               <option value="" class="dark:bg-dark-2">Option</option>
               <option value="" class="dark:bg-dark-2">Option</option>
               <option value="" class="dark:bg-dark-2">Option</option>
            </select>
            <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-[#969696]">
            </span>
            </div>
         <div class="relative z-20">
            <select class="relative bg-gray-50 border border-gray-300 text-gray-900 text-[12px] block w-full p-2.5 pr-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white appearance-none">
               <option value="" class="dark:bg-dark-2">Option</option>
               <option value="" class="dark:bg-dark-2">Option</option>
               <option value="" class="dark:bg-dark-2">Option</option>
            </select>
            <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-[#969696]">
            </span>
         </div>
         </div>
               </div>
            
            </div>
            <div className="flex justify-end mt-3">
            <button className="bg-[#828282] text-[#FFF1E7] text-[12px] rounded-full hover:opacity-[90%] px-3 py-[4.5px] font-[500]">Submit</button>
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