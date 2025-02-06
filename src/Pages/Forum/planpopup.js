import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';

const ForumAccess = () => {
    const user = useSelector((state) => state.user);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (user?._id || user?.id) {
            ApiClient.get(`user/details`, { id: user?._id || user?.id }).then(
                (res) => {
                    if (res.success) {
                        if(!res?.data?.activePlan)
                        setShowModal(true) 
                    }
                }
            );
        }
    }, []);

    // Close the modal
    const handleCloseModal = () => setShowModal(false);

    // Redirect to purchase plan page (could also use React Router's useNavigate or useHistory)
    const handlePurchasePlan = () => {
        window.location.href = '/';  // Or use your app's navigation system
    };

    return (
        <div className="relative">
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center bg-[#fbd7b7] rounded-t-md px-4 py-3 border-b border-gray-300">
                            <h2 className="text-[16px]] font-semibold">Access Denied</h2>
                            {/* <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <span className="text-xl">&times;</span>
              </button> */}
                        </div>
                        <div className="p-6 text-center">
                            <img className='w-[70px] h-[70px] m-auto' src='assets/img/popupimg.png'></img>
                            <p className='mt-3 text-[15px] font-[400]'>You need to purchase a plan in order to access the forums by Skinni App.</p>
                            <div className="flex justify-end space-x-4  border-gray-300 mt-3">
                            {/* <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button> */}
                            <button
                                onClick={handlePurchasePlan}
                                className="border-0 bg-[#FED6B6] w-full rounded-[8px] px-6 -py-2 text-[16px] font-[400] h-10 flex items-center justify-center text-[#000]"
                            >
                               Ok
                            </button>
                        </div>
                        </div>
                 
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForumAccess;
