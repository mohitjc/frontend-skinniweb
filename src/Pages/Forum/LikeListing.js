import React from "react";

const LikesList = ({ likes , handleProfileNavigate}) => {
  return (
    <div className="likes-list-container py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Optional title */}
        <h3 className="text-xl font-semibold mb-4">Users who liked this</h3>
        
        <ul className="space-y-4">
          {likes.length === 0 ? (
            <li className="text-center text-gray-500">No likes yet</li>
          ) : (
            likes.map((user) => (
              <li key={user.userId} className="flex items-center space-x-4" onClick={()=>handleProfileNavigate(user.userId)}>
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={user.image || "assets/img/profile-image.jpg"}
                  alt={user.fullName}
                />
                <span className="text-lg font-medium text-gray-700">{user.fullName}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default LikesList;
