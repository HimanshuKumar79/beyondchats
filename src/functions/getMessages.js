import toast from "react-hot-toast";

export const getMessages = async ({ chatId, setMessageLoading }) => {
  try {
    setMessageLoading(true);
    const API_URL = `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`;
    const allMessages = await fetch(API_URL);
    const response = await allMessages.json();
    console.log("check messages of is ", chatId, response);
    setMessageLoading(false);
    return response?.data;
  } catch (error) {
    toast.error("Something went wrong");
    setMessageLoading(false);
  }
};
