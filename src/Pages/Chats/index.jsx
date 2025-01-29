import { IoMdSearch } from "react-icons/io";
import { LuPhone } from "react-icons/lu";
import { IoVideocamOutline } from "react-icons/io5";
import Header from "../../components/sidebarglobal/header";

const Chats = () => {
  
  return (
    <>
    <Header className="w-full"/>
      <div className="bg-white  rounded-[12px]">
      <div className="flex items-center justify-between bg-[#FEE4D0] p-2 rounded-t-[12px]">
<div className="flex items-center ">
<img className="w-[40px] h-[40px] rounded-full object-cover" src="/assets/img/profile-image.jpg"></img>
<div className="ml-2">
  <p className="text-[14px] font-[600] text-[#828282]">Manny Lorem</p>
  <p className="text-[12px] font-[400] text-[#707991]">last seen 5 mins ago</p>
  
</div>
</div>

<div className="flex items-center">
<IoMdSearch className="mr-3" />
<LuPhone className="mr-3" />
<IoVideocamOutline className="mr-3" />

</div>
      </div>
<div className="chat-bg-image">
<div className="">
<p>Today</p>
<div className="flex items-center">
<div>
  <img className="w-[50px] h-[50px] obejct-cover rounded-full" src="/assets/img/profile-image.jpg"></img>
</div>
<div className="">
  <p></p>
</div>

</div>

</div>
</div>
        
      </div>
    </>
  );
};

export default Chats;
