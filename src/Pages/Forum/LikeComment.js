import React, { useState } from 'react';
import LikesList from './LikeListing';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

const LikesComponent = ({ likedUsers, likeCount, postId }) => {
    const navigate = useNavigate()
    const [likesModalVisible, setLikesModalVisible] = useState(false);
    const [likesList, setLikesList] = useState([]);

    const handleProfileNavigate = (id) => {
        navigate(`/user/detail/${id}`)
    }

    const getLikedData = () => {
        loader(true);
        let filter = {postId:postId};
        ApiClient.get("listUsersLikePost", filter).then((res) => {
          if (res.success) {
            setLikesList(res.data);
            setLikesModalVisible(true)
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
                <span className="font-[500]">{item.fullName}{(likeCount - 2) > 0 ? "," : ""}</span>
            </p>))}
            <p className="ml-1 text-[12px] text-[#000] font-[400]" onClick={() => {getLikedData()}}>
                {(likeCount - 2) > 0 ? "and" : ""} <span className="font-[500] cursor-pointer">{(likeCount - 2) > 0 ? (likeCount - 2) : ""} {(likeCount - 2) > 0 ? "other" : ""}</span>
            </p>
        </div>
        <Dialog
        open={likesModalVisible}
        onClose={() => setLikesModalVisible(false)}
        className="relative z-[9999]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="max-w-md  w-full rounded-lg  rounded-[20px]">
            <div className="bg-[#202024f0] rounded-md">
            <LikesList likes={likesList} onClose={setLikesModalVisible} handleProfileNavigate={handleProfileNavigate}/>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
    );
};

export default LikesComponent;