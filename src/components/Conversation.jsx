import React, { useEffect, useState } from "react";
import chatBackground from "../utils/images/chatBackground.png";
import { IoCallOutline } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";
import { TbDotsVertical } from "react-icons/tb";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoMdMic } from "react-icons/io";
import moment from "moment";
import MessageShimmer from "./MessageShimmer";
import UserInfo from "./UserInfo";
import { IoArrowBack } from "react-icons/io5";
import { IoNotificationsOffOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { CiGift } from "react-icons/ci";

const Conversation = ({
  data,
  messageLoading,
  selectedChat,
  setShowSideChats,
  showSideChats,
  setSelectedChat,
}) => {
  const [linkDetector, setLinkDetector] = useState(
    /https?:\/\/[^\s/$.?#].[^\s]*/
  );
  const [profilePicture, setProfilePicture] = useState();
  const [userName, setUserName] = useState();
  const [showUserInfo, setUserShowInfo] = useState(false);
  const [showUserInfoMenu,setShowUserInfoMenu]=useState(false)

  const detectLinks = (message) => {
    const linkRegex = /(?:https?:\/\/)?(?:www\.)?[^\s/$.?#]+\.[^\s]+/;
    const words = message.split(" ");
    return words.map((word, index) =>
      linkRegex.test(word) ? (
        <span key={index}>
          <a href={word} target="_blank" style={{ color: "#53BDEB" }}>
            {word}
          </a>
        </span>
      ) : (
        `${word} `
      )
    );
  };

  useEffect(() => {
    if (selectedChat) {
      console.log("check wefnioewhngfioewewafaerklgnqioargn", selectedChat);
      const words = selectedChat?.creator?.name
        ? selectedChat?.creator?.name.split(" ")
        : "New Name".split(" ");
      const firstLetters = words.map((word) => word.charAt(0));
      setProfilePicture(firstLetters, selectedChat);
      setUserName(selectedChat?.creator?.name);
    }
  }, [selectedChat]);

  return (
    <div
      style={{
        backgroundImage: `url(${chatBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`h-full  w-full relative flex justify-center items-center`}
    >
      <div
        className={`h-full ${
          showUserInfo ? "w-[60%]" : "w-full"
        } w-full relative flex flex-col justify-center items-center`}
      >
        {/* Chat Header */}
        {!showUserInfo && <div className="h-[8%] pt-1 -mt-[6px] w-full sm1:hidden flex justify-center items-center bg-[#212121] border-l border-solid border-l-black">
          <div className="w-[80%] cursor-pointer h-full flex justify-start items-center gap-x-3">
            <IoArrowBack
              onClick={() => {
                setUserShowInfo(false);
                setShowSideChats(!showSideChats);
              }}
              className="md1:hidden sm1:block hidden text-white text-[30px]"
            />
            <IoArrowBack
              onClick={() => {
                setSelectedChat(null);
                setUserShowInfo(false);
                setShowSideChats(!showSideChats);
              }}
              className="sm1:hidden block text-white text-[30px]"
            />
            <div
              onClick={() => {
                setShowSideChats(false);
                setUserShowInfo(!showUserInfo);
              }}
              className="min-h-[50px] min-w-[50px] rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold text-[18px] flex justify-center items-center"
            >
              {profilePicture}
            </div>
            <div
              onClick={() => {
                setShowSideChats(false);
                setUserShowInfo(!showUserInfo);
              }}
              className="w-[90%] h-full flex flex-col justify-center items-start text-[white]"
            >
              <div className="font-semibold text-[16px]">
                {userName || "Test Name"}
              </div>
              <div className="text-[14px] text-[#a8a0a0]">
                last seen 5 minutes ago
              </div>
            </div>
          </div>
          <div className="sm1:w-[150px] w-[fit] h-full flex justify-end gap-x-6 px-2 items-center text-[26px] text-[#a8a0a0]">
            <IoCallOutline className="cursor-pointer sm1:block hidden" />
            <HiSearch className="cursor-pointer sm1:block hidden" />
            <TbDotsVertical className="cursor-pointer sm1:block hidden" />
            <TbDotsVertical
            onClick={()=>{
              setShowUserInfoMenu(!showUserInfoMenu)
            }}
             className="cursor-pointer sm1:hidden block" />
          </div>
        </div>}
        <div className="h-[8%] pt-1 -mt-[6px] w-full sm1:flex hidden justify-center items-center bg-[#212121] border-l border-solid border-l-black">
          <div className="w-[80%] cursor-pointer h-full flex justify-start items-center gap-x-3">
            <IoArrowBack
              onClick={() => {
                setUserShowInfo(false);
                setShowSideChats(!showSideChats);
              }}
              className="md1:hidden sm1:block hidden text-white text-[30px]"
            />
            <IoArrowBack
              onClick={() => {
                setSelectedChat(null);
                setUserShowInfo(false);
                setShowSideChats(!showSideChats);
              }}
              className="sm1:hidden block text-white text-[30px]"
            />
            <div
              onClick={() => {
                setShowSideChats(false);
                setUserShowInfo(!showUserInfo);
              }}
              className="min-h-[50px] min-w-[50px] rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold text-[18px] flex justify-center items-center"
            >
              {profilePicture}
            </div>
            <div
              onClick={() => {
                setShowSideChats(false);
                setUserShowInfo(!showUserInfo);
              }}
              className="w-[90%] h-full flex flex-col justify-center items-start text-[white]"
            >
              <div className="font-semibold text-[16px]">
                {userName || "Test Name"}
              </div>
              <div className="text-[14px] text-[#a8a0a0]">
                last seen 5 minutes ago
              </div>
            </div>
          </div>
          <div className="sm1:w-[150px] w-[fit] h-full flex justify-end gap-x-6 px-2 items-center text-[26px] text-[#a8a0a0]">
            <IoCallOutline className="cursor-pointer sm1:block hidden" />
            <HiSearch className="cursor-pointer sm1:block hidden" />
            <TbDotsVertical className="cursor-pointer sm1:block hidden" />
            <TbDotsVertical
            onClick={()=>{
              setShowUserInfoMenu(!showUserInfoMenu)
            }}
             className="cursor-pointer sm1:hidden block" />
          </div>
        </div>
        {showUserInfoMenu && <div className="sm1:hidden flex flex-col justify-evenly items-center h-[200px] w-[200px] absolute top-12 right-8 bg-[#342d2dde] backdrop-blur-sm z-30">
          <div className="h-fit w-full flex justify-start items-center px-2 gap-x-3">
            <HiSearch className="text-white font-semibold text-[25px]"/>
            <div className="text-white font-semibold text-[20px]">Search</div>
          </div>
          <div className="h-fit w-full flex justify-start items-center px-2 gap-x-3">
            <IoNotificationsOffOutline className="text-white font-semibold text-[25px]"/>
            <div className="text-white font-semibold text-[20px]">Notification</div>
          </div>
          <div className="h-fit w-full flex justify-start items-center px-2 gap-x-3">
            <RiShareForwardLine className="text-white font-semibold text-[25px]"/>
            <div className="text-white font-semibold text-[20px]">Share Contact</div>
          </div>
          <div className="h-fit w-full flex justify-start items-center px-2 gap-x-3">
            <CiGift className="text-white font-semibold text-[25px]"/>
            <div className="text-white font-semibold text-[20px]">Gift</div>
          </div>
        </div>}
        {/* chat message */}
        {!showUserInfo && <div className="h-[80%] sm1:w-[90%] w-[100%] sm1:hidden flex flex-col gap-y-2 mt-3 justify-start items-start overflow-hidden overflow-y-auto no-scrollbar bg-transparent">
          {!messageLoading ? (
            data?.map((message) => {
              console.log(
                "check time in message: ",
                message?.sender?.name?.length > 0
              );
              return (
                <div
                  className={`w-full  h-fit flex items-center ${
                    message?.sender?.name?.length > 0
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[60%] mx-6 h-fit relative  ${
                      message?.sender?.name?.length > 0
                        ? "bg-[#212121] text-start"
                        : "bg-sky-500 text-end pr-6"
                    } p-2 rounded-2xl`}
                  >
                    <div className="h-fit  min-w-fit text-[white]">
                      {linkDetector.test(message?.message) ? (
                        <>{detectLinks(message?.message)}</>
                      ) : (
                        <p>
                          {message?.message.split("\n").map((line, index) => {
                            return (
                              <React.Fragment key={index}>
                                {line.split(" ").map((word, i) => (
                                  <React.Fragment key={i}>
                                    {word.includes("@") ? (
                                      <span className="text-green-500 font-semibold">
                                        {word}
                                      </span>
                                    ) : (
                                      word
                                    )}{" "}
                                  </React.Fragment>
                                ))}
                                <br />
                              </React.Fragment>
                            );
                          })}
                        </p>
                      )}
                    </div>
                    <div
                      className={` ${
                        message?.sender?.name?.length > 0
                          ? "text-[#969494] justify-end pl-6"
                          : "text-[#d3d0d0] justify-start pr-7"
                      } text-[12px] font-semibold w-full h-fit flex  items-end `}
                    >
                      {moment(message?.created_at).format("hh:mm")}
                    </div>
                    <div
                      className={`w-6 h-6 ${
                        message?.sender?.name?.length > 0
                          ? "bg-[#212121] absolute bottom-0 left-0 -skew-x-[36deg]"
                          : "bg-sky-500 absolute bottom-0 right-0 skew-x-[36deg]"
                      }`}
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <MessageShimmer />
          )}
        </div>}
        <div className="h-[80%] sm1:w-[90%] w-[100%] sm1:flex hidden flex-col gap-y-2 mt-3 justify-start items-start overflow-hidden overflow-y-auto no-scrollbar bg-transparent">
          {!messageLoading ? (
            data?.map((message) => {
              console.log(
                "check time in message: ",
                message?.sender?.name?.length > 0
              );
              return (
                <div
                  className={`w-full  h-fit flex items-center ${
                    message?.sender?.name?.length > 0
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[60%] mx-6 h-fit relative  ${
                      message?.sender?.name?.length > 0
                        ? "bg-[#212121] text-start"
                        : "bg-sky-500 text-end pr-6"
                    } p-2 rounded-2xl`}
                  >
                    <div className="h-fit  min-w-fit text-[white]">
                      {linkDetector.test(message?.message) ? (
                        <>{detectLinks(message?.message)}</>
                      ) : (
                        <p>
                          {message?.message.split("\n").map((line, index) => {
                            return (
                              <React.Fragment key={index}>
                                {line.split(" ").map((word, i) => (
                                  <React.Fragment key={i}>
                                    {word.includes("@") ? (
                                      <span className="text-green-500 font-semibold">
                                        {word}
                                      </span>
                                    ) : (
                                      word
                                    )}{" "}
                                  </React.Fragment>
                                ))}
                                <br />
                              </React.Fragment>
                            );
                          })}
                        </p>
                      )}
                    </div>
                    <div
                      className={` ${
                        message?.sender?.name?.length > 0
                          ? "text-[#969494] justify-end pl-6"
                          : "text-[#d3d0d0] justify-start pr-7"
                      } text-[12px] font-semibold w-full h-fit flex  items-end `}
                    >
                      {moment(message?.created_at).format("hh:mm")}
                    </div>
                    <div
                      className={`w-6 h-6 ${
                        message?.sender?.name?.length > 0
                          ? "bg-[#212121] absolute bottom-0 left-0 -skew-x-[36deg]"
                          : "bg-sky-500 absolute bottom-0 right-0 skew-x-[36deg]"
                      }`}
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <MessageShimmer />
          )}
        </div>
        {/* chat input */}
        <div className="w-[100%] h-[10%] gap-x-2 bg-transparent sm1:flex hidden justify-center items-center overflow-hidden">
          <div className="md1:w-[60%] w-[80%] h-[80%] bg-[#212121] rounded-xl flex justify-start items-center ">
            <BsEmojiSmile className="text-[#a8a0a0] md1:w-[10%] w-[10%] md1:h-[40%] h-[30%]" />
            <input
              placeholder="Message..."
              className="outline-none w-[80%] caret-white text-white bg-transparent"
            />
            <ImAttachment className="text-[#a8a0a0] md1:w-[10%] w-[10%] md1:h-[40%] h-[30%]" />
          </div>
          <div className="h-12 w-12 bg-sky-400 rounded-full flex justify-center items-center text-white text-[30px]">
            <IoMdMic />
          </div>
        </div>
        {!showUserInfo && <div className="w-[100%] h-[10%] gap-x-2 bg-transparent sm1:hidden flex justify-center items-center overflow-hidden">
          <div className="md1:w-[60%] w-[80%] h-[80%] bg-[#212121] rounded-xl flex justify-start items-center ">
            <BsEmojiSmile className="text-[#a8a0a0] md1:w-[10%] w-[10%] md1:h-[40%] h-[30%]" />
            <input
              placeholder="Message..."
              className="outline-none w-[80%] caret-white text-white bg-transparent"
            />
            <ImAttachment className="text-[#a8a0a0] md1:w-[10%] w-[10%] md1:h-[40%] h-[30%]" />
          </div>
          <div className="h-12 w-12 bg-sky-400 rounded-full flex justify-center items-center text-white text-[30px]">
            <IoMdMic />
          </div>
        </div>}
      </div>
      {showUserInfo && (
        <div className="h-full sm1:w-[40%] w-[100%]">
          <UserInfo
            setUserShowInfo={setUserShowInfo}
            selectedChat={selectedChat}
            profilePicture={profilePicture}
          />
        </div>
      )}
    </div>
  );
};

export default Conversation;
