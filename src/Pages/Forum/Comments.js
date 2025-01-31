import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CommentSection = ({ commentsData, postId, getData, getComments }) => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    // Manage reply inputs for each level (comment and replies)
    const [replies, setReplies] = useState({});

    const [replyVisible, setReplyVisible] = useState({});
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

    const handleAddReply = (parentCommentId, replyText) => {
        const payload = {
            postId: postId,
            comment: replyText,
            parentCommentId,
        };
        ApiClient.post(`comment`, payload).then((res) => {
            if (res.success) {
                getComments(postId);
                setReplyVisible({});
                setReplies((prev) => ({ ...prev, [parentCommentId]: "" }));
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

    const handleProfileNavigate = (id) => {
        navigate(`/user/detail/${id}`);
    };

    function timeAgo(createdAt) {
        const now = new Date();
        const diff = now - new Date(createdAt);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    const renderReplies = (replies, parentCommentId, indentLevel = 1) => {
        const repliesToShow = replies.slice(0, visibleRepliesCount[parentCommentId] || 2);
        return repliesToShow.map((reply) => (
            <div key={reply.id} className={``}>
                <div className="flex">
                    <img
                        className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
                        src="assets/img/profile-image.jpg"
                        onClick={e => handleProfileNavigate(reply?.addedBy?._id || reply?.addedBy?.id)}
                        alt="Profile"
                    />
                    <div className="ml-2">
                        <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center cursor-pointer">
                            <span onClick={e => handleProfileNavigate(reply?.addedBy?._id || reply?.addedBy?.id)} className="text-[12px] font-[500] text-[#000] mr-1 cursor-pointer">
                                {reply.addedByName}
                            </span>
                            {timeAgo(reply.createdAt)} ago.
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

                        <div className="flex mt-2">
                            <button
                                className="text-[10px] font-[400] text-[#A0A0A0] cursor-pointer"
                                onClick={() => toggleReplies(reply.id)}
                            >
                                Reply
                            </button>
                        </div>
                        
                        {/* Reply Input for each level */}
                        {replyVisible[reply.id] && (
                            <div className="mt-2">
                                <div className="flex mt-2">
                                    <input
                                        type="text"
                                        value={replies[reply.id] || ""}
                                        onChange={(e) => setReplies({ ...replies, [reply.id]: e.target.value })}
                                        className="p-1 text-[10px] border border-gray-300 rounded-lg"
                                        placeholder="Write a reply..."
                                    />
                                    <button
                                        className="ml-2 text-[10px] font-[500] text-[#000] cursor-pointer"
                                        onClick={() => handleAddReply(reply.id, replies[reply.id])} 
                                    >
                                        Post Reply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {reply.replyComments && reply.replyComments.length > 0 && (
                    <div className="">
                        {renderReplies(reply.replyComments, reply.id, indentLevel + 1)}
                    </div>
                )}
            </div>
        ));
    };

    const postComment = () => {
        if (!replies["mainComment"]) return;
        let payload = {
            postId: postId,
            comment: replies["mainComment"],
        };
        loader(true);
        ApiClient.post(`comment`, payload).then(res => {
            if (res.success) {
                setReplies({ ...replies, "mainComment": "" });
                getComments(postId);
            }
            loader(false);
        });
    };

    return (
        <div className="bg-[#D9D9D97D] mt-2 p-3 rounded-xl mt-2">
            <div className="mt-2 mb-2">
                <div className="relative">
                    <input 
                        value={replies["mainComment"] || ""}
                        onChange={e => setReplies({ ...replies, "mainComment": e.target.value })}
                        className="border rounded-full w-full p-1 px-3 bg-[#D9D9D97D]" 
                        placeholder="Post a comment" 
                        type="text" 
                    />
                    <FiSend 
                        onClick={postComment}
                        className={`${!replies["mainComment"] ? "cursor-not-allowed" : "cursor-pointer"} text-[25px] absolute right-[13px] top-[9px] text-[#828282] !text-[17px]`} 
                    />
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
                            <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center cursor-pointer">
                                <span onClick={e => handleProfileNavigate(comment?.addedBy?._id || comment?.addedBy?.id)} className="text-[12px] font-[500] text-[#000] mr-1 cursor-pointer">
                                    {comment.addedByName}
                                </span>
                                {timeAgo(comment.createdAt)}
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

                            {replyVisible[comment.id] && (
                                <div className="mt-2">
                                    {renderReplies(comment.replyComments, comment.id)}
                                    <div className="flex mt-2 ml-5">
                                        <input
                                            type="text"
                                            value={replies[comment.id] || ""}
                                            onChange={(e) => setReplies({ ...replies, [comment.id]: e.target.value })}
                                            className="border rounded-full w-full p-1 px-3 bg-[#D9D9D97D]"
                                            placeholder="Write a reply..."
                                        />
                                        <FiSend onClick={() => handleAddReply(comment.id, replies[comment.id])} className="text-[25px] absolute right-[13px] top-[9px] text-[#828282] !text-[17px]" />
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
