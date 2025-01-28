import { useEffect, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";

const Chats = () => {
  
  return (
    <Layout>
      <div className="bg-white  rounded-[12px]">
      <div className="flex items-center justify-between bg-[#FEE4D0]">
<div className="flex items-center p-2">
<img className="w-[40px] h-[40px] rounded-full object-cover" src="/assets/img/profile-image.jpg"></img>
<div className="ml-1">
  <p className="">Manny Lorem</p>
  <p className="">last seen 5 mins ago</p>
</div>
</div>

<div className="flex items-center">

</div>
      </div>

        
      </div>
    </Layout>
  );
};

export default Chats;
