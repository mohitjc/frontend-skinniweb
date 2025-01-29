import { IoMdSearch } from "react-icons/io";
import { LuPhone } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import Header from "../../components/sidebarglobal/header";
import { IoSearch } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";
import { GoSmiley } from "react-icons/go";
import { BsSend } from "react-icons/bs";

const Chats = () => {
  
  return (
    <>
    <Header />
    <div className="relative main ml-auto bg-[#828282] duration-300 transition-all px-[2rem] py-[2rem] mt-[80px]"> 
      <div className="flex gap-5">
<div className="w-[290px] min-w-[290px]">
<div className="relative">
<input className="border rounded-full px-10 w-full py-1" placeholder="Search" type="text" id="fname" name="fname"></input>
<IoSearch className="absolute top-[8px] left-[10px] text-[20px] text-[#707991]" />

</div>
<div className="bg-white rounded-[12px]  mt-3  py-2 ">
  <div className="h-[calc(100vh_-_178px)] overflow-auto ">
<div className="flex justify-between p-3 hover:bg-[#8080802e]">
  <div className="flex gap-2">
  <div>
    <img className="w-[40px] h-[40px] object-cover rounded-full" src="/assets/img/profile-image.jpg"></img>
  </div>
<div className="">
<p className="text-[#000] text-[12px] font-[600] flex items-center">Skinni Support <VscVerifiedFilled className="ml-1 text-[16px] text-[#008abf] "/> </p>
<p className="text-[12px] font-[400] text-[#707991]">Hey! Can you please tell</p>
</div>
  </div>
 <div>
  <p className="text-[10px] text-[#707991] font-[400]">19:48</p>
  <p className="text-center text-[10px] font-[500] text-[#fff] w-[14px] h-[14px] m-auto !mt-[3px] rounded-full bg-[#FDA660]">1</p>
 </div>

</div>
<div className="flex justify-between p-3 hover:bg-[#8080802e]">
  <div className="flex gap-2">
  <div>
    <img className="w-[40px] h-[40px] object-cover rounded-full" src="/assets/img/man.jpg"></img>
  </div>
<div className="">
<p className="text-[#000] text-[12px] font-[600] flex items-center">Jessica  </p>
<p className="text-[12px] font-[400] text-[#707991]">It’s all about healthy food and diet.</p>
</div>
  </div>
 <div>
  <p className="text-[10px] text-[#707991] font-[400]">19:48</p>
  <p className="text-center text-[10px] font-[500] text-[#fff] w-[14px] h-[14px] m-auto !mt-[3px] rounded-full bg-[#FDA660]">1</p>
 </div>

</div>
<div className="flex justify-between p-3 hover:bg-[#8080802e]">
  <div className="flex gap-2">
  <div>
    <img className="w-[40px] h-[40px] object-cover rounded-full" src="/assets/img/woman.jpg"></img>
  </div>
<div className="">
<p className="text-[#000] text-[12px] font-[600] flex items-center">Manny Lorem  </p>
<p className="text-[12px] font-[400] text-[#707991]">It’s all about healthy food and diet</p>
</div>
  </div>
 <div>
  <p className="text-[10px] text-[#707991] font-[400]">19:48</p>
  <p className="text-center text-[10px] font-[500] text-[#fff] w-[14px] h-[14px] m-auto !mt-[3px] rounded-full bg-[#FDA660]">1</p>
 </div>

</div>
<div className="flex justify-between p-3 hover:bg-[#8080802e]">
  <div className="flex gap-2">
  <div>
    <img className="w-[40px] h-[40px] object-cover rounded-full" src="/assets/img/profile-image.jpg"></img>
  </div>
<div className="">
<p className="text-[#000] text-[12px] font-[600] flex items-center">Skinni Support <VscVerifiedFilled className="ml-1 text-[16px] text-[#008abf] "/> </p>
<p className="text-[12px] font-[400] text-[#707991]">Hey! Can you please tell</p>
</div>
  </div>
 <div>
  <p className="text-[10px] text-[#707991] font-[400]">19:48</p>
  <p className="text-center text-[10px] font-[500] text-[#fff] w-[14px] h-[14px] m-auto !mt-[3px] rounded-full bg-[#FDA660]">1</p>
 </div>

</div>

</div>
</div>

</div>
      <div className="bg-white rounded-[12px] w-full  ">
      <div className="flex items-center justify-between bg-[#FEE4D0] p-2 rounded-t-[12px]">
<div className="flex items-center ">
<img className="w-[40px] h-[40px] rounded-full object-cover" src="/assets/img/profile-image.jpg"></img>
<div className="ml-2">
  <p className="text-[14px] font-[600] text-[#828282]">Manny Lorem</p>
  <p className="text-[12px] font-[400] text-[#707991]">last seen 5 mins ago</p>
  
</div>
</div>

{/* <div className="flex items-center">
<IoMdSearch className="mr-3" />
<LuPhone className="mr-3" />
<IoVideocamOutline className="mr-3" />

</div> */}
      </div>
<div className="chat-bg-image px-6 py-3 flex items-end ">
<div className="w-full ">
<div className="h-[calc(100vh_-_250px)] overflow-auto  ">
<p className="text-center text-[#828282] text-[15px] font-[400] mb-3">Today</p>

<div className="flex  gap-3 ">
<div>
  <img className="w-[50px] h-[50px] object-cover rounded-full" src="/assets/img/profile-image.jpg"></img>
</div>
<div className="w-[50%]">
  <p className="bg-[#FEE4D0] text-[12px] font-[400]  p-[9px_28px] rounded-[50px_50px_50px_0px] text-[#828282]">"Fueling my body with goodness, one bite at a time. 🥑🍓
    Lorem Iopsum A little bit of healthy, a whole lot of delicious. 
    🥑🥒 #NourishYourBody"</p>
    <p className="text-[11px] font-[400] text-[#A0A0A0] mt-1">20 mint</p>
</div>

</div>



<div className="flex  gap-3  ml-auto justify-end">

<div className="w-[50%]">
  <p className="bg-[#4F4F4F] text-[12px] font-[400] p-[9px_28px] rounded-[50px_50px_0px_50px] text-[#fff]">"Fueling my body with goodness, one bite at a time. 🥑🍓
 </p>
    <p className="text-[11px] font-[400] text-[#A0A0A0] mt-1 text-end">20 mint</p>
</div>
<div>
  <img className="w-[50px] h-[50px] object-cover rounded-full" src="/assets/img/profile-image.jpg"></img>
</div>
</div>

<div className="flex  gap-3 ">
<div>
  <img className="w-[50px] h-[50px] object-cover rounded-full" src="/assets/img/profile-image.jpg"></img>
</div>
<div className="w-[50%]">
  <p className="bg-[#FEE4D0] text-[12px] font-[400]  p-[9px_28px] rounded-[50px_50px_50px_0px] text-[#828282]">"Fueling my body with goodness, one bite at a time. 🥑🍓
    Lorem Iopsum A little bit of healthy, a whole lot of delicious. 
    🥑🥒 #NourishYourBody"</p>
    <p className="text-[11px] font-[400] text-[#A0A0A0] mt-1">20 mint</p>
</div>

</div>



<div className="flex  gap-3  ml-auto justify-end">

<div className="w-[50%]">
  <p className="bg-[#4F4F4F] text-[12px] font-[400] p-[9px_28px] rounded-[50px_50px_0px_50px] text-[#fff]">"Fueling my body with goodness, one bite at a time. 🥑🍓
 </p>
    <p className="text-[11px] font-[400] text-[#A0A0A0] mt-1 text-end">20 mint</p>
</div>
<div>
  <img className="w-[50px] h-[50px] object-cover rounded-full" src="/assets/img/profile-image.jpg"></img>
</div>
</div>

</div>



<div className=" mt-4">
<div className="relative">
<input className="shadow-[1px_1px_11px_0px_rgba(0,_0,_0,_0.22)] placeholder-black text-[10px] font-[400] rounded-full px-10 w-full py-2" placeholder="Type Your Message" type="text" id="fname" name="fname"></input>
<GoSmiley  className="absolute top-[7px] left-[13px] text-[18px]"/>
<div className="absolute top-[3px] right-[6px] bg-[#FEE4D0] text-[#828282] w-[25px] h-[25px] p-[7px_6px] rounded-full text-[12px]">
<BsSend />
</div>



</div>
</div>


</div>
</div>

      </div>
      </div>

    </div>
    </>
  );
};

export default Chats;
