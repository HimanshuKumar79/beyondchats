import toast from "react-hot-toast";

export const getChats = async ({ page,setChatsLoading }) => {
  try {
    setChatsLoading(true)
    console.log("check pages exist",page)
    const API_URL = `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`;
    const allChats = await fetch(API_URL);
    const response = await allChats.json();
    setChatsLoading(false)
    return response?.data;
  } catch (error) {
    setChatsLoading(false)
    toast.error("Something went wrong");
  }
};

