import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allChats: [],
  allMessages: [],
  nextChatPage: 1,
  reachLastChat: false,
};

export const dataSlice = createSlice({
  name: "chatsMessages",
  initialState,
  reducers: {
    initialiseAllChats: (state, action) => {
      console.log("calling initialiseAllChats", action.payload.firstChats);
      state.allChats = action.payload.firstChats;
    },
    addNewChat: (state, action) => {
      state.allChats = [...state.allChats, ...action.payload.newChat];
    },
    addMessage: (state, action) => {
      state.allMessages = action.payload.messages;
    },
    setNextChatsPage: (state, action) => {
      state.nextChatPage = action.payload.nextChatPage;
      state.reachLastChat = action.payload.reachLastChat;
    },
  },
});

export const { initialiseAllChats, addNewChat, addMessage, setNextChatsPage } =
  dataSlice.actions;

export default dataSlice.reducer;
