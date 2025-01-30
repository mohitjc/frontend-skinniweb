import { useEffect, useRef, useState } from "react";
import Layout from "../../components/sidebarglobal/layout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { RiBookmarkLine } from "react-icons/ri";
import methodModel from "../../methods/methods";
import { useSelector } from "react-redux";
import { IoBookmarkSharp } from "react-icons/io5";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CommentSection from "./Comments";

const Forums = () => {
  const user = useSelector((state) => state.user)
  const [filters, setFilter] = useState({ page: 1, count: 10, search: "", date: "" });
  const [data, setData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [postId,setPostId] = useState("");
  const [total, setTotal] = useState(0);

  console.log(commentData, '==data');

  useEffect(() => {
    getData();
  }, []);

  const getData = (p = {}) => {
    loader(true);
    let filter = { ...filters, ...p, status: "active" };
    ApiClient.get("post/postList", filter).then((res) => {
      if (res.success) {
        setData(res.data);
        setTotal(res.total);
      }
      loader(false);
    });
  };

  const getComments = (id) => {
    // loader(true);
    let filter = { postId:id };
    setPostId(id)
    ApiClient.get("comment/list", filter).then((res) => {
      if (res.success) {
        setCommentData(res.data);
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
        <div className="grid grid-cols-2 mt-3 gap-10">
          {data && data?.map((item, index) => {
            return <div key={index}>
              <div className="bg-[#FEE4D0] rounded-t-2xl">
                <div className="flex items-center p-3">
                  <img src={methodModel.userImg(item?.addedBy?.image, "category")} className="w-[37px] h-[37px] rounded-full border-[#FFD6B6] border-2" alt="profile_image" />
                  <p className="ml-3 text-[#000] font-[500] text-[13px]">{item?.addedBy?.fullName || item?.addedBy?.firstName}</p>
                </div>
                <div className="slider-container">
                  <Slider {...sliderSetting}>
                    {item?.media?.map((itm, i) => {
                      if (itm?.type === "image") {
                        return <img className="w-full h-[270px] bg-[#000]" src={methodModel.noImg(itm?.path)} alt="image" key={i} />
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
                    onClick={()=>getComments(item?.id || item?._id)}
                    // onClick={e=>{ document.getElementById(`commentInput${index}`).focus() }} 
                    />
                    <p className="ml-1 text-[#000] text-[12px] font-[400]">{item?.commentCount || 0}</p>
                  </div>
                  {/* <div className="flex items-center ml-2">
                    <FiSend className="text-[25px]" />
                    <p className="ml-1 text-[#000] text-[12px] font-[400]">{item?.shareCount || 0}</p>
                  </div> */}
                </div>
                <div className="">
                  {item?.isSaved ?
                    <IoBookmarkSharp className="text-[25px] cursor-pointer" onClick={e => handleSaveUnsave(item)} />
                    :
                    <RiBookmarkLine className="text-[25px] cursor-pointer" onClick={e => handleSaveUnsave(item)} />
                  }
                </div>
              </div>
              {/* <div className="flex items-center mt-3">
                <img className="w-[27px] h-[27px] rounded-full object-cover" src="assets/img/profile-image.jpg" />
                <img className="w-[27px] h-[27px] rounded-full object-cover relative left-[-7px]" src="assets/img/portrait-expressive-young-woman.jpg" />
                <img className="w-[27px] h-[27px] rounded-full object-cover relative left-[-7px]" src="assets/img/young-adult-enjoying-virtual-date.jpg" />
                <p className="ml-1 text-[12px] text-[#000] font-[400]">Liked by<span className="font-[500]">_lorem_ispum___ </span>and <span className="font-[500]">others</span></p>
              </div> */}
              <div className="mt-2">
                <p className="text-[#000] text-[12px] font-[300] gap-2"><span className="font-[500]">{item?.addedBy?.fullName || item?.addedBy?.firstName}</span><span dangerouslySetInnerHTML={{ __html: item?.description }}></span></p>
              </div>
              {/* <div className="mt-2">
                <div className="relative">
                  <input value={item?.comment} onChange={e => handlePostComment(e.target.value, index, "comment")} id={`commentInput${index}`} className="border rounded-full w-full p-1 px-3 bg-[#D9D9D97D]" placeholder="Post a comment" type="text" />
                  <FiSend onClick={e => postComment(item?._id || item?.id, item?.comment, "")} className={`${!item?.comment ? "cursor-not-allowed" : "cursor-pointer"} text-[25px] absolute right-[13px] top-[9px] text-[#828282] !text-[17px]`} />
                </div>
              </div> */}
              <div className="mt-2">
                <p className="text-[#A0A0A0] text-[12px] font-[400] mt-2 cursor-pointer">View all comments</p>
                <div className="flex items-center mt-1">
                  <p className="text-[#A0A0A0] text-[12px] font-[400]">20 mint ago.</p>
                </div>
              </div>
              {postId == item?.id && <CommentSection commentsData={commentData} postId={postId} getData={getData}/>}
            </div>
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Forums;
