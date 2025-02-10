import React from "react";
import environment from "../../environment";

const LikesList = ({ likes , handleProfileNavigate}) => {
  return (
    <div className="likes-list-container ">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Optional title */}
        <h3 className="text-[16px] font-semibold mb-4">Users who liked this</h3>
        <div className="max-h-[350px] overflow-auto">
        <ul className="space-y-4">
          {likes.length === 0 ? (
            <li className="text-center text-gray-500">No likes yet</li>
          ) : (
            likes.map((user) => (
              <li key={user.userId} className="flex items-center space-x-4 cursor-pointer" onClick={()=>handleProfileNavigate(user.userId)}>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.image?.includes("https" || "http") ? user.image || "/assets/img/person.jpg" : !user.image ? "/assets/img/person.jpg" :`${environment?.api}${user.image}` || "/assets/img/person.jpg"}
                  // src={user.image || "assets/img/profile-image.jpg"}
                  alt={user.fullName}
                />
                <span className="text-[15px] font-medium text-gray-700">{user.fullName}</span>
              </li>
            ))
          )}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default LikesList;
