import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { useNavigate } from "react-router-dom";

const CommentSection = ({ commentsData, postId, getData, getComments }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const [newReply, setNewReply] = useState("");
    const [newChildReply, setNewChildReply] = useState({});
    const [replyVisible, setReplyVisible] = useState({});
    const [initialComment, setinitialComment] = useState({});
    const [visibleRepliesCount, setVisibleRepliesCount] = useState({});

    const toggleReplies = (commentId) => {
        setReplyVisible((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const toggleMoreReplies = (commentId, repliesLength) => {
        setVisibleRepliesCount((prevState) => ({
            ...prevState,
            [commentId]: prevState[commentId] === 2 ? repliesLength : 2,
        }));
    };

    const handleAddReply = (parentCommentId, isChild = false) => {
        const replyText = isChild ? newChildReply[parentCommentId] : newReply;
        const payload = {
            postId: postId,
            comment: replyText,
            parentCommentId,
        };
        ApiClient.post(`comment`, payload).then((res) => {
            if (res.success) {
                getComments(postId);
                setReplyVisible({})
                setNewReply("");
                setNewChildReply({});
            }
            loader(false);
        });
    };

    const handleLike = (commentId) => {
        const payload = {
            commentId: commentId,
            userId: user?.id || user?.id,
        };
        loader(true);
        ApiClient.post(`like/comment`, payload).then((res) => {
            if (res.success) {
                getComments(postId);
            }
            loader(false);
        });
    };

    const handleProfileNavigate=(id)=>{
        navigate(`/user/detail/${id}`)
    }

    const renderReplies = (replies, parentCommentId, indentLevel = 1) => {
        const repliesToShow = replies.slice(0, visibleRepliesCount[parentCommentId] || 2); // Default to showing 2 replies
        return repliesToShow.map((reply) => (
            <div key={reply.id} className={`ml-${indentLevel * 1}`}>
                <div className="flex">
                    <img
                        className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
                        src="assets/img/profile-image.jpg"
                        onClick={e=>handleProfileNavigate(reply?.addedBy?._id || reply?.addedBy?.id)}
                        alt="Profile"
                    />
                    <div className="ml-2">
                        <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center">
                            <span onClick={e=>handleProfileNavigate(reply?.addedBy?._id || reply?.addedBy?.id)} className="text-[12px] font-[500] text-[#000] mr-1 cursor-pointer">
                                {reply.addedByName}
                            </span>
                            {new Date(reply.createdAt).toLocaleTimeString()} ago.
                            {reply?.isLiked ? (
                                <FaHeart
                                    className="text-[#F44336] mr-1"
                                    onClick={() => handleLike(reply.id)}
                                />
                            ) : (
                                <FaRegHeart
                                    className="text-[#F44336] mr-1"
                                    onClick={() => handleLike(reply.id)}
                                />
                            )}
                            {reply.likes} likes
                        </p>
                        <p className="text-[11px] font-[300] text-[#000]">{reply.comment}</p>

                        {/* Reply to this child comment */}
                        <div className="flex mt-2">
                            <button
                                className="text-[10px] font-[400] text-[#A0A0A0] cursor-pointer"
                                onClick={() => toggleReplies(reply.id)}
                            >
                                Reply
                            </button>
                        </div>
                        {replyVisible[reply.id] && (
                            <div className="ml-5 mt-2">
                                <div className="flex mt-2">
                                    <input
                                        type="text"
                                        value={newChildReply[reply.id] || ""}
                                        onChange={(e) =>
                                            setNewChildReply({
                                                ...newChildReply,
                                                [reply.id]: e.target.value,
                                            })
                                        }
                                        className="p-1 text-[10px] border border-gray-300 rounded-lg"
                                        placeholder="Write a reply..."
                                    />
                                    <button
                                        className="ml-2 text-[10px] font-[500] text-[#000] cursor-pointer"
                                        onClick={() => handleAddReply(reply.id, true)} // Reply to a child comment
                                    >
                                        Post Reply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Render nested replies if present */}
                {reply.replyComments && reply.replyComments.length > 0 && (
                    <div className="">
                        {renderReplies(reply.replyComments, reply.id, indentLevel + 1)}
                    </div>
                )}
            </div>
        ));
    };

    const postComment = (id, message, parentCommentId = "") => {
        if (!message) return
        let payload = {
            postId: postId,
            comment: initialComment
        }
        loader(true)
        ApiClient.post(`comment`, payload).then(res => {
            if (res.success) {
                getData()
            }
            loader(false)
        })
    }

    return (
        <div className="bg-[#D9D9D97D] mt-2 p-3 rounded-xl mt-2">
            <div className="mt-2">
                <div className="relative">
                    <input value={item?.comment} onChange={e => setinitialComment(e.target.value)} className="border rounded-full w-full p-1 px-3 bg-[#D9D9D97D]" placeholder="Post a comment" type="text" />
                    <FiSend onClick={e => postComment()} className={`${!item?.comment ? "cursor-not-allowed" : "cursor-pointer"} text-[25px] absolute right-[13px] top-[9px] text-[#828282] !text-[17px]`} />
                </div>
            </div>
            {commentsData.map((comment) => (
                <div key={comment.id} className="flex flex-col mb-4">
                    <div className="flex">
                        <img
                            className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
                            onClick={e => handleProfileNavigate(comment?.addedBy?._id || comment?.addedBy?.id)}
                            src="assets/img/profile-image.jpg"
                            alt="Profile"
                        />
                        <div className="ml-2">
                            <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center">
                                <span onClick={e => handleProfileNavigate(comment?.addedBy?._id || comment?.addedBy?.id)} className="text-[12px] font-[500] text-[#000] mr-1 cursor-pointer">
                                    {comment.addedByName}
                                </span>
                                {new Date(comment.createdAt).toLocaleTimeString()} ago.
                                {comment?.isLiked ? (
                                    <FaHeart
                                        className="text-[#F44336] mr-1"
                                        onClick={() => handleLike(comment.id)}
                                    />
                                ) : (
                                    <FaRegHeart
                                        className="text-[#F44336] mr-1"
                                        onClick={() => handleLike(comment.id)}
                                    />
                                )}
                                {comment.likes} likes
                            </p>
                            <p className="text-[11px] font-[300] text-[#000]">{comment.comment}</p>
                            <div className="flex mt-2">
                                <button
                                    className="text-[10px] font-[400] text-[#A0A0A0] cursor-pointer"
                                    onClick={() => toggleReplies(comment.id)}
                                >
                                    Reply
                                </button>
                            </div>

                            {/* Show replies only if the reply button is clicked */}
                            {replyVisible[comment.id] && (
                                <div className="">
                                    {renderReplies(comment.replyComments, comment.id, 1)}
                                    <div className="flex mt-2">
                                        <input
                                            type="text"
                                            value={newReply}
                                            onChange={(e) => setNewReply(e.target.value)}
                                            className="p-1 text-[10px] border border-gray-300 rounded-lg"
                                            placeholder="Write a reply..."
                                        />
                                        <button
                                            className="ml-2 text-[10px] font-[500] text-[#000] cursor-pointer"
                                            onClick={() => handleAddReply(comment.id)} // Reply to main comment
                                        >
                                            Post Reply
                                        </button>
                                    </div>

                                    {comment.replyComments && comment.replyComments.length > 2 && (
                                        <button
                                            className="mt-2 text-[10px] font-[400] text-[#A0A0A0] cursor-pointer"
                                            onClick={() => toggleMoreReplies(comment.id, comment.replyComments.length)}
                                        >
                                            {visibleRepliesCount[comment.id] === 2
                                                ? "Show More Replies"
                                                : "Show Less Replies"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentSection;
