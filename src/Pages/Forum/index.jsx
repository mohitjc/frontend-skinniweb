import { useEffect, useRef, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiBookmarkLine } from "react-icons/ri";
import methodModel from "../../methods/methods";
import { useSelector } from "react-redux";
import { IoBookmarkSharp } from "react-icons/io5";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CommentSection from "./Comments";
import LikesComponent from "./LikeComment";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

const Forums = () => {
  const user = useSelector((state) => state.user)
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "", date: "" });
  const [loginModal, setloginModal] = useState(false);
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [comentPopup,setComentPopup] = useState(false);
  const [postId, setPostId] = useState("");
  const [total, setTotal] = useState(0);

  const handleCountChange = (newCount) => {
    setFilter({ ...filters, count: newCount, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilter({ ...filters, page: newPage });
  };

  useEffect(() => {
    getData();
  }, [filters]);

  const getData = (p = {}) => {
    loader(true);
    let filter = { ...filters, ...p, status: "active" };
    ApiClient.get("post/postList", filter).then((res) => {
      if (res.success) {
        setData(res.data);
        setTotal(res?.pagination?.total);
      }
      loader(false);
    });
  };

  const getComments = (id) => {
    // loader(true);
    // if (postId == id) {
    //   setComentPopup(false)
    //   setPostId("")
    //   return
    // }
    let filter = { postId: id };
    setPostId(id)
    ApiClient.get("comment/list", filter).then((res) => {
      if (res.success) {
        setCommentData(res.data);
        setloginModal(true)
        // setTotal(res.total);
      }
      // loader(false);
    });
  };

  const handleLikeUnlike = (item) => {
    const payload = {
      postId: item?._id || item?.id,
    }
    loader(true)
    ApiClient.post(`likeDislikePost`, payload).then(res => {
      if (res.success) {
        getData()
      }
      loader(false)
    })
  }

  const handleSaveUnsave = (item) => {
    const payload = {
      postId: item?._id || item?.id,
      userId: user?._id || user?.id
    }
    loader(true)
    ApiClient.post(`saved/post/add`, payload).then(res => {
      if (res.success) {
        getData()
      }
      loader(false)
    })
  }

  const handlePostComment = (value, index, key) => {
    const postData = [...data]
    postData[index][key] = value
    setData(postData)
  }

  const postComment = (id, message, parentCommentId = "") => {
    if (!message) return
    let payload = {
      postId: id,
      comment: message
    }
    if (parentCommentId) {
      payload = { ...payload, parentCommentId: parentCommentId }
    }
    loader(true)
    ApiClient.post(`comment`, payload).then(res => {
      if (res.success) {
        getData()
      }
      loader(false)
    })
  }

  const handleLikeUnlikeComments = (type, commentId) => {
    const payload = {
      commentId: commentId,
      userId: user?._id || user?.id
    }
    let url = `${type}/comment`
    loader(true)
    ApiClient.post(url, payload).then(res => {
      if (res.success) {
        getData()
      }
      loader(false)
    })
  }

  const sliderSetting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <IoIosArrowForward className="!text-[#FEE4D0]" />,
    prevArrow: <IoIosArrowBack className="!text-[#FEE4D0]" />
  };

  return (
    <Layout>
      <div className="bg-white px-[1rem] py-[1.5rem] sm:p-[2rem] rounded-[12px]">
        <div className="text-[#040415] text-[24px] font-[600]">
          <h3 className="">Recent Posts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-3  lg:gap-10 gap-5">
          {data && data?.map((item, index) => {
            return <div key={index}>
              <div className="bg-[#FEE4D0] rounded-t-2xl">
                <div className="flex items-center p-3">
                  <img src={methodModel.userImg(item?.addedBy?.image, "category")} className="w-[37px] h-[37px] object-cover min-w-[37px] rounded-full border-[#FFD6B6] border-2" alt="profile_image" />
                  <p className="ml-3 text-[#000] font-[500] text-[13px]">{item?.addedBy?.fullName || item?.addedBy?.firstName}</p>
                </div>
                <div className="slider-container">
                  <Slider {...sliderSetting}>
                    {item?.media?.map((itm, i) => {
                      if (itm?.type === "image") {
                        return <img className="w-full h-[270px] bg-[#000] object-cover" src={methodModel.noImg(itm?.path)} alt="image" key={i} />
                      } else if (itm?.type === "video") {
                        return <video className="w-full h-[270px] bg-[#000]" key={i} controls>
                          <source src={methodModel.video(itm?.path)} type="video/mp4" />
                          <source src={methodModel.video(itm?.path)} type="video/ogg" />
                          Your browser does not support the video tag.
                        </video>
                      } else return null
                    })}
                  </Slider>
                </div>
              </div>
              <div className="flex items-center mt-3 justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {item?.isLiked ?
                      <FaHeart className="text-[#F44336] text-[25px] cursor-pointer" onClick={e => handleLikeUnlike(item)} />
                      :
                      <FaRegHeart className="text-[25px] cursor-pointer" onClick={e => handleLikeUnlike(item)} />
                    }
                    <p className="ml-1 text-[#000] text-[12px] font-[400]">{item?.likeCount || 0}</p>
                  </div>
                  <div className="ml-2 flex items-center">
                    <FaRegComment className="text-[25px] cursor-pointer"
                      onClick={() => getComments(item?.id || item?._id)}
                    // onClick={e=>{ document.getElementById(`commentInput${index}`).focus() }} 
                    />
                    <p className="ml-1 text-[#000] text-[12px] font-[400]">{item?.commentCount || 0}</p>
                  </div>
                </div>
                <div className="">
                  {item?.isSaved ?
                    <IoBookmarkSharp className="text-[25px] cursor-pointer" onClick={e => handleSaveUnsave(item)} />
                    :
                    <RiBookmarkLine className="text-[25px] cursor-pointer" onClick={e => handleSaveUnsave(item)} />
                  }
                </div>
              </div>
              <LikesComponent likedUsers={item?.likedUsers} likeCount={item?.likeCount} postId={item?.id || item?._id}/>
              <div className="mt-2">
                <p className="text-[#000] text-[12px] font-[300] gap-2"><span className="font-[500]">{item?.addedBy?.fullName || item?.addedBy?.firstName}</span><span dangerouslySetInnerHTML={{ __html: item?.description }}></span></p>
              </div>
              {/* {(postId == item?.id && comentPopup) && <CommentSection commentsData={commentData} postId={postId} getData={getData} getComments={getCommentsListing} />} */}
            </div>
          })}
        </div>

        {total > 0 && (
          <div className="paginationdiv flex flex-wrap gap-x-5 gap-y-2 justify-between mt-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Show</span>
              <div className="relative bg-[#828282] rounded-[10px]">
                <select
                  value={filters.count}
                  onChange={(e) => handleCountChange(parseInt(e.target.value))}
                  className="relative z-20 bg-transparent appearance-none text-white text-[14px] rounded-[10px] !pr-[35px] px-3 py-1.5 ">
                  <option class="text-[#828282]" value="10">10</option>
                  <option class="text-[#828282]" value="20">20</option>
                  <option class="text-[#828282]" value="30">30</option>
                  <option class="text-[#828282]" value="50">50</option>
                </select>
                <span class="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-white"></span>
              </div>
              <span className="text-sm text-gray-600 ml-2">items per page</span>
            </div>

            <Pagination
              currentPage={filters.page}
              totalSize={total}
              sizePerPage={filters.count}
              changeCurrentPage={handlePageChange}
            />
          </div>
        )}
      </div>

      <Dialog
        open={loginModal}
        onClose={() => setloginModal(false)}
        className="relative z-[9999]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="max-w-md  w-full rounded-lg  rounded-[20px]">
            <div className="bg-[#202024f0] rounded-md">
              <CommentSection commentsData={commentData} postId={postId} getData={getData} getComments={getComments} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

    </Layout>
  );
};

export default Forums;
