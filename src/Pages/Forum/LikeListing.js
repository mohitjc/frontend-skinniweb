import React from "react";

const LikesList = ({ likes, onClose }) => {
  return (
    <div className="likes-modal">
      <div className="likes-modal-content">
        {/* <button onClick={onClose} className="close-btn">X</button> */}
        {/* <h3>Users who liked this</h3> */}
        <ul>
          {likes.length === 0 ? (
            <li></li>
          ) : (
            likes.map((user) => (
              <li key={user.id} className="like-user-item">
                <img
                  className="w-[30px] h-[30px] rounded-full object-cover"
                  src={user.profilePicture || "assets/img/profile-image.jpg"}
                  alt={user.name}
                />
                <span>{user.name}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default LikesList;
