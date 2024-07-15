import React, { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoArrowBack } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import ChatTile from "./ChatTile";
import { getChats } from "../functions/getChats";
import { addNewChat, setNextChatsPage } from "../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import { RiInboxArchiveLine } from "react-icons/ri";
import { LuCircleDashed } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineModeNight } from "react-icons/md";
import { MdOutlineAnimation } from "react-icons/md";

const Chats = ({ chatsLoading, setChatsLoading,setMessageLoading,setSelectedChat,selectedChat }) => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [finalData, setFinalData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Chats");
  const [showMenu, setShowMenu] = useState(false);

  const handleFocus = () => {
    setShowMenu(false)
    setSearchFocus(true);
  };

  const data = useSelector((state) => state.chatsMessages.allChats);
  const nextPage = useSelector((state) => state.chatsMessages.nextChatPage);
  const reachLastChat = useSelector(
    (state) => state.chatsMessages.reachLastChat
  );

  const nextPageRef = useRef(nextPage);

  useEffect(() => {
    nextPageRef.current = nextPage;
  }, [nextPage]);

  useEffect(() => {
    if (data?.length > 0) {
      console.log("search value for mob",searchValue,data)
      console.log("searchFocus", searchFocus);
      if (searchFocus) {
        if (searchValue) {
          console.log("searchValuesearchValue", searchValue);
          const newData = data?.filter((item) => {
            return item?.creator?.name?.toLowerCase().includes(searchValue.toLowerCase());
          });
          setFinalData(newData);
        } else {
          setFinalData([]);
        }
      } else {
        setSearchValue("");
        setFinalData(data);
      }
    }
  }, [data, searchFocus, searchValue]);

  const dispatch = useDispatch();

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        if (!reachLastChat) {
          const currentNextPage = nextPageRef.current;
          getChats({
            page: currentNextPage,
            setChatsLoading: setChatsLoading,
          }).then(({ data, current_page, last_page }) => {
            dispatch(addNewChat({ newChat: data }));
            dispatch(
              setNextChatsPage({
                nextChatPage: Number(current_page) + 1,
                reachLastChat: Number(current_page) > Number(last_page),
              })
            );
          });
        } else {
          toast.success("All chat fetched successfully");
        }
      }
    }
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [reachLastChat]);

  return (
    <div className="flex flex-col justify-start items-center w-full h-full relative">
      {/* Chat header */}
      <div className="w-full h-[8%] flex gap-x-2 justify-evenly items-center">
        <div
          className={`h-fit w-[10%] py-2  rounded-full hover:bg-[#423f3f64] ${
            showMenu && "bg-[#423f3f64]"
          } ${
            searchFocus
              ? "transition-transform duration-150 transform rotate-0"
              : "transition-transform duration-200 transform rotate-180"
          }`}
        >
          {!searchFocus ? (
            <RxHamburgerMenu
              onClick={() => setShowMenu(!showMenu)}
              className="text-[#d1cece] text-[25px] w-[100%]"
            />
          ) : (
            <IoArrowBack
              onClick={() => setSearchFocus(false)}
              className="text-[#d1cece] text-[25px] w-[100%] "
            />
          )}
        </div>
        <div
          className={`h-[70%] w-[80%]  border-solid  ${
            searchFocus
              ? "border-[#6e47e4] border-2"
              : "hover:border-[#5f5656] border-[#423b3b] border"
          } flex justify-center rounded-3xl items-center bg-[#181818]`}
        >
          <IoSearch
            className={`${
              searchFocus ? "text-[#6e47e4]" : "text-[#d1cece]"
            } text-[20px]`}
          />
          <input
            onChange={(e) => {
              console.log("searching...",e.target.value);
              setSearchValue(e.target.value);
            }}
            value={searchValue}
            placeholder="Search"
            className="bg-[#181818] caret-white text-white border-none outline-none w-[80%] h-full px-3"
            onFocus={handleFocus}
          />
        </div>
      </div>
      { !searchFocus && showMenu && (
        <div className="w-[60%] h-fit gap-y-3  bg-[#342d2dde] backdrop-blur-sm absolute top-14 left-4 z-30 rounded-md p-2 flex flex-col justify-start items-center">
          <div className="text-white hover:bg-[#808080b0] cursor-pointer hover:transition-colors hover:rounded-md px-2 py-1 flex w-full h-fit justify-start items-center gap-x-6">
            <HiOutlineBookmark className="text-[23px]" />
            <p className="text-[15px] font-semibold">Saved Messages</p>
          </div>
          <div className="text-white hover:bg-[#808080b0] cursor-pointer hover:transition-colors hover:rounded-md px-2 py-1 flex w-full h-fit justify-start items-center gap-x-6">
            <RiInboxArchiveLine className="text-[23px]" />
            <p className="text-[15px] font-semibold">Archived Chats</p>
          </div>
          <div className="text-white hover:bg-[#808080b0] cursor-pointer hover:transition-colors hover:rounded-md px-2 py-1 flex w-full h-fit justify-start items-center gap-x-6">
            <LuCircleDashed className="text-[23px]" />
            <p className="text-[15px] font-semibold">My Stories</p>
          </div>
          <div className="text-white hover:bg-[#808080b0] cursor-pointer hover:transition-colors hover:rounded-md px-2 py-1 flex w-full h-fit justify-start items-center gap-x-6">
            <BsPerson className="text-[23px]" />
            <p className="text-[15px] font-semibold">Contacts</p>
          </div>
          <div className="text-white hover:bg-[#808080b0] cursor-pointer hover:transition-colors hover:rounded-md px-2 py-1 flex w-full h-fit justify-start items-center gap-x-6">
            <IoSettingsOutline className="text-[23px]" />
            <p className="text-[15px] font-semibold">Settings</p>
          </div>
          <div className="text-white hover:bg-[#808080b0] cursor-pointer hover:transition-colors hover:rounded-md px-2 py-1 flex w-full h-fit justify-start items-center gap-x-6">
            <MdOutlineModeNight className="text-[23px]" />
            <p className="text-[15px] font-semibold">Dark Mode</p>
          </div>
          <div className="text-white hover:bg-[#808080b0] cursor-pointer hover:transition-colors hover:rounded-md px-2 py-1 flex w-full h-fit justify-start items-center gap-x-6">
            <MdOutlineAnimation className="text-[23px]" />
            <p className="text-[15px] font-semibold">Animation</p>
          </div>
        </div>
      )}

      {/* All Chats */}
      <div
        ref={chatContainerRef}
        className={`h-[90%] ${
          searchFocus && "pt-14"
        } sm1:w-[400px] w-[100%] gap-y-4 no-scrollbar scrollbar-hide flex flex-col justify-start items-center overflow-hidden overflow-y-auto relative`}
      >
        {searchFocus && (
          <div className="w-[400px] sm1:px-0 px-3 h-[10%] flex justify-evenly items-center overflow-x-auto overflow-hidden no-scrollbar absolute top-0">
            <div
              onClick={() => {
                setSelectedTab("Chats");
              }}
              className={`text-[16px] py-1 px-4 hover:bg-[#80808054] transition-color w-fit h-fit ${
                selectedTab == "Chats"
                  ? "text-purple-400  border-b-purple-400  border-solid border-b-2  rounded-t-xl"
                  : "text-white  rounded-xl"
              } cursor-pointer`}
            >
              Chats
            </div>
            <div
              onClick={() => {
                setSelectedTab("Media");
              }}
              className={`text-[16px] py-1 px-4 hover:bg-[#80808054] transition-colors w-fit h-fit ${
                selectedTab == "Media"
                  ? "text-purple-400  border-b-purple-400  border-solid border-b-2  rounded-t-xl"
                  : "text-white  rounded-xl"
              } cursor-pointer`}
            >
              Media
            </div>
            <div
              onClick={() => {
                setSelectedTab("Links");
              }}
              className={`text-[16px] py-1 px-4 hover:bg-[#80808054] transition-color w-fit h-fit ${
                selectedTab == "Links"
                  ? "text-purple-400  border-b-purple-400  border-solid border-b-2  rounded-t-xl"
                  : "text-white  rounded-xl"
              } cursor-pointer`}
            >
              Links
            </div>
            <div
              onClick={() => {
                setSelectedTab("Files");
              }}
              className={`text-[16px] py-1 px-4 hover:bg-[#80808054] transition-color w-fit h-fit ${
                selectedTab == "Files"
                  ? "text-purple-400  border-b-purple-400  border-solid border-b-2  rounded-t-xl"
                  : "text-white  rounded-xl"
              } cursor-pointer`}
            >
              Files
            </div>
            <div
              onClick={() => {
                setSelectedTab("Music");
              }}
              className={`text-[16px] py-1 px-4 hover:bg-[#80808054] transition-color w-fit h-fit ${
                selectedTab == "Music"
                  ? "text-purple-400  border-b-purple-400  border-solid border-b-2 rounded-t-xl"
                  : "text-white rounded-xl"
              } cursor-pointer`}
            >
              Music
            </div>
          </div>
        )}
        {finalData && finalData?.length > 0 ? (
          finalData?.map((chat) => {
            console.log("setSelectedChat",chat)
            return <ChatTile setSelectedChat={setSelectedChat} selectedChat={selectedChat} data={chat} setMessageLoading={setMessageLoading}/>;
          })
        ) : (
          <div className="h-full w-full flex justify-center items-center text-white">
            Data not found
          </div>
        )}
      </div>
      <div className="h-12 w-12 bg-purple-400 rounded-full absolute right-3 bottom-6 flex justify-center items-center text-white">
        <FaPen />
      </div>
      {chatsLoading && (
        <div class="loader">
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
          <div class="loader__circle"></div>
        </div>
      )}
    </div>
  );
};

export default Chats;
