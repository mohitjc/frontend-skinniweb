import { useEffect, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";

const Chats = () => {
  
  return (
    <Layout>
      <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
        <div className="bg-[#FFF1E7] shadow-[0px_5px_8px_-2px_#c4c4c4] px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px] mb-[1.5rem] sm:mb-[2.5rem]">
          <div className="flex flex-wrap justify-between gap-y-3 gap-x-5 mb-2">
            <div className="">
              <h1 className="text-[22px] font-bold mb-1">Chats</h1>
              {/* <p className="text-sm text-[#828282]">1 item</p> */}
            </div>
          </div>
          
        </div>

        
      </div>
    </Layout>
  );
};

export default Chats;
