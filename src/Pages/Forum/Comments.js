import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Manny_Ipsum",
      text: `"Fueling my body with goodness, one bite at a time. 🥑🍓Lorem Ipsum A little bit of healthy, a whole lot of delicious. 🥑🥒 #NourishYourBody"`,
      likes: 1,
      replies: [],
    },
    {
      id: 2,
      user: "Linh_Ipsum",
      text: `"Fueling my body with goodness, one bite at a time. 🥑🍓Lorem Ipsum A little bit of healthy, a whole lot of delicious. 🥑🥒 #NourishYourBody"`,
      likes: 1,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");

  const handleAddComment = () => {
    const newCommentObj = {
      id: comments.length + 1,
      user: "User_Name", // Dynamically set username
      text: newComment,
      likes: 0,
      replies: [],
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleAddReply = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.replies.push({ user: "User_Name", text: newReply });
      }
      return comment;
    });
    setComments(updatedComments);
    setNewReply("");
  };

  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.likes += 1;
      }
      return comment;
    });
    setComments(updatedComments);
  };

  return (
    <div className="bg-[#D9D9D97D] mt-2 p-3 rounded-xl mt-2">
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="flex">
            <img
              className="w-[40px] h-[40px] rounded-full object-cover"
              src="assets/img/profile-image.jpg"
              alt="User Profile"
            />
            <div className="ml-2">
              <p className="flex text-[10px] text-[#A0A0A0] font-[400] items-center">
                <span className="text-[12px] font-[500] text-[#000] mr-1">
                  {comment.user}
                </span>
                20 minutes ago.
                <FaHeart
                  className="text-[#F44336] mr-1"
                  onClick={() => handleLikeComment(comment.id)}
                />
                {comment.likes} likes
              </p>
              <div className="flex">
                <p className="text-[11px] font-[300] text-[#000]">
                  {comment.text}
                </p>
              </div>

              <div className="flex mt-2">
                <button
                  className="text-[10px] font-[400] text-[#A0A0A0] cursor-pointer"
                  onClick={() => {
                    const replyInput = document.getElementById(
                      `reply-input-${comment.id}`
                    );
                    replyInput.style.display =
                      replyInput.style.display === "none" ? "block" : "none";
                  }}
                >
                  Reply
                </button>
                <p className="ml-3 text-[10px] font-[400] text-[#A0A0A0] cursor-pointer">
                  Hide
                </p>
              </div>

              {/* Display replies */}
              <div className="ml-5 mt-2">
                {comment.replies.map((reply, index) => (
                  <p key={index} className="text-[11px] font-[300] text-[#000]">
                    <span className="font-[500]">{reply.user}: </span>
                    {reply.text}
                  </p>
                ))}

                {/* Input for reply */}
                <div
                  id={`reply-input-${comment.id}`}
                  style={{ display: "none" }}
                  className="flex mt-2"
                >
                  <input
                    type="text"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="p-1 text-[10px] border border-gray-300 rounded-lg"
                    placeholder="Write a reply..."
                  />
                  <button
                    className="ml-2 text-[10px] font-[500] text-[#000] cursor-pointer"
                    onClick={() => handleAddReply(comment.id)}
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add a new comment */}
      <div className="mt-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="p-1 text-[10px] border border-gray-300 rounded-lg"
          placeholder="Add a comment..."
        />
        <button
          className="ml-2 text-[10px] font-[500] text-[#000] cursor-pointer"
          onClick={handleAddComment}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
