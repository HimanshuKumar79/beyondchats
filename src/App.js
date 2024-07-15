import React, { useEffect, useState } from "react";
import { getChats } from "./functions/getChats";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  initialiseAllChats,
  setNextChatsPage,
} from "./redux/slices/dataSlice";
import "./App.css";
import Chats from "./components/Chats";
import Conversation from "./components/Conversation";
import { getMessages } from "./functions/getMessages";


const App = () => {
  const [chatsLoading, setChatsLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showSideChats, setShowSideChats]=useState(false);
  const selectedChatMessages = useSelector(
    (state) => state.chatsMessages.allMessages
  );
  const allChats = useSelector((state) => state.chatsMessages.allChats);
  const allMessages = useSelector((state) => state.chatsMessages.allMessages);
  const dispatch = useDispatch();
  useEffect(() => {
    getChats({ page: 1, setChatsLoading: setChatsLoading }).then(
      ({ data, current_page }) => {
        dispatch(initialiseAllChats({ firstChats: data }));
        dispatch(setNextChatsPage({ nextChatPage: 1, reachLastChat: false }));
      }
    );
  }, []);

  useEffect(() => {
    if (selectedChatMessages?.length == 0) {
      if (allChats?.length > 0) {
        console.log("check allchat messages", allChats);
        setSelectedChat(allChats[0])
        getMessages({
          chatId: allChats[0]?.id,
          setMessageLoading: setMessageLoading,
        }).then((messages) => {
          dispatch(addMessage({ messages: messages }));
        });
      }
    }
  }, [selectedChatMessages, allChats]);

  useEffect(() => {
    console.log("allMessagesallMessages", allMessages);
  }, [allMessages]);

  return (
    <div className="w-[100vw] font-roboto h-[100vh] bg-[#212121] flex justify-between items-center">
      <div className="w-[450px] h-[100%] bg-[#212121] md1:block hidden">
        <Chats chatsLoading={chatsLoading} setChatsLoading={setChatsLoading} setMessageLoading={setMessageLoading} setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>
      </div>
      {showSideChats && <div className="sm1:w-[450px] w-[100%] h-[100%] bg-[#212121] md1:hidden sm1:block hidden">
        <Chats chatsLoading={chatsLoading} setChatsLoading={setChatsLoading} setMessageLoading={setMessageLoading} setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>
      </div>}
      {!selectedChat && <div className="sm1:w-[450px] w-[100%] h-[100%] bg-[#212121] sm1:hidden block">
        <Chats chatsLoading={chatsLoading} setChatsLoading={setChatsLoading} setMessageLoading={setMessageLoading} setSelectedChat={setSelectedChat} selectedChat={selectedChat}/>
      </div>}
      <div className="md1:w-[80%] w-[100%] h-[100%] sm1:block hidden">
        {allMessages && (
          <Conversation
            data={allMessages}
            messageLoading={messageLoading}
            setMessageLoading={setMessageLoading}
            selectedChat={selectedChat}
            setShowSideChats={setShowSideChats}
            showSideChats={showSideChats}
            setSelectedChat={setSelectedChat}
          />
        )}
      </div>
      {selectedChat && <div className="md1:w-[80%] w-[100%] h-[100%] sm1:hidden block">
        {allMessages && (
          <Conversation
            data={allMessages}
            messageLoading={messageLoading}
            setMessageLoading={setMessageLoading}
            selectedChat={selectedChat}
            setShowSideChats={setShowSideChats}
            showSideChats={showSideChats}
            setSelectedChat={setSelectedChat}
          />
        )}
      </div>}
    </div>
  );
};

export default App;
