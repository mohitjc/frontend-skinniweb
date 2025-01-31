import React, { useState } from 'react';
import LikesList from './LikeListing';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useNavigate } from 'react-router-dom';

const LikesComponent = ({ likedUsers, likeCount, postId }) => {
    const navigate = useNavigate()
    const [likesModalVisible, setLikesModalVisible] = useState(false);
    const [likesList, setLikesList] = useState([]);

    const handleProfileNavigate = (id) => {
        navigate(`/user/detail/${id}`)
    }

    const getLikedData = (id) => {
        loader(true);
        let filter = { };
        ApiClient.get("post/postList", filter).then((res) => {
          if (res.success) {
            setLikesList(res.data);
            // setTotal(res?.pagination?.total);
          }
          loader(false);
        });
      };

    return (<>
        <div className="flex items-center mt-3">
            {likedUsers.map((item, index) => (
                <img
                    key={index}
                    className={`w-[27px] h-[27px] rounded-full object-cover ${index > 0 ? 'relative left-[-7px]' : ''}`}
                    src={item?.image ? item?.image : "/assets/img/person.jpg"}
                    alt={`Profile ${index + 1}`}
                />
            ))}
            <p className="ml-1 text-[12px] text-[#000] font-[400]">
                Liked by
            </p>
            {likedUsers.map((item, index) => (<p className="ml-1 text-[12px] text-[#000] font-[400] cursor-pointer" onClick={()=>handleProfileNavigate(item?.id)}>
                <span className="font-[500]">{item.fullName},</span>
            </p>))}
            <p className="ml-1 text-[12px] text-[#000] font-[400]" onClick={() => setLikesModalVisible(!likesModalVisible)}>
                and <span className="font-[500]">{(likeCount - 2) > 0 ? (likeCount - 2) : ""} others</span>
            </p>
        </div>
        <LikesList likes={likesList} onClose={setLikesModalVisible} />
    </>
    );
};

export default LikesComponent;