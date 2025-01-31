import Layout from "../../components/sidebarglobal/layout";
import { IoIosArrowForward } from "react-icons/io";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import methodModel from "../../methods/methods";
import moment from "moment";


const Forums = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [userDetail, setUserDetail] = useState('')
  const [likePostData, setLikePostData] = useState([])
  const [savePostData, setSavePostData] = useState([])

  useEffect(() => {
    if (id) {
      getUserDetail()
      getLikePostData()
      getSavePostData()
    }
  }, [id])

  const getUserDetail = () => {
    ApiClient.get(`user/details?id=${id}`).then(res => {
      if (res.success) {
        setUserDetail(res?.data)
      }
    })
  }

  const getLikePostData = () => {
    ApiClient.get(`likePostList?status=active&userId=${id}`).then(res => {
      if (res.success) {
        setLikePostData(res?.data)
      }
    })
  }

  const getSavePostData = () => {
    ApiClient.get(`saved/post/list?status=active&userId=${id}`).then(res => {
      if (res.success) {
        setSavePostData(res?.data)
      }
    })
  }

  return (
    <Layout>
      <div className="flex items-center mb-2"><p className="text-[12px] text-[#FEE4D0] font-[400]" onClick={()=>navigate('/forum')}>Forum</p><IoIosArrowForward className="text-[12px] text-[#FEE4D0]" /><p className="text-[12px] font-[600] text-[#FEE4D0]">Profile</p></div>
      <div className="bg-white   rounded-[12px]">
        <div className="set-bg-images h-[170px] rounded-t-[12px]">

        </div>
        <div className="">
          <div className="text-center mb-5">
            <div className="w-[176px] h-[176px]  rounded-full  border-2 border-[#FDA660] mx-auto mt-[-96px]">
              <img className="rounded-full w-full h-full border-4 border-[#fff] object-cover" src="/assets/img/profile-image.jpg"></img>
            </div>
            <div className="mt-4">
              <p className="text-[14px] text-[#727477] font-[400]">{userDetail?.fullName || userDetail?.firstName}</p>
            </div>
            <div className="mt-3">
              <p className="text-[14px] text-[#727477] font-[400]">Email: {userDetail?.email || "--"}</p>
              {userDetail?.dob && <p className="text-[14px] text-[#727477] font-[400]">DOB: {moment(userDetail?.dob).format("DD MMM, YYYY")}</p>}
              {/* <button type="button" onClick={e=>{ navigate(`/chats`) }} className="border !border-[#828282] rounded-full mt-2  bg-[#FEE4D0] text-[12px] font-[400] text-center px-5 py-2 text-[#828282]">Send Message</button> */}
            </div>
          </div>
        </div>

        <div className=" px-3 lg:px-10">
          <div className="">
            <div className="">
              <TabGroup>
                <TabList className="flex gap-4 border-b-2 border-[#323436]">
                  <Tab
                    key={"Liked Posts"}
                    className=" text-[12px] text-[#000] font-[500] focus:outline-none data-[selected]:border-b-4 border-[#FEE4D0] data-[focus]:outline-1 data-[focus]:outline-black"
                  >
                    {"Liked Posts"}
                  </Tab>
                  <Tab
                    key={"Saved"}
                    className=" text-[12px] text-[#000] font-[500] focus:outline-none data-[selected]:border-b-4 border-[#FEE4D0] data-[focus]:outline-1 data-[focus]:outline-black"
                  >
                    {"Saved"}
                  </Tab>
                </TabList>
                <TabPanels className="mt-3">
                  <TabPanel key={"Liked Posts"} className="rounded-xl bg-white/5 px-3 pb-5">
                    <div className="">
                      {likePostData?.length === 0 ?
                        <div className="text-center">No Like Posts</div>
                        :
                        <div className="grid lg:grid-cols-4  sm:grid-cols-2 grid-cols-1 gap-3">
                          {likePostData && likePostData?.map((item, index) => {
                            return <div key={index}>
                              <img className="w-full h-[190px] object-cover" src={methodModel.noImg(item?.postId?.media?.find((itm) => itm?.type === "image")?.path)} />
                            </div>
                          })}
                        </div>
                      }
                    </div>
                  </TabPanel>
                  <TabPanel key={"Saved"} className="rounded-xl bg-white/5 px-3 pb-5">
                    <div className="">
                      {savePostData?.length === 0 ?
                        <div className="text-center">No Saved Posts</div>
                        :
                        <div className="grid lg:grid-cols-4  grid-cols-2 gap-3">
                          {savePostData && savePostData?.map((item, index) => {
                            return <div key={index}>
                              <img className="w-full h-[190px] object-cover" src={methodModel.noImg(item?.postId?.media?.find((itm) => itm?.type === "image")?.path)} />
                            </div>
                          })}
                        </div>
                      }
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </div>


      </div>
    </Layout>
  );
};

export default Forums;
