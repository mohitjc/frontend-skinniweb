import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { FiSend } from "react-icons/fi";
const CommentSection = ({ commentsData, postId, getData }) => {
    const user = useSelector((state) => state.user);
    const [newReply, setNewReply] = useState("");
    const [newChildReply, setNewChildReply] = useState({});
    const [replyVisible, setReplyVisible] = useState({});

    const toggleReplies = (commentId) => {
        setReplyVisible((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    const handleAddReply = (parentCommentId, isChild = false) => {
        const replyText = isChild ? newChildReply[parentCommentId] : newReply;
        const newReplyObj = {
            id: Math.random(),
            comment: replyText,
            parentCommentId,
            addedBy: 534,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            likes: 0,
            unlikes: 0,
        };

        const updatedComments = commentsData.map((comment) => {
            if (comment.id === parentCommentId) {
                if (isChild) {
                    comment.replyComments.push(newReplyObj);
                } else {
                    comment.replyComments = [newReplyObj]; // Direct replies only (no nesting)
                }
            }
            return comment;
        });

        commentsData = updatedComments;
        setReplyVisible({});
        if (isChild) {
            setNewChildReply({ ...newChildReply, [parentCommentId]: "" });
        } else {
            setNewReply("");
        }
    };

    const handleLike = (commentId) => {
        const payload = {
            commentId: commentId,
            userId: user?.id || user?.id,
        };
        loader(true);
        ApiClient.post(`likeDislikePost`, payload).then((res) => {
            if (res.success) {
                getData();
            }
            loader(false);
        });
    };

    const renderReplies = (replies, parentCommentId) => {
        return replies.map((reply) => (
            <div key={reply.id} className="ml-5">
                <div className="flex">
                    <img
                        className="w-[40px] h-[40px] rounded-full object-cover"
                        src="assets/img/profile-image.jpg"
                        alt="Profile"
                    />
                    <div className="ml-2">
                        <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center">
                            <span className="text-[12px] font-[500] text-[#000] mr-1">
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
            </div>
        ));
    };

    return (
        <div className="bg-[#D9D9D97D] mt-2 p-3 rounded-xl mt-2">
            {commentsData.map((comment) => (
                <div key={comment.id} className="flex flex-col mb-4">
                    <div className="flex">
                        <img
                            className="w-[40px] h-[40px] rounded-full object-cover"
                            src="assets/img/profile-image.jpg"
                            alt="Profile"
                        />
                        <div className="ml-2">
                            <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center">
                                <span className="text-[12px] font-[500] text-[#000] mr-1">
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
                                <div className=" mt-2">
                                    {renderReplies(comment.replyComments, comment.id)}
                                    <div className="flex mt-2 ml-5">
                                    <div className="relative">
                                    <input
                                            type="text"
                                            value={newReply}
                                            onChange={(e) => setNewReply(e.target.value)}
                                            className="border rounded-full w-full p-1 px-3 bg-[#D9D9D97D]"
                                            placeholder="Write a reply..."
                                        />
                                         <FiSend   onClick={() => handleAddReply(comment.id)} className="text-[25px] absolute right-[13px] top-[9px] text-[#828282] !text-[17px]"/>
                                        </div>
                                      
                                        {/* <button
                                            className="ml-2 text-[10px] font-[500] text-[#000] cursor-pointer"
                                            onClick={() => handleAddReply(comment.id)} // Reply to main comment
                                        >
                                            Post Reply
                                        </button> */}
                                    </div>
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
