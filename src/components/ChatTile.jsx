import moment from "moment";
import React, { useEffect, useState } from "react";
import { getMessages } from "../functions/getMessages";
import { addMessage } from "../redux/slices/dataSlice";
import { useDispatch } from "react-redux";

const ChatTile = ({ data,setMessageLoading,setSelectedChat,selectedChat }) => {
  const [messageTime, setMessageTime] = useState(null);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState(null);
  const [profile, setProfile] = useState(null);
  const [gradients, setGradients] = useState([
    "bg-gradient-to-r from-amber-500 to-pink-500",
    "bg-gradient-to-r from-pink-500 to-rose-500",
    "bg-gradient-to-r from-purple-500 to-purple-900",
    "bg-gradient-to-r from-lime-400 to-lime-500",
    "bg-gradient-to-r from-fuchsia-600 to-pink-600",
  ]);
  const [profileBgColor,setProfileBgColor]=useState("bg-gradient-to-r from-amber-500 to-pink-500")
  const dispatch=useDispatch()
  useEffect(() => {
    if (data) {
      const words = data?.creator?.name
        ? data?.creator?.name.split(" ")
        : "New Name".split(" ");
      const firstLetters = words.map((word) => word.charAt(0));
      const time = moment(data?.updated_at).format("MMM DD");
      setName(data?.creator.name);
      setMessage(`${data?.creator.name} joined telegram`);
      setProfile(firstLetters);
      setMessageTime(time);
      const randomIndex = Math.floor(Math.random() * gradients.length);
      setProfileBgColor(gradients[randomIndex]);
    }
  }, [data]);

  const handleMessages=()=>{
    setSelectedChat(data)
    getMessages({chatId:data?.id,setMessageLoading:setMessageLoading}).then((messages)=>{
      dispatch(addMessage({messages:messages}))
    })
  }

  

  return (
    <div 
    onClick={()=>handleMessages()}
    className={`sm1:w-[400px] w-[95%] h-fit flex justify-evenly items-center gap-x-2 cursor-pointer ${selectedChat?.id==data?.id && "bg-sky-500"} p-1 rounded-md`}>
      <div className={`h-14 w-[55px] ${profileBgColor} text-white rounded-full flex justify-center items-center font-semibold`}>
        {profile}
      </div>
      <div className="w-[70%] h-fit flex flex-col justify-center items-center sm1:-ml-0 sm:-ml-9">
        <div className="w-full h-fit text-white text-[16px]">{name ? name : "My Name"}</div>
        <div className={` ${selectedChat?.id==data?.id ? "text-[#f0eded]":"text-[#adaaaa]"} font-roboto text-[16px] w-full h-fit overflow-hidden`}>
          {message}
        </div>
      </div>
      <div className="w-[12%]">
        <div className={`w-[100%] ${selectedChat?.id==data?.id ? "text-[#f0eded]":"text-[#adaaaa]"} text-[12px]`}>{messageTime}</div>
      </div>
    </div>
  );
};

export default ChatTile;
