import React from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCallOutline } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

const UserInfo = ({setUserShowInfo,selectedChat,profilePicture}) => {

  return (
    <div className="h-full md1:w-[100%] sm1:w-[300px] w-[360px] bg-[#212121] flex flex-col justify-start items-center">
      <div className="w-[100%] h-[10%] flex justify-start items-center gap-x-6 px-2">
        <RxCross2
        onClick={()=>setUserShowInfo(false)}
         className="text-[25px] font-semibold text-white cursor-pointer" />
        <p className="font-roboto text-white font-semibold text-[20px]">
          UserInfo
        </p>
      </div>
      <div className="h-fit w-[100%] flex flex-col justify-center items-center gap-y-3">
        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white flex justify-center items-center text-[30px]">
          {profilePicture}
        </div>
        <div className="text-[white] font-roboto font-semibold text-xl">
          {selectedChat?.creator?.name}
        </div>
      </div>
      <div className="h-fit w-[100%] flex flex-col justify-center items-center gap-y-6 mt-9">
        <div className="text-[white] w-full h-fit font-roboto font-semibold gap-x-3 flex justify-start pl-6 items-center">
          <IoCallOutline className="text-[26px] text-[#9b9595]" />
          <div className="flex flex-col justify-center items-start">
          <p className="text-[15px] text-white">{selectedChat?.creator?.phone || "1234567891"}</p>
          <p className="text-[13px] text-[#989494]">Phone</p>
          </div>
        </div>
        <div className="text-[white] w-full h-fit font-roboto font-semibold gap-x-3 flex justify-start pl-6 items-center">
          <p className="text-[26px] text-[#9b9595] font-semibold">@</p>
          <div className="flex flex-col justify-center items-start">
          <p className="text-[15px] text-white">{selectedChat?.creator?.name || "Himanshu kumar"}</p>
          <p className="text-[13px] text-[#989494]">UserName</p>
          </div>
        </div><div className="text-[white] w-full h-fit font-roboto font-semibold gap-x-3 flex justify-start pl-6 items-center">
          <IoMdInformationCircleOutline className="text-[26px] text-[#9b9595]" />
          <div className="flex flex-col justify-center items-start">
          <p className="text-[15px] text-white">Be what you are</p>
          <p className="text-[13px] text-[#989494]">Bio</p>
          </div>
        </div><div className="text-[white] w-full h-fit font-roboto font-semibold gap-x-3 flex justify-start pl-6 items-center">
          <IoNotificationsOutline className="text-[26px] text-[#9b9595]" />
          <div className="flex flex-col justify-center items-start">
          <p className="text-[15px] text-white">Notification</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserInfo;
